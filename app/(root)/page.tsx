import Image from "next/image";
import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

const Home = () => {
  return (
    <>
      <Image
        //loader={myLoader}
        src="/banner.png"
        alt="banner"
        width={2000}
        height={1000}
        quality={75}
        layout="responsive"
        className="w-screen"
      />

      <Collections />
      <ProductList />
    </>
  );
};

export default Home;
