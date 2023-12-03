export const getSavedUserIds = () => {
	const savedUserIds = localStorage.getItem('id_friend')
		? JSON.parse(localStorage.getItem('id_friend'))
		: [];

	return savedUserIds;
};

export const saveFriendsId = (friendsIdArray) => {
	if (friendsIdArray.length) {
		localStorage.setItem(
			'id_friend',
			JSON.stringify(friendsIdArray)
		);
	} else {
		localStorage.removeItem('id_friend');
	}
};

export const removeFriend = (friendsId) => {
	const savedFriendsId = localStorage.getItem('id_friend')
		? JSON.parse(localStorage.getItem('id_friend'))
		: null;

	if (!savedFriendsId) {
		return false;
	}

	const updateSavedFriendsIds = savedFriendsId?.filter(
		(savedFriendsId) => savedFriendsId !== friendsId
	);
	localStorage.setItem(
		'id_friend',
		JSON.stringify(updateSavedFriendsIds)
	);

	return true;
};
