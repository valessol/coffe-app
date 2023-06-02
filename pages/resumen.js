import CartProduct from "../components/CartProduct.js";
import useCoffee from "../hooks/useCoffee.js";
import Layout from "../layout/Layout.js";

export default function Resume() {
  const { cart } = useCoffee();

  return (
    <Layout page="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu pedido</p>

      {!cart.length ? (
        <p className="text-center text-2xl">No hay elementos en tu pedido</p>
      ) : (
        cart.map((product) => <CartProduct key={product.id} item={product} />)
      )}
    </Layout>
  );
}
