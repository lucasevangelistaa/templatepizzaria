import { useState } from "react";
import { motion as Motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/menu";

const Home = ({ pizzaMenu, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredPizzas =
  activeCategory === "Todos"
    ? pizzaMenu
    : pizzaMenu.filter((pizza) => pizza.category === activeCategory);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">
        Cardápio
      </h1>

      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${
              activeCategory === category
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <Motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPizzas.map((pizza) => (
          <ProductCard key={pizza.id} pizza={pizza} addToCart={addToCart} />
        ))}
      </Motion.div>
    </div>
  );
};

export default Home;
