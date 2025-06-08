import { getProducts } from "@/lib/prestashop";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sklep</h1>
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="border rounded p-4">
            <h2 className="font-semibold">{product.name}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}
