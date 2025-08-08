export interface MDX {
  raw: string;
  code: string;
}

export interface DocumentBase {
  _id: string;
  _raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: "mdx";
    flattenedPath: string;
  };
  type: string;
  body: MDX;
}

export interface Series extends DocumentBase {
  type: "Series";
  name: string;
  slug: string;
  description: string;
  status: "ongoing" | "completed";
  lang: string;
  path: string;
}

export interface Post extends DocumentBase {
  type: "Post";
  title: string;
  description: string;
  slug: string;
  date: string;
  series?: string;
  seriesSlug?: string;
  seriesOrder?: number;
  tags?: string[];
  lang: string;
  path: string;
  reading: number;
}
