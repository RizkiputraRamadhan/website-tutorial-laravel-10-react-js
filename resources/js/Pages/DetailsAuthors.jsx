import InterfaceLayout from '@/Layouts/InterfaceLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
export default function DetailAuthors({ auth, playNavbar, DetailTutorial, DetailAuthors }) {
const [searchTerm, setSearchTerm] = useState('');
const [filteredDetailTutor, setFiltered] = useState(DetailTutorial);

useEffect(() => {
const filtered = DetailTutorial.filter(Detail =>
Detail.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
Detail.playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
);
setFiltered(filtered);
}, [searchTerm, DetailTutorial]);

const [displayedData, setDisplayedData] = useState(6);
const itemsPerPage = 3;

const handleShowMore = () => {
const remainingData = filteredDetailTutor.length - displayedData;
const newDataToDisplay = Math.min(itemsPerPage, remainingData);

setDisplayedData(displayedData + newDataToDisplay);
};


const [savedTitles, setSavedTitles] = useState([]);
const handleSaveClick = (title) => {
if (!savedTitles.includes(title)) {
const updatedSavedTitles = [...savedTitles, title];
setSavedTitles(updatedSavedTitles);
localStorage.setItem('savedTitles', JSON.stringify(updatedSavedTitles));
document.getElementById("modalSaved").showModal();
} else {
    document.getElementById("modalNoSaved").showModal();
}
};

useEffect(() => {
const savedTitlesFromLocalStorage = JSON.parse(localStorage.getItem('savedTitles')) || [];
if (savedTitlesFromLocalStorage.length > 0) {
setSavedTitles(savedTitlesFromLocalStorage);
}
}, []);
return (
<InterfaceLayout user={auth} playNavbar={playNavbar}>

    <Head title="Playlist" />
    <div className="">
        <img src={`/storage/kuliit_logo.png`} alt="" className='bg-cover bg-center absolute ' />
        <div className="glass m-auto card w-32 rounded-full mt-4">
            <div className="avatar online  ">
                <div className="w-32 rounded-full">
                    <img src={`/storage/${DetailAuthors.profil}`} />
                </div>
            </div>
        </div>
        <div className="card w-full glass">
            <div className="card-body">
                <h2 className="font-bold text-xl text-center">{DetailAuthors.name.toUpperCase()} <br /> <span className="text-sm">( {DetailAuthors.work_as} )</span></h2>
                <div className=" flex justify-center">
                   {DetailAuthors.github == null ? '' : <a href={`/${DetailAuthors.github}`} target="_blank" rel="noopener noreferrer" className="mr-4">
                        <i className="fab fa-github fa-lg"></i>
                    </a> }
                    {DetailAuthors.ig == null ? '' : <a href={`/${DetailAuthors.ig}`} target="_blank" rel="noopener noreferrer" className="mr-4">
                        <i className="fab fa-instagram fa-lg"></i>
                    </a> }
                    {DetailAuthors.wa == null ? '' : <a href={`https://wa.me/${DetailAuthors.wa}`} target="_blank" rel="noopener noreferrer" className="mr-4">
                        <i className="fab fa-whatsapp fa-lg"></i>
                    </a> }
                    {DetailAuthors.web == null ? '' :  <a href={`/${DetailAuthors.web}`} target="_blank" rel="noopener noreferrer" className="mr-4">
                        <i className="fas fa-link fa-lg"></i>
                    </a> }
                    {DetailAuthors.linkedin == null ? '' : <a href={`/${DetailAuthors.linkedin}`} target="_blank" rel="noopener noreferrer" >
                        <i className="fas fa-linkedin fa-lg"></i>
                    </a>}
                </div>

                <p className="text-gray-700 text-sm"><i class="fa-solid fa-circle-play"></i> Jumlah materi yang ditulis:  {DetailAuthors.tutorials_count} </p>
                <p className="text-gray-700 text-sm"><i className="mr-1 fa-solid fa-calendar-week fa-bounce"></i>
                   Bergabung : {DetailAuthors.updated_at.split("T")[0]} </p>
                   <button
                    className="glass hover:bg-gray-400 w-32  mt-2 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <i class="fa-solid fa-comments-dollar"></i> &nbsp;
                    <span>Dukungan </span>
                </button>
                <div className="flex items-center w-80">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <i class="fa-solid fa-circle-play"></i>
                        </div>
                        <input type="text" id="simple-search" value={searchTerm} onChange={(e)=>
                        setSearchTerm(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={`Search Materi Or Playlist`} required />
                    </div>
                </div>

            </div>
        </div>
    </div>
    <section className="bg-white  dark:bg-gray-900">
        <dialog id="modalSaved" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=> {
                        window.location.reload();
                        document.getElementById("modalSaved").close();
                        }}
                        >
                        ✕
                    </button>
                </form>
                <p className="py-4">
                    Materi berhasil disave dibookmark baca nanti.
                </p>
            </div>
        </dialog>
        <dialog id="modalNoSaved" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=> {
                        document.getElementById("modalNoSaved").close();
                        }}
                        >
                        ✕
                    </button>
                </form>
                <p className="py-4">
                    Materi sudah tersimpan dibookmark.
                </p>
            </div>
        </dialog>
        {DetailTutorial.length > 0 ? (
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                {filteredDetailTutor.slice(0, displayedData).map((Detail, i) => (
                <>
                    {Detail.draft == 1 ? (
                    <div className='shadow-xl p-2 rounded-lg border border-primary hover:border-indigo-300' >
                        <a href={`/${Detail.title_id}`}
                            className="rounded-full bg-primary-100 lg:h- lg:w-full dark:bg-primary-900">
                            <img src={`/storage/${Detail.image}`} alt="Logo" className='rounded-lg' />
                        </a>
                        <h3 className="my-2 text-xl font-bold dark:text-white">{Detail.title} <span
                                className="text-sm ">|
                                #{Detail.playlist.name}</span> <span
                                className="btn btn-xs btn-primary ml-1" onClick={()=> handleSaveClick(Detail.title)}> <i
                                    className="fa-regular justify-start fa-bookmark"></i></span></h3>
                        <a href={`/author/${DetailAuthors.id_author}`} className="text-gray-500  text-xs flex"><img
                                src={`/storage/${DetailAuthors.profil}`} alt="Profil"
                                className="w-7 h-7 rounded-full mr-2" /> <span
                                className="mt-1 ">{DetailAuthors.name}</span></a>

                        <div class="flex justify-end">
                            <p className="text-gray-500 text-xs dark:text-gray-400"><i
                                    className="mr-1 fa-solid fa-calendar-week"></i> {Detail.updated_at.split("T")[0]}
                            </p>
                        </div>

                    </div>
                    ) : <div className={Detail.draft==2
                        ? 'bg-primary shadow-xl p-2 rounded-lg border border-primary hover:border-indigo-300'
                        : 'shadow-xl p-2 rounded-lg border border-primary hover:border-indigo-300' }>
                        <a className="rounded-full bg-primary-100 lg:h- lg:w-full dark:bg-primary-900">
                            <img src={`/storage/${Detail.image}`} alt="Logo" className='rounded-lg' />
                        </a>
                        <h3 className="my-2 text-xl font-bold dark:text-white">{Detail.title} <span
                                className="text-sm ">|
                                #{Detail.playlist.name}</span>  <span
                                className="btn btn-xs btn-error">Draft</span> <span
                                className="btn btn-xs btn-success ml-1" onClick={()=> handleSaveClick(Detail.title)}> <i
                                    className="fa-regular justify-start fa-bookmark"></i></span></h3>
                        <a href={`/author/${DetailAuthors.id_author}`} className="text-gray-500  text-xs flex"><img
                                src={`/storage/${DetailAuthors.profil}`} alt="Profil"
                                className="w-7 h-7 rounded-full mr-2" /> <span
                                className="mt-1 ">{DetailAuthors.name}</span></a>
                        <div class="flex justify-end">
                            <p className="text-gray-500 text-xs dark:text-gray-400"><i
                                    className="mr-1 fa-solid fa-calendar-week"></i> {Detail.updated_at.split("T")[0]}
                            </p>

                        </div>
                    </div>}
                </>
                ))}
            </div>
            <div className="text-center">
                <p className="text-center flexfont-bold text-gray-500 p-3">{filteredDetailTutor.length == 0 ? (
                    <span>--- Upss !! Judul atau Playlist {searchTerm} tidak ditemukan ---</span>
                    ) : ''}
                </p>
            </div>
            {displayedData < filteredDetailTutor.length && ( <button onClick={handleShowMore}
                className="btn flex mt-5 ml-auto">
                {`Tampilkan ${Math.min(itemsPerPage, filteredDetailTutor.length - displayedData)} Materi Selanjutnya `}
                <i className="fa-solid fa-arrow-right fa-fade"></i>
                </button>
                )}
        </div>
        ) : (
        <div className="m-8 bg-gray-200  rounded-b-3xl ">
            <div className="py-2 px-5 rounded-lg mb-5 ">
                <div
                    className="m-auto  flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                    <svg className="w-5 h-5 text-error-content lg:w-10 lg:h-10 dark:text-primary-300"
                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <h3 className="mb-2 text-sm lg:text-xl text-center font-bold dark:text-white">Tidak ada materi yang ditulis {DetailAuthors.name}</h3>
            </div>
        </div>
        )}
        <br />
    </section>

</InterfaceLayout>
);
}
