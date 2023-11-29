import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
// Placeholder pic until option is created for user to select other images or upload personal profile image
import dragonFly from '../../assets/images/Dragonfly.png';
import './style.css';
// import { FaLinkedin, FaGithub, FaStackOverflow, FaInstagram } from 'react-icons/fa6';

function Profile({ name, bio, pic, url }) {
    // const [userName, setUserName] = useState('');
    const [userInfo, setUserInfo] = useState({
        userName: '',
        userBio: '', 
        gitHub: '',
        linkedIn: '',
        instagram: '',
        stackOverflow: '',
    });

    const { loading, data } = useQuery(QUERY_ME);
    useEffect(() => {
        // Use API call for userdata, delete placeholders in quotations when ready to upload user profile
        // placeholder until API call for Profile name is made
        console.log(data)

        // setUserName('');
        // placeholder until API call for Bio is made
        if (data) {
            setUserInfo({
                userName: data.me.username,
                // TODO: Build form to input Bio data and social media links/data
                userBio: data.me.bio || 'I am a software engineer. Yay!', 
                gitHub: '',
                linkedIn: '',
                instagram: '',
                stackOverflow: '',
            });
        }
    }, [data])


    return (
        <div className='profile'>
            <div className='profilePic rounded-full mx-auto border-2 mb-4'>
                {/* <img src={ pic } alt={ title } /> */}
                <img src={ dragonFly } alt='dragonfly' className='object-fill'/>
            </div>

            <div className='profileName'>{userInfo.userName}</div>

            <div className='bio mb-5'>{userInfo.userBio}</div>

            {/* TODO: Add icons to social media links */}
            <a href={ 'gitHub' } target='_blank'>
                <h2>GitHub:</h2>
            </a>
            <a href={ 'linkedIn' } target='_blank'>
                <h2>LinkedIn:</h2>
            </a>
            <a href={ 'instagram' } target='_blank'>
                <h2>Instagram:</h2>
            </a>
            <a href={ 'stackOverflow' } target='_blank'>
                <h2>StackOverflow:</h2>
            </a>
        </div>
    );
}

export default Profile;