import React from "react";
import { useState } from "react";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import { navigate } from "@reach/router";

const CREATE_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password1: String!
		$password2: String!
	) {
		register(
			username: $username
			email: $email
			password1: $password1
			password2: $password2
		) {
			success
			errors
			token
			refreshToken
		}
	}
`;

export const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const handleUsername = (e) => {
		setUsername(e.target.value);
		if (e.target.value.length < 1) {
			setUsernameError("Username is required!");
		} else if (e.target.value.length < 3) {
			setUsernameError(
				"Username must be at least 3 characters or longer!"
			);
		} else setUsernameError("");
	};
	const handleEmail = (e) => {
		setEmail(e.target.value);
		if (e.target.value.length < 1) {
			setEmailError("Email is required!");
		} else setEmailError("");
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
		if (e.target.value.length < 1) {
			setPasswordError("Password is required!");
		} else if (e.target.value.length < 8) {
			setPasswordError(
				"Password must be at least 8 characters or longer!"
			);
		} else setPasswordError("");
	};
	const handleConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
		if (e.target.value.length < 1) {
			setConfirmPasswordError("You need to confirm the password!");
		} else if (e.target.value != password) {
			setConfirmPasswordError(
				"Password doesnt match the previous entered password!"
			);
		} else setConfirmPasswordError("");
	};

	const [createUser, { loading, error }] = useMutation(CREATE_USER);

	if (loading) return "Submitting...";

	if (error) {
		console.log(error.message);
	}

	const submitForm = async (e) => {
		e.preventDefault();

		try {
			let { data } = await createUser({
				variables: {
					username: username,
					email: email,
					password1: password,
					password2: confirmPassword,
				},
			});

			if (data && data.register && data.register.token) {
				localStorage.setItem("token", data.register.token);
				navigate("/products");
			}
		} catch (error) {
			console.log({ error });
		}
	};
	return (
		<div>
			<div className="px-8 sm:px-12 md:px-40">
				<h1 className="text-3xl mb-9">Sign Up</h1>
				<form
					onSubmit={submitForm}
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
						{usernameError ? (
							<p className="text-red-600">{usernameError}</p>
						) : (
							""
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="email">Email: </label>
						<input
							onChange={handleEmail}
							type="email"
							className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
							id="email"
							name="email"
							autoComplete="off"
						/>
						{emailError ? (
							<p className="text-red-600">{emailError}</p>
						) : (
							""
						)}
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
						/>
						{passwordError ? (
							<p className="text-red-600">{passwordError}</p>
						) : (
							""
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="confPassword">Confirm Password: </label>
						<input
							onChange={handleConfirmPassword}
							type="password"
							className="rounded-sm p-2 ring-2 transition-all duration-200 ease-linear 
                            focus:ring-4 focus:outline-none focus:border-purple-300"
							id="confPassword"
							name="confPassword"
						/>
						{confirmPasswordError ? (
							<p className="text-red-600">
								{confirmPasswordError}
							</p>
						) : (
							""
						)}
					</div>
					{usernameError !== "" ||
					emailError !== "" ||
					passwordError !== "" ||
					confirmPasswordError !== "" ? (
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
