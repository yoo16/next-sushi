'use client';

import { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '@/lib/api';
import CategoryTabs from '@/components/CategoryTabs';
import OrderList from '@/components/OrderList';
import Modal from '@/components/OrderForm';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { Order } from '@/types/Order';
import TitleLink from '@/components/TitleLink';
import CheckoutForm from '@/components/CheckoutForm';
import ProductList from '@/components/ProductList';

export default function HomePage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [product, setProduct] = useState<Product>();
    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(() => {
        (async () => {
            const { categories } = await fetchCategories();
            const { products } = await fetchProducts();
            setCategories(categories);
            setProducts(products);
            setCurrentCategory(categories[0] || null);
        })();
    }, []);

    console.log('Categories:', categories);
    console.log('Products:', products);
    console.log('Current Category:', currentCategory);
    const filtered = products.filter(p => p.category_id === currentCategory?.id);

    function onCheckout() {
        if (orders.length === 0) {
            return;
        }
        setShowCheckout(true);
    }

    return (
        <div>
            <TitleLink />
            <CategoryTabs
                categories={categories}
                current={currentCategory}
                onSelect={setCurrentCategory}
            />
            <div className="flex flex-col md:flex-row gap-6">
                <ProductList products={filtered} onOrder={setProduct}/>
                <OrderList orders={orders} onCheckout={onCheckout} />
            </div>
            {product && (
                <Modal
                    product={product}
                    onClose={() => setProduct(undefined)}
                    onConfirm={(order) => {
                        setOrders(orders => [...orders, order]);
                        setProduct(undefined);
                    }}
                />
            )}
            {showCheckout && (
                <CheckoutForm
                    orders={orders}
                    onClose={() => setShowCheckout(false)}
                    onConfirm={() => {
                        setOrders([]);
                        setShowCheckout(false);
                    }}
                />
            )}

        </div>
    );
}