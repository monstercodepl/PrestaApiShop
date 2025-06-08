export interface Product {
  id: number;
  name: string;
}

function getBasicAuth(): string {
  const key = process.env.PS_API_KEY;
  if (!key) throw new Error('PS_API_KEY is not defined');
  return 'Basic ' + Buffer.from(key + ':').toString('base64');
}

export async function getProducts(): Promise<Product[]> {
  const base = process.env.PS_API_URL;
  if (!base) throw new Error('PS_API_URL is not defined');
  const res = await fetch(`${base}/api/products?display=[id,name]&output_format=JSON`, {
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
