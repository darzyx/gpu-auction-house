import Link from "next/link";

export default async function Home() {
    return (
        <main className="w-full h-full max-w-7xl p-0 lg:p-8">
            Hi, this is an unfinished home page. You&apos;re looking for the{" "}
            <Link href="/trade" className="text-sky-600">
                /trade
            </Link>{" "}
            page.
        </main>
    );
}
