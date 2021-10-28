import "./App.css";
import { Router } from "@reach/router";
import ProductPage from "./views/ProductPage";
import { graphqlClient } from "./graphql";
import { ApolloProvider } from '@apollo/react-hooks';


function App() {
	return (
		<ApolloProvider client={graphqlClient}>
			<Router>
				<ProductPage path="/products" />
			</Router>
		</ApolloProvider>
	);
}

export default App;
