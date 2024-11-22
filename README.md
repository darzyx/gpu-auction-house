# GPU Auction House

Live at [darzyx-gpu-auction-house.vercel.app/trade](https://darzyx-gpu-auction-house.vercel.app/trade)!

A simple auction house for a GPU cluster that allows customers to book reservations of 1 to N GPUs, for a minimum of 1 day. It's just one polished page, the Trade page.

Focused on UI/UX, but I threw in a very tiny Next backend and Postgres DB to show I can. Most of the data is created on the fly using some clever functions as to not have a large DB just for this demo. I really wanted to do even more but kept scope small to not go overboard!

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui, Postgres, and Vercel

## Local Dev

-   Get ENV secrets from me
-   `git clone https://github.com/darzyx/gpu-auction-house.git`
-   `pnpm install`
-   `pnpm run dev`

### Key Design Decisions

-   Aesthetics - Made simple yet beautiful, and highly usable
-   Layout - similar to a stock trading platform, but with important original differences that make it work great specifically for trading GPU time on clusters
-   Tasteful responsive design - try it on desktop and mobile!
-   Fonts - a nice combination of Georgia, Geist, and the gorgeous Berkeley Mono

### Sections

-   Exchange Section - most important section. Lets the user buy/sell market/limit orders with a Google Flights-style calendar for optimized block pricing. This project presents a fun tetris-like problem, and I think this UI solves it well. To use: select GPU quantity, then open the calendar and select dates to see best prices. Select start hour to see final price. A confirmation modal is shown before submitting orders. Submitting an order updates the DB and the Orders section UI.
-   Price Section - helps users evaluate current market rates before executing trades
-   Orders Section - data is grabbed from the DB, and the table updates when you submit a new order. Sortable table design with detailed information. Cancel pending (limit) orders by clicking on the cancel button
-   Portfolio Section - positioned right above Exchange for aiding trading decisions

## Current Limitations

-   Just one page UI implementation, the Trade page
-   Data on the Prices line chart is just hardcoded placeholder data and doesn't mean anything
-   Like Google Flights, the calendar shows best prices for (market) orders when you select a start date, and it shows best prices before the start date when you select an end date, but I think it should also show best prices before the user selects anything. Google Flights does this, where the price on each day would be the best price from all the possible date ranges with that date as the start date.
