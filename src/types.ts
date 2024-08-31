interface Prompt {
  tags: string[];
  title: string;
  slug: string;
  libs: string[];
  content: string;
  author: Author;
}

interface Author {
  name: string;
  url: string;
  avatar: string;
}

interface Category {
  slug: string;
  prompts: Prompt[];
}

interface Video {
  title: string;
  description: string;
  url: string;
  author: VideoAuthor;
}

interface VideoAuthor {
  name: string;
  image: string;
}

export type { Prompt, Author, Category, Video, VideoAuthor };
