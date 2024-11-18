# GPU Auction House

Live at [gpu-auction-house.vercel.app](https://gpu-auction-house.vercel.app)!

A single-page frontend demo of a GPU compute trading platform. Focused on desktop UI/UX with mock data. I could've implemented more of the backend and made mobile UI/UX optimizations, but kept scope small to not go overboard.

## Stack

My favorite: Next.js, TypeScript, Tailwind, shadcn/ui, Postgres, and Vercel

## Local Dev

-   `git clone https://github.com/darzyx/gpu-auction-house.git`
-   `pnpm install`
-   `pnpm run dev`

### Key Design Decisions

-   Exchange: Buy/sell market/limit orders with planned Google Flights-style calendar for optimal "tetris" pricing. Select GPU count, then open calendar to see available prices. Didn't get to finish the calendar pricing feature, but it's a promising design decision
-   Price History: Helps users evaluate current market rates before executing trades
-   Order History: Sortable table design, detailed information, limit order cancellation
-   Sidebar (instead of top nav) preserves precious vertical space for other sections
-   Portfolio positioned above Exchange for quick trading decisions
-   Confirmation modal makes sure trades are intentional
-   Grabbing Orders data from Vercel Postgres DB (just to show I can)

## Current Limitations

-   Static data only. No backend or DB. Yet? :)
-   Desktop-focused UI
-   Just one page UI implementation, the Trade page
-   Non-functional navigation
