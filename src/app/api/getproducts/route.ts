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
