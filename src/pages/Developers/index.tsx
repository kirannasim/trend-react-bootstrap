import React from "react";
import { Container } from "react-bootstrap";
import { PageTitle } from "../../components/PageTitle";
import { Toolbar } from "../../components/Toolbar";
import { DeveloperFeeds } from "./components/DeveloperFeeds";

interface DevelopersProps {
	title: string;
	description: string;
	ranges: string[];
}

export const Developers: React.FC<DevelopersProps> = ({
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
					<DeveloperFeeds />
				</div>
			</Container>
		</>
	);
};
