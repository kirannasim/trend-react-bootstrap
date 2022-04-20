import { SearchItems } from "../../types/SearchItems";

interface DropdownSelectedProps {
	items: SearchItems;
	selected: string;
}

export const DropdownSelected: React.FC<DropdownSelectedProps> = ({
	items,
	selected,
}) => {
	const selectItem = items.categories.find((item) => item.value === selected);

	return (
		<>
			{items.label}:
			<strong className="ms-2">
				{selectItem ? selectItem.label : "Select " + items.label}
			</strong>
		</>
	);
};
