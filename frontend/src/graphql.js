import ApolloClient from "apollo-boost";

const token = localStorage.getItem("token");

export const graphqlClient = new ApolloClient({
	uri: "http://localhost:8000/graphql/", // your GraphQL Server ,
	headers: {
		authorization: token ? `JWT ${token}` : "",
	},
});
