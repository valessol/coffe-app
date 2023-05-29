import { useContext } from "react";
import CoffeeContext from "../context/CoffeeContext";

const useCoffee = () => {
  return useContext(CoffeeContext);
};

export default useCoffee;
