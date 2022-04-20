import { SearchItem } from "./SearchItem";

export interface SearchItems {
	range: string;
	label: string;
	active: boolean;
	selected: string;
	param: string;
	categories: SearchItem[];
}
