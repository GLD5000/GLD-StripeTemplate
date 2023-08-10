# This is a [Next.js](https://nextjs.org/) project with [Stripe Payment GateWay](https://support.stripe.com/topics/getting-started):

1. [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) for type safety
2. [Tailwind CSS](https://tailwindcss.com/docs/installation) for styling
3. [Jest](https://jestjs.io/docs/getting-started) for testing
4. [ESLint](https://eslint.org/docs/latest/use/getting-started) for linting
5. [Prettier](https://prettier.io/docs/en/install.html) for formatting
6. [Husky](https://typicode.github.io/husky/getting-started.html) & [Lint-Staged](https://github.com/okonet/lint-staged) for pre-commit testing and linting

## If you like this, checkout my other projects on [GitHub](https://github.com/GLD5000) or via my [Portfolio](https://gld-portfolio.vercel.app/)

## How I made this (also read on [my blog](https://gld-dev-blog.vercel.app/) or [dev.to](https://dev.to/gld5000)):

# Setup Stripe with Next 13.4

To set up or better understand the project you can read on!

## Installation

1. Start with a clean Next.js install or my [GLD-NextTemplate](https://github.com/GLD5000/GLD-NextTemplate)
2. If starting with the [GLD-NextTemplate](https://github.com/GLD5000/GLD-NextTemplate), run `npm i` to set up dependencies etc.
3. Run `npm i stripe axios` to install stripe and axios (You can also just use the native Fetch API if you like).

## Setup Account on Stripe

1. Go to [Stripe](https://stripe.com/) and setup an account with your email address (You do not need a credit card or anything as you can just stay in 'test mode').
2. Copy your secret key from the 'Developers' Tab and put it into a '.env' file in your repos root directory.
3. Add some products using the 'Products' tab (we will use the API to fetch these for our page).

## Create API route handlers

You will need two handlers:

1. To fetch products from your Stripe account
2. To enable checkout for a desired product

### api/getproducts/route.ts:

```
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

/* eslint-disable import/prefer-default-export */

export async function GET() {
    if (process.env.STRIPE_SECRET_KEY) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2022-11-15',
        });
        const products = await stripe.products.list({
            limit: 4,
            expand: ['data.default_price'],
        });
        // console.log('products:', products)
        return NextResponse.json(products.data);
    }
}

```

### api/checkout/route.ts:

```
import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';

/* eslint-disable import/prefer-default-export */

export async function POST(request: NextRequest) {
    if (process.env.STRIPE_SECRET_KEY) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2022-11-15',
        });
        const data = await request.json();
        const { priceId } = data;
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.HOST_URL}`,
            cancel_url: `${process.env.HOST_URL}`,
        });

        return NextResponse.json(session.url);
    }
}

```

## Integrate getproducts (AKA fetch) API route

### The fetch is be enabled by a useEffect on page / site load:

```
    useEffect(() => {
        fetchProducts();
    }, []);
```

### The fetchProducts function gets an array of products and sets the component state to the result:

```
    async function fetchProducts() {
        const { data } = await axios.get('/api/getproducts');
        setProducts(data);
    }

```

### We map over the returned array, sending each product to a product card:

```
    function getProductCards(productData: Product[]) {
        return productData.map((data) => (
            <ProductCard key={data.id} data={data} />
        ));
    }
```

### Then we return the product card array to the page:

```
   return (
        <div className="grid sm:grid-cols-2 gap-16">
            {getProductCards(products)}
        </div>
    );
```

### I put these parts together in a 'ProductCards.tsx':

```
'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/stripe/types';
import ProductCard from './ProductCard';

export default function ProductCards() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="grid sm:grid-cols-2 gap-16">
            {getProductCards(products)}
        </div>
    );

    async function fetchProducts() {
        const { data } = await axios.get('/api/getproducts');
        setProducts(data);
    }

    function getProductCards(productData: Product[]) {
        return productData.map((data) => (
            <ProductCard key={data.id} data={data} />
        ));
    }
}


```

## Integrate the checkout API Route

### In the product card, there is a button for buying a product:

```
  <Button onClick={handleClickBuy}>Buy Now</Button>

```

### This button has a click handler which makes the API request and gives control of the window location to the Stripe checkout returned:

```
    async function handleClickBuy(e: SyntheticEvent) {
        e.preventDefault();
        const { data: checkout } = await axios.post(
            '/api/checkout',
            {
                priceId: id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        window.location.assign(checkout);
    }

```

### I put these in a ProductCard.tsx component:

```
import Image from 'next/image';
import axios from 'axios';
import { SyntheticEvent } from 'react';
import { Price, Product } from '@/lib/stripe/types';
import { Button } from '../ui/button';

export default function ProductCard({ data }: { data: Product }) {
    const {
        name,
        description,
        images: [image],
        default_price: price,
    } = data;
    const { currency, unit_amount: amount, id } = price as Price;
    if (!name || !description || !image) return null;
    return (
        <div className="grid gap-4 border rounded shadow p-6 lg:max-w-[35rem]">
            <Image
                priority
                src={image}
                alt={description}
                width={806}
                height={671}
            />
            <h2 className="text-6xl font-bold mx-auto w-fit">{name}</h2>
            <p className="mx-auto">{description}</p>
            <b className="mx-auto">{`${
                amount ? amount * 0.01 : 'N/A'
            } ${currency}`}</b>
            <Button onClick={handleClickBuy}>Buy Now</Button>
        </div>
    );

    async function handleClickBuy(e: SyntheticEvent) {
        e.preventDefault();
        const { data: checkout } = await axios.post(
            '/api/checkout',
            {
                priceId: id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        window.location.assign(checkout);
    }
}

```

## On Types

### I also decided to destructure the type definitions for 'Product' and 'Price' and export them from my own module so I did not need to keep importing the stripe module and using dot notation to access them (lib/stripe/types.ts):

```
import Stripe from 'stripe';

export type Product = Stripe.Product;
export type Price = Stripe.Price;
```
