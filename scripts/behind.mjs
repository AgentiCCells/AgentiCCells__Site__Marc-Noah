// Copyright 2026 AgentiCCells. Licensed under the Apache License, Version 2.0
// (http://www.apache.org/licenses/LICENSE-2.0). The text it writes is CC BY 4.0.
//
// Build step for /behind-the-scenes/ (Dinis Cruz, 2026-11-17, about 22:05 UTC, recorded in
// team/WORKFLOW.md). scripts/build.mjs imports this right after copying src/ to _site/.
// Everything on these pages is read at build time from the repository: team/<role>/ROLE.md
// and POLICY.md, team/scopes.json, team/WORKFLOW.md, team/rounds/, docs/ and `git log`.
// Nothing is typed in by hand, so a new commit or round changes the pages with no edit.
// Node built-ins only. Written by developer@AgentiCCells.marc-noah, round 1.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import { join, dirname, posix } from 'node:path';
import { esc, sitePage, REPO } from './lib.mjs';

const OUT = '_site/behind-the-scenes';
const BASE = '/behind-the-scenes';
const BLOB = `${REPO}/blob/dev/`;
const TREE = `${REPO}/tree/dev/`;
const COMMIT = `${REPO}/commit/`;
const MAX_BYTES = 300 * 1024; // no file in this section over 300 KB (review criterion 6)
const ROLE_NAMES = ['conductor', 'designer', 'critic', 'reviewer', 'writer', 'developer'];

const read = f => (existsSync(f) ? readFileSync(f, 'utf8') : '');
const write = (p, s) => { const f = join(OUT, p); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, s); };
const walk = d => (existsSync(d) ? readdirSync(d).flatMap(f => { const p = posix.join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; }) : []);
const git = (...a) => { try { return execFileSync('git', a, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 << 20 }); } catch { return null; } };
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const when = iso => { const d = new Date(iso); return `${d.getUTCDate()} ${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')} UTC`; };
const day = iso => when(iso).replace(/,.*/, '');

