'use client';

import Loading from "@/components/Loading";
import TitleLink from "@/components/TitleLink";
import { billed } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompletePage() {
    const router = useRouter();

    // ローディング
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // visit_idを取得して、存在しない場合はトップページへリダイレクト
        const visitId = Number(localStorage.getItem('visit_id'));
        bill(visitId);
    }, []);

    async function bill(visitId: number) {
        try {
            setIsLoading(true);
            const result = await billed(visitId)
            if (result.error) {
                console.log('チェックアウト失敗:', result.error);
                return;
            } else {
                console.log('チェックアウト成功:', result);
                // ローカルストレージからvisit_idとseat_idを削除
                localStorage.removeItem('visit_id');
            }
        } catch (error) {
            console.error('会計処理中にエラー:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-sky-50 text-gray-800 flex items-center justify-center min-h-screen">
            {isLoading && <Loading />}

            <div className="bg-white p-8 rounded shadow text-center space-y-6 max-w-md">
                <TitleLink />
                <h2 className="text-2xl font-bold text-sky-600">ご利用ありがとうございました！</h2>
                <p className="text-lg">お会計は <span className="font-semibold text-red-500">レジ</span> にてお願いいたします。</p>
                <p className="text-gray-600">またのご利用を心よりお待ちしております。</p>
                <a href="/" className="inline-block mt-4 text-sky-600 hover:underline">トップページへ戻る</a>
            </div>
        </div>
    );
}