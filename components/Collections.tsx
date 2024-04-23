import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import { generateColor } from "@/utils/colorGenerator";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";

interface Collection {
  _id: Key | null | undefined;
  image: string | StaticImport;
  title: string; // Corrected type
}

const Collections = async () => {
  const collections = await getCollections();

  // @ts-ignore
  const myLoader = ({ src, width, quality }) => {
    return `https://moncdn.com/${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {collections.map((collection: Collection) => (
            <Link
              href={`/collections/${collection._id}`}
              key={collection._id}
              style={{ backgroundColor: generateColor(collection._id) }}
              className="transition duration-300 ease-in-out transform hover:scale-105 flex-col items-center"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                width={250}
                height={100}
                className="rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
              />
              <div className="h-10 flex justify-center">
                <p className="text-body-bold text-center my-auto">
                  {collection.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
