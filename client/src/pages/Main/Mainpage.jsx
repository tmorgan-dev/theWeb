import Profile from '../../components/Profile/Profile'

const Mainpage = () => {
	return (
	<div className="flex h-screen">
		<div className="w-1/4 bg-purple-1000 mt-14 pt-9">
		{/* Content for Left Column */}
		<Profile />
		{/* profile page here */}
		</div>
		<div className="w-1/2 bg-gray-300">
		{/* Content for Middle Column */}
		{/* feed page here */}
		</div>
		{/* Right Column with half and half vv */}
		<div className="w-1/4 bg-gray-400 flex flex-col">
		<div className="h-1/2 bg-gray-500 overflow-y-auto">
			{/* Content for Upper Section of Right Column, overflow-y-auto enables the scrolling effect we want */}
			{/*friend list page*/}
		</div>
		{/* Lower Section */}
		<div className="h-1/2 bg-gray-600 overflow-y-auto">
			{/* Content for Lower Section of Right Column, overflow-y-auto enables the scrolling effect we want */}
			{/* add user page */}
		</div>
		</div>
	</div>
	);
};

export default Mainpage;
