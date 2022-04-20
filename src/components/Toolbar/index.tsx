import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Navbar } from "react-bootstrap";
import { DropdownSelector } from "../DropdownSelector";
import { searchItems } from "../../globals/searchItems";

interface ToolbarProps {
	ranges: string[];
}

export const Toolbar: React.FC<ToolbarProps> = ({ ranges }) => {
	const path = window.location.pathname;
	const buttons = [
		{
			path: "/",
			label: "Repositories",
		},
		{
			path: "/developers",
			label: "Developers",
		},
	];

	return (
		<Navbar bg="light" className="border mt-5 rounded-top p-3">
			<ButtonGroup size="sm">
				{buttons.map((button, index) => {
					let variant = path === button.path ? "primary" : "outline-secondary";

					return (
						<Button key={index} href={button.path} variant={variant}>
							{button.label}
						</Button>
					);
				})}
			</ButtonGroup>
			<ButtonToolbar className="ms-auto">
				{searchItems.map((items, index) => {
					if (ranges.indexOf(items.range) !== -1) {
						return <DropdownSelector key={index} items={items} />;
					}
				})}
			</ButtonToolbar>
		</Navbar>
	);
};
