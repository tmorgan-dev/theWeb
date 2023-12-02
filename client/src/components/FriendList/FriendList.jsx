// FriendsList.js

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { DELETE_FRIEND } from '../../utils/mutation';

const FriendsList = ({  username }) => {
	const { loading, error, data } = useQuery(QUERY_ME, {
		variables: { friendsId: username },
		refetchQueries: () => [
			{
				query: QUERY_ME,
			},
		],
	});
	// console.log(data);

	const [deleteFriend] = useMutation(DELETE_FRIEND, {
		refetchQueries: () => [
			{
				query: QUERY_ME,
			},
		],
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const { friends } = data.me;

	if (!friends.length) {
		return (
			<h4 className='text-white postBg text-2xl'>
				No friends. Go make some nerd :D
			</h4>
		);
	}

	const handleDeleteFriend = async (friendsId) => {
		console.log(friendsId);
		try {
			const data = await deleteFriend({
				variables: {
					friendsId: friendsId,
				},
			});
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<ul className='list-none text-white postBg text-2xl'>
			{friends.map((friend) => (
				<li key={friend._id}>
					{friend.username}{' '}
					<button
						id={friend._id}
						onClick={(e) => handleDeleteFriend(e.target.getAttribute('id') )}
					>
						Remove Friend
					</button>
				</li>
			))}
		</ul>
	);
};
export default FriendsList;