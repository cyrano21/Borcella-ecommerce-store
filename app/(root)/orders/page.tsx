// Intégration du chargement paresseux pour les images dans les commandes
import { getOrders } from "@/lib/actions/actions";
import Image from "next/image";
import { auth } from "@clerk/nextjs";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId);

  return (
    <div className="px-10 py-5">
      <p className="text-heading3-bold">Vos Commandes</p>
      {!orders || orders.length === 0 ? (
        <p className="text-body-bold">Aucune Commande.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {orders.map((order) => (
            <div className="flex flex-col gap-8 p-4">
              <div className="flex gap-20">
                <p className="text-base-bold">N° de commande: {order._id}</p>
                <p className="text-base-bold">Total: {order.totalAmount} €</p>
              </div>
              <div className="flex flex-col gap-5">
                {order.products.map((orderItem) => (
                  <div className="flex gap-4">
                    <Image
                      src={orderItem.product.media[0]}
                      alt={orderItem.product.title}
                      width={100}
                      height={100}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-small-medium">
                        Titre: {orderItem.product.title}
                      </p>
                      {orderItem.color && (
                        <p className="text-small-medium">
                          Couleur: {orderItem.color}
                        </p>
                      )}
                      {orderItem.size && (
                        <p className="text-small-medium">
                          Taille: {orderItem.size}
                        </p>
                      )}
                      <p className="text-small-medium">
                        Prix unitaire: {orderItem.product.price}
                      </p>
                      <p className="text-small-medium">
                        Quantité: {orderItem.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
