import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../../public/assets/images/sebezLogo.png";
import navBG from "../../../public/assets/images/navBG.jpg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuthStore from "@/stores/AuthStore";
import Cart from "./cart";
import Menu from "../../../public/assets/icons/menu.svg";
import CloseMenu from "../../../public/assets/icons/close.svg";
import { useRouter } from "next/navigation";
import ProductDetail from "./product_detail";
import AOS from "aos"
import ResMessage from "./resMessage";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ProfileIcon from "./profileIcon";

const dotenv = require("dotenv");

dotenv.config();

interface Product {
  category: string;
  item_name: string;
  imageUrl: string;
  price: number;
  description: string;
  _id: string;
}

interface Category {
  name: string;
  products: Product[];
}

const NavBar: React.FC = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    {} as Product
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isSignupRoute = pathname.includes("/auth/signup");
  const isAuthRoute = pathname.includes("/auth");
  const isUser = pathname.includes("/user");

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
    AOS.refresh()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.SEBEZ_ENDPOINT}/api/product/getallProducts`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Group products by category
        const groupedCategories = groupProductsByCategory(data);
        setCategories(groupedCategories);
      } catch (error: any) {
        console.error("Fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowNav(currentScrollPos <= 0 || currentScrollPos < lastScrollY);
      setLastScrollY(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleProductsClick = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredProducts = categories.reduce(
    (accumulator: Product[], category: Category) => [
      ...accumulator,
      ...category.products.filter(
        (product) =>
          (product.item_name &&
            product.item_name.toLowerCase().includes(searchTerm)) ||
          (product.category &&
            product.category.toLowerCase().includes(searchTerm))
      ),
    ],
    []
  );

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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

  return (
    <main>
      <div
        className={`${showNav ? "translate-y-0" : "-translate-y-full"
          } bg-custom-green-a shadow-md flex flex-col font-semibold z-40 fixed w-full top-0 transition-transform duration-300 ease-in-out `}
      >
        <div className="flex items-center justify-around pt-4 pb-4">
          <Link href="/">
            <div className="cursor-pointer">
              <Image src={Logo} alt="Sebez Logo" width={130} height={80} />
            </div>
          </Link>
          {isAuthenticated && (
            <div className="max-sm:hidden z-40 cursor-pointer list-none flex justify-around gap-16 opacity-70">
              <nav className="hover:text-custom-green-d hover:underline">
                <Link href="/user">Home</Link>
              </nav>


              <nav className="hover:text-custom-green-d z-40 hover:underline">
                <Link href="/user/aboutus">About Us</Link>
              </nav>
              <nav className="hover:text-custom-green-d hover:underline z-10">
                <HoverCard>
                  <HoverCardTrigger>Products</HoverCardTrigger>
                  <HoverCardContent>
                    <ul className="flex flex-col items-center font-mono font-thin text-sm gap-4">
                      <li className="bg-slate-300 px-8 rounded-md hover:bg-slate-400"><Link href="/user/?category=Drawings">Drawings</Link></li>
                      <li className="bg-slate-300 px-8 rounded-md hover:bg-slate-400"><Link href="/user/?category=Paintings">Paintings</Link></li>
                      <li className="bg-slate-300 px-8 rounded-md hover:bg-slate-400"><Link href="/user/?category=Sculptures">Sculptures</Link></li>
                      <li className="bg-slate-300 px-8 rounded-md hover:bg-slate-400"><Link href="/user/?category=Sketches">Sketches</Link></li>
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              </nav>
              <nav className="hover:text-custom-green-d z-40 hover:underline">
                <Link href="/user/contactus">Contact Us</Link>
              </nav>
            </div>
          )}
          {!isAuthenticated && (
            <div className="max-sm:hidden cursor-pointer list-none flex justify-around gap-16 opacity-70 z-10">
              <nav className="hover:text-custom-green-d hover:underline">
                <Link href="/">Home</Link>
              </nav>
              <nav className="hover:text-custom-green-d hover:underline z-10">
                <Link href="/home/aboutUs">About Us</Link>
              </nav>
              <nav className="hover:text-custom-green-d hover:underline z-10">
                <HoverCard>
                  <HoverCardTrigger>Products</HoverCardTrigger>
                  <HoverCardContent>
                    <ul className="flex flex-col items-center font-mono font-thin text-sm gap-4">
                      <li className="bg-slate-300 px-8 rounded-md hover:bg-slate-400"><Link href="/?category=Drawings">Drawings</Link></li>
                      <li className="bg-slate-300 px-8 rounded-md hover:bg-slate-400"><Link href="/?category=Paintings">Paintings</Link></li>
                      <li className="bg-slate-300 px-8 rounded-md hover:bg-slate-400"><Link href="/?category=Sculptures">Sculptures</Link></li>
                      <li className="bg-slate-300 px-8 rounded-md hover:bg-slate-400"><Link href="/?category=Sketches">Sketches</Link></li>
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              </nav>


              <nav className="hover:text-custom-green-d hover:underline z-10">
                <Link href="/home/contactUs">Contact Us</Link>
              </nav>
            </div>
          )}
          <div className="flex gap-10 cursor-pointer z-40">
            {!isSignupRoute && !isAuthRoute && (
              <div onClick={handleProductsClick}>
                <input
                  type="text"
                  placeholder="Search"
                  className="px-2 py-1 max-sm:w-20 rounded border border-green-400"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {isProductsDropdownOpen && (
                  <div className="absolute top-16 z-10 right-0 bg-white border border-gray-300 shadow-md overflow-y-scroll">
                    <h3 className="bg-gray-600 text-white p-4 sticky top-0">
                      Product Categories
                    </h3>
                    <ul className="list-none">
                      {filteredProducts.map((product, index) => (
                        <li
                          key={index}
                          className="hover:bg-gray-400 p-2 cursor-pointer"
                          onClick={() => handleProductSelect(product)}
                        >
                          {product.category}: {product.item_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {isAuthenticated && <Cart />}
            <nav className="flex max-sm:hidden gap-8 align-center transition-all duration-300">
              {isAuthenticated ? (
                <div className="flex gap-4 items-center ">
                  <ResMessage />
                  <ProfileIcon />
                  <button
                    onClick={() => {
                      logout();
                      router.push("/auth/signin");
                    }}
                    className="bg-custom-green-b z-40 text-white px-3 py-2 rounded"
                  >
                    Log out
                  </button></div>

              ) : (
                <div className="z-40">
                  {isHome && (
                    <Link href="/auth/signin">
                      <button className="bg-custom-green-b text-white px-3 py-2 rounded">
                        Get started
                      </button>
                    </Link>
                  )}
                  {isSignupRoute ? (
                    <Link href="/auth/signin">
                      <button className="bg-custom-green-b text-white px-3 py-2 rounded">
                        Sign In
                      </button>
                    </Link>
                  ) : (
                    isAuthRoute && (
                      <Link href="/auth/signup">
                        <button className="bg-custom-green-b text-white px-3 py-2 rounded">
                          Sign Up
                        </button>
                      </Link>
                    )
                  )}
                </div>
              )}
            </nav>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="z-50 mr-6 sm:hidden"
            >
              <Image src={Menu} alt="menu" width={30} height={30} />
            </button>
          </div>
        </div>
        <div className="absolute inset-0">
          <Image
            src={navBG}
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            className="opacity-10 z-0"
          />
        </div>
      </div>
      {isAuthenticated && isMenuOpen && (
        <div className="sm:hidden bg-custom-green-a transition-all duration-300 right-0 items-center h-screen fixed  flex flex-col float-end gap-10 p-10 flex-1 w-ful z-40 cursor-pointer list-none">
          <div className="absolute inset-0">
            <Image
              src={navBG}
              alt="Background"
              fill
              style={{ objectFit: "cover" }}
              className="opacity-20 z-0"
            />
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-40">
            <Image src={CloseMenu} alt="menu" width={30} height={30} />
          </button>
          <nav className="hover:text-custom-green-d hover:underline z-40">
            <Link href="/user">Home</Link>
          </nav>
          <nav className="hover:text-custom-green-d hover:underline z-40">
            <Link href="/user/#about-us">About Us</Link>
          </nav>
          <nav className="hover:text-custom-green-d hover:underline z-40">
            <Link href="/user/#product">Products</Link>
          </nav>

          <nav className="flex gap-8 align-center">
            {isAuthenticated ? (
              <div className="flex flex-col gap-4 items-center">
              <ResMessage />
              <ProfileIcon />
                <button
                  onClick={() => {
                    logout();
                    router.push("/auth/signin");
                  }}
                  className="bg-custom-green-b z-40 text-white px-3 py-2 rounded"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="z-40">
                {isHome && (
                  <Link href="/auth/signin">
                    <button className="bg-custom-green-b text-white px-3 py-2 rounded">
                      Get started
                    </button>
                  </Link>
                )}
                {isSignupRoute ? (
                  <Link href="/auth/signin">
                    <button className="bg-custom-green-b text-white px-3 py-2 rounded">
                      Sign In
                    </button>
                  </Link>
                ) : (
                  isAuthRoute && (
                    <Link href="/auth/signup">
                      <button className="bg-custom-green-b text-white px-3 py-2 rounded">
                        Sign Up
                      </button>
                    </Link>
                  )
                )}
              </div>
            )}
          </nav>
        </div>
      )}

      {!isAuthenticated && isMenuOpen && (
        <div data-aos="fade-left" className="sm:hidden bg-custom-green-a right-0 items-center h-screen fixed  flex flex-col float-end gap-10 p-10 flex-1 w-ful z-40 cursor-pointer list-none">
          <div className="absolute inset-0">
            <Image
              src={navBG}
              alt="Background"
              fill
              style={{ objectFit: "cover" }}
              className="opacity-20 z-0"
            />
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-40">
            <Image src={CloseMenu} alt="menu" width={30} height={30} />
          </button>
          <nav className="hover:text-custom-green-d hover:underline z-40">
            <Link href="/">Home</Link>
          </nav>
          <nav className="hover:text-custom-green-d hover:underline z-40">
            <Link href="/#about-us">About Us</Link>
          </nav>
          <nav className="hover:text-custom-green-d hover:underline z-40">
            <Link href="/#product">Products</Link>
          </nav>
          <nav className="hover:text-custom-green-d hover:underline z-40">
            <Link href="/#contact-us">Contact Us</Link>
          </nav>
          <nav className="flex gap-8 align-center">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  router.push("/auth/signin");
                }}
                className="bg-custom-green-b z-40 text-white px-3 py-2 rounded"
              >
                Log out
              </button>
            ) : (
              <div className="z-40">
                {isHome && (
                  <Link href="/auth/signin">
                    <button className="bg-custom-green-b text-white px-3 py-2 rounded">
                      Get started
                    </button>
                  </Link>
                )}
                {isSignupRoute ? (
                  <Link href="/auth/signin">
                    <button className="bg-custom-green-b text-white px-3 py-2 rounded">
                      Sign In
                    </button>
                  </Link>
                ) : (
                  isAuthRoute && (
                    <Link href="/auth/signup">
                      <button className="bg-custom-green-b text-white px-3 py-2 rounded">
                        Sign Up
                      </button>
                    </Link>
                  )
                )}
              </div>
            )}
          </nav>
        </div>
      )}
      <ProductDetail
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
};

export default NavBar;