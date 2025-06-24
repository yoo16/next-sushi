import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col bg-gradient-to-b from-white to-sky-200 items-center justify-center min-h-screen">
            <Image src="/site_logo.png" alt="はる寿司" width={500} height={300} className="m-6" />
            <Link
                href="/menu"
                className="px-6 py-3 bg-sky-600 text-white rounded-xl shadow hover:bg-sky-500 transition">
                注文開始
            </Link>
        </div>
    );
}
