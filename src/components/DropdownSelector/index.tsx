import React, { useContext, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import { DescRangeContext } from "../../context/DescRangeContext";
import { SelectItemsContext } from "../../context/SelectItemsContext";
import { SearchItems } from "../../types/SearchItems";
import { DropdownSelected } from "../DropdownSelected";

type CustomToggleProps = {
	children?: React.ReactNode;
	onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};
};

const CustomToggle = React.forwardRef(
	(props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
		<a
			href="#"
			ref={ref}
			className="btn btn-light btn-sm dropdown-toggle me-2"
			onClick={(e) => {
				e.preventDefault();
				props.onClick(e);
			}}
		>
			{props.children}
		</a>
	)
);

type CustomMenuProps = {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
	labeledBy?: string;
	onKeyUpHandler: (
		event: React.KeyboardEvent<HTMLInputElement>,
		value: string
	) => void;
};

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
	(props: CustomMenuProps, ref: React.Ref<HTMLDivElement>) => {
		const [value, setValue] = useState("");

		const keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
			props.onKeyUpHandler(event, value);
		};

		return (
			<div
				ref={ref}
				style={props.style}
				className={props.className}
				aria-labelledby={props.labeledBy}
			>
				<div className="p-2">
					<FormControl
						autoFocus
						placeholder="Type to filter..."
						onChange={(e) => setValue(e.target.value)}
						onKeyUp={keyUpHandler}
						size="sm"
						value={value}
					/>
				</div>
				<div className="border-top select-item-list">{props.children}</div>
			</div>
		);
	}
);

interface DropdownSelectorProps {
	items: SearchItems;
}

export const DropdownSelector: React.FC<DropdownSelectorProps> = ({
	items,
}) => {
	const [selected, setSelected] = useState(items.selected);
	const [categories, updateCategories] = useState(items.categories);
	const [active, setActive] = useState(-1);
	const { range, value, setValue } = useContext(DescRangeContext);
	const { searchItems, setSearchItems } = useContext(SelectItemsContext);
	const menuRef = React.useRef<HTMLDivElement>(null);

	const onKeyUpHandler = function (
		event: React.KeyboardEvent<HTMLInputElement>,
		value: string
	) {
		const updatedCategories = items.categories.filter(
			(category: any, index: number) => {
				category.state = false;
				return (
					!value ||
					category.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
				);
			}
		);
		if (event.code === "ArrowDown") {
			updatedCategories[0].state = true;
			setActive(0);
		}

		if (event.code === "ArrowUp") {
			updatedCategories[updatedCategories.length - 1].state = true;
			setActive(updatedCategories.length - 1);
		}
		updateCategories(updatedCategories);
	};

	const onItemKeyDown = function (
		event: React.KeyboardEvent<HTMLAnchorElement>
	) {
		if (event.code === "ArrowDown" || event.code === "ArrowUp") {
			event.preventDefault();
			let current = active;
			categories[current].state = false;
			if (event.code === "ArrowDown") {
				current++;
				if (current === categories.length) current = 0;
			}

			if (event.code === "ArrowUp") {
				current--;
				if (current === -1) current = categories.length - 1;
			}
			categories[current].state = true;
			setActive(current);
		}

		if (event.code === "Enter") {
			event.currentTarget.click();
		}
	};

	const onItemClick = function (event: React.MouseEvent<HTMLAnchorElement>) {
		let element = event.currentTarget;
		if (active >= 0 && categories[active]) categories[active].state = false;
		if (menuRef.current !== null) {
			let elements = Array.from(
				menuRef.current.getElementsByClassName("dropdown-item")
			);
			let current = elements.indexOf(element);
			if (current !== -1) {
				setActive(current);
				categories[current].state = true;
			}
		}
	};

	React.useEffect(() => {
		if (active >= 0 && menuRef.current) {
			const activeItem =
				menuRef.current.getElementsByClassName("dropdown-item")[active];
			activeItem.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "start",
			});
			(activeItem as HTMLElement).focus();
		}
	}, [active]);

	return (
		<Dropdown
			onSelect={(eventKey, e) => {
				let item_value = eventKey ? eventKey : items.selected;
				setSelected(item_value);
				if (items.range === range && setValue)
					setValue(
						e.target
							? (e.target as HTMLElement).innerText.toLowerCase()
							: items.label
					);
				if (setSearchItems) {
					let new_items = JSON.parse(searchItems),
						index = new_items[0].indexOf(items.param);

					if (index !== -1) {
						new_items[1][index] = item_value;
					} else {
						new_items[0].push(items.param);
						new_items[1].push(item_value);
					}
					setSearchItems(JSON.stringify(new_items));
				}
			}}
		>
			<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
				<DropdownSelected items={items} selected={selected} />
			</Dropdown.Toggle>

			<Dropdown.Menu
				ref={menuRef}
				as={CustomMenu}
				className="p-0"
				onKeyUpHandler={onKeyUpHandler}
			>
				{categories.map((item, index) => {
					const className =
						"border-bottom small" + (item.state ? " active" : "");

					return (
						<Dropdown.Item
							key={index}
							eventKey={item.value}
							className={className}
							onKeyDown={onItemKeyDown}
							onClick={onItemClick}
						>
							{item.label}
						</Dropdown.Item>
					);
				})}
			</Dropdown.Menu>
		</Dropdown>
	);
};
