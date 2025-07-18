'use client';

import { imageUrl } from "@/lib/image";
import { Order } from "@/types/Order";

type Props = {
    orders: Order[];
    onCheckout: () => void;
};

export default function OrderList({ orders, onCheckout }: Props) {
    const total = orders.reduce((sum, o) => sum + o.quantity * 100, 0); // 仮価格計算
    const totalWithTax = Math.round(total * 1.1);

    return (
        <div className="w-full md:w-78 bg-white p-4 rounded shadow">
            <h2 className="text-center text-xl font-semibold mb-2">注文履歴</h2>
            <ul className="mb-4 space-y-1 max-h-64 overflow-y-auto">
                {orders.map((order, idx) => (
                    <li key={idx} className="flex justify-start items-center mb-2">
                        <img src={imageUrl(order.product_image_path)} alt={order.product_name} className="w-16 m-2" />
                        <div className="font-bold">{order.product_name}</div>
                        <span className="ml-auto px-3 py-1 text-white bg-green-500 rounded">{order.quantity}</span>
                    </li>
                ))}
            </ul>
            <div className="my-4 text-right text-md font-semibold">
                合計：{total}円
                （税込 {totalWithTax}円）
            </div>
            <button
                className={`block w-full cursor-pointer  text-white px-6 py-3 rounded text-lg text-center  transition ${orders.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'}`}
                onClick={onCheckout}
                disabled={orders.length === 0}
            >
                お会計
            </button>
        </div>
    );
}
