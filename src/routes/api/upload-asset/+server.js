import { json } from '@sveltejs/kit';

export async function PUT({ request, platform, url }) {
  const r2 = platform?.env?.R2_ASSETS; // <-- changed
  if (!r2) {
    return json({ error: 'R2_ASSETS binding is missing' }, { status: 500 });
  }

  const form = await request.formData();
  let assetId = form.get('path')?.toString().trim();
  const file = form.get('file');

  if (!(file instanceof File)) {
    return json({ error: 'No file uploaded' }, { status: 400 });
  }

  if (!assetId) {
    const ext = (file.name.match(/\.[a-z0-9]+$/i)?.[0] ?? '').toLowerCase();
    assetId = `uploads/${Date.now()}-${crypto.randomUUID()}${ext}`;
  }

  assetId = assetId.replace(/^\/+/, '').replace(/\.\.+/g, '.');

  const ext = (assetId.match(/\.[a-z0-9]+$/i)?.[0] ?? '').toLowerCase();
  const contentType =
    file.type ||
    (ext === '.png'
      ? 'image/png'
      : ext === '.jpg' || ext === '.jpeg'
        ? 'image/jpeg'
        : ext === '.webp'
          ? 'image/webp'
          : 'application/octet-stream');

  await r2.put(assetId, await file.arrayBuffer(), {
    httpMetadata: { contentType }
  });

  const publicUrl = new URL(`/assets/${assetId}`, url.origin).toString();
  return json({ path: assetId, url: publicUrl });
}
