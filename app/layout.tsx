import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif-luxury",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KUMAR'S Cakes & Bakery | Handcrafted Celebration Cakes in Hathras",
  description:
    "Hathras's premier artisanal bakery crafting 100% eggless celebration cakes, 3D customized showstoppers, signature Belgian truffles, and gourmet desserts.",
  keywords: [
    "Kumar Cakes",
    "Bakery in Hathras",
    "Hathras cake shop",
    "Custom cakes Hathras",
    "Eggless cakes Hathras",
    "Birthday cakes Hathras",
    "Wedding cakes Hathras",
  ],
  openGraph: {
    title: "KUMAR'S Cakes & Bakery | Hathras Premier Bakery",
    description:
      "Handcrafted celebration cakes, bespoke 3D designs, and gourmet desserts in Hathras, Uttar Pradesh.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0908",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#0c0908] text-[#f5f5f0] font-sans selection:bg-[#d4a359] selection:text-[#0c0908] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
