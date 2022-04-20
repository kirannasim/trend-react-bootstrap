import React from "react";

interface IDescRangeContext {
	range: string;
	value: string;
	setValue?: (val: string) => void;
}

const defaultState = {
	range: "",
	value: "",
};

export const DescRangeContext =
	React.createContext<IDescRangeContext>(defaultState);
