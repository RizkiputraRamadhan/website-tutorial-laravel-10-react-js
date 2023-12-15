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

return (
<InterfaceLayout user={auth} playNavbar={playNavbar}>

    <Head title="Home" />
    <Hero />
    <section className="bg-white  dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-">
                <h2 className="mb-4 text-xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Mau
                    Belajar apa
                    hari
                    ini ..?</h2>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                <div className="shadow-xl py-2 px-5 rounded-lg border border-primary hover:border-indigo-300">
                    <div
                        className="ring-2 ring-offset-1 ring-offset-info ring-primary flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg className="w-5 h-5 text-error-content lg:w-6 lg:h-6 dark:text-primary-300"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold dark:text-white">playlist belajar</h3>
                    <p className="text-gray-500 dark:text-gray-400">Ada banyak sekali playlist yang bisa kamu pelajari
                        sesuai urutannya, tunggu apa lagi yukk !! <i class="ml-2 fas fa-long-arrow-alt-right"></i></p>
                    <div class="flex justify-end">
                        <a href="/playlist"><button type="button" class="btn btn-primary btn-xs lg:btn-sm">
                                Lihat Sekarang
                                <i class="ml-2 fas fa-long-arrow-alt-right"></i>
                            </button></a>
                    </div>
                </div>
            </div>
        </div>
        {rilisPlaylist.length == 0 ? '' :
        < BannerRilisPlaylist rilisPlaylist={rilisPlaylist} />}

        <div id='pricing' className="mx-5 mb-8">
            <div className="shadow-xl py-2 px-5 rounded-lg border border-primary hover:border-indigo-300">
                <div
                    className="ring-2 ring-offset-1 ring-offset-info ring-primary flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                    <svg className="w-5 h-5 text-error-content lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">Upgrade Premium</h3>
                <p className="text-gray-500 dark:text-gray-400">Dengan fitur premium kamu dapat belajar dengan full
                    playlist yang kamu inginkan tanpa ada batas waktu dan belajar anda
                    <br />berlangganan hanya dengan Rp.100.000 Rupiah /bulan anda bisa menikmati semua playlist yang
                    terkunci, <br /> tunggu apa lagi yukk !! <i class="ml-2 fas fa-long-arrow-alt-right"></i>
                </p>
                <div class="flex justify-end">
                    <a href="/upgrade"><button type="button" class="btn btn-primary btn-xs lg:btn-sm">
                            Daftar Sekarang
                            <i class="ml-2 fas fa-long-arrow-alt-right"></i>
                        </button></a>
                </div>
            </div>
        </div>
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
