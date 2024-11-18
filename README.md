# GPU Auction House

Live at [gpu-auction-house.vercel.app](https://gpu-auction-house.vercel.app).

This is just the frontend for one page with some mock data. I focused on the desktop UI/UX. There's so much more I am capable of doing (full Next.js backend, Vercel Postgres + Drizzle ORM, making the UI beautiful on mobile, etc), but I don't want to go overboard.

## Overview

-   Place buy/sell market/limit GPU orders (inspired by financial trading platforms)
-   GPUs x days price data in calendar to solve "tetris" pricing problem (inspired by Google Flights)
-   View historical pricing data
-   Monitor order status and history

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Vercel.

## Local Dev

Clone, run `pnpm install`, then `pnpm run dev`.

## Project Structure

The application consists of one page with four major sections:

### Portfolio Section

-   Displays current GPU inventory
-   Shows account balance (from sales and/or deposits)

### Exchange Section

-   Buy/sell market/limit GPU orders
-   Select GPU quantity
-   Set max/min pricing for limit orders
-   Date range calendar for compute time and optimal pricing

### Prices Section

-   Visual price chart showing trend over last 7 days
-   Multiple price tiers displayed simultaneously
-   Highlight current average price and GPU availability
-   Total GPU availability indicator

### Orders Section

-   List recent orders by the user with detailed information
-   Order status tracking (Pending, Filled, Canceled)
-   Cancel pending orders

## Note

This is a demonstration project with limited functionality:

-   Navigation links are non-functional
-   Only the Trade page UI is implemented
-   Data is completely static/simulated
