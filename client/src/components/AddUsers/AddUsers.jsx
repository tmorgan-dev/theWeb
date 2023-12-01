import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_USERS } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutation';

const AddUser = () => {
    const { loading, error, data } = useQuery(ALL_USERS);

    const [addFriend] = useMutation(ADD_FRIEND);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const users = data.users;

    const handleAddFriend = (userId) => {
        addFriend({
            variables: {
                username: username,
                friendsId: userId
            }
        });
    };

    return (
<div style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
  {users.map((user) => (
    <div key={user._id} className="bg-purple-9000  overAllFont text-white flex justify-between items-center p-4">
      <p>{user.username}</p>
      <button onClick={() => handleAddFriend(user._id)} className="buttons text-white px-4 py-2 rounded">
        Add Friend
      </button>
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
}

export default AddUser;