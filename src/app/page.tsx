import ProductCards from '@/components/product/ProductCards';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-10">
            <h1 className="font-bold text-6xl">
                Stripe Integration for Next.js 13.4
            </h1>
            <ProductCards />
        </main>
    );
}
