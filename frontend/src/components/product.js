const Product = (props) => {
	return (
		<div className="dark:bg-black dark:text-white border-2 border-purple-600 p-2 m-2 border-opacity-10">
			<p>{props.product.title}</p>
		</div>
	);
};

export default Product;
