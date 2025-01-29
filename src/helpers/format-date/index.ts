export default function formatDate(date: string, locale = 'en') {
  const now = new Date(date).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  });

  return now;
}
