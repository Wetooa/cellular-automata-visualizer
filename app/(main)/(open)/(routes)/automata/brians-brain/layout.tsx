


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brian's Brain",
  description: "Dive into Brian's Brain, a cellular automaton where cells can be in one of three states: on, off, or dying. Observe the intricate patterns that emerge from the simple rules governing the birth and death of cells.",
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
