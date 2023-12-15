import InterfaceLayout from '@/Layouts/InterfaceLayout';
import { Head } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import BannerRilisPlaylist from '@/Components/BannerRilisPlaylist';
import React, { useState, useRef, useEffect } from 'react';
export default function Home({ auth, playRecoment, playNavbar, rilisPlaylist }) {
const [searchTerm, setSearchTerm] = useState('');
const [filteredPlaylist, setFiltered] = useState(playRecoment);

useEffect(() => {
const filtered = playRecoment.filter(user =>
user.name.toLowerCase().includes(searchTerm.toLowerCase())
);
setFiltered(filtered);
}, [searchTerm, playRecoment]);

const [displayedData, setDisplayedData] = useState(9);
const itemsPerPage = 3;

const handleShowMore = () => {
const remainingData = filteredPlaylist.length - displayedData;
const newDataToDisplay = Math.min(itemsPerPage, remainingData);

setDisplayedData(displayedData + newDataToDisplay);
};

return (
<InterfaceLayout user={auth} playNavbar={playNavbar}>

    <Head title="Playlist" />
    <Hero />
    <section className="bg-white  dark:bg-gray-900">

    {rilisPlaylist.length == 0 ? '' :
        < BannerRilisPlaylist rilisPlaylist={rilisPlaylist} />}
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-13 lg:px-6">
            <div className="max-w-screen-md">
                <h2 className="mb-4 text-xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Mau Belajar apa
                    hari
                    ini ..? </h2>
            </div>
            <p id='cari' className=' font-semibold py-2'> <span
                    className="text-2xl text-gray-600 hover:text-gray-800"></span>Cari playlist kesukaan kamu dan belajar
                dengan gratis ...!</p>
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
                {filteredPlaylist.slice(0, displayedData).map((playRecoment) => (
                <div className="shadow-xl py-2 px-5 rounded-lg border border-primary hover:border-indigo-300">
                    <div
                        className=" flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-20 lg:w-20 dark:bg-primary-900">
                        <img src={`/storage/${playRecoment.image}`} alt="Logo" className='rounded-lg' />
                    </div>
                    <h3 className="mb-2 text-xl font-bold dark:text-white">playlist {playRecoment.name} <button
                            type="button" class="btn btn-success btn-xs">
                            free
                        </button></h3>
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
            {displayedData < filteredPlaylist.length && ( <button onClick={handleShowMore}
                className="btn flex mt-5 ml-auto">
                {`Tampilkan ${Math.min(itemsPerPage, filteredPlaylist.length - displayedData)} Playlist Selanjutnya `}
                <i className="fa-solid fa-arrow-right fa-fade"></i>
                </button>
                )}
        </div>

    </section>

</InterfaceLayout>
);
}
