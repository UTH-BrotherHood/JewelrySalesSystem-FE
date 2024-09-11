import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";
import { fetchCategories } from "@/api/categoryApis";
import { ICategory, FetchCategoriesOptions } from "@/types/categoryTypes";

interface CategoryListProps {
    selectedCategory: string | null;
    setSelectedCategory: (id: string | null) => void;
}

const CategoryList = ({ selectedCategory, setSelectedCategory }: CategoryListProps) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [searchTermCategory, setSearchTermCategory] = useState<string>('');
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategoriesData({
            search: searchTermCategory
        });
    }, [searchTermCategory]);

    const fetchCategoriesData = async (options: FetchCategoriesOptions) => {
        try {
            setLoadingCategories(true);
            const response = await fetchCategories(options);
            setCategories((response as { result: { content: ICategory[] } }).result.content);
        } catch (error) {
            setError("Error fetching categories");
            console.error("Error fetching categories:", error);
        } finally {
            setLoadingCategories(false);
        }
    };

    return (
        <section className="  rounded-lg ">
            <div className="pb-4 mb-4 ">
                <Input
                    className="w-full px-3 py-2  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pnjBlue"
                    placeholder="Search categories..."
                    value={searchTermCategory}
                    onChange={(e) => setSearchTermCategory(e.target.value)}
                />
            </div>
            <div>
                {loadingCategories ? (
                    <div className="flex justify-center items-center h-24">
                        <Spinner />
                    </div>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li
                                key={category.categoryId}
                                onClick={() => setSelectedCategory(category.categoryId)}
                                className={`cursor-pointer p-3 rounded-md transition-colors duration-200 ease-in-out ${selectedCategory === category.categoryId ? ' text-white font-semibold' : ' hover:bg-gray-200'} `}
                            >
                                {category.categoryName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default CategoryList;
