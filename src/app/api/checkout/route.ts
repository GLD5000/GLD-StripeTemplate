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
