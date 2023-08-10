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
