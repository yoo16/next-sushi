'use client';

import { Order } from "@/types/Order";

type Props = {
    orders: Order[];
};

export default function OrderList({ orders }: Props) {
    const total = orders.reduce((sum, o) => sum + o.quantity * 100, 0); // 仮価格計算
    const totalWithTax = Math.round(total * 1.1);

    return (
        <div className="w-full md:w-72 bg-white p-4 rounded shadow">
            <h2 className="text-center text-xl font-semibold mb-2">注文履歴</h2>
            <ul className="mb-4 space-y-1">
                {orders.map((order, idx) => (
                    <li key={idx} className="flex justify-start items-center mb-2">
                        <img src={order.image_path} alt={order.name} className="w-16 m-2" />
                        <div className="font-bold">{order.name}</div>
                        <span className="ml-auto px-3 py-1 text-white bg-green-500 rounded">{order.quantity}</span>
                    </li>
                ))}
            </ul>
            <div className="my-2 text-right text-lg">
                合計：¥{total}（税込¥{totalWithTax}）
            </div>
            <button className="block w-full bg-sky-600 text-white px-6 py-3 rounded text-lg text-center hover:bg-sky-700 transition">
                お会計
            </button>
        </div>
    );
}
