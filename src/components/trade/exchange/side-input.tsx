import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOrderFormData, TOrderSide } from "@/types";
import { initFormData } from "./utils";

export default function SideInput({
    formData,
    setFormData,
}: {
    formData: TOrderFormData;
    setFormData: React.Dispatch<React.SetStateAction<TOrderFormData>>;
}) {
    const { side } = formData;
    return (
        <Tabs
            value={side}
            onValueChange={(newSide) => {
                const newFormData: TOrderFormData = { ...initFormData };
                newFormData.side = newSide as TOrderSide;
                newFormData.method = formData.method;
                setFormData(newFormData);
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
