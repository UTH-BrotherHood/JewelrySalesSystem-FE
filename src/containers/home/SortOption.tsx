import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface SortOptionsProps {
    sortOption: string;
    setSortOption: (value: string) => void;
}

const SortOptions = ({ sortOption, setSortOption }: SortOptionsProps) => {
    return (
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
    );
};

export default SortOptions;
