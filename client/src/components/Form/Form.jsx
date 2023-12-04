import { useState } from "react";
import './style.css'

export default function Modal({showModal, setShowModal}) {
    // const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="flex items-center justify-center h-60">
                <button
                    className=""
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                </button>
            </div>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-50"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative p-auto m-auto bg-white bg-opacity-50 rounded-md shadow-lg">
                                <div className="modalBox">
                                <div className='flex-col container '>


                                {/* <div className="flex items-center justify-center flex-none w-12 h-12 mx-5 bg-purple-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-purple-600"
                                            viewBox="0 0 20 20"
                                            fill="purple"
                                            >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                                />
                                        </svg>
                                    </div> */}
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-white">
                                            Profile Picture
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-black">
                                            Edit Picture?
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-purple-600 rounded-md outline-none ring-offset-2 ring-purple-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Edit
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-white">
                                            Username
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-black">
                                            Edit Username?
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-purple-600 rounded-md outline-none ring-offset-2 ring-purple-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Edit
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-white">
                                            Bio
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-black">
                                            Edit Bio?
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-purple-600 rounded-md outline-none ring-offset-2 ring-purple-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Edit
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-white">
                                            GitHub
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-black">
                                            Edit/Add GitHub profile link?
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-purple-600 rounded-md outline-none ring-offset-2 ring-purple-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Edit
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-white">
                                            LinkedIn
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-black">
                                            Edit/Add LinkedIn profile link?
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-purple-600 rounded-md outline-none ring-offset-2 ring-purple-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Edit
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-white">
                                            Instagram
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-black">
                                            Edit/Add Instagram profile link?
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-purple-600 rounded-md outline-none ring-offset-2 ring-purple-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Edit
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-white">
                                            StackOverflow
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-black">
                                            Edit/Add StackOverflow profile link?
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-purple-600 rounded-md outline-none ring-offset-2 ring-purple-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Edit
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto mt-9 bg-red-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-red-600"
                                            viewBox="0 0 20 20"
                                            fill="red"
                                            >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                                />
                                        </svg>
                                    </div>
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-white">
                                            Delete account ?
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-white">
                                            Are you sure you want to delete your account?
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Delete
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}