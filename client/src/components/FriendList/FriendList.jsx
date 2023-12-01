import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

const FriendsList = ({ username }) => {
	// console.log({ username });
	const { loading, error, data } = useQuery(QUERY_ME, {
		variables: { _id: username },
	});
	// console.log(data);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const { friends } = data.me;

	if (!friends.length) {
		return <h4 className="text-white postBg text-2xl">No friends. Go make some nerd :D</h4>;
	}

	return (
		<ul className='list-none text-white postBg text-2xl'>
			{friends.map((friends) => (
				<li key={friends._id}>{friends.username}</li>
			))}
		</ul>
	);
};

export default FriendsList;
