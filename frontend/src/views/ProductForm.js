import { gql } from "apollo-boost";
import { useMutation, useQuery } from "react-apollo";
import { navigate } from "@reach/router";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const GET_CATEGORIES = gql`
	query {
		categories {
			id
			title
		}
		me {
			username
			id
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
		$userId: String!
	) {
		createProduct(
			input: {
				title: $title
				description: $description
				category: $category
				price: $price
				image: $image
				availableQuantity: $availableQuantity
				userId: $userId
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
	const token = localStorage.getItem("token");

	if (!token) {
		navigate("/login");
	}

	const isTokenExpired = (token) =>
		Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;

	if (isTokenExpired(token)) {
		navigate("/login");
	}

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [availableQuantity, setAvailableQuantity] = useState(0);
	const [image, setImage] = useState("");
	const [category, setCategory] = useState(0);
	const [titleError, setTitleError] = useState("");
	const [descriptionError, setDescriptionError] = useState("");
	const [availableQuantityError, setAvailableQuantityError] = useState("");
	const [priceError, setPriceError] = useState("");
	const [imageError, setImageError] = useState("");
	const [categoryError, setCategoryError] = useState("");

	const handleTitle = (e) => {
		setTitle(e.target.value);
		if (e.target.value.length < 1) {
			setTitleError("Title is required!");
		} else if (e.target.value.length < 3) {
			setTitleError("Title must be at least 3 characters or longer!");
		} else setTitleError("");
	};
	const handleDescription = (e) => {
		setDescription(e.target.value);
		if (e.target.value.length < 1) {
			setDescriptionError("Description is required!");
		} else if (e.target.value.length < 15) {
			setDescriptionError(
				"Description must be at least 15 characters or longer!"
			);
		} else setDescriptionError("");
	};
	const handlePrice = (e) => {
		setPrice(e.target.value);
		if (e.target.value === 0) {
			setPriceError("Price is required,nothing for free!");
		} else if (e.target.value < 3) {
			setPriceError("Price should be at least $3, you need profit!");
		} else setPriceError("");
	};
	const handleCategory = (e) => {
		setCategory(e.target.value);
		if (e.target.value < 1) {
			setCategoryError("Category is required!");
		} else setCategoryError("");
	};
	const handleImage = (e) => {
		setImage(e.target.value);
		if (e.target.value.length < 1) {
			setImageError("Image is required!");
		} else setImageError("");
	};
	const handleAvailableQuantity = (e) => {
		setAvailableQuantity(e.target.value);
		if (e.target.value < 1) {
			setAvailableQuantityError("Quantity is required!");
		} else if (e.target.value < 2) {
			setAvailableQuantityError("Quantity must be at least 2 units!");
		} else setAvailableQuantityError("");
	};

	const { loading, data } = useQuery(GET_CATEGORIES);

	let userId = "";

	if (data && data.me && data.me.username) {
		userId = data.me.username;
	}

	const [createProduct] = useMutation(CREATE_PRODUCT);

	const submitForm = async (e) => {
		e.preventDefault();

		let variables = {
			title: title,
			description: description,
			category: category,
			price: price,
			image: image,
			availableQuantity: availableQuantity,
			userId: userId,
		};

		await createProduct({ variables });

		return navigate("/products");
	};

	if (loading) {
		return <p>Loading</p>;
	}
	return (
		<div>
			<Navbar />
			<div className="px-8 sm:px-12 md:px-40">
				<h1 className="text-lg mb-8">Add a product</h1>
				<form
					className="flex flex-col space-y-8 w-60"
					onSubmit={submitForm}
				>
					<div className="flex flex-col space-y-2">
						<label htmlFor="title" className="">
							Title:
						</label>
						<input
							onChange={handleTitle}
							className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
							type="text"
							id="title"
							name="title"
							placeholder="Title"
							autoComplete="off"
						/>
						{titleError ? (
							<p className="text-red-600">{titleError}</p>
						) : (
							""
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="description">Description:</label>
						<textarea
							onChange={handleDescription}
							className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
							id="description"
							name="description"
							placeholder="Description"
						/>
						{descriptionError ? (
							<p className="text-red-600">{descriptionError}</p>
						) : (
							""
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="category">Category:</label>
						<select
							onChange={handleCategory}
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
						{categoryError ? (
							<p className="text-red-600">{categoryError}</p>
						) : (
							""
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="image">Product Image:</label>
						<input
							onChange={handleImage}
							type="text"
							id="image"
							name="image"
							defaultValue=""
						/>
						{imageError ? (
							<p className="text-red-600">{imageError}</p>
						) : (
							""
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="price">Price:</label>
						<input
							onChange={handlePrice}
							className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
							type="number"
							id="price"
							name="price"
							defaultValue={price}
						/>
						{priceError ? (
							<p className="text-red-600">{priceError}</p>
						) : (
							""
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="quantity">Quantity:</label>
						<input
							onChange={handleAvailableQuantity}
							className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                    focus:ring-4 focus:outline-none focus:border-purple-300"
							type="number"
							id="quantity"
							name="quantity"
							defaultValue={availableQuantity}
						/>
						{availableQuantityError ? (
							<p className="text-red-600">
								{availableQuantityError}
							</p>
						) : (
							""
						)}
					</div>
					{titleError !== "" ||
					descriptionError !== "" ||
					priceError !== "" ||
					imageError !== "" ||
					categoryError !== "" ||
					availableQuantityError !== "" ? (
						<button
							className="rounded-sm ring-2 text-xl p-2 bg-purple-500 text-white 
                transition-all duration-100 ease-linear   ring-purple-300"
							type="submit"
							disabled="true"
						>
							Submit
						</button>
					) : (
						<button
							className="rounded-sm ring-2 text-xl p-2 bg-purple-500 text-white 
                transition-all duration-100 ease-linear hover:bg-purple-600 hover:ring-4 ring-purple-300"
							type="submit"
						>
							Submit
						</button>
					)}
				</form>
			</div>
		</div>
	);
};
export default ProductForm;
