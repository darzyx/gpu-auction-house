import type { Metadata } from "next";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const berkeleyMono = localFont({
    src: [
        {
            path: "./fonts/BerkeleyMono-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/BerkeleyMono-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fonts/BerkeleyMono-Italic.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "./fonts/BerkeleyMono-BoldItalic.woff2",
            weight: "700",
            style: "italic",
        },
    ],
    variable: "--font-berkeley-mono",
});

export const metadata: Metadata = {
    title: "GPU Trader / Home",
    description: "Buy and sell GPUs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="md:h-screen">
            <head>
                <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
            </head>
            <body
                className={
                    geistSans.variable +
                    " " +
                    berkeleyMono.variable +
                    " " +
                    "antialiased flex w-full h-full justify-center"
                }
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
