import FriendList from '../../components/FriendList/FriendList';
import AddUsers from '../../components/AddUsers/AddUsers';
import Profile from '../../components/Profile/Profile'
import AddPost from '../../components/Feed/AddPost';
import PostList from '../../components/Feed/PostList';

const Mainpage = () => {
	return (
	<div className="flex flex-wrap mx-3">
		<div className="w-full sm:w-1/4 bg-purple-1000 mt-14 pt-6 overflow-y-auto">
			<Profile />
		</div>
		<div className="w-full h-screen sm:w-1/2 bg-purple-1000 my-14 py-9 overflow-y-auto" style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
			<AddPost />
			<PostList />
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
	<div className="w-full h-screen sm:w-1/4 bg-purple-1000 my-14 pt-9 pb-14" style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
		<div className="h-1/2 overflow-y-auto">
			<FriendList />
		</div>
		<div className="w-full sm:w-1/4h-1/2 overflow-y-auto">
			<AddUsers />
		</div>
	</div>
	</div>
	);
};

export default Mainpage;
