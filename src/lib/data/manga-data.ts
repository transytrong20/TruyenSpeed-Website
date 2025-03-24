import { Manga, Chapter, ChapterData, ReadingHistory } from "@/lib/types";

// Genres disponibles
export const genres = [
  "Action",
  "Aventure",
  "Comédie",
  "Drame",
  "Fantasy",
  "Horreur",
  "Romance",
  "Science-fiction",
  "Slice of Life",
  "Mystère",
  "Psychologique",
  "Historique",
  "Sports",
];

// Images de mangas (remplacer par vos propres URL d'images)
const MANGA_COVERS = [
  "https://same-assets.com/h/SBRkhZbhVDDzDpyiDpqcD/demon_slayer.jpg",
  "https://same-assets.com/h/fKNNwrdMMycmhtxyawfFx/one_piece.jpg",
  "https://same-assets.com/h/HnmRayhyNQZRHGMndGKSb/jujutsu_kaisen.jpg",
  "https://same-assets.com/h/EGQHrCnGNQMEhzCNzRBQF/attack_on_titan.jpg",
  "https://same-assets.com/h/bbizxbGABwxwBdGdkAmkF/chainsaw_man.jpg",
  "https://same-assets.com/h/BEADcMDfazdNcbpAEMcBz/my_hero_academia.jpg",
  "https://same-assets.com/h/zkmcacBbwcSNkQQGxwDmi/spy_family.jpg",
  "https://same-assets.com/h/qEpGSMnDnAANCKHBFCNcw/tokyo_ghoul.jpg",
  "https://same-assets.com/h/hfccpQQFSyDyRfKNGxwKE/naruto.jpg",
  "https://same-assets.com/h/QfBbfciESnDDRtEbdfzGN/dragon_ball.jpg",
  "https://same-assets.com/h/wHbHpbTQKdHNNSwcACEfb/hunter_x_hunter.jpg",
  "https://same-assets.com/h/zRGRndtncpARtptwphraa/one_punch_man.jpg",
  "https://same-assets.com/h/hkAFnwxFNadfGiAkRzznd/death_note.jpg",
  "https://same-assets.com/h/wwEztiizbQcKHEFapcGmS/bleach.jpg",
];

// Pages de manga (remplacer par vos propres URL d'images)
const MANGA_PAGES = [
  "https://same-assets.com/h/FwKnzKBtGNfFNFwBpwyGA/page1.jpg",
  "https://same-assets.com/h/GpNxBHdDpkSAraADiDdtf/page2.jpg",
  "https://same-assets.com/h/FNBSfaiGrfdkraxwtDwGS/page3.jpg",
  "https://same-assets.com/h/ihESHEkRkbwEhAtibtbSE/page4.jpg",
  "https://same-assets.com/h/wmyPKNxMxQMnQNNHNrwHr/page5.jpg",
  "https://same-assets.com/h/bERQyFkfNyPNXhBKKbcRd/page6.jpg",
  "https://same-assets.com/h/nKQiDXDnbwxyhcDyNEnwQ/page7.jpg",
  "https://same-assets.com/h/xwdwMNyRPThkMcHMDfRxx/page8.jpg",
  "https://same-assets.com/h/AiKmfcBcdKpQGxmBimHMP/page9.jpg",
  "https://same-assets.com/h/TxDFMzQwXcnxrwMGpRxcw/page10.jpg",
];

