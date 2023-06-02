import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CoffeeContext = createContext();

const CoffeeProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const getCategories = async () => {
    const { data } = await axios("/api/categories");
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCurrentCategory(categories[0]);
  }, [categories]);

  useEffect(() => {
    const newTotal = cart.reduce(
      (total, product) => (product.price * product.quantity + total, 0)
    );
    setTotal(newTotal);
  }, [cart]);

  const handleClickCategory = (id) => {
    const category = categories.filter((cat) => cat.id === id);
    setCurrentCategory(category[0]);
    router.push("/");
  };

  const handleSetProduct = (product) => {
    setProduct(product);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAddToCart = ({ categoryId, ...product }) => {
    const existProduct = cart.some(
      (productState) => productState.id === product.id
    );
    if (existProduct) {
      const updatedCart = cart.map((productState) =>
        productState.id === product.id ? product : productState
      );
      setCart(updatedCart);
      toast.success("Pedido actualizado");
    } else {
      toast.success("Agregado al pedido");
      setCart([...cart, product]);
    }
  };

  const handleEditResume = (id) => {
    const productOnCart = cart.find((product) => product.id === id);
    setProduct(productOnCart);
    setModal(!modal);
  };

  const handleDeleteFromResume = (id) => {
    const updatedCart = cart.find((product) => product.id !== id);
    setCart(updatedCart);
  };

  const sendOrder = async (e) => {
    e.preventDefault();
  };

  return (
    <CoffeeContext.Provider
      value={{
        categories,
        currentCategory,
        product,
        cart,
        modal,
        total,
        handleClickCategory,
        handleSetProduct,
        handleChangeModal,
        handleAddToCart,
        handleEditResume,
        handleDeleteFromResume,
        sendOrder,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export { CoffeeProvider };
export default CoffeeContext;
