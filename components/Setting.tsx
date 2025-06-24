'use client';
import { useState, useEffect } from 'react';
import TitleLink from '@/components/TitleLink';

const voices = [
    'voice-thanks-1.mp3',
    'voice-thanks-2.mp3',
    'voice-thanks-3.mp3',
    'voice-thanks-4.mp3',
    'voice-thanks-5.mp3',
];

type Props = {
    onClose: () => void;
};

export default function Setting({ onClose }: Props) {
    const [selected, setSelected] = useState(() => localStorage.getItem("voice") || "");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const voice = e.target.value;
        setSelected(voice);
        const audio = new Audio(`/audio/${voice}`);
        audio.play().catch((err) => {
            console.error("音声再生に失敗:", err);
        });
        localStorage.setItem("voice", voice);
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center z-50">
            <div className="relative w-1/3">
                <TitleLink />
                <h2 className="text-lg font-bold mb-4 text-center">設定</h2>

                <div className="text-center mb-4">
                    <h3 className="font-bold mb-4">声優</h3>
                    <select
                        value={selected}
                        onChange={handleChange}
                        className="w-full border border-gray-200 p-4 rounded">
                        <option value="">選択してください</option>
                        {voices.map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>

                    <button
                        onClick={onClose}
                        className="w-32 my-4 px-4 py-2 cursor-pointer bg-sky-600 text-white rounded"
                    >
                        とじる
                    </button>
                </div>

            </div>
        </div>
    );
}
