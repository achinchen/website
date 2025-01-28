import GithubSlugger from 'github-slugger';

export const getHeadingsBySource = (source: string) => {
  const headingLines = source.split('\n').filter((line) => line.match(/^###?\s/));

  const headings = headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, '');
    const level = raw.slice(0, 3) === '###' ? 3 : 2;
    const slugger = new GithubSlugger();

    return {
      text,
      level,
      id: slugger.slug(text),
    };
  });

  return headings;
};
