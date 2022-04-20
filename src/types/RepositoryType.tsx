export interface UserType {
	username: string;
	url: string;
	avatar: string;
}

export interface RepositoryType {
	username: string;
	repositoryName: string;
	url: string;
	language: string;
	langcolor: string;
	description: string;
	since: string;
	rank: number;
	totalStars: number;
	forks: number;
	starsSince: number;
	builtBy: UserType[];
}
