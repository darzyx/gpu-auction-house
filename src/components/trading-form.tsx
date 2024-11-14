"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TradingForm() {
    const [buyOrderType, setBuyOrderType] = useState("market");
    const [sellOrderType, setSellOrderType] = useState("market");

    return (
        <div className="w-[400px]">
            <Tabs defaultValue="buy">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                    <div>
                        <div>
                            <div>Buy Order</div>
                            <div>Buy H100 GPU compute time</div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-center items-center">
                                <div className="w-full grid grid-cols-2 gap-4">
                                    <Button
                                        variant={buyOrderType === "market" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setBuyOrderType("market")}
                                    >
                                        Market
                                    </Button>
                                    <Button
                                        variant={buyOrderType === "limit" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setBuyOrderType("limit")}
                                    >
                                        Limit
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity (GPUs)</Label>
                                <Input id="quantity" type="number" placeholder="8" />
                            </div>
                            {buyOrderType === "limit" && (
                                <div className="space-y-2">
                                    <Label htmlFor="price">Max price ($/GPU/hour)</Label>
                                    <Input id="price" type="number" step="0.01" placeholder="1.20" />
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration (hours)</Label>
                                <Input id="duration" type="number" placeholder="24" />
                            </div>
                            <Button className="w-full bg-green-700">
                                Place {buyOrderType === "market" ? "Market" : "Limit"} Buy Order
                            </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Orders will be filled when matching offers are available
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="sell">
                    <div>
                        <div>
                            <div>Sell Order</div>
                            <div>Sell H100 GPU compute time</div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-center items-center">
                                <div className="w-full grid grid-cols-2 gap-4">
                                    <Button
                                        variant={sellOrderType === "market" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSellOrderType("market")}
                                    >
                                        Market
                                    </Button>
                                    <Button
                                        variant={sellOrderType === "limit" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSellOrderType("limit")}
                                    >
                                        Limit
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sell-quantity">Quantity (GPUs)</Label>
                                <Input id="sell-quantity" type="number" placeholder="8" />
                            </div>
                            {sellOrderType === "limit" && (
                                <div className="space-y-2">
                                    <Label htmlFor="sell-price">Min price ($/GPU/hour)</Label>
                                    <Input id="sell-price" type="number" step="0.01" placeholder="0.80" />
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="sell-duration">Duration (hours)</Label>
                                <Input id="sell-duration" type="number" placeholder="24" />
                            </div>
                            <Button className="w-full bg-red-700">
                                Place {sellOrderType === "market" ? "Market" : "Limit"} Sell Order
                            </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Orders will be filled when matching offers are available
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
