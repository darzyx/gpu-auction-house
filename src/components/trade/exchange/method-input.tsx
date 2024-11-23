import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOrderFormData, TOrderMethod } from "@/types";

export default function MethodInput({
    formData: { method },
    setFormData,
}: {
    formData: TOrderFormData;
    setFormData: React.Dispatch<React.SetStateAction<TOrderFormData>>;
}) {
    return (
        <Tabs
            value={method}
            onValueChange={(newMethod) => {
                setFormData((prev) => ({ ...prev, method: newMethod as TOrderMethod }));
            }}
        >
            <TabsList className="inline-flex h-auto items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    value="market"
                >
                    Market
                </TabsTrigger>
                <TabsTrigger
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    value="limit"
                >
                    Limit
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
