import React, { useEffect, useState } from "react";
import AOS from "aos";
import ProductCard from "@/components/global/productCard";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const dotenv = require("dotenv");
dotenv.config();

interface Product {
  _id: string;
  category: string;
  item_name: string;
  description: string;
  quantity: number;
  price: number;
  imageUrl: string;
  onSelect: () => void;
}

interface Category {
  name: string;
  products: Product[];
}

const ProductPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Drawings");
  const [loading, setLoading] = useState<boolean>(true);
  const [empty, setEmpty] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [slides, setSlides] = useState<Product[][]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const newParams = searchParams.get("category");
    const isUser = pathname.includes("/user");

    if (newParams) {
      if (isUser) {
        router.push("/user/#product");
      } else {
        router.push("/#product");
      }
      setSelectedCategory(newParams);
    }
  }, [searchParams, router, pathname]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.SEBEZ_ENDPOINT}/api/product/getallProducts`
        );

        const data = await response.json();

        if (data.length === 0) {
          setEmpty(true);
        }
        if (!response.ok) {
          throw new Error("Failed to fetch products...");
        }

        const groupedCategories = groupProductsByCategory(data);
        setCategories(groupedCategories);

        groupedCategories.forEach((category) =>
          console.log("products::: ", category.products)
        );
      } catch (error: any) {
        setError("Failed to fetch products...");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    AOS.init({
      duration: 600,
      once: true,
    });

    fetchCategories();
  }, []);

  useEffect(() => {
    const chunkProducts = (products: Product[], chunkSize: number): Product[][] => {
      const result: Product[][] = [];
      for (let i = 0; i < products.length; i += chunkSize) {
        result.push(products.slice(i, i + chunkSize));
      }
      return result;
    };

    const selectedCategoryProducts = selectedCategory
      ? categories.find((category) => category.name === selectedCategory)?.products || []
      : [];

    setSlides(chunkProducts(selectedCategoryProducts, 3));
  }, [categories, selectedCategory]);

  const groupProductsByCategory = (products: Product[]): Category[] => {
    const categoriesMap = new Map<string, Category>();
    products.forEach((product) => {
      const { category } = product;
      if (categoriesMap.has(category)) {
        categoriesMap.get(category)?.products.push(product);
      } else {
        categoriesMap.set(category, { name: category, products: [product] });
      }
    });
    return Array.from(categoriesMap.values());
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 animate-spin fill-blue-600 block mx-auto"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
              data-original="#000000"
            />
          </svg>
          <p className="w-auto p-10 animate-bounce">Loading...</p>
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div
        id="product"
        className="flex items-center justify-center min-h-screen bg-gray-900"
      >
        <span className="text-white font-semibold text-lg animate-bounce">
          no products added yet...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        id="product"
        className="flex items-center justify-center min-h-screen bg-gray-900"
      >
        <span className="text-red-500 font-semibold text-lg animate-bounce">
          Error: {error}
        </span>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-gray-900 text-white" id="product">
      <div data-aos="zoom-out-left">
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-serif text-center py-10">
            Find Your Desired Product{" "}
            <span className="mx-10- text-sm font-thin">
              (use{" "}
              <span className="bg-slate-600 px-1 rounded-md">categories</span>{" "}
              and <span className="bg-slate-600 px-1 rounded-md">slide</span>{" "}
              buttones)
            </span>
          </h1>

          <div className="flex justify-around">
            <div
              data-aos="flip-right"
              className="w-1/4 ml-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-green-700 opacity-85 p-4 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
              <ul>
                {categories.map((category) => (
                  <li
                    key={category.name}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`cursor-pointer py-2 px-4 mb-2 rounded-md hover:bg-green-600 ${
                      selectedCategory === category.name
                        ? "bg-green-300"
                        : "bg-green-600"
                    }`}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 w-full max-w-full md:max-w-4xl p-24 lg:max-w-6xl xl:max-w-7xl">
              <Carousel>
                <CarouselContent>
                  {slides.length > 0 ? (
                    slides.map((slide, index) => (
                      <CarouselItem key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {slide.map((product) => (
                            <ProductCard key={product._id} product={product} />
                          ))}
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <p className="text-lg px-96 text-gray-300 col-span-full text-center">
                      {selectedCategory
                        ? "No products found in this category."
                        : "Please select a category to view products."}
                    </p>
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
