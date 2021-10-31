import ApolloClient from "apollo-boost";

const token = localStorage.getItem("token");

const isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000

export const graphqlClient = new ApolloClient({
	uri: "http://localhost:8000/graphql/", // your GraphQL Server ,
	headers: {
		authorization: token && !isTokenExpired(token) ? `JWT ${token}` : "",
	},
});
