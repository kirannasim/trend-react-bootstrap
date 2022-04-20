import React from "react";
import { useQuery } from "react-query";
import { Alert, Spinner } from "react-bootstrap";
import { DeveloperType } from "../../../types/DeveloperType";
import { Developer } from "./Developer";
import { GetDevelopers } from "../../../query/Developers";
import { SelectItemsContext } from "../../../context/SelectItemsContext";

export const DeveloperFeeds: React.FC = () => {
	const { searchItems } = React.useContext(SelectItemsContext);
	const { isLoading, error, data } = useQuery<any, Error>(
		["developers", { searchItems }],
		() => GetDevelopers(searchItems)
	);

	const developers = data?.data ? (data.data as DeveloperType[]) : [];

	if (isLoading) {
		return (
			<div className="text-center">
				<Spinner animation="border" variant="primary" className="m-5" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-4 text-center">
				<Alert variant="danger" className="m-0">
					An error has occurred: {error.message}
				</Alert>
			</div>
		);
	}

	if (!developers.length) {
		return (
			<div className="p-4 text-center">
				<Alert variant="info" className="m-0">
					It looks like we don’t have any trending developers for your choices.
				</Alert>
			</div>
		);
	}

	return (
		<>
			{developers
				.sort((prev, curr) => (prev.rank < curr.rank ? -1 : 1))
				.map((developer) => (
					<Developer key={developer.username} developer={developer} />
				))}
		</>
	);
};
