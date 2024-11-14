import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TradingForm() {
    return (
        <div className="w-[400px]">
            <Tabs defaultValue="buy">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                        value="buy"
                        className="data-[state=active]:text-green-600 data-[state=active]:bg-green-50"
                    >
                        Buy
                    </TabsTrigger>
                    <TabsTrigger
                        value="sell"
                        className="data-[state=active]:text-red-600 data-[state=active]:bg-red-50"
                    >
                        Sell
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                    <Card>
                        <CardHeader>
                            <CardTitle>Buy Order</CardTitle>
                            <CardDescription>Buy H100 GPU compute time</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-center items-center">
                                <div className="w-full grid grid-cols-2 gap-4">
                                    <Button variant="default" className="rounded-full" size="sm">
                                        Market
                                    </Button>
                                    <Button variant="outline" className="rounded-full" size="sm">
                                        Limit
                                    </Button>
                                </div>
                            </div>
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
                            <Button className="w-full">Place Market Buy Order</Button>
                        </CardContent>
                        <CardFooter className="text-sm text-muted-foreground">
                            Orders will be filled when matching offers are available
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="sell">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sell Order</CardTitle>
                            <CardDescription>Sell H100 GPU compute time</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-center items-center">
                                <div className="w-full grid grid-cols-2 gap-4">
                                    <Button variant="default" className="rounded-full" size="sm">
                                        Market
                                    </Button>
                                    <Button variant="outline" className="rounded-full" size="sm">
                                        Limit
                                    </Button>
                                </div>
                            </div>
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
                            <Button className="w-full">Place Market Sell Order</Button>
                        </CardContent>
                        <CardFooter className="text-sm text-muted-foreground">
                            Orders will be filled when matching offers are available
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
