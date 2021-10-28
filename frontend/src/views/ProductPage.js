// const client = ...
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import Product from "../components/product";

const QUERY_PRODUCTS = gql`
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
	const { data, loading } = useQuery(QUERY_PRODUCTS);

	if (loading) return <p>Loading...</p>;

	return (
	    <div className="grid gap-8 gap-y-10 grid-cols-1 md:grid-cols-4 sm:px-12 md:px-40">
            {data.products.map((product) => (<Product key={product.id} product={product} />))}
        </div>
    );
};

export default ProductPage;
