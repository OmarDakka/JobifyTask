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
		<div key={id}>
			<p>{title}</p>
		</div>
	));
};
export default ProductPage;
