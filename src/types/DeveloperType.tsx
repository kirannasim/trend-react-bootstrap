export interface RepoType {
	repositoryName: string;
	description: string | null;
	url: string;
	type: string;
}

export interface DeveloperType {
	rank: number;
	username: string;
	name: string;
	url: string;
	avatar: string;
	since: string;
	popularRepository: RepoType;
}
