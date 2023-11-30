import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { FaGithub, FaLinkedin, FaInstagram, FaStackOverflow } from 'react-icons/fa6';
import dragonFly from '../../assets/images/Dragonfly.png';
import './style.css';

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
                userLinkedIn: data.me.linkedIn || '',
                userInstagram: data.me.instagram || '',
                userStackOverflow: data.me.stackOverflow || '',
            });
        }
    }, [data])

    const [gitIcon, pickGitIcon] = useState(false);
    const [linkIcon, pickLinkIcon] = useState(false);
    const [instaIcon, pickInstaIcon] = useState(false);
    const [stackIcon, pickStackIcon] = useState(false);

    const stylesheet = {
        hover: {
            backgroundColor: 'black',
            border: '2px solid violet',
            color: 'white',
            font: 'bold',
        },
        after: {
            backgroundColor: 'black',
            border: '2px solid white',
            color: 'aqua',
            font: 'bold',
        },
    };

    return (
        <div className='profile'>
            <div className='profilePic rounded-full mx-auto border-2 mb-4'>
                {/* <img src={ pic } alt={ title } /> */}
                <img src={ dragonFly } alt='dragonfly' className='object-fill'/>
            </div>

            <div className='profileName'>{userInfo.userName}</div>

            <div className='bio mb-5'>{userInfo.userBio}</div>

            {/* TODO: Add icons to social media links */}
            <div className='container flex justify-center'>
                <a className='btn p-1 m-1 rounded-full inline-block' 
                    href={ userInfo.userGitHub } 
                    target='_blank' 
                    role='button'
                    style={{ ...gitIcon ? stylesheet.hover : stylesheet.after 
                    }} onMouseEnter={() => {
                        pickGitIcon(true)
                    }} onMouseLeave={() => {
                        pickGitIcon(false)
                    }}><FaGithub />
                </a>
                <a className='btn p-1 m-1 rounded-full inline-block' 
                    href={ userInfo.userLinkedIn } 
                    target='_blank' 
                    role='button'
                    style={{ ...linkIcon ? stylesheet.hover : stylesheet.after 
                    }} onMouseEnter={() => {
                        pickLinkIcon(true)
                    }} onMouseLeave={() => {
                        pickLinkIcon(false)
                    }}><FaLinkedin />
                </a>
                <a className='btn p-1 m-1 rounded-full inline-block' 
                    href={ userInfo.userInstagram } 
                    target='_blank' 
                    role='button'
                    style={{ ...instaIcon ? stylesheet.hover : stylesheet.after 
                    }} onMouseEnter={() => {
                        pickInstaIcon(true)
                    }} onMouseLeave={() => {
                        pickInstaIcon(false)
                    }}><FaInstagram />
                </a>
                <a className='btn p-1 m-1 rounded-full inline-block' 
                    href={ userInfo.userStackOverflow } 
                    target='_blank' 
                    role='button'
                    style={{ ...stackIcon ? stylesheet.hover : stylesheet.after 
                    }} onMouseEnter={() => {
                        pickStackIcon(true)
                    }} onMouseLeave={() => {
                        pickStackIcon(false)
                    }}><FaStackOverflow />
                </a>
            </div>
        </div>
    );
}

export default Profile;