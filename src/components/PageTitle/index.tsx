import React, { useContext } from "react";
import { DescRangeContext } from "../../context/DescRangeContext";

interface PageTitleProps {
	title: string;
	description: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
	const date_range = useContext(DescRangeContext);

	return (
		<div className="text-center highlight p-4 border-bottom">
			<h1 className="h2">{title}</h1>
			<p className="lead">{description + date_range.value + "."}</p>
		</div>
	);
};
