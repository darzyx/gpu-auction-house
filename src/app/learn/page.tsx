import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
    return (
        <main className="w-full h-full p-4 sm:p-6 lg:p-4">
            <div className="max-w-[860px] mx-auto space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-georgia">Learn</h1>
                    <p className="text-muted-foreground">
                        Understanding how GPU Exchange works.
                    </p>
                </div>
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="market">Market</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4 mr-6">
                        <section className="space-y-4">
                            <h2 className="text-xl font-georgia">
                                Welcome to GPU Exchange
                            </h2>
                            <p>
                                GPU Exchange is a marketplace for trading
                                compute time on a large H100 cluster with
                                InfiniBand connectivity. You can buy GPU time
                                when you need it and sell it back when you
                                don&apos;t, allowing for efficient resource
                                allocation and cost management.
                            </p>
                            <Separator />
                        </section>
                        <section className="space-y-4">
                            <h3 className="text-lg font-georgia">
                                What You Can Trade
                            </h3>
                            <p>You&apos;re trading blocks of compute time:</p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li>Select any number of GPUs</li>
                                <li>Choose your rental duration</li>
                                <li>
                                    Pick a specific date range and a start/end
                                    hour
                                </li>
                                <li>
                                    Access enterprise-grade H100s with
                                    InfiniBand
                                </li>
                            </ul>
                            <Separator />
                        </section>
                        <section className="space-y-4">
                            <h3 className="text-lg font-georgia">
                                Core Benefits
                            </h3>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li>
                                    Access to enterprise H100s without the
                                    typical large minimum GPU requirements
                                </li>
                                <li>
                                    More affordable than typical enterprise
                                    providers due to bundled orders
                                </li>
                                <li>
                                    Ability to resell unused compute time and
                                    recover costs
                                </li>
                                <li>
                                    No long-term commitments or enterprise
                                    contracts required
                                </li>
                                <li>
                                    Enterprise-grade infrastructure with
                                    InfiniBand networking
                                </li>
                            </ul>
                        </section>
                    </TabsContent>
                    <TabsContent value="market" className="space-y-4 mr-6">
                        <section className="space-y-4">
                            <h2 className="text-xl font-georgia">
                                How the Market Works
                            </h2>
                            <p>
                                We operate as a two-sided market with buy orders
                                and sell orders. Unlike traditional GPU cloud
                                providers with fixed pricing, our market allows
                                prices to be determined by supply and demand.
                            </p>
                            <Separator />
                        </section>
                        <section className="space-y-4">
                            <h3 className="text-lg font-georgia">
                                Market Dynamics
                            </h3>
                            <p>
                                The market combines multiple buyers and sellers
                                to facilitate efficient transactions. For
                                example:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li>
                                    A seller wants to sell compute time for
                                    $13/GPU/hour
                                </li>
                                <li>
                                    Buyer A is willing to pay $10/GPU/hour for
                                    part of it
                                </li>
                                <li>
                                    Buyer B can get the remainder for
                                    $3/GPU/hour
                                </li>
                            </ul>
                            <p>
                                This mechanism helps match supply with demand
                                while finding the optimal price for all parties.
                            </p>
                            <Separator />
                        </section>
                        <section className="space-y-4">
                            <h3 className="text-lg font-georgia">
                                Trading Hours
                            </h3>
                            <p>
                                The market operates 24/7, and you can place
                                orders for any future time slot. Each compute
                                block starts at the hour you specify and runs
                                for your chosen duration.
                            </p>
                        </section>
                    </TabsContent>
                    <TabsContent value="orders" className="space-y-4 mr-6">
                        <section className="space-y-4">
                            <h2 className="text-xl font-georgia">
                                Types of Orders
                            </h2>
                            <div className="space-y-2">
                                <h3 className="font-semibold">Market Orders</h3>
                                <p>
                                    Market orders execute immediately at the
                                    current market price. Use these when you
                                    need immediate access to GPUs and price is
                                    less important.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold">Limit Orders</h3>
                                <p>
                                    Limit orders let you specify your maximum
                                    buy price or minimum sell price. These
                                    orders wait until someone is willing to
                                    trade at your price.
                                </p>
                            </div>
                            <Separator />
                        </section>
                        <section className="space-y-4">
                            <h3 className="text-lg font-georgia">
                                Order Parameters
                            </h3>
                            <p>Each order includes:</p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li>Number of GPUs (any quantity available)</li>
                                <li>Duration (hours or days)</li>
                                <li>Start date and time</li>
                                <li>
                                    Price per GPU per hour (for limit orders)
                                </li>
                            </ul>
                            <Separator />
                        </section>
                        <section className="space-y-4">
                            <h3 className="text-lg font-georgia">
                                Getting the Best Price
                            </h3>
                            <p>
                                While market orders provide immediate execution,
                                you can often get better prices using limit
                                orders. This strategy works well for:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li>
                                    Catching discounted rates during off-peak
                                    hours
                                </li>
                                <li>
                                    Taking advantage when others need to sell
                                    quickly
                                </li>
                                <li>Planning ahead for future compute needs</li>
                            </ul>
                        </section>
                    </TabsContent>
                    <TabsContent value="pricing" className="space-y-4 mr-6">
                        <section className="space-y-4">
                            <h2 className="text-xl font-georgia">
                                Understanding Pricing
                            </h2>
                            <p>
                                We use market-based pricing, which means prices
                                fluctuate based on supply and demand. Each block
                                of compute time is priced independently.
                            </p>
                            <Separator />
                        </section>
                        <section className="space-y-4">
                            <h3 className="text-lg font-georgia">
                                Price Factors
                            </h3>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li>Number of GPUs</li>
                                <li>Date range and start/end time</li>
                                <li>Current market demand</li>
                                <li>Available supply</li>
                            </ul>
                            <Separator />
                        </section>
                        <section className="space-y-4">
                            <h3 className="text-lg font-georgia">
                                Price Chart Guide
                            </h3>
                            <p>Our price chart shows three simple metrics:</p>
                            <ul className="space-y-2">
                                <li>
                                    <span className="text-pink-500 font-semibold">
                                        High:
                                    </span>{" "}
                                    Maximum price paid during the period
                                </li>
                                <li>
                                    <span className="text-emerald-500 font-semibold">
                                        Average:
                                    </span>{" "}
                                    Mean price of all transactions
                                </li>
                                <li>
                                    <span className="text-sky-500 font-semibold">
                                        Low:
                                    </span>{" "}
                                    Minimum price paid during the period
                                </li>
                            </ul>
                            <p>
                                Use this data to gain an understanding of recent
                                market trends and make informed trading
                                decisions.
                            </p>
                        </section>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
