import {useState, useEffect} from 'react';
// Placeholder pic until option is created for user to select other images or upload personal profile image
import dragonFly from '../../assets/images/Dragonfly.png';
import './style.css';
// import { FaLinkedin, FaGithub, FaStackOverflow, FaInstagram } from 'react-icons/fa6';

function Profile({ name, bio, pic, url, GitHubURL, LinkedInURL, StackOverflowURL, InstagramURL }) {
    const [userName, setUserName] = useState('');
    const [userBio, setUserBio] = useState('');

    useEffect(() => {
        // Use API call for userdata, delete placeholders in quotations when ready to upload user profile
        // placeholder until API call for Profile name is made
        setUserName('Potato');
        // placeholder until API call for Bio is made
        setUserBio('I am a software developer. Yay!');
    }, [])


    return (
        <div className='profile'>
            <div className='profilePic rounded-full mx-auto border-2 mb-4'>
                {/* <img src={ pic } alt={ title } /> */}
                <img src={ dragonFly } alt='dragonfly' className='object-fill'/>
            </div>

            <div className='profileName'>{userName}</div>

            <div className='bio mb-5'>{userBio}</div>

            {/* TODO: Add icons to social media links */}
            <a href={ GitHubURL } target='_blank'>
                <h2>GitHub:</h2>
            </a>
            <a href={ LinkedInURL } target='_blank'>
                <h2>LinkedIn:</h2>
            </a>
            <a href={ InstagramURL } target='_blank'>
                <h2>Instagram:</h2>
            </a>
            <a href={ StackOverflowURL } target='_blank'>
                <h2>StackOverflow:</h2>
            </a>
        </div>
    );
}

export default Profile;