// The master copy of the facts about Marc Noah. Every page, design, index.md and llms.txt
// is generated from this file by scripts/generate.mjs. Invent nothing: every fact names a
// source id from SOURCES, each read on the date shown. Code Apache-2.0, text CC BY 4.0.

export const SITE = 'https://marc-noah.agenticcells.site';
export const READ = '2026-11-17';

export const SOURCES = {
  epopeia: { title: 'Epopeia Records, artist page', url: 'https://www.epopeia.eu/artistas/marc-noah', read: READ, short: 'Epopeia artist page' },
  'epo-roadtrip': { title: 'Epopeia Jornal, 28 February 2025: Roadtrip and a concert in Loulé', url: 'https://www.epopeia.eu/jornal/marc-noah-embarca-numa-viagem-musical-com-concerto-unico-em-loulo', read: READ, short: 'Epopeia Jornal, 28 Feb 2025' },
  'epo-top-mar': { title: 'Epopeia Jornal, 1 April 2025: Roadtrip tops the Monthly on Top', url: 'https://www.epopeia.eu/jornal/marco-roadtrip-marc-noah-monthly-on-top', read: READ, short: 'Epopeia Jornal, 1 Apr 2025' },
  'epo-top-apr': { title: 'Epopeia Jornal, 2 May 2025: No More Dreaming tops the Monthly on Top', url: 'https://www.epopeia.eu/jornal/marc-noah-continua-a-liderar-o-monthly-on-top', read: READ, short: 'Epopeia Jornal, 2 May 2025' },
  'epo-ribeira': { title: 'Epopeia Jornal, 3 June 2025: Rock na Ribeira', url: 'https://www.epopeia.eu/jornal/marc-noah-e-the-elephant-woman-no-rock-na-ribeira', read: READ, short: 'Epopeia Jornal, 3 Jun 2025' },
  'epo-glv': { title: 'Epopeia agenda: Giant Little Victories release', url: 'https://www.epopeia.eu/agenda/marc-noah-giant-little-victories-lp-2024', read: READ, short: 'Epopeia agenda, album release' },
  'epo-castelo': { title: 'Epopeia agenda: Castelo de Loulé, 7 August 2026', url: 'https://www.epopeia.eu/agenda/marcnoah-loule-castelo', read: READ, short: 'Epopeia agenda, 7 Aug 2026' },
  'epo-emersivo': { title: 'Epopeia agenda: Festival Emersivo, 10 October 2026', url: 'https://www.epopeia.eu/agenda/emersivo-marc-noah', read: READ, short: 'Epopeia agenda, 10 Oct 2026' },
  avoz: { title: 'A Voz do Algarve, 5 August 2026: Sons no Castelo, Loulé', url: 'https://www.avozdoalgarve.pt/d/marc-noah-e-recante-atuam-no-sons-no-castelo-em-loule/96525', read: READ, short: 'A Voz do Algarve, 5 Aug 2026' },
  maisalgarve: { title: 'Mais Algarve, 22 March 2023: concert at República 14, Olhão', url: 'https://maisalgarve.pt/2023/03/22/republica-14-olhao-concerto-de-marc-noah/', read: READ, short: 'Mais Algarve, 22 Mar 2023' },
  postal: { title: 'Postal do Algarve, 28 June 2024: Fortaleza de Sagres programme', url: 'https://postal.pt/algarve/programacao-da-fortaleza-de-sagres-vai-ser-apresentada-e-e-dedicada-aos-patrimonios-de-liberdade/', read: READ, short: 'Postal do Algarve, 28 Jun 2024' },
  apple: { title: 'Apple Music catalogue, Marc Noah', url: 'https://music.apple.com/pt/artist/marc-noah/1846838057', read: READ, short: 'Apple Music' },
  spotify: { title: 'Spotify, Giant Little Victories', url: 'https://open.spotify.com/album/623T8dPibUnW606HPL3dDj', read: READ, short: 'Spotify' },
  youtube: { title: 'YouTube, marcnoahVEVO channel', url: 'https://www.youtube.com/@marcnoahvevo6299', read: READ, short: 'YouTube (marcnoahVEVO)' },
  dinis: { title: 'Dinis Cruz, in the factory brief, 17 November 2026', url: 'https://github.com/AgentiCCells/AgentiCCells__Site__Factory/blob/dev/requests/2026-11-17__marc-noah/brief.md', read: READ, short: 'Dinis Cruz, 17 Nov 2026' },
  brief: { title: 'His own site, marcnoah.pt/sobre, as read for the factory brief (this session could not reach it)', url: 'https://www.marcnoah.pt/sobre', read: '2026-11-17 (by the factory, not re-read)', short: 'marcnoah.pt, via the factory brief' },
  'epo-santa-barbara': { title: 'Epopeia agenda: Santa Bárbara, 26 October 2024', url: 'https://www.epopeia.eu/agenda/marc-noah-autumn-tour-2024-santa-barbara', read: READ, short: 'Epopeia agenda, 26 Oct 2024' },
};
// Each source's "short" is the label for a marker or a source list (the same text as SHORT in
// scripts/lib.mjs, which has no entry for epo-santa-barbara yet). Source list wording, round 1:
export const SOURCES_NOTE = {
  readOnce: 'Every source was read on 17 November 2026, except where noted.',
  exceptions: { brief: 'His own site, marcnoah.pt/sobre: read for the factory brief on 17 November 2026, not re-read.' },
};

