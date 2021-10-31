import "./App.css";
import { Router } from "@reach/router";
import ProductPage from "./views/ProductPage";
import ProductForm from "./views/ProductForm";
import { graphqlClient } from "./graphql";
import { ApolloProvider } from "@apollo/react-hooks";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { Register } from "./views/Register";
import Login from "./views/Login";
import ProductView from "./views/ProductView";




function App() {

	return (
		<div>
			<ApolloProvider client={graphqlClient}>
				<div className="mt-24 mb-16">
					
					<Router>
						<Login path="/login"/>
						<Register path="/register" />
						<ProductPage path="/products" />
						<ProductView path="/product/:id"/>
						<ProductForm path="/create"/>
					</Router>
				</div>
			</ApolloProvider>
		</div>
	);
}

export default App;
