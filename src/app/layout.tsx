import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
    title: "GPU Auction House",
    description: "Buy and sell GPUs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="min-h-screen">
            <body className="flex min-h-screen w-full justify-center">{children}</body>
        </html>
    );
}