export const PERSON = {
  name: 'Marc Noah',
  tagline: 'Singer-songwriter, Algarve',
  oneLine: 'A Portuguese-Australian singer-songwriter who lives in the Algarve and writes the songs he sings.',
  share: `${SITE}/assets/share/marc-noah-1200x630.jpg`,
};

// The three things every page drives home (Dinis, 2026-11-17).
export const STORY = [
  { head: 'He lives in the Algarve', text: 'Marc Noah lives in the south of Portugal, in the Algarve. His own site names Quarteira, on the coast between Faro and Albufeira, and most of his concerts are in the towns around it.', src: ['dinis', 'brief', 'epopeia'] },
  { head: 'He is the composer', text: 'His label calls him a singer and composer (cantor e compositor) and a cantautor: he writes the songs he sings. His songs, it says, come from real episodes in a darker period of his life, moving from isolation into the light.', src: ['epopeia', 'dinis'] },
  { head: 'These are his songs', text: 'Eight of them make up his first album, Giant Little Victories, released in November 2024 on Epopeia Records, a label with an office in Faro. Before it came the EP Green Sofa Session and a run of singles and videos, starting with Lie to Me in February 2023.', src: ['epo-glv', 'apple', 'epopeia'] },
];

// His label's biography, quoted as published, with our translation.
export const BIO_PT = [
  { pt: 'O cantautor luso-australiano partilha a sua alma em canções que nos envolvem.', en: 'The Portuguese-Australian singer-songwriter shares his soul in songs that wrap around us.' },
  { pt: 'Marc Noah, cantor e compositor luso-australiano, foi salvo pela música durante toda a sua vida. Ao lidar com questões da adolescência, descobriu que a música era o único sitio onde se sentia são e salvo.', en: 'Marc Noah, Portuguese-Australian singer and composer, has been saved by music all his life. Dealing with the troubles of adolescence, he found that music was the only place where he felt safe and sound.' },
  { pt: 'Depois de trabalhar no “The Boomerang Bar”, o seu caminho levou-o naturalmente ao que ama e quando o Covid-19 chegou ao mundo, encontrou tempo para organizar as suas letras e melodias.', en: 'After working at “The Boomerang Bar”, his path led him naturally to what he loves, and when Covid-19 reached the world he found time to put his lyrics and melodies in order.' },
  { pt: 'Influenciado pela música dos anos 80 e 90, [...] do pop ao grunge, dos musicais ao rock, tocou em diversas bandas de covers, sempre evitando ter um “verdadeiro trabalho diurno” que nunca parecia adequar-se às suas medidas. Uma mistura suave de Pop/Indie/Rock é o que melhor define o seu som quando se destaca sozinho ou com sua banda.', en: 'Influenced by the music of the 1980s and 1990s, [...] from pop to grunge, from musicals to rock, he played in several cover bands, always avoiding a “real day job” that never seemed to fit him. A gentle mix of pop, indie and rock best describes his sound, whether he stands out alone or with his band.' },
  { pt: 'Com o EP “Green Sofa Session” e o álbum “Giant Little Victories” lançados, as suas músicas têm origem em episódios da vida real de um período mais sombrio de sua vida, passando do isolamento para a luz, enquanto mostra a sua música em qualquer palco onde tem a oportunidade de tocar.', en: 'With the EP “Green Sofa Session” and the album “Giant Little Victories” out, his songs come from real-life episodes of a darker period of his life, moving from isolation to the light, while he shows his music on any stage where he gets the chance to play.' },
];
export const BIO_NOTE = 'The [...] marks a list of artists who influenced him, left out here; read it on the label page.';

