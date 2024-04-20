export const getCollections = async () => {
  const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`)
  return await collections.json()
}

export const getCollectionDetails = async (collectionId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`)
    const data = await response.text(); // Temporairement obtenir la réponse en tant que texte

    // Tentative de parser le JSON seulement si la réponse est OK
    if (response.ok) {
      return JSON.parse(data);
    } else {
      console.error("Failed to fetch collection details:", data);
      return null; // ou gérer selon le besoin
    }
  } catch (error) {
    console.error("Error fetching collection details:", error);
    return null; // ou gérer selon le besoin
  }
}

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  return await products.json()
}

export const getProductDetails = async (productId: string) => {
  try {
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
    return await product.json();
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    // Handle error appropriately, maybe return a default value or error object
    return null;
  }
};

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`)
  return await searchedProducts.json()
}

export const getOrders = async (customerId: string) => {
  const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`)
  return await orders.json()
}

export const getRelatedProducts = async (productId: string) => {
  const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`)
  return await relatedProducts.json()
}