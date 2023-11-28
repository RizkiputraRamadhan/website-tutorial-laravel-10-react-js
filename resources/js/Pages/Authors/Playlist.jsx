import AuthNavAuthorsLayout from '@/Layouts/AuthNavAuthorsLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
export default function Playlist({ auth, playlist, status1, status2 }, props) {
const { flash } = usePage().props
const [isExpanded, setIsExpanded] = useState(false);
const [search, setSearch] = useState('');
const [filteredPlaylist, setFilteredPlaylist] = useState(playlist);

useEffect(() => {
const filtered = playlist.filter(plays =>
plays.name.toLowerCase().includes(search.toLowerCase())
);
setFilteredPlaylist(filtered);
}, [search, playlist]);

const toggleButton = () => {
setIsExpanded(!isExpanded);
};
const [name, setName] = useState('');
const [image, setImage] = useState('');
const [status, setStatus] = useState('');

const handleImage = (e) => {
setImage(e.target.files[0]);
}

const submit = () => {
const data = {
name, image, status
}
router.post('/authors/playlistStore', data)
}
return (
<AuthNavAuthorsLayout user={auth.user}>

    <Head title="Playlist" />
    <div className="p-2 ml-3 m-2 bg-white  sm:rounded-lg" tabIndex={0}>
        <h1 className='font-bold text-gray-600'> <i class="fa-solid fa-circle-play mr-2"></i> Daftar Playlist</h1>
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
                    <button onClick={()=> {window.location.href=""}} className="btn btn-sm">Tutup</button>
                </div>
            </>
            )}
        </div>
        <details>
            <summary className='btn' onClick={toggleButton}> {isExpanded ? <span>Tutup <i
                        className="fa-regular fa-circle-xmark"></i></span> : <span>Tambah <i
                        class="fa-solid fa-circle-play"></i></span> }</summary>
            <ul className="p-5 shadow rounded mt-2">
                <div className="mb-6">
                    <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name
                        Playlist</label>
                    <input type="text" id="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="React JS" required onChange={(name)=> setName(name.target.value)}/>
                </div>
                <div className="mb-6">
                    <div className="flex">
                        <span className="flex-none w-10 h-10 bg-gray-500 rounded-l-lg text-gray-200 font-bold p-2">
                            ID:
                        </span>
                        <input type="text" id="text"
                            className="shadow-sm input-bordered bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="" value={name.replace(/ /g, '_' )} disabled />
                    </div>
                </div>
                <div className="mb-6">
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" required
                        onChange={handleImage} />
                </div>
                <div className="mb-6">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Status
                    </label>
                    <select id="status"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required onChange={(status)=> setStatus(status.target.value)}
                        >
                        <option value="0">Pilih Status</option>
                        <option value="1">Publish</option>
                        <option value="2">Pending</option>
                    </select>
                </div>

                <button onClick={submit} type="submit" className="btn">Insert</button>
            </ul>
        </details>
    </div>
    <div className="p-4 ml-5 bg-white shadow-inner mt-3  sm:rounded-lg">
        <div className="flex w-full">
            <h1 className="text-gray-600 font-bold text-sm"> <span className="mr-4"> <i
                        class="fa-solid fa-earth-asia"></i> : {playlist.length} </span> <span className="mr-4"><i
                        class="fa-solid fa-paper-plane"></i> : {status1.length}</span> <span className=""><i
                        class="fa-solid fa-xmark"></i> : {status2.length}</span></h1>
            <div className="flex items-center justify-content-end ml-auto w-40 lg:w-60">
                <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i class="fa-solid fa-circle-play"></i>
                    </div>
                    <input type="text" id="simple-search" value={search} onChange={(e)=> setSearch(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Playlist ..." required />
                </div>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Artikel</th>
                        <th>Status</th>
                        <th>Dibuat</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPlaylist.map((play, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={`/storage/${play.image}`} alt={play.name} />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{play.name}</div>
                                </div>
                            </div>
                        </td>
                        <td>{play.tutorials_count}</td>
                        <td>
                            {play.status == 1 ? (
                            <button className='btn btn-xs btn-success'>Publish</button>
                            ) : play.status == 2 ? (
                            <button className='btn btn-xs btn-danger'>pending</button>
                            ) : (
                            ''
                            )}
                        </td>
                        <td>{play.created_at.split("T")[0]}</td>
                        <th>
                            <a href={`/playlist/${play.id_playlist}`}> <button className="btn btn-ghost btn-xs"><i
                                        class="fa-solid fa-eye text-indigo-700"></i></button></a>
                            <a href={`/authors/playlistEdit/${play.id}/${play.id_playlist}`}><button
                                    className="btn btn-ghost btn-xs"><i
                                        class="fa-solid fa-pen-to-square text-green-800"></i></button></a>
                            <a href={`/authors/playlistDelete/${play.id}/${play.id_playlist}`}><button
                                    className="btn btn-ghost btn-xs"><i
                                        class="fa-solid fa-trash text-red-700"></i></button></a>
                        </th>
                    </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-center font-bold text-gray-500 p-3">{filteredPlaylist.length == 0 ? (
                <span>--- Upss !! {search} tidak ditemukan ---</span>
                ) : ''}
            </p>
        </div>
    </div>
</AuthNavAuthorsLayout>
);
}
