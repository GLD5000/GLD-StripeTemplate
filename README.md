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

To set up your own project you can follow these steps.

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

### The fetch will be enabled by a useEffect on page load:

```
    useEffect(() => {
        fetchProducts();
    }, []);
```

### The fetchProducts function will get an array of products and set the local state to the result:

```
    async function fetchProducts() {
        const { data } = await axios.get('/api/getproducts');
        setProducts(data);
    }

```

### Map over the returned array, sending each product to a product card:

```
    function getProductCards(productData: Product[]) {
        return productData.map((data) => (
            <ProductCard key={data.id} data={data} />
        ));
    }
```

### Then return the product card array to the page:

```
   return (
        <div className="grid sm:grid-cols-2 gap-16">
            {getProductCards(products)}
        </div>
    );
```

### I chose to put these parts together in a 'ProductCards.tsx':

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
