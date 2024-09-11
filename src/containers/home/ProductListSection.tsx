import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { fetchProducts } from "@/api/productApis";
import { IProduct, FetchProductsOptions } from "@/types/productTypes";
import { FiShoppingCart } from 'react-icons/fi';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import SortOptions from "./SortOption";

interface ProductListProps {
    selectedCategory: string | null;
    searchTerm: string;
    sortOption: string;
    onAddToCart: (product: IProduct) => void;
}

const ProductList = ({ selectedCategory, searchTerm, onAddToCart }: ProductListProps) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string>('costPriceDesc');
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);

    const pageLimit = 4;

    useEffect(() => {
        fetchProductsData({
            page,
            limit: pageLimit,
            categoryId: selectedCategory,
            search: searchTerm,
            sortBy: sortOption.includes('costPrice') ? 'costPrice' : sortOption.includes('name') ? 'name' : 'createdAt',
            sortOrder: sortOption.includes('Desc') ? 'desc' : 'asc',
        });
    }, [selectedCategory, searchTerm, sortOption, page]);

    const fetchProductsData = async (options: FetchProductsOptions) => {
        try {
            setLoadingProducts(true);
            const response = await fetchProducts(options);
            setProducts(response.result.content);
            setTotalPages(response.result.totalPages);
        } catch (error) {
            setError("Error fetching products");
            console.error("Error fetching products:", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    // Handle page click
    const handlePageClick = (pageNumber: number) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setPage(pageNumber);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 font-bold text-sm border  rounded mx-1 ${i === page ? 'text-[#4200FF] border-[1px] border-[#4200FF] ' : ' text-gray-600 border-[#DFE3E8]'}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i + 1}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="bg-gray-50z">
            <div className="flex justify-between mb-5  py-4 ">
                <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
                <div className="flex justify-end items-center mt-4">

                    <button

                        className={`p-[2px] border-[#DFE3E8] border-[1px]  rounded mx-1 ${page === 0 ? 'bg-gray-200' : ' text-gray-600'}`}
                        onClick={() => handlePageClick(page - 1)}
                        disabled={page === 0}
                    >
                        <MdKeyboardArrowLeft className="text-2xl" />
                    </button>

                    {renderPageNumbers()}

                    <button
                        className={`p-[2px] border-[#DFE3E8] border-[1px] rounded mx-1  ${page === totalPages - 1 ? 'bg-gray-200' : ' text-gray-600'}`}

                        onClick={() => handlePageClick(page + 1)}
                        disabled={page === totalPages - 1}
                    >
                        <MdKeyboardArrowRight className="text-2xl" />
                    </button>
                </div>
            </div>
            {loadingProducts ? (
                <Spinner />
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <div className="flex flex-wrap gap-3 ">
                        {products.map((product) => (
                            <div
                                key={product.productId}
                                className="relative w-[10rem] flex flex-col  items-center rounded-lg overflow-hidden   hover:shadow-md transition-shadow duration-300 group"
                            >
                                <img className="object-cover w-36 bg-white" src={product?.imageUrl} alt={product?.name} />
                                <div className=" p-2 flex flex-col justify-between ">
                                    <h3 className="text-xs font-semibold mb-2 text-pnjGrey line-clamp-1">{product?.name}</h3>
                                    <p className="text-pnjYellow font-bold text-base mb-2">{formatPrice(product?.costPrice)}</p>
                                    {/* <p className="text-xs text-pnjGrey line-clamp-2">{product?.description}</p> */}
                                </div>
                                <button
                                    onClick={() => onAddToCart(product)}
                                    className="absolute top-4 right-4 text-pnjBlue shadow-sm flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <FiShoppingCart className="text-xl" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                  
                </>
            )}
         
      
        </div>
    );
};

export default ProductList;
