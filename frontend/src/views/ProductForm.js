const ProductForm = () => {

    

	return (
		<div className="px-8 sm:px-12 md:px-40">
			<h1 className="text-lg mb-8">Add a product</h1>
			<form className="flex flex-col space-y-8 w-60">
				<div className="flex flex-col space-y-2">
					<label for="title" className="">
						Title:
					</label>
					<input
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
						type="text"
						id="title"
						name="title"
						placeholder="Title"
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label for="description">Description:</label>
					<textarea
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
						id="description"
						name="description"
						placeholder="Description"
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label for="category">Category:</label>
					<select
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
						id="category"
						name="category"
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label for="image">Product Image:</label>
					<input type="text" id="image" name="image" value="" />
				</div>
				<div className="flex flex-col space-y-2">
					<label for="price">Price:</label>
					<input
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
						type="number"
						id="price"
						name="price"
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label for="quantity">Quantity:</label>
					<input
						className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                    focus:ring-4 focus:outline-none focus:border-purple-300"
						type="number"
						id="quantity"
						name="quantity"
					/>
				</div>
                <button className="rounded-sm ring-2 text-xl p-2 bg-purple-500 text-white 
                transition-all duration-100 ease-linear hover:bg-purple-600 hover:ring-4 ring-purple-300" type="submit">Submit</button>
			</form>
		</div>
	);
};
export default ProductForm;
