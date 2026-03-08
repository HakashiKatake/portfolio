import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist } from "next/font/google";
import "./globals.css";
// import "@/lib/pixel-retroui-setup.js"; // Removing retro UI setup
import { ModeToggle } from "@/components/ModeToggle";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Saurabh | Developer Portfolio",
  description: "Developer portfolio — brutalist design & 3D experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(playfair.variable, inter.variable, "font-sans", geist.variable)}>
      <body className="antialiased font-inter">
        {children}
        <ModeToggle />
      </body>
    </html>
  );
}