// ---------- image sizes (JPEG and PNG headers), so every <img> has width and height ----------
function imgSize(buf) {
  if (buf[0] === 0x89 && buf.toString('ascii', 1, 4) === 'PNG') return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

// ---------- images: copied from team/rounds/ when small enough, so relative links work ----------
// team/rounds/<x> is served at /behind-the-scenes/rounds/<x>.
const IMG = /\.(jpe?g|png)$/i;
const images = new Map(); // repo path -> { url, w, h, big }
for (const f of walk('team/rounds').filter(f => IMG.test(f))) {
  const buf = readFileSync(f), size = imgSize(buf) || { w: 0, h: 0 };
  const rel = f.slice('team/rounds/'.length);
  if (buf.length > MAX_BYTES) { images.set(f, { url: BLOB + f, ...size, big: true, kb: Math.round(buf.length / 1024) }); continue; }
  mkdirSync(dirname(join(OUT, 'rounds', rel)), { recursive: true });
  copyFileSync(f, join(OUT, 'rounds', rel));
  images.set(f, { url: `${BASE}/rounds/${rel}`, ...size, big: false });
}

// ---------- a small Markdown-to-HTML converter ----------
// Headings, paragraphs, lists (nested by indent), links, images, bold, italic, code spans and
// fences, block quotes, rules and tables. Every piece of text is escaped first.
function resolver(base) {
  return href => {
    if (/^(https?:|mailto:|#)/.test(href)) return href;
    const [path, hash = ''] = href.split('#');
    const p = posix.normalize(posix.join(base, path)).replace(/\/$/, '');
    const h = hash ? `#${hash}` : '';
    if (images.has(p)) return images.get(p).url;
    const round = p.match(/^team\/rounds\/(\d+)\.md$/);
    if (round) return `${BASE}/rounds/${round[1]}/${h}`;
    if (existsSync(p) && statSync(p).isDirectory()) return TREE + p;
    return BLOB + p + h;
  };
}
function inline(text, ctx) {
  return text.split(/(`[^`]+`)/).map(part => {
    if (/^`[^`]+`$/.test(part)) return `<code>${esc(part.slice(1, -1))}</code>`;
    let s = esc(part);
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => ctx.image(alt, src.replace(/&amp;/g, '&')));
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => `<a href="${esc(ctx.resolve(href.replace(/&amp;/g, '&')))}">${t}</a>`);
    s = s.replace(/(?<![="'>\w])(https?:\/\/[^\s<)"]*[^\s<)".,;:])/g, u => `<a href="${u}">${u}</a>`);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    s = s.replace(/(?<![*\w])\*([^*\s][^*]*)\*(?![*\w])/g, '<i>$1</i>');
    s = s.replace(/(?<![\w])_([^_\s][^_]*)_(?![\w])/g, '<i>$1</i>');
    return s;
  }).join('');
}
function markdown(md, { base = 'team', shift = 0, oneH1 = false } = {}) {
  const resolve = resolver(base);
  const ctx = {
    resolve,
    image: (alt, src) => {
      const p = posix.normalize(posix.join(base, src.split('#')[0]));
      const im = images.get(p);
      if (im && !im.big) return `<img src="${esc(im.url)}" alt="${alt}" width="${im.w}" height="${im.h}" loading="lazy">`;
      return `<a href="${esc(im ? im.url : resolve(src))}">${alt || 'image'}${im && im.big ? ` (image on GitHub, ${im.kb} KB)` : ''}</a>`;
    },
  };
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  let seenH1 = false;
  const isList = l => /^\s*([-*+]|\d+\.)\s+/.test(l);
  const isTable = (l, n) => /^\s*\|/.test(l) && n !== undefined && /^\s*\|?\s*:?-{2,}/.test(n);
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (/^```/.test(line)) {
      const buf = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++; out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`); continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*?)\s*#*$/);
    if (h) {
      let level = h[1].length + shift;
      if (level === 1 && oneH1) { if (seenH1) level = 2; seenH1 = true; }
      level = Math.min(Math.max(level, 1), 6);
      out.push(`<h${level}>${inline(h[2], ctx)}</h${level}>`); i++; continue;
    }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
    if (/^\s*>/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ''));
      out.push(`<blockquote>${markdown(buf.join('\n'), { base, shift })}</blockquote>`); continue;
    }
    if (isTable(line, lines[i + 1])) {
      const cells = l => l.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g, '|'));
      const head = cells(line); i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(`<div class="table"><table><thead><tr>${head.map(c => `<th>${inline(c, ctx)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${inline(c, ctx)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (isList(line)) {
      // Collect the list's lines (items, nested items and continuation lines), then build it.
      const items = [];
      while (i < lines.length && (isList(lines[i]) || (lines[i].trim() && /^\s+/.test(lines[i]) && items.length))) {
        const m = lines[i].match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
        if (m) items.push({ indent: m[1].length, ordered: /\d/.test(m[2]), start: parseInt(m[2], 10), text: m[3] });
        else items[items.length - 1].text += ' ' + lines[i].trim();
        i++;
      }
      const build = (from, indent) => {
        let html = '', j = from;
        const ordered = items[from].ordered;
        const start = ordered && items[from].start !== 1 ? ` start="${items[from].start}"` : '';
        html += ordered ? `<ol${start}>` : '<ul>';
        while (j < items.length && items[j].indent >= indent) {
          if (items[j].indent > indent) { const [sub, k] = build(j, items[j].indent); html = html.replace(/<\/li>$/, `${sub}</li>`); j = k; continue; }
          html += `<li>${inline(items[j].text, ctx)}</li>`; j++;
        }
        return [html + (ordered ? '</ol>' : '</ul>'), j];
      };
      out.push(build(0, items[0].indent)[0]); continue;
    }
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|\s*>)/.test(lines[i]) && !isList(lines[i]) && !isTable(lines[i], lines[i + 1])) buf.push(lines[i++].trim());
    out.push(`<p>${inline(buf.join(' '), ctx)}</p>`);
  }
  return out.join('\n');
}
const inlineMd = (text, base = 'team') => inline(text, { resolve: resolver(base), image: alt => esc(alt) });
const section = (md, heading) => { const m = md.match(new RegExp(`^## ${heading}\\s*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm')); return m ? m[1].trim() : ''; };

// ---------- the team: ROLE.md and POLICY.md, in plain words ----------
const scopes = JSON.parse(read('team/scopes.json') || '{"roles":{}}');
const team = scopes.team || 'AgentiCCells.marc-noah';
const roleIds = [...new Set([...ROLE_NAMES, ...Object.keys(scopes.roles)])].filter(r => existsSync(`team/${r}/ROLE.md`));
const field = (md, name) => { const m = md.match(new RegExp(`\\*\\*${name}\\.\\*\\*\\s*([^\\n]+)`)); return m ? m[1].trim() : ''; };
const roles = roleIds.map(r => {
  const roleMd = read(`team/${r}/ROLE.md`), policyMd = read(`team/${r}/POLICY.md`);
  const json = policyMd.match(/```json\s*\n([\s\S]*?)\n```/);
  let data = {};
  try { data = json ? JSON.parse(json[1]) : {}; } catch { data = {}; }
  const status = policyMd.match(/\*\*Status: ([^*]+)\*\*\s*\(([^)]*)\)/);
  const phase = policyMd.match(/\*\*Phase: ([^*]+)\*\*\s*\(([^)]*)\)/);
  const title = (roleMd.match(/^# Role: (.*)$/m) || [, `${r}@${team}`])[1];
  return {
    id: r, title, objective: field(roleMd, 'Objective'), may: field(roleMd, 'May change') || field(roleMd, 'Writes'), hands: field(roleMd, 'Hands over'), stops: field(roleMd, 'Stops'),
    status: data.status || (status && status[1]) || 'not stated', statusNote: status ? status[2] : '',
    phase: data.phase || (phase && phase[1]) || 'not stated', phaseNote: phase ? phase[2] : '',
    def: data.default || '', never: data.never || [], gaps: data.gaps || [], scope: scopes.roles[r] || [],
  };
});
const modeWords = m => (m === 'observe' ? 'observed and recorded; it does not block' : esc(m || 'not stated'));
const roleCard = r => `<article class="role" id="role-${esc(r.id)}">
<h3>${esc(r.title)}</h3>
<p><b>What it is for.</b> ${inlineMd(r.objective)}</p>
${r.may ? `<p><b>What it may change.</b> ${inlineMd(r.may)}</p>` : ''}
${r.stops ? `<p><b>When it stops.</b> ${inlineMd(r.stops)}</p>` : ''}
<p><b>Its policy.</b> Status <b>${esc(r.status)}</b>${r.statusNote ? ` (${esc(r.statusNote)})` : ''}. Phase <b>${esc(r.phase)}</b>${r.phaseNote ? ` (${esc(r.phaseNote)})` : ''}.${r.def === 'deny' ? ' Deny by default: anything the policy does not list, this agent does not do.' : ''}</p>
${r.never.length ? `<details><summary>${plural(r.never.length, 'thing', 'things')} it must never do</summary><ul>${r.never.map(n => `<li>${esc(n.rule)}. <span class="muted">Checked by: ${esc(n.enforcer || 'none')}; ${modeWords(n.mode)}.</span></li>`).join('')}</ul></details>` : ''}
${r.gaps.length ? `<details><summary>${plural(r.gaps.length, 'open gap')} in its policy</summary><ul>${r.gaps.map(g => `<li><b>${esc(g.id)}</b>, ${esc(g.what)}. Proposal: ${esc(g.proposal || '')}. Status: ${esc(g.status || '')}.</li>`).join('')}</ul></details>` : ''}
<p class="files"><a class="more" href="${BLOB}team/${esc(r.id)}/ROLE.md">ROLE.md</a> · <a class="more" href="${BLOB}team/${esc(r.id)}/POLICY.md">POLICY.md</a></p>
</article>`;

// ---------- the flow: the loop in team/WORKFLOW.md, as an SVG and as a list ----------
const workflow = read('team/WORKFLOW.md');
const steps = section(workflow, 'The loop \\(one round\\)').split('\n').map(l => l.match(/^\d+\.\s+\*\*([^*]+?)\.?\*\*\s*(.*)$/)).filter(Boolean)
  .map(m => ({ title: m[1].replace(/\.$/, ''), text: m[2], who: [...new Set((m[2].match(new RegExp(`\\b(${ROLE_NAMES.join('|')})\\b`, 'g')) || []))] }));
function flowSvg() {
  if (!steps.length) return '';
  const W = 340, BH = 58, GAP = 22, X0 = 8, BW = 286, top = 10;
  const y = i => top + i * (BH + GAP);
  const H = y(steps.length - 1) + BH + top;
  const back = steps.findIndex(s => /back to step (\d+)/.test(s.text));
  const backTo = back >= 0 ? Number(steps[back].text.match(/back to step (\d+)/)[1]) - 1 : -1;
  const boxes = steps.map((s, i) => `<g><rect class="box" x="${X0}" y="${y(i)}" width="${BW}" height="${BH}" rx="10"/>
<text x="${X0 + 14}" y="${y(i) + 25}" class="t"><tspan class="num">${i + 1}</tspan>  ${esc(s.title)}</text>
<text x="${X0 + 14}" y="${y(i) + 47}" class="who">${esc(s.who.join(', ') || ' ')}</text></g>`).join('\n');
  const arrows = steps.slice(1).map((_, i) => `<line class="arrow" x1="${X0 + BW / 2}" y1="${y(i) + BH}" x2="${X0 + BW / 2}" y2="${y(i + 1) - 3}" marker-end="url(#ah)"/>`).join('\n');
  const loop = backTo >= 0 ? `<path class="arrow" d="M${X0 + BW} ${y(back) + BH / 2} H${W - 14} V${y(backTo) + BH / 2} H${X0 + BW + 4}" marker-end="url(#ah)"/>` : '';
  const stepText = steps.map((s, i) => `${i + 1}, ${s.title}${s.who.length ? ` (${s.who.join(', ')})` : ''}`).join('; ');
  return `<svg class="flow-svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="flowt flowd">
<title id="flowt">The flow of one round</title>
<desc id="flowd">${esc(`${steps.length} steps, top to bottom: ${stepText}.${backTo >= 0 ? ` If step ${back + 1} fails, the round goes back to step ${backTo + 1}.` : ''} The same steps are listed in full next to this diagram.`)}</desc>
<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0 10 5 0 10z"/></marker></defs>
${arrows}
${loop}
${boxes}
</svg>`;
}

// ---------- git history ----------
const RS = '\x1e', US = '\x1f';
const shallow = (git('rev-parse', '--is-shallow-repository') || '').trim() === 'true';
const log = git('log', `--format=${RS}%H${US}%aI${US}%s${US}%(trailers:key=Agent,valueonly,separator=%x2C )`, '--name-only');
const commits = (log || '').split(RS).filter(c => c.trim()).map(chunk => {
  const [headLine, ...rest] = chunk.split('\n');
  const [sha, date, subject, agent] = headLine.split(US);
  return { sha, date, subject, agent: (agent || '').trim(), files: rest.map(l => l.trim()).filter(Boolean) };
});
const teamStart = (git('log', '--diff-filter=A', '--reverse', '--format=%H', '--', 'team') || '').split('\n').filter(Boolean)[0];
const startIdx = teamStart ? commits.findIndex(c => c.sha === teamStart) : -1;
const roundOf = c => {
  const ns = c.files.map(f => f.match(/^team\/rounds\/(\d+)(?:\/|\.md$)/)).filter(Boolean).map(m => Number(m[1]));
  const s = c.subject.match(/\bRound (\d+)\b/i);
  if (s) ns.push(Number(s[1]));
  return ns.length ? Math.max(...ns) : null;
};
commits.forEach((c, i) => {
  c.before = startIdx < 0 ? !teamStart : i > startIdx;
  c.round = c.before ? null : roundOf(c);
  c.group = c.before ? 'Before the cell' : c.round ? `Round ${c.round}` : 'The cell, outside a round';
});
const groups = [];
for (const c of commits) { let g = groups.find(x => x.name === c.group); if (!g) groups.push(g = { name: c.group, list: [] }); g.list.push(c); }
const commitRow = c => `<li><time datetime="${esc(c.date)}">${esc(when(c.date))}</time> <span class="agent">${c.agent ? esc(c.agent) : '<i>no Agent trailer</i>'}</span> <a class="subj" href="${COMMIT}${esc(c.sha)}">${esc(c.subject)}</a> <code>${esc(c.sha.slice(0, 7))}</code></li>`;

// How the site started: the commits before the cell, in order, grouped by the agent that made them.
const plan = read('docs/plan.md');
const planWords = plan.match(/at Dinis Cruz's word \(([^)]*)\)[^"]*"([^"]+)"/);
const PHASES = {
  'factory-apply': { name: 'The factory request and the seed', link: ['the factory request', 'https://github.com/AgentiCCells/AgentiCCells__Site__Factory/tree/dev/requests/2026-11-17__marc-noah'] },
  'factory-first-pass': { name: 'The first pass' },
  site: { name: 'The second pass: one facts file and five designs', words: planWords, docs: ['docs/plan.md', 'docs/handover.md', 'data/sources.md'] },
};
const early = commits.filter(c => c.before).reverse();
const phases = [];
for (const c of early) {
  const role = (c.agent.split('@')[0] || 'unknown');
  const last = phases[phases.length - 1];
  if (last && last.role === role) last.list.push(c); else phases.push({ role, list: [c] });
}
const cellCommits = commits.filter(c => !c.before);
const phaseBlock = (p, i) => {
  const info = PHASES[p.role] || { name: `Work by ${p.list[0].agent || 'an agent with no Agent trailer'}` };
  return `<li><h3>${esc(info.name)}</h3>
<p class="muted">${esc(day(p.list[0].date))}${p.list[0].agent ? `, by ${esc(p.list[0].agent)}` : ''}, ${plural(p.list.length, 'commit')}.</p>
${info.words ? `<blockquote><p>“${esc(info.words[2])}”</p><p class="muted">Dinis Cruz (${esc(info.words[1])}), as recorded in <a href="${BLOB}docs/plan.md">docs/plan.md</a>.</p></blockquote>` : ''}
<ul>${p.list.map(c => `<li><a href="${COMMIT}${esc(c.sha)}">${esc(c.subject)}</a> <code>${esc(c.sha.slice(0, 7))}</code></li>`).join('')}</ul>
${info.link ? `<p><a class="more" href="${esc(info.link[1])}">${esc(info.link[0])}</a></p>` : ''}
${info.docs ? `<p>Its notes: ${info.docs.filter(existsSync).map(d => `<a class="more" href="${BLOB}${d}">${d}</a>`).join(' · ')}</p>` : ''}
</li>`;
};

// ---------- rounds ----------
const roundNs = (existsSync('team/rounds') ? readdirSync('team/rounds') : []).map(f => f.match(/^(\d+)\.md$/)).filter(Boolean).map(m => Number(m[1])).sort((a, b) => a - b);
const PAGE_NAMES = { home: 'The home page', d: 'The designs page (/d/)' };
const altFor = (f, n) => {
  const base = posix.basename(f).replace(IMG, '');
  const m = base.match(/^(.*?)-(\d{3,4})(-first-screen)?$/);
  const pageName = m ? (PAGE_NAMES[m[1]] || `The /${m[1].replace(/_/g, '/')}/ page`) : base;
  const ctx = /\/img\/r\d+-before\//.test(f) ? `the live site before round ${n}` : /\/img\/r\d+-after\//.test(f) ? `the live site after round ${n}` : /\/design\//.test(f) ? `the design mock-up for round ${n}` : /\/build\//.test(f) ? `the local build for round ${n}` : `round ${n}`;
  return m ? `${pageName} at ${m[2]} px wide${m[3] ? ', first screen only' : ', full page'}: ${ctx}.` : `${pageName}: ${ctx}.`;
};
const roundImages = n => [...images.keys()].filter(f => f.startsWith(`team/rounds/img/r${n}-`) || f.startsWith(`team/rounds/${n}/`)).sort();
const gallery = n => {
  const fs = roundImages(n);
  if (!fs.length) return '';
  const label = f => /\/img\/r\d+-before\//.test(f) ? 'Before the round (live site)' : /\/img\/r\d+-after\//.test(f) ? 'After the round (live site)' : /\/design\//.test(f) ? 'Design mock-ups' : /\/build\//.test(f) ? 'The local build' : 'Other pictures';
  const order = ['Before the round (live site)', 'Design mock-ups', 'The local build', 'After the round (live site)', 'Other pictures'];
  return order.map(l => {
    const list = fs.filter(f => label(f) === l);
    if (!list.length) return '';
    return `<h3>${l}</h3>
<ul class="shots">${list.map(f => {
      const im = images.get(f), alt = altFor(f, n);
      return im.big
        ? `<li><a class="big" href="${esc(im.url)}">${esc(alt)} The file is ${im.kb} KB, over this section’s 300 KB limit, so it opens on GitHub.</a></li>`
        : `<li><a href="${esc(im.url)}"><img src="${esc(im.url)}" alt="${esc(alt)}" width="${im.w}" height="${im.h}" loading="lazy"></a><span>${esc(alt)}</span></li>`;
    }).join('\n')}</ul>`;
  }).join('\n');
};
const roundFiles = n => walk(`team/rounds/${n}`).filter(f => /\.(md|html)$/.test(f)).sort();
const roundCommits = n => commits.filter(c => c.round === n);

const CSS = `.bts-parts{display:flex;flex-wrap:wrap;gap:0 1rem;padding:0;list-style:none}.bts-parts a{display:inline-flex;align-items:center;min-height:44px}
.roles{display:grid;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr));gap:1rem}
.role{background:var(--paper);border:1px solid var(--line);border-radius:.75rem;padding:1rem 1.1rem}.role h3{overflow-wrap:anywhere}.role p{margin:.45rem 0}
.role details{margin:.4rem 0}.role summary{min-height:44px;display:flex;align-items:center;cursor:pointer;color:var(--sea);font-weight:600}
.flow{display:grid;gap:1rem 2.5rem;align-items:start}.flow-svg{width:100%;max-width:400px;height:auto;display:block}
.flow-svg .box{fill:var(--paper);stroke:var(--sea);stroke-width:2}.flow-svg text{fill:var(--ink);font-size:17px;font-family:system-ui,sans-serif}
.flow-svg .t{font-weight:600}.flow-svg .num{fill:var(--rust);font-weight:700}.flow-svg .who{fill:var(--muted);font-size:16px}
.flow-svg .arrow{stroke:var(--rust);stroke-width:2.5;fill:none}.flow-svg .ah{fill:var(--rust)}
.steps li{margin:.5rem 0}
.story{list-style:none;padding:0;counter-reset:ph}.story>li{border-left:4px solid var(--rust);padding:.1rem 0 .1rem 1rem;margin:1.25rem 0}
.timeline{list-style:none;padding:0;margin:0}.timeline li{padding:.4rem 0;border-top:1px solid var(--line);overflow-wrap:anywhere}
.timeline time{display:block;font-size:.85rem;color:var(--muted);font-variant-numeric:tabular-nums}.timeline .agent{display:block;font-size:.85rem;color:var(--muted)}
.timeline .subj,.story a{display:inline-flex;align-items:center;min-height:44px}
.shots{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:1rem}
.shots img{display:block;width:100%;height:auto;max-height:24rem;object-fit:cover;object-position:top;border:1px solid var(--line);border-radius:.5rem;background:var(--paper)}
.shots span{display:block;font-size:.85rem;color:var(--muted);margin-top:.3rem}.shots .big{display:inline-flex;min-height:44px;align-items:center}
.report img{max-width:100%;height:auto}.report h2{margin-top:2rem}
@media (min-width:900px){.flow{grid-template-columns:minmax(18rem,400px) 1fr}}`;

// ---------- the index page ----------
const counts = { commits: commits.length, roles: roles.length, rounds: roundNs.length, cell: cellCommits.length };
const dinisWords = section(workflow, "Dinis's words");
const history = log === null
  ? '<p class="note">Git was not available when this page was built, so the commit timeline is empty.</p>'
  : `${shallow ? `<p class="note">This build ran on a shallow clone of the repository, so only the ${plural(commits.length, 'most recent commit')} were available. The full history is on <a href="${REPO}/commits/dev">GitHub</a>.</p>` : ''}
<p>${plural(counts.commits, 'commit')} on branch dev when this page was built, newest first. Each row shows the date, the <code>Agent:</code> trailer as the commit wrote it, the commit’s subject line (a link to the commit on GitHub) and its short hash.</p>
${groups.map(g => `<h3>${esc(g.name)} <span class="muted">(${plural(g.list.length, 'commit')})</span></h3>\n<ul class="timeline">\n${g.list.map(commitRow).join('\n')}\n</ul>`).join('\n')}`;

const index = sitePage({
  path: `${BASE}/`, title: 'Behind the scenes of the Marc Noah site',
  description: 'How this site is made: the agent team and its policies in plain words, the flow of a round, how the site started, every commit and each round report, generated from the repository at build time.',
  css: CSS,
  body: `
<h1>Behind the scenes</h1>
<p class="lead">How this site is made, by whom and in what order. Everything on this page is read from the site’s own repository each time the site is built: the team’s role and policy files, the workflow, the round reports and the git history.</p>
<ul class="bts-parts" aria-label="On this page"><li><a href="#made">How this was made</a></li><li><a href="#team">The team</a></li><li><a href="#flow">The flow of a round</a></li><li><a href="#start">How the site started</a></li><li><a href="#rounds">Rounds</a></li><li><a href="#commits">Every commit</a></li></ul>

<h2 id="made">How this was made</h2>
<p>This site is written by AI agents of <a href="https://agenticcells.ai">AgentiCCells</a>, from one facts file (<a href="${BLOB}data/facts.mjs">data/facts.mjs</a>) in which every fact names its public source and the date it was read. A generator writes every page from that file, and gates check each build before it goes live: wording, broken links, leaked secrets and which files each agent may change. Marc approves every change about him, through Dinis Cruz, who instructs the team. The site describes itself to <a href="https://hub.agenticcells.site">the AgentiCCells hub</a> in <a href="${BLOB}hub.json">hub.json</a>. The code is on <a href="${REPO}">GitHub</a> under Apache-2.0; the text is CC BY 4.0.</p>
${dinisWords ? `<h3>In Dinis’s words</h3>\n${markdown(dinisWords, { base: 'team' })}` : ''}

<h2 id="team">The team</h2>
<p>${plural(counts.roles, 'role')}, each a sub-agent briefed with two files: <code>ROLE.md</code> (what it is for) and <code>POLICY.md</code> (its Agent Behaviour Policy). Which files each role may change is set in <a href="${BLOB}team/scopes.json">team/scopes.json</a>, and a gate fails a release that breaks it. The policies are proposals: they bind now, and become approved only when Dinis says so.</p>
<div class="roles">
${roles.map(roleCard).join('\n')}
</div>

<h2 id="flow">The flow of a round</h2>
<p>From <a href="${BLOB}team/WORKFLOW.md">team/WORKFLOW.md</a>.</p>
<div class="flow">
${flowSvg()}
<ol class="steps">
${steps.map(s => `<li><b>${esc(s.title)}.</b> ${inlineMd(s.text)}</li>`).join('\n')}
</ol>
</div>

<h2 id="start">How the site started</h2>
<p>The first ${plural(early.length, 'commit')}, before the team of roles existed, in the order they were made.</p>
<ol class="story">
${phases.map(phaseBlock).join('\n')}
<li><h3>The cell</h3>
<p class="muted">${cellCommits.length ? `From ${esc(day(cellCommits[cellCommits.length - 1].date))}, ${plural(cellCommits.length, 'commit')} so far.` : 'No commits yet.'}</p>
<p>A team of ${plural(counts.roles, 'role')} with written policies, working in rounds: see <a href="#team">the team</a>, <a href="#flow">the flow</a> and <a href="#rounds">the rounds</a>.</p></li>
</ol>

<h2 id="rounds">Rounds</h2>
${roundNs.length ? `<ul>${roundNs.map(n => `<li><a class="more" href="${BASE}/rounds/${n}/">Round ${n}</a> <span class="muted">${plural(roundCommits(n).length, 'commit')}, ${plural(roundImages(n).length, 'screenshot')}</span></li>`).join('')}</ul>` : '<p>No round report yet.</p>'}

<h2 id="commits">Every commit</h2>
${history}
`,
});
write('index.html', index);

// ---------- one page per round report ----------
for (const n of roundNs) {
  const md = read(`team/rounds/${n}.md`);
  const hasH1 = /^# /m.test(md);
  const files = roundFiles(n);
  const rc = roundCommits(n);
  const html = sitePage({
    path: `${BASE}/rounds/${n}/`, title: `Round ${n}: behind the scenes of the Marc Noah site`,
    description: `The report for round ${n} of the agent team that makes the Marc Noah site, with its screenshots, files and commits, generated from team/rounds/${n}.md.`,
    css: CSS,
    body: `
<p><a class="more" href="${BASE}/">Behind the scenes</a></p>
${hasH1 ? '' : `<h1>Round ${n}</h1>`}
<div class="report">
${markdown(md, { base: 'team/rounds', oneH1: true })}
</div>
<h2>The round’s files</h2>
<p>As written by each role, on GitHub (<a href="${BLOB}team/rounds/${n}.md">the report itself</a>):</p>
${files.length ? `<ul>${files.map(f => `<li><a class="more" href="${BLOB}${esc(f)}">${esc(f.slice(`team/rounds/${n}/`.length))}</a></li>`).join('')}</ul>` : '<p>None yet.</p>'}
<h2>Screenshots</h2>
${gallery(n) || '<p>None yet.</p>'}
<h2>Commits in this round</h2>
${rc.length ? `<ul class="timeline">${rc.map(commitRow).join('\n')}</ul>` : '<p>None yet.</p>'}
`,
  });
  write(`rounds/${n}/index.html`, html);
}
console.log(`behind-the-scenes: ${counts.roles} roles, ${counts.rounds} round page(s), ${counts.commits} commits${shallow ? ' (shallow clone)' : ''}`);
