import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Repositories } from "./pages/Repositories";
import { Developers } from "./pages/Developers";
import { DescRangeContext } from "./context/DescRangeContext";
import { SelectItemsContext } from "./context/SelectItemsContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function App() {
	const [value, setValue] = React.useState("today");
	const range = "date";
	const date_context = React.useMemo(
		() => ({
			range,
			value,
			setValue,
		}),
		[value]
	);

	const default_items: string = JSON.stringify([[], []]);
	const [searchItems, setSearchItems] = React.useState(default_items);
	const search_context = React.useMemo(
		() => ({
			searchItems,
			setSearchItems,
		}),
		[searchItems]
	);

	return (
		<div className="mb-5">
			<DescRangeContext.Provider value={date_context}>
				<SelectItemsContext.Provider value={search_context}>
					<QueryClientProvider client={queryClient}>
						<BrowserRouter>
							<Routes>
								<Route
									path="/"
									element={
										<Repositories
											title="Trending"
											description="See what the GitHub community is most excited about "
											ranges={["spoken_language", "language", "date"]}
										/>
									}
								/>
								<Route
									path="/developers"
									element={
										<Developers
											title="Trending"
											description="These are the developers building the hot tools "
											ranges={["language", "date"]}
										/>
									}
								/>
							</Routes>
						</BrowserRouter>
					</QueryClientProvider>
				</SelectItemsContext.Provider>
			</DescRangeContext.Provider>
		</div>
	);
}

export default App;
