import GithubSlugger from 'github-slugger';

const slugger = new GithubSlugger();

export const getHeadingsBySource = (source: string) => {
  const headingLines = source.split('\n').filter((line) => line.match(/^###?\s/));

  const headings = headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, '');
    const level = raw.slice(0, 3) === '###' ? 3 : 2;
    return {
      text,
      level,
      id: slugger.slug(text),
    };
  });

  return headings;
};
