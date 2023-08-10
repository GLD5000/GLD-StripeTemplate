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
