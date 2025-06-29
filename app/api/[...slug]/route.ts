export async function GET(
    request: Request,
    { params }: { params: { slug: string[] } }
) {
    const slug = params.slug;
    const slugPath = slug.join('/');
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const phpApiUrl = `${API_BASE_URL}${slugPath}.php`;

    try {
        const res = await fetch(phpApiUrl);
        const data = await res.json();
        return Response.json(data);
    } catch {
        return new Response(JSON.stringify({
            error: 'Failed to fetch',
            slug: slug,
            uri: phpApiUrl,
        }), { status: 500 });
    }
}