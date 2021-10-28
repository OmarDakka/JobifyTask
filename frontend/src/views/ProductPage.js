// const client = ...
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

const QUERY_USERS = gql`
	query {
		products {
			id
			title
			description
			price
			availableQuantity
			category {
				id
				title
			}
		}
	}
`;

const ProductPage = () => {
	const { data, loading } = useQuery(QUERY_USERS);

	if (loading) return <p>Loading...</p>;

	return data.products.map(({ id, title }) => (
		<div key={id} className="dark:bg-black dark:text-white border-2 border-purple-600 p-2 m-2 border-opacity-10">
			<p>{title}</p>
		</div>
	));
};
export default ProductPage;
