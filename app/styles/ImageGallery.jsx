import Image from "next/image";
import React, { useState, useEffect } from "react";

const ImageGallery = ({ images }) => {
  const [loadedIndexes, setLoadedIndexes] = useState([]);

  useEffect(() => {
    images.forEach((_, index) => {
      const timer = setTimeout(() => {
        setLoadedIndexes((prevIndexes) => [...prevIndexes, index]);
      }, index * 500); // Augmente le délai de 500 ms pour chaque image suivante
      return () => clearTimeout(timer);
    });
  }, [images]);

  return (
    <div className="image-gallery">
      {images.map((src, index) => (
        <div
          key={index}
          className={`image-container ${loadedIndexes.includes(index) ? "visible" : ""}`}
          style={{ transitionDelay: `${index * 0.5}s` }}
        >
          {loadedIndexes.includes(index) && (
            <Image src={src} alt={`Image ${index}`} width={300} height={200} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
