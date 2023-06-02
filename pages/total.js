import { useCallback, useEffect, useState } from "react";
import useCoffee from "../hooks/useCoffee.js";
import Layout from "../layout/Layout.js";
import { formatCurrency } from "../helpers/index.js";

export default function Total() {
  const [name, setName] = useState("");
  const { cart, sendOrder, total } = useCoffee();

  const disableForm = useCallback(() => {
    const areItemsOnCart = !!cart.length;
    const hasName = !!name && name.length > 3;

    return !areItemsOnCart || !hasName;
  }, [cart, name]);

  useEffect(() => {
    disableForm();
  }, [cart, disableForm]);

  return (
    <Layout page="Finalizar pedido">
      <h1 className="text-4xl font-black">Confirmar pedido</h1>
      <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

      <form onSubmit={sendOrder}>
        <div>
          <label
            className="block uppercase text-slate-800 font-bold text-xl"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            type="text"
            className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar: {""}{" "}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
        </div>

        <div className="mt-5">
          <input
            type="submit"
            className={`w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white ${
              disableForm()
                ? "bg-indigo-200 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-800 cursor-pointer"
            } text-center`}
            value="Confirmar Pedido"
            disabled={disableForm()}
          />
        </div>
      </form>
    </Layout>
  );
}
