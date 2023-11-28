import React from 'react';
import { useQuery } from '@apollo/client';
import {QUERY_USER} from '../../utils/queries'

const FriendsList = ({ username }) => {
	const { loading, error, data } = useQuery(QUERY_USER, {
		variables: { username },
    });
    console.log(data);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const { friends } = data.user;

	if (!friends.length) {
		return <h4>No friends. Go make some :D</h4>;
	}

	return (
		<ul className='list-none'>
			{friends.map((friends) => (
				<li key={friends._id}>{friends.username}</li>
			))}
		</ul>
	);
};

export default FriendsList;