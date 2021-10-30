import React from "react";
import { useState } from "react";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import { navigate } from "@reach/router";

const LOGIN = gql`
	mutation tokenAuth($username: String!, $password: String!) {
		tokenAuth(username: $username, password: $password) {
			success
			token
			refreshToken
			user {
				id
				username
			}
		}
	}
`;

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const [login, { data, loading, error }] = useMutation(LOGIN);
	if (loading) return "Submitting...";
	if (error) {
		setLoginError(error.message);
	}

	const loginForm = (e) => {
		e.preventDefault();
		login({
			variables: {
				username: username,
				password: password,
			},
		});
		console.log(data);
        console.log(loginError);
		return navigate("/products");
	};
	return (
		<div>
			<div className="px-8 sm:px-12 md:px-40">
				<h1 className="text-3xl mb-9">Login</h1>
				<form
					onSubmit={loginForm}
					className="flex flex-col space-y-8 w-60"
				>
					<div className="flex flex-col space-y-2">
						<label htmlFor="username">Username: </label>
						<input
							onChange={handleUsername}
							type="text"
							className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
							id="username"
							name="username"
							autoComplete="off"
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="password">Password: </label>
						<input
							onChange={handlePassword}
							type="password"
							className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
							id="password"
							name="password"
							autoComplete="off"
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
		</div>
	);
};

export default Login;
