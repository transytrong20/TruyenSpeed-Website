import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatChapterDate(input: string | number | Date): string {
  const date = new Date(input);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Hôm nay";
  } else if (diffDays === 1) {
    return "Hôm qua";
  } else if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} tuần trước`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} tháng trước`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} năm trước`;
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) {
    return str;
  }

  return `${str.slice(0, length)}...`;
}

// Hàm tạo slug từ tiêu đề truyện, hỗ trợ tiếng Việt
export function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