// His own words, first person, as published.
export const QUOTES = [
  { pt: 'O meu 1º álbum: "Giant Little Victories" é uma mensagem de superação pessoal e de celebração. É o querer reforçar a necessidade de celebrar quem somos, quem amamos, o nosso crescimento e as pequenas vitórias da vida, é a reafirmação de que quando nos encontramos no escuro e a luz passa a ser a constante passamos a ter o poder da decisão novamente.',
    en: 'My first album, "Giant Little Victories", is a message of personal overcoming and of celebration. It is wanting to reinforce the need to celebrate who we are, who we love, our growth and the small victories of life; it is the reaffirmation that when we find ourselves in the dark and the light becomes the constant, we have the power of decision again.',
    about: 'Giant Little Victories', src: 'epopeia' },
  { pt: 'É um encarar a vida de uma forma mais leve e positiva. É a ansia pela liberdade das amarras da vida rotineira do dia-a-dia.',
    en: 'It is facing life in a lighter, more positive way. It is the longing to be free of the ties of everyday routine.',
    about: 'Roadtrip, which he calls a turning point', src: 'epo-roadtrip' },
];

export const ALBUM = {
  title: 'Giant Little Victories', kind: 'Album, his first', released: 'November 2024', label: 'Epopeia Records',
  note: 'Out on digital platforms from 20 November 2024. His label calls the album highly autobiographical.',
  src: ['epo-glv', 'apple', 'spotify', 'epo-roadtrip'],
  listen: [
    { name: 'Spotify', url: 'https://open.spotify.com/album/623T8dPibUnW606HPL3dDj' },
    { name: 'Apple Music', url: 'https://music.apple.com/pt/album/giant-little-victories/1847519743' },
    { name: 'YouTube', url: 'https://www.youtube.com/watch?v=6sXuvZaI7lM' },
  ],
};

// Track order and lengths from Apple Music; "first" is the first-release date Apple lists for the track.
export const TRACKS = [
  { n: 1, title: 'To The Bone', len: '3:29', first: '2024-06-13', video: { kind: 'Official lyric video', url: 'https://www.youtube.com/watch?v=ll9tQ_BhrCA', date: '2024-06-12' } },
  { n: 2, title: 'Lie to Me', len: '3:43', first: '2023-02-04', single: true, tag: { text: 'single, February 2023', src: ['apple'] }, video: { kind: 'Official music video', url: 'https://www.youtube.com/watch?v=oyE1KP8hUFU', date: '2023-03-04' }, video2: { kind: 'Official lyric video', url: 'https://www.youtube.com/watch?v=wvsYVb5d1xQ', date: '2023-02-23' } },
  { n: 3, title: 'Towers and Bridges', len: '3:11', first: '2023-10-04', video: { kind: 'Video', url: 'https://www.youtube.com/watch?v=K8795UoBqTg', date: '2023-11-04' } },
  { n: 4, title: 'Mother', len: '3:13', first: '2023-08-25', video: { kind: 'Official lyric video', url: 'https://www.youtube.com/watch?v=JMd-r6okn80', date: '2023-08-27' } },
  { n: 5, title: 'Sunshine', len: '3:31', first: '2023-05-06', single: true, tag: { text: 'single, May 2023', src: ['apple'] }, video: { kind: 'Official lyric video', url: 'https://www.youtube.com/watch?v=SaiC6jdsCy8', date: '2023-05-05' } },
  { n: 6, title: 'Roadtrip', len: '3:37', first: '2024-11-18', video: { kind: 'Video', url: 'https://www.youtube.com/watch?v=adbD0f2FYLA', date: '2025-03-12' },
    // The source lists the places with "tais como ... …" (such as): the list is partial, hence "among them".
    // The video's kind is "Video": no source calls it official, so the site does not.
    note: 'Filmed in places that marked his path, among them Sydney, Salir, Quarteira, Faro and Olhão. The most played song in the Epopeia catalogue in March 2025.', src: ['epo-roadtrip', 'epo-top-mar'],
    filmed: { places: ['Sydney', 'Salir', 'Quarteira', 'Faro', 'Olhão'], partial: true, src: ['epo-roadtrip'] },
    author: { text: 'His label’s article on Roadtrip calls him the song’s author.', pt: 'nas palavras do seu autor', en: 'in the words of its author', src: ['epo-roadtrip'] },
    tag: { text: 'most played in his label’s catalogue, March 2025', src: ['epo-top-mar'] } },
  { n: 7, title: 'Slowtalk', len: '3:37', first: '2024-11-18' },
  { n: 8, title: 'No More Dreaming', len: '3:25', first: '2024-11-18', note: 'The most played song in the Epopeia catalogue in April 2025.', src: ['epo-top-apr'], tag: { text: 'most played in his label’s catalogue, April 2025', src: ['epo-top-apr'] } },
];
export const TRACKS_SRC = ['apple', 'youtube'];

