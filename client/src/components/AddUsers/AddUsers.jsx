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
        <div>
            {users.map(user => (
                <div key={user._id}>
                    <p>{user.username}</p>
                    <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
                </div>
            ))}
        </div>
    );
}

export default AddUser;