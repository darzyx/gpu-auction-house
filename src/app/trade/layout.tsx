import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SF Compute / Trade",
    description: "Buy and sell GPUs",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}
