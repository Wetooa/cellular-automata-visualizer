import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Langton's Ant",
  description: "Explore Langton's Ant, a two-dimensional Turing machine with very simple rules but complex emergent behavior.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      {children}
    </div>
  );
}
