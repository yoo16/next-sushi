import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {
    const slugPath = params.slug.join('/');
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const phpApiUrl = `${API_BASE_URL}${slugPath}.php`;
    console.log('Request URL:', API_BASE_URL);
    console.log('PHP API URL:', phpApiUrl);

    try {
        const res = await fetch(phpApiUrl);
        const data = await res.json();
        return Response.json(data);
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch' }), { status: 500 });
    }
}
