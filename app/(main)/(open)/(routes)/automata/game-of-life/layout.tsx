import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game of Life",
  description: "Explore Conway's Game of Life, a cellular automaton devised by mathematician John Conway. Witness the evolution of cells based on simple rules, creating complex and fascinating patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
