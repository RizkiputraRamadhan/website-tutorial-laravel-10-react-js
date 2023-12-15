import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
export default function Tutorials({ auth, tutorials, status1, status2, playlists, authorID }, props) {
const { flash } = usePage().props
const [search, setSearch] = useState('');
const [filteredTutor, setFilteredTutor] = useState(tutorials);

useEffect(() => {
const filtered = tutorials.filter(tutor =>
tutor.title.toLowerCase().includes(search.toLowerCase()) ||
tutor.author.name.toLowerCase().includes(search.toLowerCase()) ||
tutor.author.name.toLowerCase().includes(search.toLowerCase())
);
setFilteredTutor(filtered);
}, [search, tutorials]);

return (
<AuthenticatedLayout user={auth.user}>

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
    </div>
    <div className="p-4 ml-5 bg-white shadow-inner mt-3  sm:rounded-lg">
        <div className="flex w-full">
            <h1 className="text-gray-600 font-bold p-3 text-sm">
                <span className="mr-4"> <i class="fa-solid fa-earth-asia"></i> : {tutorials.length} </span>
                <span className="mr-4"><i class="fa-solid fa-paper-plane"></i> : {status1.length}</span>
                <span className="mr-2"><i class="fa-solid fa-xmark"></i> : {status2.length}</span>
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
                    {filteredTutor.map((tutor) => (
                    <>
                        {tutor.draft == 2 ? (
                        <>
                            <tr>
                                <td><i class="fa-solid fa-xmark"></i> </td>
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
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask rounded-full mask-squircle w-5 h-5">
                                                <img src={`/storage/${tutor.author.profil}`} alt={tutor.title_id} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{tutor.author.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask rounded-full mask-squircle w-5 h-5">
                                                <img src={`/storage/${tutor.playlist.image}`} alt={tutor.title_id} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{tutor.playlist.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{tutor.draft == 1 ? <button className='btn btn-xs btn-success'>Publish</button> :
                                    <button className='btn btn-xs btn-danger'>draft</button>}</td>
                                <td>{tutor.updated_at.split("T")[0]}</td>
                                <th>
                                    <a href={`/admin/tutorDraft/${tutor.id}`}> <button
                                            className="btn btn-ghost btn-xs"><i
                                                class="fa-solid fa-paper-plane text-green-600"></i></button></a>
                                    <a href={`/demo/tutorial/${tutor.title_id}`}> <button className="btn btn-ghost btn-xs"><i
                                                class="fa-solid fa-eye text-indigo-700"></i></button></a>
                                    <a href={`/admin/tutorEdit/${tutor.id}/${tutor.title_id}`}><button
                                            className="btn btn-ghost btn-xs"><i
                                                class="fa-solid fa-pen-to-square text-green-800"></i></button></a>
                                    <a href={`/admin/tutorDelete/${tutor.id}/${tutor.title_id}`}><button
                                            className="btn btn-ghost btn-xs"><i
                                                class="fa-solid fa-trash text-red-700"></i></button></a>
                                </th>
                            </tr>
                        </>
                        ) : ''}
                    </>
                    ))}

                </tbody>
            </table>
            <p className="text-center font-bold text-gray-500 p-3">{filteredTutor.length == 0 ? (
                <span>--- Upss !! {search} tidak ditemukan ---</span>
                ) : ''}
            </p>
        </div>
    </div>
</AuthenticatedLayout>
);
}
