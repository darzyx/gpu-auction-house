import Link from "next/link";

export default function Page() {
    return (
        <main className="w-full h-full max-w-8xl p-8 flex flex-col justify-center items-center gap-2">
            <h1 className="text-xl font-georgia leading-none">404 Not Found</h1>
            <p>
                You&apos;re looking for the{" "}
                <Link href="/trade" className="text-sky-600">
                    /trade
                </Link>{" "}
                page.
            </p>
        </main>
    );
}
