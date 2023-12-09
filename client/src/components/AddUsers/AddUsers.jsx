import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_USERS, QUERY_ME } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutation';
import {
	saveFriendsId,
	getSavedUserIds,
} from '../../utils/localstorage';

const AddUser = () => {
	const {
		loading: userLoading,
		error: userError,
		data: userData,
	} = useQuery(QUERY_ME);
	const [addFriend] = useMutation(ADD_FRIEND);
	const {
		loading: allUsersLoading,
		error: allUsersError,
		data: allUsersData,
	} = useQuery(ALL_USERS);
	const [savedUserIds, setSavedUserIds] = useState(
		getSavedUserIds()
	);

	useEffect(() => {
		return () => saveFriendsId(savedUserIds);
	});

	if (userLoading || allUsersLoading) return <p>Loading...</p>;
	if (userError)
		return <p>Error fetching user data: {userError.message}</p>;
	if (allUsersError)
		return (
			<p>Error fetching all users: {allUsersError.message}</p>
		);

	const loggedInUser = userData?.me;
	const allUsers = allUsersData?.users || [];

	const handleAddFriend = async (_id) => {
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

			setSavedUserIds((prevIds) => [
				...prevIds,
				userToSave._id,
			]);
		} catch (err) {
			console.error(err);
		}
	};

	const filteredUsers = allUsers.filter(
		(user) =>
			user._id !== loggedInUser?._id &&
			!savedUserIds.includes(user._id)
	);

	return (
		<div
			style={{
				overflowY: 'auto',
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
			}}
		>
			<form>
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
