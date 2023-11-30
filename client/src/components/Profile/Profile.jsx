import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
// Placeholder pic until option is created for user to select other images or upload personal profile image
import dragonFly from '../../assets/images/Dragonfly.png';
import './style.css';
// import { FaLinkedin, FaGithub, FaInstagram, FaStackOverflow } from 'react-icons/fa6';

function Profile () {
    // const [userName, setUserName] = useState('');
    const [userInfo, setUserInfo] = useState({
        userName: '',
        userBio: '', 
        userGitHub: '',
        userLinkedIn: '',
        userInstagram: '',
        userStackOverflow: '',
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
                userGitHub: data.me.gitHub || '',
                userLinkedIn: data.me.linkedIn || 'https://www.linkedin.com/in/brittany-brimley-390a81293/',
                userInstagram: data.me.instagram || '',
                userStackOverflow: data.me.stackOverflow || '',
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
            <a href={ userInfo.userGitHub } target='_blank'>
                <h2>GitHub:</h2>
            </a>
            <a href={ userInfo.userLinkedIn } target='_blank'>
                <h2>LinkedIn:</h2>
            </a>
            <a href={ userInfo.userInstagram } target='_blank'>
                <h2>Instagram:</h2>
            </a>
            <a href={ userInfo.userStackOverflow } target='_blank'>
                <h2>StackOverflow:</h2>
            </a>
        </div>
    );
}

export default Profile;