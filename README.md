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

### Key Areas and Design Decisions

-   Aesthetics: I put a lot of thought into making this both beautiful and usable. I took some aesthetic inspiration from the SF Compute home page
-   Exchange Section: Most important section. This lets the user buy/sell market/limit orders with a planned Google Flights-style calendar for optimizing block pricing. It's a fun tetris-like problem and I think this solves it well. Select GPU quantity, then open calendar to see best prices. Select time to see final price
-   Price Section: Helps users evaluate current market rates before executing trades
-   Orders Section: Sortable table design, detailed information, limit order cancellation (UI only)
-   Portfolio Section positioned above Exchange Section for quick trading decisions
-   Confirmation modal makes sure trades are intentional
-   Grabbing Orders data from Vercel Postgres DB (just to show I can)
-   Responsive design for mobile and desktop
-   Fonts: A nice combination of Georgia, Geist, and the gorgeous Berkeley Mono

## Current Limitations

-   Just one page UI implementation, the Trade page
-   Non-functional navigation
