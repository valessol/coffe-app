import Image from "next/image";
import useCoffee from "../hooks/useCoffee";
import Category from "./Category";

const Sidebar = () => {
  const { categories } = useCoffee();

  return (
    <>
      <Image
        width={300}
        height={100}
        src="/assets/img/logo.svg"
        alt="imagen logotipo"
        className="mx-auto"
      />

      <nav className="mt-10">
        {categories?.map((cat) => (
          <Category key={cat.id} category={cat} />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
