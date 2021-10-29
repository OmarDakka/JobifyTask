const Navbar = (props) => {
	return (
		<nav className="bg-purple-600 z-10 dark:bg-black text-white
			 dark:text-white fixed top-0 w-screen  h-16 p-2 mb-2 text-xl">
			<div className="container mx-auto flex justify-between px-16 mt-2">
				<a href="/create">Add Product</a>
				<a href="#">HELLO</a>
				<a href="#">HELLO</a>
				<a href="#">HELLO</a>
			</div>
		</nav>
	);
};

export default Navbar;
