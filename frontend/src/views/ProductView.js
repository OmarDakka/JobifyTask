import React from "react";
import Navbar from "../components/Navbar";
import { useQuery, useLazyQuery } from "react-apollo";
import { gql } from "apollo-boost";

const GET_DATA = gql`
	query products($id: Int!) {
		products(id: $id) {
			title
			description
			image
			price
			availableQuantity
		}
	}
`;

const ProductView = (props) => {
	let id = props.id;

	let { data, loading } = useQuery(GET_DATA, {
		variables: {
			id: id,
		},
	});

	if (loading) {
		return <p>Loading...</p>;
	}

	console.log({ data });

	return (
		<div>
			<Navbar />
			<div className="flex justify-around ">
				<div className="flex flex-col space-y-8">
					<h1 className="text-3xl mb-8">Product Name: {data.products[0].title}</h1>
					<img
						src={`data:image/png;base64, ${data.products[0].image}`}
						alt="product-image"
                        className="h-72"
					/>
					<a className="rounded-sm ring-2 text-xl p-2 bg-purple-500 text-white 
                transition-all duration-100 ease-linear hover:bg-purple-600 hover:ring-4 ring-purple-300 w-44" href="/products">Back to Products</a>
				</div>
				<div className="mt-10 mr-7 flex-col space-y-8">
					<h1 className="text-2xl">Product Description: {data.products[0].description}</h1>
					<h1 className="text-2xl">Product Price: {data.products[0].price}</h1>
					<h1 className="text-2xl">
						Product Quantity: {data.products[0].availableQuantity} left
					</h1>
					<br />
					<br />
				</div>
			</div>
		</div>
	);
};

export default ProductView;