// Fonction utilitaire pour créer un chapitre
const createChapter = (number: string, title: string, read = false): Chapter => ({
  number,
  title,
  releaseDate: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2024`,
  read,
});

// Fonction utilitaire pour générer des chapitres
const generateChapters = (count: number, isLastRead = false): Chapter[] => {
  return Array.from({ length: count }, (_, i) => {
    const num = (i + 1).toString().padStart(2, "0");
    const isRead = i < count - 2 || (isLastRead && i === count - 1);
    return createChapter(num, `Chapitre ${num}`, isRead);
  });
};

// Données des mangas
export const allManga: Manga[] = [
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    author: "Koyoharu Gotouge",
    description:
      "Tanjiro Kamado et sa sœur Nezuko sont les seuls survivants d'une attaque où leur famille a été massacrée par un démon. Nezuko est devenue un démon, mais a étonnamment conservé une conscience humaine. Tanjiro décide de devenir un Pourfendeur de démons pour venger sa famille et guérir sa sœur.",
    coverImage: MANGA_COVERS[0],
    status: "Terminé",
    publicationYear: "2016",
    origin: "Japon",
    rating: 4.8,
    genres: ["Action", "Aventure", "Fantasy", "Drame"],
    lastUpdate: "15/03/2024",
    chapters: generateChapters(20, true),
    relatedManga: ["jujutsu-kaisen", "tokyo-ghoul", "one-piece"],
  },
  {
    id: "one-piece",
    title: "One Piece",
    author: "Eiichiro Oda",
    description:
      "Monkey D. Luffy rêve de retrouver le trésor légendaire, le 'One Piece', laissé par le roi des pirates, Gol D. Roger, et de devenir ainsi le nouveau roi des pirates. Avec son équipage, il parcourt Grand Line, l'océan le plus dangereux du monde.",
    coverImage: MANGA_COVERS[1],
    status: "En cours",
    publicationYear: "1997",
    origin: "Japon",
    rating: 4.9,
    genres: ["Action", "Aventure", "Comédie", "Fantasy"],
    lastUpdate: "10/03/2024",
    chapters: generateChapters(25),
    relatedManga: ["naruto", "bleach", "hunter-x-hunter"],
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    description:
      "Yuji Itadori, lycéen doté d'une force surhumaine, rejoint une organisation secrète de sorciers pour éliminer une malédiction puissante après avoir mangé un doigt maudit pour sauver ses amis.",
    coverImage: MANGA_COVERS[2],
    status: "En cours",
    publicationYear: "2018",
    origin: "Japon",
    rating: 4.7,
    genres: ["Action", "Aventure", "Surnaturel", "Mystère"],
    lastUpdate: "20/03/2024",
    chapters: generateChapters(18),
    relatedManga: ["demon-slayer", "chainsaw-man", "tokyo-ghoul"],
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    author: "Hajime Isayama",
    description:
      "Dans un monde où l'humanité vit entourée de murs pour se protéger de Titans mangeurs d'hommes, Eren Yeager jure de se venger après que sa ville natale ait été détruite et sa mère tuée.",
    coverImage: MANGA_COVERS[3],
    status: "Terminé",
    publicationYear: "2009",
    origin: "Japon",
    rating: 4.9,
    genres: ["Action", "Drame", "Fantasy", "Horreur"],
    lastUpdate: "05/03/2024",
    chapters: generateChapters(22, true),
    relatedManga: ["tokyo-ghoul", "chainsaw-man", "death-note"],
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    author: "Tatsuki Fujimoto",
    description:
      "Denji est un jeune homme pauvre qui chasse des démons avec son démon de compagnie Pochita pour rembourser ses dettes. Suite à une trahison, il fusionne avec Pochita et devient Chainsaw Man.",
    coverImage: MANGA_COVERS[4],
    status: "En cours",
    publicationYear: "2018",
    origin: "Japon",
    rating: 4.6,
    genres: ["Action", "Comédie", "Horreur", "Surnaturel"],
    lastUpdate: "25/03/2024",
    chapters: generateChapters(15),
    relatedManga: ["jujutsu-kaisen", "tokyo-ghoul", "attack-on-titan"],
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    author: "Kohei Horikoshi",
    description:
      "Dans un monde où 80% de la population possède un super-pouvoir appelé 'Alter', Izuku Midoriya, né sans pouvoir, rêve de devenir un héros. Sa rencontre avec All Might, le plus grand des héros, changera son destin.",
    coverImage: MANGA_COVERS[5],
    status: "En cours",
    publicationYear: "2014",
    origin: "Japon",
    rating: 4.5,
    genres: ["Action", "Aventure", "Comédie", "Science-fiction"],
    lastUpdate: "12/03/2024",
    chapters: generateChapters(19),
    relatedManga: ["one-punch-man", "naruto", "demon-slayer"],
  },
  {
    id: "spy-family",
    title: "Spy x Family",
    author: "Tatsuya Endo",
    description:
      "Un espion, un assassin et une télépathe forment une famille improvisée tout en gardant leurs identités secrètes les uns des autres, pour accomplir une mission qui pourrait préserver la paix mondiale.",
    coverImage: MANGA_COVERS[6],
    status: "En cours",
    publicationYear: "2019",
    origin: "Japon",
    rating: 4.7,
    genres: ["Action", "Comédie", "Slice of Life"],
    lastUpdate: "18/03/2024",
    chapters: generateChapters(14),
    relatedManga: ["one-punch-man", "my-hero-academia", "death-note"],
  },
  {
    id: "tokyo-ghoul",
    title: "Tokyo Ghoul",
    author: "Sui Ishida",
    description:
      "Ken Kaneki devient mi-humain mi-goule après une rencontre fatidique, et doit apprendre à s'adapter à sa nouvelle vie tout en étant pris dans un conflit entre le monde des goules et celui des humains.",
    coverImage: MANGA_COVERS[7],
    status: "Terminé",
    publicationYear: "2011",
    origin: "Japon",
    rating: 4.6,
    genres: ["Action", "Drame", "Horreur", "Surnaturel"],
    lastUpdate: "02/03/2024",
    chapters: generateChapters(21, true),
    relatedManga: ["attack-on-titan", "chainsaw-man", "jujutsu-kaisen"],
  },
  {
    id: "naruto",
    title: "Naruto",
    author: "Masashi Kishimoto",
    description:
      "Naruto Uzumaki, un jeune ninja hyperactif, rêve de devenir Hokage, le plus puissant ninja et leader de son village. Il est en quête de reconnaissance et doit affronter de nombreux ennemis.",
    coverImage: MANGA_COVERS[8],
    status: "Terminé",
    publicationYear: "1999",
    origin: "Japon",
    rating: 4.7,
    genres: ["Action", "Aventure", "Fantasy"],
    lastUpdate: "08/03/2024",
    chapters: generateChapters(23, true),
    relatedManga: ["one-piece", "bleach", "dragon-ball"],
  },
  {
    id: "dragon-ball",
    title: "Dragon Ball",
    author: "Akira Toriyama",
    description:
      "Son Goku, un combattant exceptionnel, et ses amis partent à la recherche des Dragon Balls, sept boules de cristal qui, une fois réunies, permettent d'invoquer un dragon capable d'exaucer n'importe quel souhait.",
    coverImage: MANGA_COVERS[9],
    status: "Terminé",
    publicationYear: "1984",
    origin: "Japon",
    rating: 4.8,
    genres: ["Action", "Aventure", "Comédie", "Fantasy"],
    lastUpdate: "01/03/2024",
    chapters: generateChapters(20, true),
    relatedManga: ["naruto", "one-piece", "hunter-x-hunter"],
  },
];

// Créer des listes pour la page d'accueil
export const featuredManga = allManga.slice(0, 5);
export const latestManga = [...allManga].sort(() => Math.random() - 0.5).slice(0, 12);
export const popularManga = [...allManga].sort(() => Math.random() - 0.5).slice(0, 12);

// Récupérer un manga par ID
export const getMangaById = (id: string): Manga | undefined => {
  return allManga.find((manga) => manga.id === id);
};

// Récupérer un chapitre spécifique
export const getMangaChapter = (
  mangaId: string,
  chapterNumber: string,
): ChapterData | undefined => {
  const manga = getMangaById(mangaId);
  if (!manga) return undefined;

  // Simuler des données de chapitre
  return {
    title: `Chapitre ${chapterNumber}`,
    mangaId,
    chapterNumber,
    pages: Array.from({ length: 10 }, (_, i) => MANGA_PAGES[i % MANGA_PAGES.length]),
  };
};

// Récupérer les mangas favoris
export const getBookmarkedManga = (): Manga[] => {
  return allManga.filter((_, index) => index % 3 === 0).slice(0, 8);
};

// Récupérer l'historique de lecture
export const getHistoryManga = (): ReadingHistory[] => {
  return allManga.slice(0, 5).map((manga, index) => ({
    manga,
    chapter: manga.chapters[manga.chapters.length - (index + 1)].number,
    date: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2024`,
  }));
};
