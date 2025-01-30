import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-8 h-75vh flex flex-col">
      <h1 className="mb-4 mt-12 tracking-wide">404</h1>
      <Link href="/">Back to home?</Link>
    </main>
  );
}
