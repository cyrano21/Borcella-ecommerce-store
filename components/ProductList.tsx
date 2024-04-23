import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";

const ProductList = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5 w-full bg-[rgb(39,32,21)]">
      <p className="text-heading1-bold text-[rgb(254,254,254)]">Produits</p>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">Aucun produit trouvé</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16 w-full text-custom-color">
          {products.map((product: ProductType, index: number) => (
            <div
              key={product._id}
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
