import React from "react";
import {useQuery, useMutation} from 'react-apollo';
import {gql} from 'apollo-boost';

const CREATE_USER = gql`
    mutation createUser ($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        createUser (firstName: $firstName, lastName: $lastName, email:$email,password:$password) {
            id
            firstName
            lastName
            email
            password
        }
    }
`;

export function CreateUser() {
    let firstName,lastName,email,password;

        const [createUser] = useMutation(CREATE_USER);

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createUser({ variables: {

                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                        password: password.value
                    }});
                    
                    firstName.value = '';
                    lastName.value= '';
                    email.value='';
                    password.value='';
                    window.location.reload();
                }}
                style = {{ marginTop: '2em', marginBottom: '2em'}}
                >
                    <label>First Name:</label>
                    <input
                        ref={node => {
                            firstName = node;
                        }}
                        style={{ marginRight: '1em' }}
                    />
                    <label>Last Name:</label>
                    <input
                        ref={node => {
                            lastName = node;
                        }}
                        style={{marginRight: '1em'}}
                    />
                    <label>Email:</label>
                    <input
                        ref={node => {
                            email = node;
                        }}
                        style={{marginRight: '1em'}}
                    />
                    <label>Password:</label>
                    <input
                         
                        ref={node => {
                            password = node;
                        }}
                        style={{marginRight: '1em'}}
                        required
                    />

                    <button type="submit" style={{cursor: 'pointer'}}>Add a User</button>
                </form>
        </div>
    ); 
}

const QUERY_USERS = gql`
    query {
        users {
            id
            firstName
            lastName
            email
            password
        }
    }    
`;

export function UserInfo() {
    const {data,loading} = useQuery(
        QUERY_USERS, {
            pollInterval: 10000
        }
    );

    if (loading) return <p>Loading...</p>;

    return data.users.map(({id,firstName,lastName,email,password}) => (
        <div key={id}>
            <p>
                User - {id}: {firstName} {lastName} - {email} 
            </p>
        </div>
    ));
}