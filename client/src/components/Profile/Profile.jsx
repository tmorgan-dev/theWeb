import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { FaGithub, FaLinkedin, FaInstagram, FaStackOverflow } from 'react-icons/fa6';
import { IoSettingsOutline } from "react-icons/io5";
import dragonFly from '../../assets/images/Dragonfly.png';
import Modal from '../Form/Form';
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
    const [showModal, setShowModal] = useState(false);

    const { loading, data } = useQuery(QUERY_ME);
    useEffect(() => {
					// API call for userdata
					if (loading) {
						return;
					}
					console.log(data);

					if (data) {
						setUserInfo({
							userName: data.me.username,
							// Form to input/edit Profile pic, Bio data and social media links/data will from from Form.jsx component 
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
        <div className='profile relative'>
            <div className='profilePic rounded-full mx-auto border-2 mb-4 relative'>
                <img src={ dragonFly } alt='dragonfly' className='object-fill'/>
                <div className='settingsIcon absolute bottom-0 right-3 mb-2 mr-2' style={{ zIndex: 1, margin: '-3px 10px -8px'}}>
                    <button onClick ={() => setShowModal(true)} style={{ zIndex: 1 }}><IoSettingsOutline /></button>
                </div>
            </div>
            <div className='flex flex-col items-center text-center'>
                <div className='profileName mt-5'>{userInfo.userName}</div>
                <div className='bio mb-5'>{userInfo.userBio}</div>
            </div>

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
            {showModal ? <Modal showModal={showModal} userInfo={userInfo} setShowModal={setShowModal}/>: null}
        </div>
    );
}

export default Profile;