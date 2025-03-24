export interface Chapter {
  number: string;
  title: string;
  releaseDate: string;
  read: boolean;
}

export interface Manga {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  status: string;
  publicationYear: string;
  origin: string;
  rating: number;
  genres: string[];
  lastUpdate: string;
  chapters: Chapter[];
  relatedManga: string[];
}

export interface ChapterData {
  title: string;
  mangaId: string;
  chapterNumber: string;
  pages: string[];
}

export interface ReadingHistory {
  manga: Manga;
  chapter: string;
  date: string;
}
