import { useEffect, useState } from "react";

type ShopAppProps = {
  onClose: () => void;
};

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
};

function ShopApp({ onClose }: ShopAppProps) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory,
  );

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#050816]/45 backdrop-blur-sm">
      <div className="relative flex h-150 w-180 max-w-[90%] flex-col rounded-2xl border border-cyan-400/20 bg-[#07111d]/95 p-6 text-white shadow-[0_0_50px_rgba(34,211,238,0.12)]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-cyan-200">Shop</h2>

            <p className="text-xs text-gray-500">
              Browse products and discover new items
            </p>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Shop"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-red-500/20
              bg-red-500/5
              text-sm
              text-red-400
              transition-colors
              duration-300
              hover:border-red-400/50
              hover:bg-red-500/10
              hover:text-red-300
              cursor-pointer
            "
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 flex min-h-0 flex-1 flex-col">
          {/* Search */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="
        flex-1
        rounded-xl
        border
        border-white/10
        bg-[#050816]
        px-4
        py-3
        text-sm
        text-gray-200
        outline-none
        placeholder:text-gray-600
        transition
        focus:border-cyan-400/40
        focus:shadow-[0_0_20px_rgba(34,211,238,0.08)]
      "
            />

            <button
              type="button"
              className="
        rounded-xl
        border
        border-cyan-400/20
        bg-cyan-400/10
        px-5
        py-3
        text-sm
        text-cyan-300
        transition-all
        hover:border-cyan-400/50
        hover:bg-cyan-400/15
        cursor-pointer
      "
            >
              🔎 Search
            </button>
          </div>

          <div className="mt-6 min-h-0 flex-1 overflow-hidden">
            {selectedCategory === null ? (
              <div>
                <h3 className="mb-4 text-sm font-semibold text-cyan-200">
                  Browse Categories
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className="
              rounded-xl
              border
              border-cyan-400/20
              bg-cyan-400/5
              p-4
              text-left
              text-sm
              text-cyan-200
              transition-all
              hover:border-cyan-400/50
              hover:bg-cyan-400/10
              cursor-pointer
            "
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-0 flex-col">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="
          mb-4
          shrink-0
          text-left
          text-sm
          text-cyan-300
          transition
          hover:text-cyan-200
          cursor-pointer
        "
                >
                  ← Back
                </button>

                <h3 className="mb-4 shrink-0 text-sm font-semibold text-cyan-200">
                  {selectedCategory}
                </h3>

                <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                  <div className="grid grid-cols-3 gap-5">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/5
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]
              "
                      >
                        <div className="flex h-40 items-center justify-center bg-white/5">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-contain p-4"
                          />
                        </div>

                        <div className="p-4">
                          <h4 className="truncate text-sm font-semibold text-white">
                            {product.title}
                          </h4>

                          <p className="mt-2 text-lg font-semibold text-cyan-300">
                            € {product.price}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            ⭐ {product.rating}
                          </p>

                          <button
                            type="button"
                            className="
                    mt-4
                    w-full
                    rounded-lg
                    border
                    border-cyan-400/20
                    bg-cyan-400/10
                    py-2
                    text-xs
                    font-medium
                    text-cyan-300
                    transition-all
                    hover:border-cyan-400/50
                    hover:bg-cyan-400/15
                    cursor-pointer
                  "
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopApp;
