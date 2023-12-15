import React, { useState, useEffect } from 'react';
import Footer from '@/Components/Footer';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Interface({ user, playNavbar, children }) {
const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
const [savedTitles, setSavedTitles] = useState([]);
useEffect(() => {
const savedTitlesFromLocalStorage = JSON.parse(localStorage.getItem('savedTitles')) || [];
setSavedTitles(savedTitlesFromLocalStorage);
}, []);
const handleRemoveAllTitles = () => {
setSavedTitles([]);
localStorage.removeItem('savedTitles');
};

return (
<>
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
    </link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div className="h-screen bg-white ">
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
                        {user ? (
                        <>
                            <div className="flex">
                                <div className="">
                                    <button><a className='mr-4' href='/'>Home</a></button>
                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <button tabIndex={0} className="">
                                            <i class="fa-solid fa-circle-play"></i> Playlist
                                        </button>
                                        <ul tabIndex={0}
                                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <p className=' font-bold bg-primary px-1 rounded-2xl'><i
                                                    class="fa-solid fa-earth-asia"></i> Populer</p>
                                            {playNavbar.map((list, index) => (
                                            <li key={index}>
                                                <a href={`/playlist/${list.name.replace(/ /g, '-' )}`}><img
                                                        src={`/storage/${list.image}`} alt="Logo"
                                                        className="w-5 rounded-full" />
                                                    {list.name}</a>
                                            </li>
                                            ))}
                                            <li>
                                                <a className='hover:bg-success font-semibold' href='/playlist'>Lihat
                                                    Yang lain</a>
                                            </li>

                                        </ul>
                                    </div>

                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <button tabIndex={0} className="btn btn-ghost btn-circle">
                                            <div className="indicator">
                                                <i class="fa-regular fa-bookmark fa-shake"></i>
                                                <span className="badge badge-xs badge-primary indicator-item">
                                                    {savedTitles.length}
                                                </span>
                                            </div>
                                        </button>

                                        <ul tabIndex={0}
                                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            {savedTitles.map((title, index) => (
                                            <li key={index}>
                                                <a href={`/${title.replace(/ /g, '-' )}`}><i
                                                        class="fa-regular fa-bookmark"></i>
                                                    {title}</a>
                                            </li>
                                            ))}
                                            <li>
                                                {savedTitles.length > 0 ? (
                                                <a className='btn btn-sm' onClick={()=> { window.location.reload();
                                                    handleRemoveAllTitles(); }}>
                                                    Hapus semua <i className="fa-solid fa-trash-can-arrow-up"></i>
                                                </a>
                                                ) : (
                                                <span>Tidak ada pilihan <br /> <i class="fa-solid fa-face-dizzy"></i>
                                                </span>
                                                )}

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="ms-3 flex relative">
                                <div className="text-sm mr-2">
                                    <p>{user.name.toUpperCase()}</p>
                                    <button className=' flex ml-auto'> { user.typeuser == 1 ? <span
                                            className="btn btn-xs bg-green-700 text-white">Master</span> : user.typeuser
                                        ==
                                        2 ?
                                        <span className="btn btn-xs bg-blue-700 text-white">Author</span> :
                                        user.typeuser ==
                                        3 ?
                                        <span className="btn btn-xs bg-red-700 text-white">User</span> : 'unknown'
                                        } <a className='ml-2 text-black' href="/login"><span
                                                className="btn btn-xs bg-primary">Masuk</span></a></button>
                                </div>
                                <div className="avatar online ">
                                    <div className="w-10 rounded-full">
                                        {user.typeuser == 1 ?
                                        <img src={`/storage/admin.jpg`} alt='' />
                                        : user.typeuser == 2 ?
                                        <img src={`/storage/author.jpeg`} alt='' />
                                        : user.typeuser == 3 ?
                                        <img src={`/storage/user.png`} alt='' />
                                        : ''}
                                    </div>
                                </div>
                            </div>
                        </>
                        ) :
                        (
                        <>
                            <div className="flex">
                                <div className="">
                                    <button><a className='mr-4' href='/'>Home</a></button>
                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <button tabIndex={0} className="">
                                            <i class="fa-solid fa-circle-play"></i> Playlist
                                        </button>
                                        <ul tabIndex={0}
                                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <p className=' font-bold bg-primary px-1 rounded-2xl'><i
                                        class="fa-solid fa-earth-asia"></i> Populer</p>
                                            {playNavbar.map((list, index) => (
                                            <li key={index}>
                                                <a href={`/playlist/${list.name.replace(/ /g, '-' )}`}><img
                                                        src={`/storage/${list.image}`} alt="Logo"
                                                        className="w-5 rounded-full" />
                                                    {list.name}</a>
                                            </li>
                                            ))}
                                            <li>
                                                <a className='hover:bg-success font-semibold' href='/playlist'>Lihat
                                                    Yang lain</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <button tabIndex={0} className="btn btn-ghost btn-circle">
                                            <div className="indicator">
                                                <i class="fa-regular fa-bookmark fa-shake"></i>
                                                <span className="badge badge-xs badge-primary indicator-item">
                                                    {savedTitles.length}
                                                </span>
                                            </div>
                                        </button>

                                        <ul tabIndex={0}
                                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            {savedTitles.map((title, index) => (
                                            <li key={index}>
                                                <a href={`/${title.replace(/ /g, '-' )}`}><i
                                                        class="fa-regular fa-bookmark"></i>
                                                    {title}</a>
                                            </li>
                                            ))}
                                            <li>
                                                {savedTitles.length > 0 ? (
                                                <a className='btn btn-sm' onClick={()=> { window.location.reload();
                                                    handleRemoveAllTitles(); }}>
                                                    Hapus semua <i className="fa-solid fa-trash-can-arrow-up"></i>
                                                </a>
                                                ) : (
                                                <span>Tidak ada pilihan <br /> <i class="fa-solid fa-face-dizzy"></i>
                                                </span>
                                                )}

                                            </li>
                                        </ul>
                                    </div>
                                    <button><a className='btn btn-sm btn-primary ml-2' href='/login'>Login</a></button>
                                    <button><a className='btn btn-sm btn-success ml-2'
                                            href='/register'>Daftar</a></button>
                                </div>

                            </div>
                        </>
                        ) }
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
                {user ? (
                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="avatar online border-l-2">
                        <div className="w-10 m-2 rounded-full">
                            {user.typeuser == 1 ?
                            <img src={`/storage/admin.jpg`} alt='' />
                            : user.typeuser == 2 ?
                            <img src={`/storage/author.jpeg`} alt='' />
                            : user.typeuser == 3 ?
                            <img src={`/storage/user.png`} alt='' />
                            : ''}
                        </div>
                    </div>
                    <div className="px-4">
                        <div className="font-bold text-base text-gray-800">{user ? user.name.toUpperCase() : ''}</div>
                        <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        <button className='flex my-2 '> { user.typeuser == 1 ? <span
                                className="btn btn-xs bg-green-700 text-white">Master</span> : user.typeuser == 2 ?
                            <span className="btn btn-xs bg-blue-700 text-white">Author</span> : user.typeuser == 3 ?
                            <span className="btn btn-xs bg-red-700 text-white">User</span> : 'unknown' }</button>
                    </div>
                </div>
                ) : ''}
                <div className="shadow-inner rounded-b-2xl mt-2 ">
                    <ul className="menu rounded-box">
                        <li>
                            <a href='/'>
                                <i class="fa-solid fa-house "></i>
                                Home
                            </a>
                        </li>
                        <div className="dropdown dropdown-bottom dropdown-center">
                            <li>
                                <a className="indicator" tabIndex={0}>
                                    <i class="fa-solid fa-bookmark fa-shake"></i>
                                    <span className="badge badge-xs badge-primary indicator-item">
                                        {savedTitles.length}
                                    </span>
                                    Bookmark
                                </a>
                            </li>
                            <ul tabIndex={0}
                                className="dropdown-content z-[1] menu m-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {savedTitles.map((title, index) => (
                                <li key={index}>
                                    <a href={`/${title.replace(/ /g, '-' )}`}><i
                                            class="fa-regular fa-bookmark"></i>
                                        {title}</a>
                                </li>
                                ))}
                                <li>
                                    {savedTitles.length > 0 ? (
                                    <a className='btn btn-sm' onClick={()=> { window.location.reload();
                                        handleRemoveAllTitles(); }}>
                                        Hapus semua <i className="fa-solid fa-trash-can-arrow-up"></i>
                                    </a>
                                    ) : (
                                    <span>Tidak ada pilihan <br /> <i class="fa-solid fa-face-dizzy"></i>
                                    </span>
                                    )}

                                </li>
                            </ul>
                        </div>
                        <div className="dropdown dropdown-bottom pl-4 py-2 dropdown">
                            <button tabIndex={0} className="">
                                <i class="fa-solid fa-circle-play"></i> Playlist
                            </button>
                            <ul tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <p className=' font-bold bg-primary px-1 rounded-2xl'><i
                                        class="fa-solid fa-earth-asia"></i> Populer</p>
                                {playNavbar.map((list, index) => (
                                <li key={index}>
                                    <a href={`/playlist/${list.name.replace(/ /g, '-' )}`}><img
                                                        src={`/storage/${list.image}`} alt="Logo"
                                                        className="w-5 rounded-full" />
                                        {list.name}</a>
                                </li>
                                ))}
                                <li>
                                    <a className='hover:bg-success font-semibold' href='/playlist'>Lihat Yang lain</a>
                                </li>
                            </ul>
                        </div>
                        {user ?
                        <li className='bg-primary rounded'>
                            <a href='/login'>
                                <i class="fa-solid fa-right-from-bracket"></i>
                                Masuk Dashboard
                            </a>
                        </li>

                        :
                        <>
                            <li className='hover:bg-primary rounded'>
                                <a href='/login'>
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    Login
                                </a>
                            </li>
                            <li className='hover:bg-success rounded'>
                                <a href='/register'>
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    Daftar
                                </a>
                            </li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        </nav>

        <main className='bg-gray-200 h-screen w-full flex'>
            <div className="w-full bg-gray-200 shadow-inner rounded">
                {children}
                <Footer />
            </div>
        </main>
    </div>
</>
);

}
