// const client = ...
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "react-apollo";
import Product from "../components/product";

const QUERY_PRODUCTS = gql`
	query products(
		$search: String!
		$min: Float!
		$max: Float!
		$orderBy: String!
	) {
		products(search: $search, min: $min, max: $max, orderBy: $orderBy) {
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

const GET_CATEGORIES = gql`
	query {
		categories {
			id
			title
		}
	}
`;

let searchForm = {
	category: "",
	search: "",
	min: 0,
	max: 99999999999999,
	orderBy: "",
};

const ProductPage = () => {
	let [queryProducts, { called, data, loading }] = useLazyQuery(
		QUERY_PRODUCTS,
		{
			variables: {
				search: searchForm.search,
				min: searchForm.min,
				max: searchForm.max,
				orderBy: searchForm.orderBy,
			},
		}
	);

	if (!called) {
		queryProducts();
	}

	const categoriesResult = useQuery(GET_CATEGORIES);

	const submit = (e) => {
		e.preventDefault();

		console.log({ searchForm });

		queryProducts({
			search: searchForm.search,
			min: searchForm.min,
			max: searchForm.max,
			orderBy: searchForm.orderBy,
		});
		
		queryProducts({
			search: searchForm.search,
			min: searchForm.min,
			max: searchForm.max,
			orderBy: searchForm.orderBy,
		});
	};

	return (
		<div className="container mx-auto">
			<div className="mb-8">
				<form className="flex space-x-4" onSubmit={submit}>
					<select
						ref={(node) => (searchForm.category = node?.value)}
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
						focus:ring-4 focus:outline-none focus:border-purple-300"
						id="category"
						name="category"
						defaultValue={searchForm.category}
					>
						<option value="">Category</option>
						{categoriesResult &&
							categoriesResult.data &&
							categoriesResult.data.categories.map((c) => {
								return (
									<option key={c.id} value={c.id}>
										{c.title}
									</option>
								);
							})}
					</select>

					<input
						ref={(node) => (searchForm.search = node?.value)}
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                    		focus:ring-4 focus:outline-none focus:border-purple-300"
						type="text"
						placeholder="Search Products"
						defaultValue={searchForm.search}
					/>

					<input
						type="number"
						ref={(node) => (searchForm.min = node?.value)}
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                    		focus:ring-4 focus:outline-none focus:border-purple-300"
						placeholder="Min Price"
						defaultValue={searchForm.min}
					/>

					<input
						type="number"
						ref={(node) => (searchForm.max = node?.value)}
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                    		focus:ring-4 focus:outline-none focus:border-purple-300"
						placeholder="Max Price"
						defaultValue={searchForm.max}
					/>

					<select
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
						id="category"
						name="category"
						ref={(node) => (searchForm.orderBy = node?.value)}
						defaultValue={searchForm.orderBy}
					>
						<option disabled value="">
							Order by
						</option>
						<option value="asc">Newest to Oldest</option>
						<option value="desc">Oldest to Newest</option>
					</select>

					<button
						className="rounded-sm ring-2 p-2 bg-purple-500 text-white 
                			transition-all duration-100 ease-linear hover:bg-purple-600 hover:ring-4 ring-purple-300"
						type="submit"
					>
						Search
					</button>
				</form>
			</div>
			<div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{data &&
					data.products &&
					data.products.map((product) => (
						<Product key={product.id} product={product} />
					))}
			</div>
		</div>
	);
};

export default ProductPage;
