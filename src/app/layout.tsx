import type { Metadata } from "next";
import localFont from "next/font/local";

import Navigation from "@/components/navigation";
import { Separator } from "@/components/ui/separator";
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
    title: "GPU Exchange / Home",
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
                <link
                    rel="icon"
                    href="/icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
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
                <div className="w-full max-w-7xl h-full p-0 lg:p-8 grid grid-rows-[auto_auto_1fr] lg:grid-rows-1 lg:grid-cols-[auto_auto_1fr]">
                    <div className="lg:h-full p-4">
                        <Navigation />
                    </div>
                    <Separator
                        orientation="vertical"
                        className="hidden lg:block"
                    />
                    <Separator orientation="horizontal" className="lg:hidden" />
                    <div>{children}</div>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
