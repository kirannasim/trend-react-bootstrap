import React from "react";
import { RepositoryIcon } from "../../../components/Icons/RepositoryIcon";
import { DeveloperType } from "../../../types/DeveloperType";
import { Button, ButtonGroup, Dropdown, Image } from "react-bootstrap";
import { DescRangeContext } from "../../../context/DescRangeContext";
import { FireIcon } from "../../../components/Icons/FireIcon";

interface DeveloperProps {
	developer: DeveloperType;
}

export const Developer: React.FC<DeveloperProps> = ({ developer }) => {
	const { value, setValue } = React.useContext(DescRangeContext);
	return (
		<article className="border-bottom p-3">
			<div className="d-flex mb-2">
				<div className="rank me-3">{developer.rank}</div>
				<a href={developer.url} className="me-3">
					<Image
						src={developer.avatar}
						width="48"
						height="48"
						roundedCircle={true}
						className="border"
					/>
				</a>
				<div className="d-flex w-100">
					<div className="col-sm-8 d-md-flex">
						<div className="col-md-6">
							<h5 className="mb-1">
								<a href={developer.url}>{developer.name}</a>
							</h5>
							<h6 className="fw-normal">
								<a href={developer.url}>{developer.username}</a>
							</h6>
						</div>
						<div className="col-md-6 developer-detail">
							<small>
								<FireIcon /> POPULAR REPO
							</small>
							<h4 className="h6 mt-1">
								<a
									href={developer.popularRepository.url}
									className="d-block  text-truncate"
								>
									<RepositoryIcon />
									<span className="ps-2">
										{developer.popularRepository.repositoryName}
									</span>
								</a>
							</h4>
							<p className="small mb-0">
								{developer.popularRepository.description}
								fa
							</p>
						</div>
					</div>
					<div className="col-sm-4 d-flex flex-sm-justify-end ml-sm-3">
						<div className="ms-auto">
							<Button href="#" variant="light btn-sm" className="border">
								Follow
							</Button>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};
