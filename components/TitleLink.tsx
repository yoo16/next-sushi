import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function TitleLink() {
    return (
        <h1 className="flex justify-center text-2xl font-bold mb-4">
            <Link href="/">
                <Image src="/site_logo.png" alt="はる寿司" width={200} height={100} className="m-6" />
            </Link>
        </h1>
    )
}
