export default function Portfolio() {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-georgia leading-none">Portfolio</h2>
            <div className="grid grid-cols-[auto_auto] items-end gap-4">
                <div className="flex flex-col text-xs bg-muted rounded-md p-2">
                    <div className="text-muted-foreground leading-none uppercase">Inventory</div>
                    <h3 className="font-berkeley-mono">512 GPUs</h3>
                </div>
                <div className="flex flex-col text-xs bg-muted rounded-md p-2">
                    <div className="text-muted-foreground leading-none uppercase">Balance</div>
                    <h3 className="font-berkeley-mono">$135,864.68</h3>
                </div>
            </div>
        </div>
    );
}
