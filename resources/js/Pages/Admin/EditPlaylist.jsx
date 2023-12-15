import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
export default function editPlaylist({ auth, id_playlist, playlist }, props) {
const { flash } = usePage().props
const [name, setName] = useState('');
const [image, setImage] = useState('');
const [status, setStatus] = useState('');

useEffect(() => {
setName(id_playlist.name || '');
setImage(id_playlist.image || '');
setStatus(id_playlist.status || '');
}, [id_playlist]);

const handleImage = (e) => {
setImage(e.target.files[0]);
}

const submit = () => {
const data = {
name,
image,
status,
};
router.post(`/admin/playlistUpdate/${id_playlist.id}/${id_playlist.name}`, data)
};
return (
<AuthenticatedLayout user={auth.user}>

<Head title="Playlist" />

    <div className="py-2  ">
        <div className="sm:px-6 ">
            <div className="bg-white overflow-hidden sm:rounded-lg">
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
                <div className="p-6 text-gray-900 ">
                    <div className="text-sm breadcrumbs font-bold">
                        <ul>
                            <li> <i class="fa-solid fa-pencil mr-3"></i><a href='/admin/dashboard'>Home</a></li>
                            <li><a href='/admin/playlist'>Edit</a></li>
                            <li>{id_playlist.name}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <ul className="p-5 shadow rounded mt-2">
                        <div className="mb-6">
                            <label htmlFor="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Name Playlist
                            </label>
                            <input type="text" id="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Name Playlist" value={name} onChange={(e)=> setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" required
                                onChange={handleImage} />
                        </div>
                        <h1 className="text-gray-500 text-xs mb-2">image old</h1>
                        <div className="w-20 h-20">
                            <img className='rounded' src={`/storage/${id_playlist.image}`} />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="status"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Status
                            </label>
                            <select id="status"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required value={status} onChange={(e)=> setStatus(e.target.value)}
                                >
                                <option value="0">Pilih Status</option>
                                <option value="1">Publish</option>
                                <option value="2">Pending</option>
                            </select>
                        </div>
                        <button className='btn' onClick={submit}>Update Sekarang</button>
                    </ul>
                </div>
            </div>
        </div>
        <div className="p-4 ml-5 bg-white shadow-inner mt-3  sm:rounded-lg">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Artikel</th>
                            <th>Status</th>
                            <th>Dibuat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlist.map((play, index) => (
                        <tr key={index + 1} className={id_playlist.id == play.id ? 'bg-primary text-lg' : ''} >
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
                            <td>{play.tutorial_count}</td>
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
                        </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</AuthenticatedLayout>
);
}
