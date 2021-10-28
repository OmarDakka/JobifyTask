import "./App.css";
import { Router } from "@reach/router";
import ProductPage from "./views/ProductPage";
import { graphqlClient } from "./graphql";
import { ApolloProvider } from "@apollo/react-hooks";
import { useState } from "react";

let darkClass = "dark";

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
		<div className={darkClass} onClick={toggle}>
			<ApolloProvider client={graphqlClient}>
				<Router>
					<ProductPage path="/products" />
				</Router>
			</ApolloProvider>
		</div>
	);
}

export default App;
