export async function GET({ params, platform, setHeaders }) {
  const r2 = platform?.env?.R2_ASSETS; // <-- changed
  if (!r2) return new Response('R2_ASSETS binding missing', { status: 500 });

  const key = params.path;
  if (!key) return new Response('Not found', { status: 404 });

  const obj = await r2.get(key);
  if (!obj) return new Response('Not found', { status: 404 });

  const ct = obj.httpMetadata?.contentType || 'application/octet-stream';
  setHeaders({
    'Content-Type': ct,
    'Cache-Control': 'public, max-age=600'
  });

  return new Response(obj.body);
}
