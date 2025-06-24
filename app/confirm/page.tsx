'use client';

import { useEffect, useState } from "react";
import { Order } from "@/types/Order";
import { useRouter } from "next/navigation";

const TAX_RATE = 1.1;

export default function CheckoutPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // 仮に localStorage から取得（実運用では Context や DBに置き換え）
        const storedOrders = localStorage.getItem("orders");
        const parsedOrders: Order[] = storedOrders ? JSON.parse(storedOrders) : [];

        setOrders(parsedOrders);

        const subtotal = parsedOrders.reduce((sum, o) => sum + o.quantity * 100, 0); // 単価が未保存なら仮に100円
        setTotal(subtotal);
    }, []);

    const handleConfirm = () => {
        // localStorage を削除（仮仕様）
        localStorage.removeItem("orders");
        localStorage.removeItem("total");

        // 完了画面へ遷移 or ルートへ戻す
        router.push("/");
    };

    const totalWithTax = Math.round(total * TAX_RATE);

    return (
        <main className="max-w-xl mx-auto bg-white shadow p-6 mt-10 rounded">
            <h2 className="text-2xl font-bold text-center mb-4">はる寿司</h2>
            <h3 className="text-xl font-semibold text-center mb-6">お会計</h3>

            <div className="space-y-4 max-h-60 overflow-y-auto border-t border-b py-4 mb-4">
                {orders.length > 0 ? (
                    orders.map((order, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b pb-2">
                            <div>{order.product_name}</div>
                            <div className="text-gray-600">×{order.quantity}</div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">注文はありません。</p>
                )}
            </div>

            <p className="text-center mb-6 text-lg">
                合計：<span className="font-bold">{total}円（税込{totalWithTax}円）</span>
            </p>

            <div className="text-center text-xl font-bold mb-4">
                この内容でお会計しますか？
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={handleConfirm}
                    className="bg-sky-600 text-white px-6 py-3 rounded hover:bg-sky-700 transition"
                >
                    はい
                </button>
                <button
                    onClick={() => router.back()}
                    className="border border-sky-500 text-sky-600 px-6 py-3 rounded hover:bg-sky-100 transition"
                >
                    いいえ
                </button>
            </div>
        </main>
    );
}