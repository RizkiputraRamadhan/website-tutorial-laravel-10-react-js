import AuthNavAuthorsLayout from '@/Layouts/AuthNavAuthorsLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useState, useRef, useEffect } from 'react';
export default function Tutorials({ auth, playlists, tutorials, authors}, props) {
const { flash } = usePage().props
const [displayedData, setDisplayedData] = useState(5);
const itemsPerPage = 5;

const handleShowMore = () => {
const remainingData = filteredTutor.length - displayedData;
const newDataToDisplay = Math.min(itemsPerPage, remainingData);

setDisplayedData(displayedData + newDataToDisplay);
};
const [isExpanded, setIsExpanded] = useState(false);
const [search, setSearch] = useState('');
const [filteredTutor, setFilteredTutor] = useState(tutorials);

useEffect(() => {
const filtered = tutorials.filter(tutor =>
tutor.title.toLowerCase().includes(search.toLowerCase()) ||
tutor.author.name.toLowerCase().includes(search.toLowerCase()) ||
tutor.playlist.name.toLowerCase().includes(search.toLowerCase())
);
setFilteredTutor(filtered);
}, [search, tutorials]);

const toggleButton = () => {
setIsExpanded(!isExpanded);
};
const [title, setName] = useState('');
const [image, setFile] = useState('');
const [draft, setDraft] = useState('');
const [playlist, setPlaylist] = useState('');
const [author] = useState(authors.id);
const [content, setContent] = useState('');

const handleFileChange = (e) => {
setFile(e.target.files[0]);
}

const submit = () => {
const data = {
title, image, draft, playlist, author, content
}
router.post('/authors/tutorialStore', data)
}
return (
<AuthNavAuthorsLayout user={auth.user}>

    <Head title="Tutorials" />
    <div className="p-2 ml-3 m-2 bg-white  sm:rounded-lg" tabIndex={0}>
        <h1 className='font-bold text-gray-600'> <i class="fa-solid fa-signs-post mr-2"></i> Daftar Postingan Tutorial
        </h1>
        <div className='m-5'>
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
        <details>
            <summary className='btn' onClick={toggleButton}> {isExpanded ? <span>Tutup <i
                        className="fa-regular fa-circle-xmark"></i></span> : <span>Tambah <i
                        class="fa-solid fa-signs-post"></i></span> }</summary>
            <ul className="p-5 shadow rounded mt-2">
                <div className="mb-6">
                    <label for="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul</label>
                    <input type="text" id="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Belajar React JS" required onChange={(title)=> setName(title.target.value)}/>
                </div>
                <div className="mb-6">
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" required
                        onChange={handleFileChange} />
                </div>
                <div className="mb-6">
                    <label htmlFor="draft" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        draft
                    </label>
                    <select id="draft"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required value={draft} onChange={(e)=> setDraft(e.target.value)}
                        >
                        <option value="0">Pilih Status</option>
                        <option value="1">Publish</option>
                        <option value="2">Draft</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="playlist" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Playlist
                    </label>
                    <select id="playlist"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required value={playlist} onChange={(e)=> setPlaylist(e.target.value)}
                        >
                        <option value="0">Pilih Playlist</option>
                        {playlists.map((playlist) => (
                        <option value={playlist.id}>{playlist.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <CKEditor editor={ClassicEditor} data={content} onChange={(event, editor)=> {
                        const data = editor.getData();
                        setContent(data);
                        }}
                        />

                </div>


                <button onClick={submit} type="submit" className="btn">Insert</button>
            </ul>

        </details>
    </div>
    <div className="p-4 ml-5 bg-white shadow-inner mt-3  sm:rounded-lg">
        <div className="flex w-full">
            <h1 className="text-gray-600 font-bold p-3 text-sm">
                <span className="mr-4"> <i class="fa-solid fa-earth-asia"></i> : {tutorials.length}</span>
            </h1>
            <div className="flex items-center justify-content-end ml-auto w-40 lg:w-60">
                <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i class="fa-solid fa-signs-post"></i>
                    </div>
                    <input type="text" id="simple-search" value={search} onChange={(e)=> setSearch(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Postingan ..." required />
                </div>
            </div>
        </div>
        <div className="overflow-x-auto">
        {filteredTutor.length > 0 ? (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Judul</th>
                        <th>Penulis</th>
                        <th>Playlist</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTutor.slice(0, displayedData).map((tutor, i) => (
                    <>
                        <tr>
                            <td>{i + 1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={`/storage/${tutor.image}`} alt={tutor.title_id} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{tutor.title}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="font-bold">{tutor.author.name}</div>
                            </td>
                            <td>
                                <div className="font-bold">{tutor.playlist.name}</div>
                            </td>
                            <td>{tutor.draft == 1 ? <button className='btn btn-xs btn-success'>Publish</button> :
                                <button className='btn btn-xs btn-danger'>draft</button>}
                            </td>
                            <td>{tutor.updated_at.split("T")[0]}</td>
                            <th>

                                <a href={`/demo/tutorial/${tutor.title_id}`}> <button
                                        className="btn btn-ghost btn-xs"><i
                                            class="fa-solid fa-eye text-indigo-700"></i></button></a>
                                <a href={`/authors/tutorEdit/${tutor.id}/${tutor.title_id}`}><button
                                        className="btn btn-ghost btn-xs"><i
                                            class="fa-solid fa-pen-to-square text-green-800"></i></button></a>
                                <a href={`/authors/tutorDelete/${tutor.id}/${tutor.title_id}`}><button
                                        className="btn btn-ghost btn-xs"><i
                                            class="fa-solid fa-trash text-red-700"></i></button></a>
                            </th>
                        </tr>
                    </>
                    ))}

                </tbody>
            </table>
             ) : (
                <p className="text-center font-bold text-gray-500 p-3">
                {search ? (
                    <span>--- Upss !! {search} tidak ditemukan ---</span>
                ) : (
                    <span>--- Tidak ada tutorial yang tersedia ---</span>
                )}
            </p>
        )}
            {displayedData < filteredTutor.length && ( <button onClick={handleShowMore}
                className="btn flex mt-5 ml-auto">
                {`Tampilkan ${Math.min(itemsPerPage, filteredTutor.length - displayedData)} Data Selanjutnya `}
                <i className="fa-solid fa-arrow-right fa-fade"></i>
                </button>
                )}
        </div>
    </div>
</AuthNavAuthorsLayout>
);
}
