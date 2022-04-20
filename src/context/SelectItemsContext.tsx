import React from "react";

interface ISelectItemsContext {
	searchItems: string;
	setSearchItems?: (val: string) => void;
}

const defaultState = {
	searchItems: JSON.stringify([[], []]),
};

export const SelectItemsContext =
	React.createContext<ISelectItemsContext>(defaultState);
