import Link from "next/link";

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <Link
          href="/projects"
          className="font-mono text-xs text-fg-dim hover:text-accent transition-colors"
        >
          &larr; Back to Projects
        </Link>
        {children}
      </div>
    </main>
  );
}
