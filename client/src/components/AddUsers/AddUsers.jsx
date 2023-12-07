import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_USERS } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutation';
import {
	saveFriendsId,
	getSavedUserIds,
} from '../../utils/localstorage';
import Auth from '../../utils/auth';

const AddUser = () => {
	const [addFriend] = useMutation(ADD_FRIEND);
	const [users, setUsers] = useState([]);
	const { loading, error, data } = useQuery(ALL_USERS);
	const [savedUserIds, setSavedUserIds] =
		useState(
			getSavedUserIds()
		);

	useEffect(() => {
		
			return () => saveFriendsId(savedUserIds);
		
	});
	//try useeffect on gettoken from the auth.js file

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const allUsers = data.users;

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		if (!data) {
			return false;
		}

		try {
			const dbUserList = allUsers.map((user) => ({
				username: user.username,
				friendsId: user._id || ['nothing to show'],
			}));

			setUsers(dbUserList);
		} catch (err) {
			console.log(err);
		}
	};

	const handleAddFriend = async (_id) => {
					const token = Auth.loggedIn() ? Auth.getToken() : null;

					if (!token) {
						return false;
					}
		const userToSave = allUsers.find(
			(user) => user._id === _id
		);

		try {
			addFriend({
				variables: {
					username: userToSave.username,
					friendsId: userToSave._id,
				},
				refetchQueries: [
					{
						query: ALL_USERS,
					},
				],
			});

			setUsers((prevUsers) =>
				prevUsers.map((user) =>
					user._id === _id ? { ...user, added: true } : user
				)
			);

			setSavedUserIds((prevIds) => [...prevIds, _id]);
			saveFriendsId(String(userToSave.friendsId));
		} catch (err) {
			console.error(err);
		}
	};

		const filteredUsers = allUsers.filter(
			(username) => !savedUserIds.includes(username._id)
		);
	console.log(filteredUsers);
//log now showing filtered users minus the added user, still working on filtering logged user
	return (
		<div
			style={{
				overflowY: 'auto',
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
			}}
		>
			<form onSubmit={handleFormSubmit}>
				{filteredUsers.map((user) => (
					<div
						key={user._id}
						className='text-white feed-userListBg pt-4'
					>
						<div className='postBg rounded-lg shadow-md flex justify-between items-center p-4'>
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
			</form>
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
