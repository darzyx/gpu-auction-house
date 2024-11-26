"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavigationItem = {
    id: string;
    label: string;
    href: string;
};

type NavigationLinkProps = {
    href: string;
    isActive: boolean;
    children: React.ReactNode;
};

const navigationItems: NavigationItem[] = [
    { id: "trade", label: "Trade", href: "/trade" },
    { id: "orders", label: "Orders", href: "/orders" },
    { id: "metrics", label: "Metrics", href: "/metrics" },
    { id: "learn", label: "Learn", href: "/learn" },
];

const Logo = () => (
    <Image src="/icon.svg" width={20} height={20} alt="GPU Exchange Logo" />
);

const NavigationLink = ({ href, isActive, children }: NavigationLinkProps) => (
    <Link
        className={cn(
            "flex justify-end items-center text-sm hover:underline underline-offset-2 leading-none lg:py-4",
            isActive ? "underline" : "text-muted-foreground"
        )}
        href={href}
    >
        {children}
    </Link>
);

const MobileNavigation = ({ pathname }: { pathname: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-between items-center sm:hidden">
            <div>
                <Logo />
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-fit h-fit hover:bg-transparent"
                    >
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[200px]">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col mt-4">
                        <div className="pb-4">
                            <Logo />
                        </div>
                        {navigationItems.map((item) => (
                            <SheetClose asChild key={item.id}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "py-4 text-sm",
                                        pathname === item.href
                                            ? "font-medium"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </SheetClose>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

const DesktopNavigation = ({ pathname }: { pathname: string }) => (
    <nav className="hidden sm:flex sm:justify-between lg:flex-col lg:justify-start gap-4 lg:gap-2">
        <div className="flex justify-end lg:pb-4">
            <Logo />
        </div>
        <div className="hidden sm:flex lg:flex-col gap-4 lg:gap-2">
            {navigationItems.map((item) => (
                <NavigationLink
                    key={item.id}
                    href={item.href}
                    isActive={pathname === item.href}
                >
                    {item.label}
                </NavigationLink>
            ))}
        </div>
    </nav>
);

export default function Navigation() {
    const pathname = usePathname();

    return (
        <>
            <MobileNavigation pathname={pathname} />
            <DesktopNavigation pathname={pathname} />
        </>
    );
}
