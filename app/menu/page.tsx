'use client';

import { useEffect, useState } from 'react';
import {
    fetchCategories,
    fetchProducts,
    findSeat,
    findVisit,
    addOrder,
    fetchOrders,
    billed,
} from '@/lib/api';

import { useRouter, useSearchParams } from 'next/navigation';

import CategoryTabs from '@/components/CategoryTabs';
import OrderList from '@/components/OrderList';
import Modal from '@/components/OrderForm';
import TitleLink from '@/components/TitleLink';
import CheckoutForm from '@/components/CheckoutForm';
import ProductList from '@/components/ProductList';
import Setting from '@/components/Setting';

import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { Order } from '@/types/Order';
import { Seat } from '@/types/Seat';
import { Visit } from '@/types/Visit';
import Loading from '@/components/Loading';

export default function HomePage() {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [product, setProduct] = useState<Product>();
    const [showCheckout, setShowCheckout] = useState(false);
    const [showSetting, setShowSetting] = useState(false);

    const [isReady, setIsReady] = useState(false);
    const [seat, setSeat] = useState<Seat>();
    const [visitId, setVisitId] = useState<number>(0);
    const [visit, setVisit] = useState<Visit>();

    // 初期データの取得
    useEffect(() => {
        (async () => {
            // 訪問IDをローカルストレージから取得
            const visitId = Number(localStorage.getItem("visit_id"));
            if (!visitId || isNaN(visitId)) {
                // 訪問IDがない場合はトップページにリダイレクト
                router.push('/');
                return;
            }
            setVisitId(visitId);

            // 訪問情報を取得
            const { visit } = await findVisit(visitId);
            setVisit(visit);

            // 座席情報を取得
            const { seat } = await findSeat(visit.seat_id);
            setSeat(seat);

            // カテゴリを取得
            const { categories } = await fetchCategories();

            // 商品を取得
            const { products } = await fetchProducts();

            // 注文履歴を取得
            const { orders } = await fetchOrders(visitId);
            setOrders(orders);

            setCategories(categories);
            setProducts(products);
            setCurrentCategory(categories[0] || null);

            setIsReady(true);
        })();
    }, []);

    const filtered = products.filter(p => p.category_id === currentCategory?.id);

    // オーダーの確定
    const handleConfirmOrder = async (order: Order) => {
        // APIに注文を追加
        const result = await addOrder(visitId, order.product_id, order.quantity);

        if (result.error) {
            console.log('注文の追加に失敗:', result.error);
            return;
        }
        setOrders(prev => [...prev, order]);
        setProduct(undefined);
    };

    // 会計画面表示
    function onCheckout() {
        if (orders.length === 0) {
            return;
        }
        setShowCheckout(true);
    }

    // 会計完了
    function onComplete() {
        // ローカルストレージから訪問IDと座席IDを削除
        localStorage.removeItem('visit_id');
        localStorage.removeItem('seat_id');

        // 完了画面リダイレクト
        router.push('/complete');
    }

    if (!isReady) {
        return <Loading />;
    }

    return (
        <div>
            {showSetting && <Setting onClose={() => setShowSetting(false)} />}
            {product && (
                <Modal
                    product={product}
                    onClose={() => setProduct(undefined)}
                    onConfirm={handleConfirmOrder}
                />
            )}
            {showCheckout && (
                <CheckoutForm
                    orders={orders}
                    onClose={() => setShowCheckout(false)}
                    onComplete={onComplete}
                />
            )}
            <TitleLink />
            {/* 設定 */}
            <div className="flex justify-end items-center m-3">
                {seat && (
                    <div className="text-sm mr-3">
                        座席番号: {seat.number}
                    </div>
                )}
                <button
                    className="text-sm w-16 bg-sky-600 text-white border px-3 py-1 rounded cursor-pointer"
                    onClick={() => setShowSetting(true)}
                >
                    設定
                </button>
            </div>
            <CategoryTabs
                categories={categories}
                current={currentCategory}
                onSelect={setCurrentCategory}
            />
            <div className="flex flex-col md:flex-row gap-6">
                <ProductList products={filtered} onOrder={setProduct} />
                <OrderList orders={orders} onCheckout={onCheckout} />
            </div>
        </div>
    );
}