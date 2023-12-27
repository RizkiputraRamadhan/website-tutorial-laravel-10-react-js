import InterfaceLayout from '@/Layouts/InterfaceLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
import { usePage } from '@inertiajs/react'
export default function Detail({ auth, playRecoment, playNavbar, showTutor, fkPlaylist, fkAuthor, allPlaylistInTutor }) {
const { flash } = usePage().props
const [searchTerm, setSearchTerm] = useState('');
const [filteredPlaylist, setFiltered] = useState(playRecoment);

useEffect(() => {
const filtered = playRecoment.filter(user =>
user.name.toLowerCase().includes(searchTerm.toLowerCase())
);
setFiltered(filtered);
}, [searchTerm, playRecoment]);

return (
<InterfaceLayout user={auth} playNavbar={playNavbar}>

    <Head title={showTutor.title} />
    <section className="bg-white dark:bg-gray-900">
    <div className="py-2  ">
        <div className="sm:px-6 ">
            <div className="bg-white overflow-hidden sm:rounded-lg">
                <div className='p-2'>
                    {flash.message && (
                    <>
                        <div className="alert shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                className="stroke-info shrink-0 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <div>
                                <h3 className="font-bold">Notification!</h3>
                                <div className="text-xs">{flash.message}</div>
                            </div>
                            <button onClick={()=> {window.location.href=""}} className="btn btn-sm">Refresh</button>
                        </div>
                    </>
                    )}
                </div>
            </div>
        </div>
    </div>
    <section className='bg-white h-f w-full flex'>
    <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-600">
                    <h2 class="font-bold text-2xl lg:text-3xl dark:text-gray-400">{showTutor.title} | <span
                            className="lg:text-2xl text-xl font-sans">#{fkPlaylist.name}</span> </h2>
                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="bg-white rounded-lg max-w-md mb-5 flex">
                        <div className="avatar">
                            <div
                                className="w-10 h-10 lg:w-14 lg:h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                <img src={`/storage/${fkAuthor.profil}`} />
                            </div>
                        </div>
                        <div className="w-px bg-gray-300 mx-4"></div>
                        <div className="flex-grow ">
                            <div className="flex ">
                                <a href={`/author/${fkAuthor.name.replace(/ /g, '-' )}`}>
                                    <p className="text-gray-700 text-sm lg:text-xl font-bold  mb-1 mr-2 ">
                                        {fkAuthor.name}
                                    </p>
                                </a>
                                <a href={`https://instagram.com/${fkAuthor.ig}`}
                                    className="text-gray-700 hover:text-primary">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                                <a href={`https://github.com/${fkAuthor.github}`}
                                    className="text-gray-700 hover:text-primary">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                            <p className="text-gray-600 text-xs lg:text-sm italic"> <span className="not-italic">
                                    {showTutor.updated_at.split("T")[0]} | </span> <strong>{fkAuthor.work_as}</strong>
                            </p>
                        </div>
                    </div>
                    <div className="max-w-6xl flex justify-center">
                        <img src={`/storage/${showTutor.image}`} alt="" className='rounded w-full' />
                    </div>
                    <div className="flex mt-5 mb-5">
                        <a href='/playlist' className='mr-2'>
                            <button class="btn btn-xs lg:btn-sm"> <i
                                    class="fa-solid fa-house-user  bg-primary p-1 rounded-full"></i>
                                Tutorial <i class="fa-solid fa-arrow-right fa-fade"></i></button>
                        </a>
                        <a href={`/playlist/${fkPlaylist.name.replace(/ /g, '-' ) }`}>
                            <button class="btn  btn-xs lg:btn-sm"> <i
                                    class="fa-solid bg-primary p-1 rounded-full fa-hashtag"></i>
                                {fkPlaylist.name
                                } <i class="fa-solid fa-arrow-right fa-fade"></i> </button>
                        </a>
                    </div>
                    <div className="m-2">
                    <p className="text-sm lg:text-xl text-gray-700" dangerouslySetInnerHTML={{ __html: showTutor.content }} />
                        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>

                    <button className="btn ml-2" >
                     Baca Nanti<i className="fa-regular justify-start fa-bookmark"></i></button>
                </div>
            </div>
        </div>
    </div>

           <div className="w-96 bg-white shadow-inner rounded-l-2xl m-2 max-md:hidden">
                <ul className="menu rounded-box">
                    <h2 class="font-bold text-lg p-2 ">Playliast {fkPlaylist.name}</h2>
                    <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    {allPlaylistInTutor.map((tutor, i) => (
                    <>
                    {tutor.draft == 2 ? (
                        <div key={i} className={`navbar m-1 rounded-lg bg-primary border-2 border-red-500`}>
                            <div className="flex-1 max-w-[200px] overflow-hidden">
                                <a href={tutor.title.replace(/ /g, '-' )}
                                    className="btn btn-ghost text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                                   <i class="fa-solid text-red-700 text-2xl fa-key fa-beat-fade"></i>  {tutor.title.slice(0,8)} {tutor.title.slice(8,12)}<span className="text-lg pt-2">***</span>
                                </a>
                            </div>

                            <div className="flex-none gap-2">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={`/storage/${tutor.image}`} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0}
                                        className="mt-3 z-[1] p-2 border border-red-500 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="justify-between">
                                                <i class="fa-solid fa-calendar-check" /> <span
                                                    className="-ml-10">{tutor.updated_at.split("T")[0]}</span>
                                                <span className="badge">{i+1}</span>
                                            </a>
                                        </li>
                                        <li><a href={`/author/${tutor.author.name.replace(/ /g, '-' )}`}><i
                                                    class="fa-solid fa-user-pen"></i>{tutor.author.name}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (

                        <div key={i} className={`navbar m-1 rounded-lg ${tutor.id===showTutor.id ? 'bg-success border-2 border-primary'
                        : 'bg-base-100' }`}>
                            <div className="flex-1 max-w-[200px] overflow-hidden">
                                <a href={tutor.title.replace(/ /g, '-' )}
                                    className="btn btn-ghost text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {tutor.title}
                                </a>
                            </div>

                            <div className="flex-none gap-2">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={`/storage/${tutor.image}`} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0}
                                        className="mt-3 z-[1] p-2 border border-primary shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="justify-between">
                                                <i class="fa-solid fa-calendar-check" /> <span
                                                    className="-ml-10">{tutor.updated_at.split("T")[0]}</span>
                                                <span className="badge">{i+1}</span>
                                            </a>
                                        </li>
                                        <li><a href={`/author/${tutor.author.name.replace(/ /g, '-' )}`}><i
                                                    class="fa-solid fa-user-pen"></i>{tutor.author.name}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                     )}
                    </>
                    ))}
                </ul>
            </div>
        </section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md">
                <h2 className="mb-4 text-xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Rekomendasi Playlist Untuk Kamu !!</h2>
            </div>
            <p id='cari' className='font-semibold py-2'> <span
                    className="text-2xl text-gray-600 hover:text-gray-800"># </span>Cari playlist kesukaan kamu ...!</p>
            <div className="flex items-center w-80 mb-5">
                <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i class="fa-solid fa-circle-play"></i>
                    </div>
                    <input type="text" id="simple-search" value={searchTerm} onChange={(e)=>
                    setSearchTerm(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Nama Playlist ..." required />
                </div>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                {filteredPlaylist.map((playRecoment) => (
                <div className="shadow-xl py-2 px-5 rounded-lg border border-primary hover:border-indigo-300">
                    <div
                        className=" flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-20 lg:w-20 dark:bg-primary-900">
                        <img src={`/storage/${playRecoment.image}`} alt="Logo" className='rounded-lg' />
                    </div>
                    <h3 className="mb-2 text-xl font-bold dark:text-white">playlist {playRecoment.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">Ada {playRecoment.tutorials_count} artikel yang kamu
                        harus selesaikan untuk menguasai materi {playRecoment.name}.</p>
                    <div class="flex justify-end">
                        <a href={`/playlist/${playRecoment.name.replace(/ /g, '-' )}`}><button type="button"
                                class="btn btn-primary btn-xs lg:btn-sm">
                                Belajar Sekarang
                                <i class="ml-2 fas fa-long-arrow-alt-right"></i>
                            </button></a>
                    </div>
                </div>
                ))}
            </div>
            <div className="text-center">
                <p className="text-center flexfont-bold text-gray-500 p-3">{filteredPlaylist.length == 0 ? (
                    <span>--- Upss !! Playlist {searchTerm} tidak ditemukan ---</span>
                    ) : ''}
                </p>
            </div>
        </div>

    </section>

</InterfaceLayout>
);
}
