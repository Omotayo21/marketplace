import Image from "next/image";
import Header from "./components/Header";
import Products from "./components/Products";
import CategoriesSlider from "./components/CategoriesSlider";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <CategoriesSlider />
        <section className=" py-8">
          <Products />
        </section>
      </main>
    </>
  );
}
