import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 p-8">
      <h1 className="text-2xl font-bold mb-2">404 – Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Back to Home
      </Link>
    </main>
  );
}
