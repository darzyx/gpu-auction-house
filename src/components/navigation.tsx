"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
    { id: "home", label: "Home", href: "/home" },
    { id: "trade", label: "Trade", href: "/trade" },
    { id: "orders", label: "Orders", href: "/orders" },
    { id: "metrics", label: "Metrics", href: "/metrics" },
    { id: "learn", label: "Learn", href: "/learn" },
    { id: "settings", label: "Settings", href: "/settings" },
    { id: "logout", label: "Logout", href: "/login" },
];

const Item = ({
    href,
    isActive,
    children,
}: {
    href: string;
    isActive: boolean;
    children: React.ReactNode;
}) => {
    const className = `flex justify-end items-center text-sm hover:underline underline-offset-2 leading-none lg:py-4 ${
        isActive ? "underline" : "text-muted-foreground"
    }`;

    return (
        <Link className={className} href={href}>
            {children}
        </Link>
    );
};

export default function Navigation() {
    const pathname = usePathname();

    return (
        <>
            <div className="flex justify-between items-center md:hidden">
                <div>
                    <Image
                        src="/icon.svg"
                        width={25}
                        height={25}
                        alt="GPU Exchange Logo"
                    />
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[200px]">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col mt-4">
                            <div className="pb-4">
                                <Image
                                    src="/icon.svg"
                                    width={25}
                                    height={25}
                                    alt="GPU Exchange Logo"
                                />
                            </div>
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`py-2 text-sm ${
                                        pathname === item.href
                                            ? "font-medium"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <nav className="hidden md:flex lg:flex-col gap-4 lg:gap-2">
                <div className="flex justify-end lg:pb-4">
                    <Image
                        src="/icon.svg"
                        width={25}
                        height={25}
                        alt="GPU Exchange Logo"
                    />
                </div>
                {navigationItems.map((item) => (
                    <Item
                        key={item.id}
                        href={item.href}
                        isActive={pathname === item.href}
                    >
                        {item.label}
                    </Item>
                ))}
            </nav>
        </>
    );
}
