import React from "react";
import { useQuery } from "react-query";
import { Alert, Spinner } from "react-bootstrap";
import { RepositoryType } from "../../../types/RepositoryType";
import { Repository } from "./Repository";
import { GetRepositories } from "../../../query/Repositories";
import { SelectItemsContext } from "../../../context/SelectItemsContext";

export const RepositoryFeeds: React.FC = () => {
	const { searchItems } = React.useContext(SelectItemsContext);
	const { isLoading, error, data } = useQuery<any, Error>(
		["repositories", { searchItems }],
		() => GetRepositories(searchItems)
	);

	const repositories = data?.data ? (data.data as RepositoryType[]) : [];

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

	if (!repositories.length) {
		return (
			<div className="p-4 text-center">
				<Alert variant="info" className="m-0">
					It looks like we don’t have any trending repositories for your
					choices.
				</Alert>
			</div>
		);
	}

	return (
		<>
			{repositories
				.sort((prev, curr) => (prev.rank < curr.rank ? -1 : 1))
				.map((repository) => (
					<Repository key={repository.repositoryName} repository={repository} />
				))}
		</>
	);
};