export const OTHER_RELEASES = [
  { title: 'Green Sofa Session', kind: 'EP', text: 'Named by his label as released before the album; sold with tickets for his March 2025 concert in Loulé. Its date and tracks are to be confirmed with Marc.', src: ['epopeia', 'epo-roadtrip'] },
  { title: 'Lie to Me', kind: 'Single', text: 'Released 4 February 2023; his first release on Apple Music. Later track 2 of the album.', src: ['apple'], url: 'https://music.apple.com/pt/album/lie-to-me-single/1847409597' },
  { title: 'Sunshine', kind: 'Single', text: 'Released 6 May 2023. Later track 5 of the album.', src: ['apple'], url: 'https://music.apple.com/pt/album/sunshine-single/1847437679' },
];

export const LISTEN = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/7gYCZ94lNuTfJA3g5MCJxd', src: 'epopeia' },
  { name: 'Apple Music', url: 'https://music.apple.com/pt/artist/marc-noah/1846838057', src: 'apple' },
  { name: 'YouTube (Vevo)', url: 'https://www.youtube.com/@marcnoahvevo6299', src: 'epopeia' },
  { name: 'Instagram', url: 'https://www.instagram.com/marcnoahmusic/', src: 'epopeia' },
  { name: 'Facebook', url: 'https://www.facebook.com/marcnoahmusic', src: 'epopeia' },
  { name: 'His own site', url: 'https://www.marcnoah.pt/', src: 'brief' },
  { name: 'Epopeia Records', url: 'https://www.epopeia.eu/artistas/marc-noah', src: 'epopeia' },
];

export const FORMATS = [
  { name: 'Solo', mins: 60, on: 'Indoor', people: '1 musician, 2 technical crew' },
  { name: 'Duo', mins: 70, on: 'Indoor', people: '2 musicians, 2 technical crew' },
  { name: 'Band', mins: 75, on: 'Indoor and outdoor', people: '6 musicians, 4 technical crew' },
];
export const FORMATS_SRC = 'epopeia';

