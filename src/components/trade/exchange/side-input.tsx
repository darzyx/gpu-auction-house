import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOrderFormData, TOrderSide } from "@/types";

export default function SideInput({
    formData: { side },
    setFormData,
}: {
    formData: TOrderFormData;
    setFormData: React.Dispatch<React.SetStateAction<TOrderFormData>>;
}) {
    return (
        <Tabs
            value={side}
            onValueChange={(newSide) => {
                setFormData((prev) => ({ ...prev, side: newSide as TOrderSide }));
            }}
            className="space-y-4"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">
                    <span className={side === "buy" ? "text-green-600" : ""}>Buy</span>
                </TabsTrigger>
                <TabsTrigger value="sell">
                    <span className={side === "sell" ? "text-red-600" : ""}>Sell</span>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
