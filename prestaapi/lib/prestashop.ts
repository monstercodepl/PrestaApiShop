export interface Product {
  id: number;
  name: string;
}

function getBasicAuth(): string {
  const key = process.env.PS_API_KEY;
  if (!key) throw new Error('PS_API_KEY is not defined');
  return 'Basic ' + Buffer.from(key + ':').toString('base64');
}

export async function getProducts(limit = 50, offset = 0): Promise<Product[]> {
  const base = process.env.PS_API_URL;
  if (!base) throw new Error('PS_API_URL is not defined');
  const url = new URL('/api/products', base);
  url.searchParams.set('display', '[id,name]');
  url.searchParams.set('output_format', 'JSON');
  url.searchParams.set('limit', `${offset},${limit}`);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: getBasicAuth(),
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  const products = Array.isArray(data.products) ? data.products : [];
  return products.map((p: any) => ({
    id: Number(p.id),
    name: typeof p.name === 'string'
      ? p.name
      : p.name?.language
        ? Array.isArray(p.name.language)
          ? p.name.language[0]?.value || ''
          : p.name.language.value || ''
        : '',
  }));
}
