import React from 'react'

export default function Loading() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-sky-500 rounded-full animate-spin" />
        </div>
    )
}
