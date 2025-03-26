// types/manga.ts

export interface Chapter {
  chapterName: string;
}

export interface Tag {
  tagName: string;
}

export interface Manga {
  comicName: string;
  otherName: string;
  image: string;
  creator: string;
  status: string;
  introduction: string;
  views: number;
  releaseDate: string;
  listChapters: Chapter[];
  listTags: Tag[];
}
