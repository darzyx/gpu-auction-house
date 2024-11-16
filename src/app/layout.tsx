import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "SF Compute / Trade",
    description: "Buy and sell GPUs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="min-h-screen">
            <body className={geistSans.variable + " antialiased flex min-h-screen w-full justify-center"}>
                {children}
            </body>
        </html>
    );
}
