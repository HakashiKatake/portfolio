import type { Metadata } from "next";
import "./globals.css";
import "@/lib/pixel-retroui-setup.js";
import { ModeToggle } from "@/components/ModeToggle";

export const metadata: Metadata = {
  title: "Saurabh | Game Developer Portfolio",
  description: "Game developer portfolio — interactive 3D experience or classic retro UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ModeToggle />
      </body>
    </html>
  );
}
