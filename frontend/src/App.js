import "./App.css";
import { Router } from "@reach/router";
import ProductPage from "./views/ProductPage";
import { graphqlClient } from "./graphql";
import { ApolloProvider } from "@apollo/react-hooks";
import { useState } from "react";
import Navbar from "./components/Navbar";

let darkClass = "";

function App() {
	//create your forceUpdate hook
	function useForceUpdate() {
		const [value, setValue] = useState(0); // integer state
		return () => setValue((value) => value + 1); // update the state to force render
	}

	const forceUpdate = useForceUpdate();

	const toggle = () => {
		if (darkClass === "dark") {
			darkClass = "";
		} else {
			darkClass = "dark";
		}

		forceUpdate();
	};

	return (
		<div className={darkClass}>
			<Navbar />
			<ApolloProvider client={graphqlClient}>
				<div className="mt-20">
					<Router>
						<ProductPage path="/products" />
					</Router>
				</div>
			</ApolloProvider>
		</div>
	);
}

export default App;