// Places: lon/lat for the drawn map (approximate town centres). algarve: true for the Algarve map.
export const PLACES = [
  { id: 'quarteira', name: 'Quarteira', lon: -8.10, lat: 37.07, home: true, algarve: true, text: 'Where he lives, according to his own site. He played the Centro Autárquico in November 2024 and the Mercadinho de Verão in July 2025, and filmed part of the Roadtrip video here.', src: ['brief', 'epopeia', 'epo-roadtrip'] },
  { id: 'loule', name: 'Loulé', lon: -8.02, lat: 37.14, algarve: true, text: 'The town he has played most: Bafo de Baco, the Noite Branca, the castle (Sons no Castelo) and the Festival Emersivo.', src: ['epopeia', 'avoz'] },
  { id: 'salir', name: 'Salir', lon: -8.06, lat: 37.24, algarve: true, text: 'A village in the hills north of Loulé; one of the places in the Roadtrip video.', src: ['epo-roadtrip'] },
  { id: 'boliqueime', name: 'Boliqueime', lon: -8.16, lat: 37.13, algarve: true, text: 'Boliqueime Food Festival, July 2024.', src: ['epopeia'] },
  { id: 'faro', name: 'Faro', lon: -7.93, lat: 37.02, algarve: true, text: 'His label has an office here. Festival Muralhas (2025), FNAC Faro (2024), and a place in the Roadtrip video. He sat on the jury of the XXIV Fartuna at the Teatro das Figuras in 2025.', src: ['epopeia', 'epo-roadtrip'] },
  { id: 'olhao', name: 'Olhão', lon: -7.84, lat: 37.03, algarve: true, text: 'Two sessions at República 14 in March 2023; a place in the Roadtrip video.', src: ['maisalgarve', 'epo-roadtrip'] },
  { id: 'pechao', name: 'Pechão', lon: -7.82, lat: 37.08, algarve: true, text: 'Rock na Ribeira, Parque da Família, June 2025.', src: ['epo-ribeira'] },
  { id: 'albufeira', name: 'Albufeira (Guia)', lon: -8.30, lat: 37.13, algarve: true, text: 'FNAC Guia, November 2024.', src: ['epopeia'] },
  { id: 'portimao', name: 'Portimão', lon: -8.54, lat: 37.14, algarve: true, text: 'Food Trucks Festival, August 2026.', src: ['epopeia'] },
  { id: 'raposeira', name: 'Raposeira', lon: -8.92, lat: 37.09, algarve: true, text: 'Junta de Freguesia, November 2024.', src: ['epopeia'] },
  { id: 'sagres', name: 'Sagres', lon: -8.94, lat: 37.01, algarve: true, text: 'His showcase opened the Fortaleza Cultural programme at the Fortaleza de Sagres on 5 July 2024.', src: ['postal'] },
];
export const BEYOND = [
  { name: 'The Azores', text: 'Ponta Delgada (Outro Lado), Ribeira Grande (Vulcana, and the Beach Club Surf & Snack at Santa Bárbara), Rádio Atlântida and a private show, October 2024.', src: ['epopeia', 'avoz'], placeSrc: ['epo-santa-barbara'] },
  { name: 'The rest of mainland Portugal', text: 'Leiria, Viseu, Paços de Ferreira, Vila Nova de Famalicão, Torres Vedras, Almada and Vila Ruiva, November 2024, around the album launch.', src: ['epopeia'] },
  { name: 'Sydney', text: 'One of the places in the Roadtrip video that, in his label’s words, marked his path.', src: ['epo-roadtrip'] },
];

