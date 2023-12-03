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
		<div
		style={{
			overflowY: 'auto',
			scrollbarWidth: 'none',
			msOverflowStyle: 'none',
		}}>
			{friends.map((friend) => (
				<div key={friend._id} className='text-white feed-userListBg'>
					<div className='postBg  flex justify-between items-center p-4'>
						<p className="text-2xl">{friend.username}{' '}</p>
							<button className='buttons text-white px-4 py-2 rounded' id={friend._id} onClick={(e) => handleDeleteFriend(e.target.getAttribute('id') )}>
							Remove Friend
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
export default FriendsList;