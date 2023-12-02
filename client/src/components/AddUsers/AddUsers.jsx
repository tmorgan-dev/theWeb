import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_USERS } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutation';


const AddUser = () => {
	const { loading, error, data } = useQuery(ALL_USERS);
	const [_users, setUsers] = useState(data ? data.users : []);

	const [addFriend] = useMutation(ADD_FRIEND);
	if (loading) return <p>Loading...</p>;
	
	if (error) return <p>Error: {error.message}</p>;

	const allUsers = data.users;
console.log(allUsers)
	const handleAddFriend = async (friendsId, username) => {
		try {
			addFriend({
				variables: {
					username: username,
					friendsId: friendsId,
				},
				refetchQueries: () => [
					{
						query: ALL_USERS,
					},
				],
			});
			console.log(friendsId);
			setUsers((prevUsers) =>
				prevUsers.map((user) =>
					user._id === _id ? { ...user, added: true } : user
				)
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
			{allUsers.map((user) => (
				<div
					key={user._id}
					className='text-white feed-userListBg'
				>
					<div className='postBg  flex justify-between items-center p-4'>
						<p className='text-2xl'>{user.username}</p>
						<button
							onClick={() =>
								handleAddFriend(user._id, user.username)
							}
							className='buttons text-white px-4 py-2 rounded'
						>
							Add Friend
						</button>
					</div>
				</div>
			))}
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

export default AddUser;
