import { useState } from 'react';
import { Input, InputProps } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface ProductSearchProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    sortOption: string;
    setSortOption: (value: string) => void;
}

const ProductSearch = ({ searchTerm, setSearchTerm, sortOption, setSortOption }: ProductSearchProps) => {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    const handleSearch = () => {
        setSearchTerm(localSearchTerm);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="pb-2 mb-2">
            <div className="flex gap-2 text-pnjGrey">


                <Input
                    
                    placeholder="Search products..."
                    value={localSearchTerm}
                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    endAdornment={
                        <svg onClick={handleSearch} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>}

                />


                <Select
                    value={sortOption}
                    onValueChange={(value) => setSortOption(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="costPriceDesc">Giá giảm dần</SelectItem>
                        <SelectItem value="costPriceAsc">Giá tăng dần</SelectItem>
                        <SelectItem value="nameAsc">A-Z</SelectItem>
                        <SelectItem value="nameDesc">Z-A</SelectItem>
                        <SelectItem value="createdAtDesc">Mới nhất</SelectItem>
                        <SelectItem value="createdAtAsc">Cũ nhất</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default ProductSearch;
