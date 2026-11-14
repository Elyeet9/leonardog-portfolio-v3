import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Leonardo G. Portfolio",
  description: "A portfolio website for all my projects and work.",
};

export const viewport: Viewport = {
  themeColor: "#0d0a14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${josefinSans.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
