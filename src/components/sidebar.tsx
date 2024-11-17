import Link from "next/link";
import Image from "next/image";

const navigationItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "trade", label: "Trade", href: "/" },
    { id: "orders", label: "Orders", href: "/" },
    { id: "metrics", label: "Metrics", href: "/" },
    { id: "settings", label: "Settings", href: "/" },
    { id: "logout", label: "Logout", href: "/" },
];

const Item = ({ id, href, children }: { id: string; href: string; children: React.ReactNode }) => {
    let className = "flex justify-end p-2 text-sm hover:underline underline-offset-2 ";
    if (id === "trade") {
        className += "underline";
    } else {
        className += "text-muted-foreground";
    }
    return (
        <Link className={className} href={href}>
            {children}
        </Link>
    );
};

export default function Sidebar() {
    return (
        <nav className="flex flex-col gap-4">
            <div className="flex justify-end p-2">
                <Image src="/icon.svg" width={25} height={25} alt="SF Compute Logo" />
            </div>
            {navigationItems.map((item) => (
                <Item key={item.id} id={item.id} href={item.href}>
                    {item.label}
                </Item>
            ))}
        </nav>
    );
}