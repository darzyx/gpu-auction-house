import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TradingForm() {
    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Trade H100s</CardTitle>
                <CardDescription>Buy or sell H100 GPU compute time</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="buy">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="buy">Buy</TabsTrigger>
                        <TabsTrigger value="sell">Sell</TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy" className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity (GPUs)</Label>
                            <Input id="quantity" type="number" placeholder="8" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Max price ($/GPU/hour)</Label>
                            <Input id="price" type="number" step="0.01" placeholder="1.20" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration (hours)</Label>
                            <Input id="duration" type="number" placeholder="24" />
                        </div>
                        <Button className="w-full">Place Buy Order</Button>
                    </TabsContent>
                    <TabsContent value="sell" className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="sell-quantity">Quantity (GPUs)</Label>
                            <Input id="sell-quantity" type="number" placeholder="8" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sell-price">Min price ($/GPU/hour)</Label>
                            <Input id="sell-price" type="number" step="0.01" placeholder="0.80" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sell-duration">Duration (hours)</Label>
                            <Input id="sell-duration" type="number" placeholder="24" />
                        </div>
                        <Button className="w-full">Place Sell Order</Button>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
                Orders will be filled when matching offers are available
            </CardFooter>
        </Card>
    );
}
