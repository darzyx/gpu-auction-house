import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "GPU Exchange / Learn",
    description: "Buy and sell GPUs",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="w-full h-full flex justify-center">{children}</div>;
}
