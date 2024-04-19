import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Assurez-vous d'échapper correctement le caractère point et les backslashes.
    "/", // Correspond à la racine du site.
    "/(api|trpc)(.*)" // Correspond à toutes les routes sous '/api' et '/trpc'.
  ],
};
