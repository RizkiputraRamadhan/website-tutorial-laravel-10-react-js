import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
return (
<>
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
    </link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div className="h-screen bg-white">
        <nav className="bg-white border-b border-gray-100 rounded-b-2xl">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                            <img src={`/storage/kuliit_logo.png`} alt="Logo" className="w-28" />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">

                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 flex relative">
                            <div className="text-sm mr-2">
                                <p className='text-center'>{user.name.toUpperCase()}</p>
                                <button className=' flex ml-auto'><a className='mr-2 text-black' href="/"><span
                                    className="btn btn-xs bg-primary">Home</span></a> { user.typeuser == 1 ? <span
                                        className="btn btn-xs bg-green-700 text-white">Master</span> : user.typeuser ==
                                    2 ?
                                    <span className="btn btn-xs bg-blue-700 text-white">Author</span> : user.typeuser ==
                                    3 ?
                                    <span className="btn btn-xs bg-red-700 text-white">User</span> : 'unknown'
                                    }</button>
                            </div>
                            <div className="avatar online">
                                <div className="w-10 rounded-full">
                                    <img src={`/storage/admin.jpg`} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="-me-2 flex items-center sm:hidden">
                        <button onClick={()=> setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden' }
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                                <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden' }
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={(showingNavigationDropdown ? 'block' : 'hidden' ) + ' sm:hidden' }>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="avatar online ">
                        <div className="w-10 m-2 rounded-full">
                            <img src={`/storage/admin.jpg`} alt='' />
                        </div>
                    </div>
                    <div className="px-4">
                        <div className="font-bold text-base text-gray-800">{user.name.toUpperCase()}</div>
                        <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        <button className='flex my-2 '> { user.typeuser == 1 ? <span
                                className="btn btn-xs bg-green-700 text-white">Master</span> : user.typeuser == 2 ?
                            <span className="btn btn-xs bg-blue-700 text-white">Author</span> : user.typeuser == 3 ?
                            <span className="btn btn-xs bg-red-700 text-white">User</span> : 'unknown' }</button>
                    </div>
                </div>
                <div className="shadow-inner rounded-b-2xl mt-2 ">
                    <ul className="menu rounded-box">
                        <li>
                            <a href='/admin/dashboard'>
                                <i class="fa-solid fa-house "></i>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href='/profile'>
                                <i class="fa-regular fa-address-card"></i>
                                Accounts
                            </a>
                        </li>
                        <li>
                            <a href='/admin/playlist'>
                                <i class="fa-solid fa-circle-play"></i>
                                Playlist
                            </a>
                        </li>
                        <li>
                            <a href='/admin/users'>
                                <i class="fa-solid fa-users"></i>
                                Users
                            </a>
                        </li>
                        <li>
                            <a href='/admin/authors'>
                                <i class="fa-solid fa-pen-to-square"></i>
                                Authors
                            </a>
                        </li>
                        <li>
                            <a href='/admin/tutorials'>
                                <i class="fa-solid fa-signs-post"></i>
                                Posingan
                            </a>
                        </li>
                        <li>
                            <a href='/admin/tutorialsDraft'>
                                <i class="fa-solid fa-signs-post"></i>
                                Draft
                            </a>
                        </li>
                        <li>
                            <a href='/logout'>
                                <i class="fa-solid fa-right-from-bracket"></i>
                                Logout
                            </a>
                        </li>
                        <li className='bg-primary rounded'>
                            <a href='/'>
                                <i class="fa-solid fa-b"></i>
                                Back To Home
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>

        <main className='bg-white h-f w-full flex'>
            <div className="w-48 bg-white shadow-inner rounded-r-2xl mt-2 max-md:hidden">
                <ul className="menu rounded-box">
                    <li>
                        <a href='/admin/dashboard'>
                            <i class="fa-solid fa-house "></i>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href='/profile'>
                            <i class="fa-regular fa-address-card"></i>
                            Accounts
                        </a>
                    </li>
                    <li>
                        <a href='/admin/playlist'>
                            <i class="fa-solid fa-circle-play"></i>
                            Playlist
                        </a>
                    </li>
                    <li>
                        <a href='/admin/users'>
                            <i class="fa-solid fa-users"></i>
                            Users
                        </a>
                    </li>
                    <li>
                        <a href='/admin/authors'>
                            <i class="fa-solid fa-pen-to-square"></i>
                            Authors
                        </a>
                    </li>
                    <li>
                        <a href='/admin/tutorials'>
                            <i class="fa-solid fa-signs-post"></i>
                            Posingan
                        </a>
                    </li>
                    <li>
                        <a href='/admin/tutorialsDraft'>
                            <i class="fa-solid fa-signs-post"></i>
                            Draft
                        </a>
                    </li>
                    <li>
                        <a href='/logout'>
                            <i class="fa-solid fa-right-from-bracket"></i>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
            <div className="w-full bg-white mt-2 ml-2 shadow-inner rounded-l-2xl">
                {children}
            </div>
        </main>
    </div>
</>
);

}
