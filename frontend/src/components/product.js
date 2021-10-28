const Product = (props) => {
	return (
		<div className="relative cursor-pointer transition-all duration-300 ease-linear transform hover:scale-105 w-64 bg-white rounded-md shadow-md border-2 border-opacity-25 border-black hover:shadow-xl">
			<h2 className="text-center p-2 mb-2">{props.product.title}</h2>
			
            <img className="h-48 w-64" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" />
			
            <p className="text-sm p-2 mt-4 mb-8 text-gray-600">
				{props.product.description}
			</p>

			<p className="absolute bottom-2 left-2 text-gray-600">
				${props.product.price}
			</p>
		</div>
	);
};

export default Product;
