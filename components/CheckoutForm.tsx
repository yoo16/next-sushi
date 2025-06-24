import { Order } from "@/types/Order";

type Props = {
    orders: Order[];
    onClose: () => void;
    onConfirm: () => void;
};

export default function CheckoutModal({ orders, onClose, onConfirm }: Props) {
    const total = orders.reduce((sum, o) => sum + o.quantity * 100, 0); // 仮価格
    const totalWithTax = Math.round(total * 1.1);

    return (
        <div className="fixed inset-0">
            <div className="">
                <h2 className="text-xl font-bold mb-4 text-center">お会計</h2>

                {orders.length > 0 ? (
                    <div className="space-y-2 mb-4">
                        {orders.map((order, idx) => (
                            <div key={idx} className="flex justify-between border-b pb-1">
                                <div>{order.name}</div>
                                <div className="text-gray-600">×{order.quantity}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">注文はありません。</p>
                )}

                <p className="text-center mb-4 text-lg">
                    合計：<span className="font-bold">{total}円（税込{totalWithTax}円）</span>
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 transition"
                    >
                        はい
                    </button>
                    <button
                        onClick={onClose}
                        className="border border-sky-500 text-sky-600 px-6 py-2 rounded hover:bg-sky-100 transition"
                    >
                        いいえ
                    </button>
                </div>
            </div>
        </div>
    );
}