import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useState, useRef, useEffect } from 'react';
export default function Tutorials({ auth, playlists, id_tutorial }, props) {
const { flash } = usePage().props

const [title, setName] = useState('');
const [image, setImage] = useState('');
const [draft, setDraft] = useState('');
const [playlist, setPlaylist] = useState('');
const [author, setAuthorID] = useState(id_tutorial.author_id);
const [content, setContent] = useState('');

useEffect(() => {
setName(id_tutorial.title || '');
setImage(id_tutorial.image || '');
setDraft(id_tutorial.draft || '');
setPlaylist(id_tutorial.playlist_id || '');
setAuthorID(id_tutorial.author_id || '');
setContent(id_tutorial.content || '');
}, [id_tutorial]);

const handleFileChange = (e) => {
setImage(e.target.files[0]);
}

const submit = () => {
const data = {
title, image, draft, playlist, author, content
}
router.post(`/authors/tutorialUpdate/${id_tutorial.id}`, data)
}
return (
<AuthenticatedLayout user={auth.user}>

    <Head title="Tutorials" />
    <div className="py-2">
        <div className="sm:px-6">
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
                            <li>{id_tutorial.title}</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <ul className="p-5 shadow rounded mt-2">
                        <div className="mb-6">
                            <label for="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul</label>
                            <input type="text" id="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Belajar React JS" required value={title} onChange={(title)=>
                            setName(title.target.value)}/>
                        </div>
                        <div className="mb-6">
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" required
                                onChange={handleFileChange} />
                        </div>
                        <h1 className="text-gray-500 text-xs mb-2">image old</h1>
                        <div className="w-20 h-20">
                            <img className='rounded' src={`/storage/${id_tutorial.image}`} />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="draft"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                            <label htmlFor="playlist"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                        <button onClick={submit} type="submit" className="btn m-2">Update Sekarang</button>
                        <a href='/authors/tutorials' className="btn btn-error">Back</a>
                    </ul>
                </div>
            </div>
        </div>
    </div>


</AuthenticatedLayout>
);
}