// Every dated appearance. Venue and place as the source names them. kind: concert, radio, release, video, jury.
export const GIGS = [
  { date: '2026-10-10', place: 'Loulé', venue: 'Festival Emersivo', kind: 'concert', src: ['epopeia', 'epo-emersivo'], time: '17:15' },
  { date: '2026-08-22', place: 'Portimão', venue: 'Food Trucks Festival', kind: 'concert', src: ['epopeia'] },
  { date: '2026-08-07', place: 'Loulé', venue: 'Sons no Castelo, Alcaidaria do Castelo de Loulé', kind: 'concert', src: ['epopeia', 'epo-castelo', 'avoz'], time: '21:30', note: 'Free entry; presenting Giant Little Victories.' },
  { date: '2025-08-30', place: 'Loulé', venue: 'Noite Branca', kind: 'concert', src: ['epopeia'] },
  { date: '2025-08-16', place: 'Faro', venue: 'Festival Muralhas', kind: 'concert', src: ['epopeia'] },
  { date: '2025-07-25', place: 'Loulé', venue: 'Loulé', kind: 'concert', src: ['epopeia'] },
  { date: '2025-07-04', place: 'Quarteira', venue: 'Mercadinho de Verão', kind: 'concert', src: ['epopeia'] },
  { date: '2025-06-07', place: 'Pechão', venue: 'Rock na Ribeira, Parque da Família', kind: 'concert', src: ['epopeia', 'epo-ribeira'], time: '21:30', note: 'Free entry.' },
  { date: '2025-03-29', place: 'Faro', venue: 'XXIV Fartuna, Teatro das Figuras', kind: 'jury', src: ['epopeia'], note: 'On the jury.' },
  { date: '2025-03-14', place: 'Loulé', venue: 'Bafo de Baco', kind: 'concert', src: ['epopeia', 'epo-roadtrip'], time: '21:00', note: 'As a trio, two days after the Roadtrip video.' },
  { date: '2025-03-12', place: 'YouTube', venue: 'Roadtrip video premiere (Vevo)', kind: 'video', src: ['epopeia', 'youtube'] },
  { date: '2024-11-30', place: 'Leiria', venue: 'Chico Lobo', kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-29', place: 'Viseu', venue: "Mesa D'Alegria", kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-28', place: 'Paços de Ferreira', venue: 'Auditório da Biblioteca Municipal', kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-27', place: 'V. N. Famalicão', venue: 'Casa do Artista Amador', kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-26', place: 'Torres Vedras', venue: 'Maria Cachucha', kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-26', place: 'Radio', venue: 'ON FM', kind: 'radio', src: ['epopeia'] },
  { date: '2024-11-25', place: 'Almada', venue: 'FNAC Almada', kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-24', place: 'Vila Ruiva', venue: 'Centro Cultural de Vila Ruiva', kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-23', place: 'Raposeira', venue: 'Junta de Freguesia', kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-22', place: 'Quarteira', venue: 'Centro Autárquico de Quarteira', kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-21', place: 'Albufeira', venue: 'FNAC Guia', kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-20', place: 'Faro', venue: 'FNAC Faro', kind: 'concert', src: ['epopeia'] },
  { date: '2024-11-20', place: 'Digital platforms', venue: 'Giant Little Victories released', kind: 'release', src: ['epopeia', 'epo-glv'] },
  // Region from the event page (epo-santa-barbara): "Ribeira Grande, Azores", so not the Algarve. placeSrc carries
  // that source until scripts/lib.mjs can label it (SHORT has no entry for it yet).
  { date: '2024-10-26', place: 'Santa Bárbara, Ribeira Grande, Azores', venue: 'Beach Club Surf & Snack Santa Barbara', kind: 'concert', src: ['epopeia'], placeSrc: ['epo-santa-barbara'] },
  { date: '2024-10-25', place: 'Ribeira Grande, Azores', venue: 'Vulcana', kind: 'concert', src: ['epopeia'] },
  { date: '2024-10-25', place: 'Radio, Azores', venue: 'Rádio Atlântida', kind: 'radio', src: ['epopeia'] },
  { date: '2024-10-24', place: 'Azores', venue: 'Private show', kind: 'concert', src: ['epopeia'] },
  { date: '2024-10-23', place: 'Ponta Delgada, Azores', venue: 'Outro Lado', kind: 'concert', src: ['epopeia'] },
  { date: '2024-07-28', place: 'Boliqueime', venue: 'Boliqueime Food Festival', kind: 'concert', src: ['epopeia'] },
  { date: '2024-07-05', place: 'Sagres', venue: 'Fortaleza de Sagres, opening the Fortaleza Cultural programme', kind: 'concert', src: ['postal'], note: 'Showcase.' },
  { date: '2023-03-25', place: 'Olhão', venue: 'República 14', kind: 'concert', src: ['maisalgarve'], time: '19:00 and 21:30', note: 'Two sessions.' },
];
export const GIGS_NOTE = 'His label lists the October and November 2024 dates as his autumn tour; the Algarve press calls it the Autumn Leaves Acoustic Tour. The press also names Festival F among the stages he has played (no date given).';
export const GIGS_NOTE_SRC = ['epopeia', 'avoz'];

export const BOOKING = {
  text: 'For concerts and festivals, his label, Epopeia Records, takes bookings: use the Booking button on his artist page, which also links his production dossier. His own site, marcnoah.pt, has his own contact routes.',
  url: 'https://www.epopeia.eu/artistas/marc-noah', src: 'epopeia',
};

export const NEEDS = [
  'Photos of Marc he is happy for the site to use (and who took them, for the credit).',
  'Permission to embed his official Spotify and YouTube players, or to keep links only.',
  'A read of marcnoah.pt/sobre: this session could not reach his site, so Quarteira and his own wording come from the factory brief. Is Quarteira right, and may we quote his Sobre page?',
  'Quarteira: the site now names it in its first line, on the map and in the footer as where he lives. Please confirm it, or tell us what to say instead.',
  'Green Sofa Session: release date, tracks and a link to listen.',
  'Who wrote what: his label calls him a cantautor, and its Roadtrip article calls him that song’s author. For the other seven album songs (and the EP and singles), confirm he wrote words and music, and name any co-writers he wants credited.',
  'The date and place of his Festival F appearance, and anything coming up next.',
  'A booking route he wants on the site (his own site, or the label).',
  'Whether he wants a Portuguese version of the site (a decision for Dinis and Marc).',
];

// ---------- Round 1 copy for the passed design (writer@AgentiCCells.marc-noah, 2026-11-17) ----------
// Every piece names its sources; numbers marked "computed" are our own counts from GIGS, not a source's claim.

const roadtrip = TRACKS.find(t => t.title === 'Roadtrip');
const ALGARVE_PLACES = PLACES.filter(p => p.algarve).map(p => p.name.replace(/ \(.*\)$/, ''));
const concerts = GIGS.filter(g => g.kind === 'concert');
const byDate = [...concerts].sort((a, b) => a.date.localeCompare(b.date));
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthYear = d => `${MONTHS[Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}`;
const srcOf = list => [...new Set(list.flatMap(g => g.src))];

// Our counts. by: 'computed' means we counted GIGS; the site must say "our count".
export const COUNTS = {
  by: 'computed',
  how: 'Counted by us from GIGS (the dates his label and the Algarve press list); not a figure any source gives.',
  concerts: concerts.length,
  concertsAlgarve: concerts.filter(g => ALGARVE_PLACES.includes(g.place)).length,
  appearances: GIGS.length,
  other: GIGS.length - concerts.length,
  first: byDate[0].date,
  last: byDate[byDate.length - 1].date,
  src: srcOf(concerts),
};

// Home, first screen (change 1). The kicker names Quarteira, so it carries brief.
export const HERO = {
  kicker: 'Singer-songwriter · Quarteira, Algarve', kickerSrc: ['brief', 'dinis'],
  line: 'He lives on the Algarve coast and writes the songs he sings.', src: ['dinis', 'brief', 'epopeia'],
};

// The Roadtrip feature: home hero panel (change 1), /songs/ block (change 7), the route map (change 2).
export const FEATURE = {
  n: roadtrip.n, title: roadtrip.title, url: roadtrip.video.url,
  head: 'Start with this song',
  button: 'Watch Roadtrip on YouTube',
  // Home: one line each, with its own markers.
  lines: [
    { text: 'From his first album.', src: ['epo-roadtrip'] },
    { text: 'Filmed in places that marked his path, among them Sydney, Salir, Quarteira, Faro and Olhão.', src: ['epo-roadtrip'] },
    { text: 'The most played song in his label’s catalogue in March 2025.', src: ['epo-top-mar'] },
  ],
  // /songs/: the reviewer's wording (condition 7.1).
  songsLines: [
    { text: 'His label says the video was filmed in places that marked his path, among them Sydney, Salir, Quarteira, Faro and Olhão.', src: ['epo-roadtrip'] },
    { text: 'In March 2025 it was the most played song in the label’s catalogue.', src: ['epo-top-mar'] },
    { text: 'His label’s article on it calls him the song’s author.', src: ['epo-roadtrip'] },
  ],
  // One line of his words for the home panel (second sentence of QUOTES[1]); the full quote goes on /songs/.
  quoteShort: { pt: 'É a ansia pela liberdade das amarras da vida rotineira do dia-a-dia.', en: 'It is the longing to be free of the ties of everyday routine.', caption: 'Marc Noah, on Roadtrip (our translation)', src: 'epo-roadtrip' },
  quoteFull: 1, // index in QUOTES
  map: {
    route: ['salir', 'quarteira', 'faro', 'olhao'], home: 'quarteira', homeLabel: 'Quarteira, home',
    caption: 'Home in Quarteira. The dashed line joins four Algarve places named for the Roadtrip video; the label does not give the order, and this line is ours.',
    scale: 'A sketch, not to scale.',
    title: 'Map of the central Algarve: Quarteira, and the Algarve places of the Roadtrip video',
    desc: 'A drawn map of the Algarve coast from Albufeira to Olhão. Quarteira, where he lives, is the largest pin. Loulé, the town he has played most, is marked. A dashed line joins Salir, Quarteira, Faro and Olhão, four Algarve places his label names for the Roadtrip video; the label does not give the order, and this line is ours.',
    src: ['brief', 'epo-roadtrip'],
  },
};

// The composer, in his own words (change 3). Short quote on home; the long one (QUOTES[0]) on /about/ only.
export const COMPOSER = {
  head: 'The composer, in his own words',
  quoteShort: {
    pt: 'O meu 1º álbum: "Giant Little Victories" é uma mensagem de superação pessoal e de celebração.',
    en: 'My first album, "Giant Little Victories", is a message of personal overcoming and of celebration.',
    caption: 'Marc Noah, on Giant Little Victories (our translation)', src: 'epopeia',
  },
  // ptWord is set in italics with lang="pt" where it appears in text.
  labelLine: { text: 'His label calls him a cantautor: he writes the songs he sings. His songs, it says, come from real episodes in a darker period of his life.', ptWord: 'cantautor', src: ['epopeia'] },
  more: { text: 'His story', href: '/about/' },
  quoteLong: { index: 0, on: '/about/' },
};

// Album line for the home song rows (change 4, reviewer condition 4.2) and the /songs/ lead (change 7).
export const ALBUM_LINE = { text: 'His first album, eight songs, November 2024, on Epopeia Records, a label with an office in Faro.', src: ['epo-glv', 'apple', 'epopeia'] };
export const SONGS_PAGE = {
  head: 'He writes the songs he sings',
  lead: { text: 'Marc Noah is a cantautor: he writes the songs he sings. These are his.', ptWord: 'cantautor', src: ['epopeia', 'dinis'] },
  allLink: 'All the songs, with the singles and the EP',
  credits: 'Who wrote what, track by track, waits for Marc’s word.',
};

// /live/ booker block (change 8), and the home "On stage" block in short. Five stages chosen from GIGS.
const pick = (date, place) => { const g = GIGS.find(x => x.date === date && x.place === place); if (!g) throw new Error(`no gig ${date} ${place}`); return g; };
export const STAGES = [
  pick('2026-10-10', 'Loulé'),
  pick('2026-08-07', 'Loulé'),
  pick('2025-08-16', 'Faro'),
  pick('2025-06-07', 'Pechão'),
  pick('2024-07-05', 'Sagres'),
];
export const LIVE = {
  head: 'For programmers',
  formatsHead: 'How he plays', // chips from FORMATS (src FORMATS_SRC)
  stagesHead: 'Stages he has played',
  button: 'Book through his Epopeia artist page', url: BOOKING.url, src: BOOKING.src,
  count: { text: `${COUNTS.concerts} concerts listed by his label and the Algarve press since ${monthYear(COUNTS.first)} (our count), ${COUNTS.concertsAlgarve} of them in the Algarve.`, by: 'computed', src: COUNTS.src },
  noVenue: 'venue not named by his label',
  otherHead: 'Other appearances',
  otherKinds: ['jury', 'radio', 'video', 'release'],
};

// Footer about him (change 6). Quarteira carries brief.
export const FOOTER = {
  name: 'Marc Noah',
  line: 'Singer-songwriter. Lives in Quarteira, on the Algarve coast.', src: ['brief', 'dinis'],
  book: 'Book him through Epopeia Records', bookUrl: BOOKING.url,
  approve: 'Marc approves every change about him.',
  noCopies: 'No photos, audio or lyrics are copied here; follow the links to listen.',
  factory: 'Made with the AgentiCCells site factory.',
};
