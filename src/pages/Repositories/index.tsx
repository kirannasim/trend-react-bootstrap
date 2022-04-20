import React from "react";
import { Container } from "react-bootstrap";
import { PageTitle } from "../../components/PageTitle";
import { Toolbar } from "../../components/Toolbar";
import { RepositoryFeeds } from "./components/RepositoryFeeds";

interface RepositoriesProps {
	title: string;
	description: string;
	ranges: string[];
}

export const Repositories: React.FC<RepositoriesProps> = ({
	title,
	description,
	ranges,
}) => {
	return (
		<>
			<PageTitle title={title} description={description} />
			<Container>
				<Toolbar ranges={ranges} />
				<div className="rounded-bottom border border-top-0">
					<RepositoryFeeds />
				</div>
			</Container>
		</>
	);
};
