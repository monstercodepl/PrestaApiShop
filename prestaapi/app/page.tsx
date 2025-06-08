import { getProducts } from "@/lib/prestashop";

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = parseInt(searchParams?.page ?? '1', 10);
  const limit = 50;
  const offset = (page - 1) * limit;
  const products = await getProducts(limit, offset);

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
      <div className="flex justify-between mt-8">
        {page > 1 ? (
          <a className="underline" href={`/?page=${page - 1}`}>Poprzednia</a>
        ) : <span />}
        <a className="underline" href={`/?page=${page + 1}`}>Następna</a>
      </div>
    </main>
  );
}
