import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CoffeeContext = createContext();

const CoffeeProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(false);

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

  const handleClickCategory = (id) => {
    const category = categories.filter((cat) => cat.id === id);
    setCurrentCategory(category[0]);
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

  return (
    <CoffeeContext.Provider
      value={{
        categories,
        currentCategory,
        product,
        cart,
        modal,
        handleClickCategory,
        handleSetProduct,
        handleChangeModal,
        handleAddToCart,
        handleEditResume,
        handleDeleteFromResume,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export { CoffeeProvider };
export default CoffeeContext;
