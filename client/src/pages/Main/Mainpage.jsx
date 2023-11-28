import FriendList from '../../components/FriendList/FriendList';
import AddUsers from '../../components/AddUsers/AddUsers';
import Profile from '../../components/Profile/Profile'
import Feed from '../../components/Feed/Feed';

const Mainpage = () => {
	return (
	<div className="flex h-screen">
		<div className="w-1/4 bg-purple-1000 mt-14 pt-9">
			<Profile />
		</div>
		<div className="w-1/2 feed-userListBg mt-14 pt-9">
			<Feed />
	</div>
	<div className="w-1/4 bg-purple-1000 mt-14 pt-9">
		<div className="h-1/2 bg-gray-500 overflow-y-auto">
			<FriendList />
		</div>
		<div className="h-1/2 bg-gray-600 overflow-y-auto">
			<AddUsers />
		</div>
	</div>
	</div>
	);
};

export default Mainpage;
