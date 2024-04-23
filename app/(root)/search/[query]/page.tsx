import ProductCard from "@/components/ProductCard";
import { getSearchedProducts } from "@/lib/actions/actions";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchedProducts(params.query);

  const decodedQuery = decodeURIComponent(params.query);

  return (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Recherche pour {decodedQuery}</p>
      {!searchedProducts ||
        (searchedProducts.length === 0 && (
          <p className="text-body-bold my-5">Pas de résultat</p>
        ))}
      <div className="flex flex-wrap justify-between gap-16">
        {searchedProducts?.map((product: ProductType, index: number) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default SearchPage;
