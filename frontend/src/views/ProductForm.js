import { gql } from "apollo-boost";
import { useMutation, useQuery } from "react-apollo";

import { navigate } from "@reach/router";

const GET_CATEGORIES = gql`
	query {
		categories {
			id
			title
		}
	}
`;

const CREATE_PRODUCT = gql`
	mutation createProduct(
		$title: String!
		$description: String!
		$category: Int!
		$price: Float!
		$image: String!
		$availableQuantity: Int!
	) {
		createProduct(
			input: {
				title: $title
				description: $description
				category: $category
				price: $price
				image: $image
				availableQuantity: $availableQuantity
			}
		) {
			product {
				id
				title
				description
				price
				image
				availableQuantity
				category {
					id
					title
				}
			}
		}
	}
`;

const ProductForm = () => {
	const { loading, data } = useQuery(GET_CATEGORIES);

	let title, description, category, price, image, availableQuantity;

	const [createProduct] = useMutation(CREATE_PRODUCT);

	const submitForm = (e) => {
		e.preventDefault();
        createProduct({
			variables: {
				title: title.value,
				description: description.value,
				category: category.value,
				price: price.value,
				image: image.value,
				availableQuantity: availableQuantity.value,
			},
		});

		return navigate("/products");
	};

	if (loading) {
		return <p>Loading</p>;
	}

	return (
		<div className="px-8 sm:px-12 md:px-40">
			<h1 className="text-lg mb-8">Add a product</h1>
			<form className="flex flex-col space-y-8 w-60" onSubmit={submitForm}>
				<div className="flex flex-col space-y-2">
					<label htmlFor="title" className="">
						Title:
					</label>
					<input
						ref={(node) => (title = node)}
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
						type="text"
						id="title"
						name="title"
						placeholder="Title"
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label htmlFor="description">Description:</label>
					<textarea
						ref={(node) => (description = node)}
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
						id="description"
						name="description"
						placeholder="Description"
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label htmlFor="category">Category:</label>
					<select
						ref={(node) => (category = node)}
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
						id="category"
						name="category"
						defaultValue=""
					>
						<option disabled value="">
							Category
						</option>
						{data.categories.map((c) => {
							return (
								<option key={c.id} value={c.id}>
									{c.title}
								</option>
							);
						})}
					</select>
				</div>
				<div className="flex flex-col space-y-2">
					<label htmlFor="image">Product Image:</label>
					<input
						type="text"
						ref={(node) => (image = node)}
						id="image"
						name="image"
						defaultValue=""
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label htmlFor="price">Price:</label>
					<input
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
						type="number"
						ref={(node) => (price = node)}
						id="price"
						name="price"
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label htmlFor="quantity">Quantity:</label>
					<input
						ref={(node) => (availableQuantity = node)}
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                    focus:ring-4 focus:outline-none focus:border-purple-300"
						type="number"
						id="quantity"
						name="quantity"
					/>
				</div>
				<button
					className="rounded-sm ring-2 text-xl p-2 bg-purple-500 text-white 
                transition-all duration-100 ease-linear hover:bg-purple-600 hover:ring-4 ring-purple-300"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	);
};
export default ProductForm;
