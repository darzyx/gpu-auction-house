import Link from "next/link";

const Item = ({ id, children }: { id: string; children: React.ReactNode }) => {
    let className = "flex justify-end p-2 text-sm hover:underline underline-offset-2 ";
    if (id === "trade") {
        className += "underline";
    } else {
        className += "text-muted-foreground";
    }
    return (
        <Link className={className} href="/">
            {children}
        </Link>
    );
};

export default function Sidebar() {
    return (
        <div className="flex flex-col gap-4">
            <Item id="home">Home</Item>
            <Item id="trade">Trade</Item>
            <Item id="orders">Orders</Item>
            <Item id="metrics">Metrics</Item>
            <Item id="settings">Settings</Item>
            <Item id="logout">Logout</Item>
        </div>
    );
}
