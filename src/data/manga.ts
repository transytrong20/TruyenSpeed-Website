import { slugify } from "@/lib/utils";

export interface Chapter {
  id: string;
  number: number;
  title: string;
  publishedAt: string;
  views: number;
  images: string[];
}

export interface Manga {
  id: string;
  title: string;
  slug: string;
  cover: string;
  description: string;
  rating: number;
  views: number;
  status: string;
  genres: string[];
  author: string;
  artist: string;
  releaseYear: number;
  updatedAt: string;
  chapters: Chapter[];
}

export const genres = [
  "Tất cả",
  "Hành động",
  "Phiêu lưu",
  "Hài hước",
  "Drama",
  "Fantasy",
  "Kinh dị",
  "Lãng mạn",
  "Học đường",
  "Khoa học viễn tưởng",
  "Đời thường",
  "Siêu nhiên",
  "Thể thao",
  "Võ thuật",
  "Phép thuật"
];

// Tạo một số lượng truyện mẫu
export const popularMangas: Manga[] = [
  {
    id: "op",
    title: "One Piece",
    slug: "one-piece",
    cover: "https://m.media-amazon.com/images/I/81SiRG6kPCL._AC_UF894,1000_QL80_.jpg",
    description: "Monkey D. Luffy và phi hành đoàn Mũ Rơm của cậu đi đến Grand Line tìm kiếm kho báu huyền thoại One Piece và trở thành Vua Hải Tặc.",
    rating: 4.9,
    views: 25000000,
    status: "Đang tiến hành",
    genres: ["Hành động", "Phiêu lưu", "Hài hước", "Fantasy"],
    author: "Eiichiro Oda",
    artist: "Eiichiro Oda",
    releaseYear: 1999,
    updatedAt: "2023-12-10T10:00:00Z",
    chapters: [
      {
        id: "op-1",
        number: 1,
        title: "Romance Dawn",
        publishedAt: "1999-07-22T10:00:00Z",
        views: 12000000,
        images: [
          "https://same-assets.com/images/op_1_1.jpg",
          "https://same-assets.com/images/op_1_2.jpg",
          "https://same-assets.com/images/op_1_3.jpg"
        ]
      },
      {
        id: "op-2",
        number: 2,
        title: "They Call Him Straw Hat Luffy",
        publishedAt: "1999-08-04T10:00:00Z",
        views: 11500000,
        images: [
          "https://same-assets.com/images/op_2_1.jpg",
          "https://same-assets.com/images/op_2_2.jpg",
          "https://same-assets.com/images/op_2_3.jpg"
        ]
      }
    ]
  },
  {
    id: "dbs",
    title: "Dragon Ball Super",
    slug: "dragon-ball-super",
    cover: "https://m.media-amazon.com/images/I/81SH4DF-i2L._AC_UF1000,1000_QL80_.jpg",
    description: "Dragon Ball Super là sequel của Dragon Ball, tiếp tục cuộc phiêu lưu của Son Goku và bạn bè trong cuộc chiến chống lại các đối thủ từ các vũ trụ khác.",
    rating: 4.8,
    views: 20000000,
    status: "Đang tiến hành",
    genres: ["Hành động", "Phiêu lưu", "Võ thuật", "Fantasy", "Siêu nhiên"],
    author: "Akira Toriyama",
    artist: "Toyotarou",
    releaseYear: 2015,
    updatedAt: "2023-11-28T10:00:00Z",
    chapters: [
      {
        id: "dbs-1",
        number: 1,
        title: "The God of Destruction's Prophetic Dream",
        publishedAt: "2015-06-20T10:00:00Z",
        views: 10000000,
        images: [
          "https://same-assets.com/images/dbs_1_1.jpg",
          "https://same-assets.com/images/dbs_1_2.jpg",
          "https://same-assets.com/images/dbs_1_3.jpg"
        ]
      }
    ]
  },
  {
    id: "ds",
    title: "Demon Slayer",
    slug: "demon-slayer",
    cover: "https://m.media-amazon.com/images/I/81ZNkhqRvVL._AC_UF894,1000_QL80_.jpg",
    description: "Tanjiro Kamado, một thiếu niên hiền lành đã trở thành người săn quỷ sau khi gia đình cậu bị quỷ tấn công và em gái Nezuko của cậu biến thành quỷ.",
    rating: 4.8,
    views: 15000000,
    status: "Đã hoàn thành",
    genres: ["Hành động", "Kinh dị", "Siêu nhiên", "Fantasy"],
    author: "Koyoharu Gotouge",
    artist: "Koyoharu Gotouge",
    releaseYear: 2016,
    updatedAt: "2023-10-15T10:00:00Z",
    chapters: [
      {
        id: "ds-1",
        number: 1,
        title: "Cruelty",
        publishedAt: "2016-02-15T10:00:00Z",
        views: 9000000,
        images: [
          "https://same-assets.com/images/ds_1_1.jpg",
          "https://same-assets.com/images/ds_1_2.jpg",
          "https://same-assets.com/images/ds_1_3.jpg"
        ]
      }
    ]
  },
  {
    id: "aot",
    title: "Attack on Titan",
    slug: "attack-on-titan",
    cover: "https://m.media-amazon.com/images/I/619-JO+nQ8L._AC_UF894,1000_QL80_.jpg",
    description: "Trong một thế giới nơi loài người phải sống trong các thành lũy để tránh bị Titan - những người khổng lồ ăn thịt người - tấn công, Eren Yeager quyết tâm tiêu diệt toàn bộ Titan sau khi mẹ cậu bị chúng ăn thịt.",
    rating: 4.7,
    views: 18000000,
    status: "Đã hoàn thành",
    genres: ["Hành động", "Kinh dị", "Phiêu lưu", "Fantasy", "Drama"],
    author: "Hajime Isayama",
    artist: "Hajime Isayama",
    releaseYear: 2009,
    updatedAt: "2023-09-20T10:00:00Z",
    chapters: [
      {
        id: "aot-1",
        number: 1,
        title: "To You, 2000 Years From Now",
        publishedAt: "2009-09-09T10:00:00Z",
        views: 10000000,
        images: [
          "https://same-assets.com/images/aot_1_1.jpg",
          "https://same-assets.com/images/aot_1_2.jpg",
          "https://same-assets.com/images/aot_1_3.jpg"
        ]
      }
    ]
  },
  {
    id: "mha",
    title: "My Hero Academia",
    slug: "my-hero-academia",
    cover: "https://m.media-amazon.com/images/I/51HKegL3fmL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    description: "Yuji Itadori là một học sinh trung học bình thường với khả năng thể chất phi thường. Một ngày nọ, để cứu bạn bè khỏi 'Lời nguyền', cậu đã ăn ngón tay của Sukuna và bị ám bởi 'Lời nguyền'.",
    rating: 4.7,
    views: 12000000,
    status: "Đang tiến hành",
    genres: ["Hành động", "Siêu nhiên", "Học đường", "Fantasy"],
    author: "Kohei Horikoshi",
    artist: "Kohei Horikoshi",
    releaseYear: 2014,
    updatedAt: "2023-10-05T10:00:00Z",
    chapters: [
      {
        id: "mha-1",
        number: 1,
        title: "Izuku Midoriya: Origin",
        publishedAt: "2014-07-07T10:00:00Z",
        views: 8000000,
        images: [
          "https://same-assets.com/images/mha_1_1.jpg",
          "https://same-assets.com/images/mha_1_2.jpg",
          "https://same-assets.com/images/mha_1_3.jpg"
        ]
      }
    ]
  },
  {
    id: "jk",
    title: "Jujutsu Kaisen",
    slug: "jujutsu-kaisen",
    cover: "https://m.media-amazon.com/images/I/51QUJHafrVL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    description: "Yuji Itadori, một học sinh trung học bình thường với khả năng thể chất phi thường. Một ngày nọ, để cứu bạn bè khỏi 'Lời nguyền', cậu đã ăn ngón tay của Sukuna và bị ám bởi 'Lời nguyền'.",
    rating: 4.7,
    views: 12000000,
    status: "Đang tiến hành",
    genres: ["Hành động", "Siêu nhiên", "Học đường", "Kinh dị"],
    author: "Gege Akutami",
    artist: "Gege Akutami",
    releaseYear: 2018,
    updatedAt: "2023-11-12T10:00:00Z",
    chapters: [
      {
        id: "jk-1",
        number: 1,
        title: "Ryomen Sukuna",
        publishedAt: "2018-03-05T10:00:00Z",
        views: 7500000,
        images: [
          "https://same-assets.com/images/jk_1_1.jpg",
          "https://same-assets.com/images/jk_1_2.jpg",
          "https://same-assets.com/images/jk_1_3.jpg"
        ]
      }
    ]
  },
  {
    id: "cm",
    title: "Chainsaw Man",
    slug: "chainsaw-man",
    cover: "https://m.media-amazon.com/images/I/81s8xJUzWGL._AC_UF1000,1000_QL80_.jpg",
    description: "Denji là một thanh niên nghèo đang cố trả nợ bằng cách săn quỷ với cưa máy Pochita của mình. Sau khi bị phản bội và giết chết, anh hợp nhất với Pochita để trở thành Chainsaw Man.",
    rating: 4.8,
    views: 10000000,
    status: "Đang tiến hành",
    genres: ["Hành động", "Kinh dị", "Siêu nhiên", "Hài hước"],
    author: "Tatsuki Fujimoto",
    artist: "Tatsuki Fujimoto",
    releaseYear: 2018,
    updatedAt: "2023-12-01T10:00:00Z",
    chapters: [
      {
        id: "cm-1",
        number: 1,
        title: "Dog and Chainsaw",
        publishedAt: "2018-12-03T10:00:00Z",
        views: 7000000,
        images: [
          "https://same-assets.com/images/cm_1_1.jpg",
          "https://same-assets.com/images/cm_1_2.jpg",
          "https://same-assets.com/images/cm_1_3.jpg"
        ]
      }
    ]
  },
  {
    id: "sf",
    title: "Spy x Family",
    slug: "spy-x-family",
    cover: "https://m.media-amazon.com/images/I/71vMGRog+iL._AC_UF1000,1000_QL80_.jpg",
    description: "Điệp viên Twilight phải xây dựng một gia đình giả để thực hiện nhiệm vụ, không ngờ người vợ là sát thủ còn con gái là người có thể đọc tâm trí.",
    rating: 4.7,
    views: 9000000,
    status: "Đang tiến hành",
    genres: ["Hành động", "Hài hước", "Phiêu lưu", "Đời thường"],
    author: "Tatsuya Endo",
    artist: "Tatsuya Endo",
    releaseYear: 2019,
    updatedAt: "2023-11-20T10:00:00Z",
    chapters: [
      {
        id: "sf-1",
        number: 1,
        title: "Operation Strix",
        publishedAt: "2019-03-25T10:00:00Z",
        views: 6500000,
        images: [
          "https://same-assets.com/images/sf_1_1.jpg",
          "https://same-assets.com/images/sf_1_2.jpg",
          "https://same-assets.com/images/sf_1_3.jpg"
        ]
      }
    ]
  }
];

// Tạo bản sao của popularMangas để có thêm dữ liệu
export const latestMangas = [...popularMangas].sort(
  (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
);

// Lấy truyện bởi ID
export function getMangaById(id: string): Manga | undefined {
  return popularMangas.find((manga) => manga.id === id);
}

// Lấy truyện bởi slug
export function getMangaBySlug(slug: string): Manga | undefined {
  return popularMangas.find((manga) => manga.slug === slug);
}

// Lấy tất cả truyện
export function getAllManga(): Manga[] {
  return popularMangas;
}

// Lấy chương truyện bằng ID
export function getChapterById(mangaId: string, chapterId: string): Chapter | undefined {
  const manga = getMangaById(mangaId);
  return manga?.chapters.find((chapter) => chapter.id === chapterId);
}
