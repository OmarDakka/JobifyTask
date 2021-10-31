import { navigate } from "@reach/router";

const Navbar = (props) => {
	let username = "";

	const token = localStorage.getItem("token");

	const isTokenExpired = (token) =>
		Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		navigate("/products");
	};

	let acountSection = (
		<div className="flex space-x-3">
			<a href="/login">Login</a>
			<a href="/register">Register</a>
		</div>
	);

	if (token && !isTokenExpired(token)) {
		username = JSON.parse(atob(token.split(".")[1])).username;

		acountSection = (
			<div className="flex space-x-3">
				<p>Welcome {username}</p>
				<a href="/create">Add Product</a>
				<button onClick={handleLogout}>Logout</button>
			</div>
		);
	}

	return (
		<nav
			className="bg-purple-600 z-10 dark:bg-black text-white
			 dark:text-white fixed top-0 w-screen  h-16 p-2 mb-2 text-xl"
		>
			<div className="container mx-auto flex justify-between px-16 mt-2">
				E-Commerce
				{acountSection}
			</div>
		</nav>
	);
};

export default Navbar;
