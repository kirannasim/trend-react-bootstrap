import React from "react";
import { RepositoryIcon } from "../../../components/Icons/RepositoryIcon";
import { StarIcon } from "../../../components/Icons/StarIcon";
import { RepositoryType } from "../../../types/RepositoryType";
import { Button, ButtonGroup, Dropdown, Image } from "react-bootstrap";
import { BranchIcon } from "../../../components/Icons/BranchIcon";
import { DescRangeContext } from "../../../context/DescRangeContext";

interface RepositoryProps {
	repository: RepositoryType;
}

export const Repository: React.FC<RepositoryProps> = ({ repository }) => {
	const { value, setValue } = React.useContext(DescRangeContext);
	return (
		<article className="border-bottom p-3">
			<div className="d-flex mb-2">
				<h5 className="me-auto mb-0">
					<a href={repository.url}>
						<RepositoryIcon />
						<span className="ps-2 fw-normal">{`${repository.username} /`}</span>
						{repository.repositoryName}
					</a>
				</h5>
				<Dropdown as={ButtonGroup} size="sm">
					<Button variant="light" className="border ps-3 pe-3">
						<StarIcon /> Star
					</Button>
					<Dropdown.Toggle split variant="light" className="border ps-2 pe-2" />
				</Dropdown>
			</div>
			<p>{repository.description}</p>
			<div className="d-flex metas">
				{repository.language}
				<a href={`${repository.url}/stargazers`} className="ms-3">
					<StarIcon />
					<span className="ps-1">{repository.totalStars}</span>
				</a>
				<a
					href={`${repository.url}/network/members.${repository.repositoryName}`}
					className="ms-3"
				>
					<BranchIcon />
					<span className="ps-1">{repository.forks}</span>
				</a>
				<div className="d-inline-block ms-3 me-auto">
					Built by
					{repository.builtBy.map((user) => (
						<a href={user.url} key={user.username}>
							<Image
								src={user.avatar}
								width="20"
								height="20"
								roundedCircle={true}
								className="border"
							/>
						</a>
					))}
				</div>
				<StarIcon />
				<span className="ps-1">{`${repository.starsSince} stars ${value}`}</span>
			</div>
		</article>
	);
};
