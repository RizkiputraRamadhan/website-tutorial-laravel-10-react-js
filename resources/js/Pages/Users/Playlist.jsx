import AuthNavUsersLayout from '@/Layouts/AuthNavUsersLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
export default function Dashboard({ auth }, props) {
const { flash } = usePage().props
const [isExpanded, setIsExpanded] = useState(false);

const toggleButton = () => {
setIsExpanded(!isExpanded);
};
const [title, setName] = useState('');
const [file, setFile] = useState('');

const handleFileChange = (e) => {
setFile(e.target.files[0]);
}

const submit = () => {
const data = {
title, file,
}
console.log(data)
router.post('/storepost', data)
}
return (
<AuthNavUsersLayout user={auth.user}>

    <Head title="Playlist" />
    <div className="p-2 ml-3 m-2 bg-white  sm:rounded-lg" tabIndex={0}>

        <details>
            <summary className='btn' onClick={toggleButton}> {isExpanded ? <span>Tutup <i
                        className="fa-regular fa-circle-xmark"></i></span> : <span>Tambah <i
                        className="fa-solid fa-user-plus"></i></span> }</summary>
            <ul className="p-5 shadow rounded mt-2">
                <div className="mb-6">
                    <label for="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul</label>
                    <input type="text" id="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Belajar React JS" required onChange={(title)=> setName(title.target.value)}/>
                </div>
                <div className="mb-6">
                    <div className="flex">
                        <span className="flex-none w-10 h-10 bg-gray-500 rounded-l-lg text-gray-200 font-bold p-2">
                            ID:
                        </span>
                        <input type="text" id="text"
                            className="shadow-sm input-bordered bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="" value={title.replace(/ /g, '_' )} disabled />
                    </div>
                </div>
                <div className="mb-6">
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" required
                        onChange={handleFileChange} />
                </div>
                <button onClick={submit} type="submit" className="btn">Insert</button>
            </ul>

        </details>
    </div>
    <div className="p-4 ml-5 bg-white shadow-inner mt-3  sm:rounded-lg">
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Judul</th>
                        <th>Penulis</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>akka</td>
                        <td>akjha</td>

                    </tr>
                    <tr>
                        <td>akka</td>
                        <td>akjha</td>

                    </tr>
                    <tr>
                        <td>akka</td>
                        <td>akjha</td>

                    </tr>
                    <tr>
                        <td>akka</td>
                        <td>akjha</td>

                    </tr>
                    <tr>
                        <td>akka</td>
                        <td>akjha</td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</AuthNavUsersLayout>
);
}
