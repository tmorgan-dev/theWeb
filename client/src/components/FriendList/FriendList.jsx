// FriendsList.js

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { DELETE_FRIEND } from '../../utils/mutation';
import { removeFriend } from '../../utils/localstorage';

const FriendsList = () => {
	const { loading, error, data, refetch } =
		useQuery(QUERY_ME);
	const [deleteFriend] = useMutation(DELETE_FRIEND);
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		if (data?.me) {
			setFriends(data.me.friends);
		}
	}, [data]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const handleDeleteFriend = async (friendId) => {
		try {
			await deleteFriend({
				variables: {
					friendsId: friendId,
				},
			});

			removeFriend(friendId);

			setFriends((prevFriends) =>
				prevFriends.filter((friend) => friend._id !== friendId)
			);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div
			style={{
				overflowY: 'auto',
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
			}}
		>
			{friends.length === 0 ? (
				<h4 className='text-white postBg text-2xl'>
					No friends. Go make some nerd :D
				</h4>
			) : (
				friends.map((friend) => (
					<div
						key={friend._id}
						className='text-white feed-userListBg'
					>
						<div className='postBg  flex justify-between items-center p-4'>
							<button className='text-2xl'>
								{friend.username}
							</button>
							<button
								className='buttons hover:bg-purple-400 text-white px-4 py-2 rounded'
								id={friend._id}
								onClick={(e) =>
									handleDeleteFriend(e.target.getAttribute('id'))
								}
							>
								Remove Friend
							</button>
						</div>
					</div>
				))
			)}
			<style>
				{`
          /* Hide the scrollbar for WebKit browsers */
          ::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for Firefox */
          scrollbar-width: none;
          /* Hide scrollbar for IE/Edge */
          -ms-overflow-style: none;
        `}
			</style>
		</div>
	);
};

export default FriendsList;
