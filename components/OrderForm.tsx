'use client';

import { useState } from "react";
import { Product } from "@/types/Product";
import { Order } from "@/types/Order";
import TitleLink from "./TitleLink";

type Props = {
    product: Product;
    onClose: () => void;
    onConfirm: (order: Order) => void;
};

export default function Modal({ product, onClose, onConfirm }: Props) {
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleConfirm = () => {
        const order: Order = {
            id: product.id,
            name: product.name,
            price: product.price,
            image_path: product.image_path,
            quantity,
        };
        onConfirm(order);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex justify-center z-50">
            <div>
                <TitleLink />
                <div className="bg-white p-6">
                    <h2 className="text-xl font-bold mb-2 text-center">{product.name}</h2>
                    <img src={product.image_path} alt={product.name} className="w-32 mx-auto rounded mb-4" />
                    <p className="text-center mb-4">価格: ¥{product.price}</p>

                    {/* 🔢 数量調整 */}
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="bg-sky-500 text-white px-3 py-2 rounded-full text-xl"
                        >－</button>
                        <span className="text-xl font-bold p-4">{quantity}</span>
                        <button
                            onClick={() => setQuantity(q => q + 1)}
                            className="bg-sky-500 text-white px-3 py-2 rounded-full text-xl"
                        >＋</button>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            閉じる
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="px-4 py-2 bg-sky-500 text-white rounded"
                        >
                            注文する
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
