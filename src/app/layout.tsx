import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const siteUrl = "https://balancedyogawithkenz.com";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Balanced Yoga with Kenz | Mackenzie Homan",
  description: "Certified RYT 200 yoga instructor offering online memberships, in-person classes, and yoga retreats. Movement rooted in nature, dance, and soul.",
  keywords: ["yoga instructor", "online yoga classes", "yoga membership", "RYT 200", "yoga retreats", "Kenz yoga", "Mackenzie Homan yoga"],
  authors: [{ name: "Mackenzie Homan" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Balanced Yoga with Kenz | Mackenzie Homan",
    description: "Certified RYT 200 yoga instructor offering online memberships, in-person classes, and yoga retreats. Movement rooted in nature, dance, and soul.",
    siteName: "Balanced Yoga with Kenz",
    images: [
      {
        url: "/images/about/about.png",
        width: 1200,
        height: 630,
        alt: "Balanced Yoga with Kenz - Mackenzie Homan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Balanced Yoga with Kenz | Mackenzie Homan",
    description: "Certified RYT 200 yoga instructor offering online memberships, in-person classes, and yoga retreats.",
    images: ["/images/about/about.png"],
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <ClientBody>
        {children}
      </ClientBody>
    </html>
  );
}
