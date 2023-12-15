import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
export default function Authors({ auth, users, authors, status1, status2 }, props) {
const { flash } = usePage().props
const [search, setSearch] = useState('');
const [filteredAuthors, setFilteredAuthors] = useState(authors);

useEffect(() => {
const filtered = authors.filter(user =>
user.name.toLowerCase().includes(search.toLowerCase()) ||
user.user_id.email.toLowerCase().includes(search.toLowerCase()) ||
user.work_as.toLowerCase().includes(search.toLowerCase())
);
setFilteredAuthors(filtered);
}, [search, authors]);

const [isExpanded, setIsExpanded] = useState(false);

const toggleButton = () => {
setIsExpanded(!isExpanded);
};
const [name, setName] = useState('');
const [profil, setProfil] = useState('');
const [status, setStatus] = useState('');
const [user_id, setUserId] = useState('');
const [whatsapp, setWhatsApp] = useState('');
const [instagram, setInstagram] = useState('');
const [github, setGithub] = useState('');
const [website, setWebsite] = useState('');
const [linkedin, setLinkedin] = useState('');
const [work_as, setWorkAs] = useState('');


const handleImage = (e) => {
setProfil(e.target.files[0]);
}

const submit = () => {
const data = {
name,
profil,
status,
user_id,
whatsapp,
instagram,
github,
website,
linkedin,
work_as,
};
router.post('/admin/authorsStore', data)
}
return (
<AuthenticatedLayout user={auth.user}>

    <Head title="Authors" />
    <div className="p-2 ml-3 m-2 bg-white  sm:rounded-lg" tabIndex={0}>
    <h1 className='font-bold text-gray-600'> <i class="fa-solid fa-pen-to-square mr-2"></i> Daftar Partisipan Authors </h1>
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
                        className="fa-solid fa-user-plus"></i></span> }</summary>
            <div>
                <ul className="p-5 shadow rounded mt-2">
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name
                        </label>
                        <input type="text" id="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" required
                            onChange={handleImage} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="user_id"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            user id
                        </label>
                        <select id="user_id"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required value={user_id} onChange={(e)=> setUserId(e.target.value)}
                            >
                            <option value="0">Pilih Akun</option>
                            {users.map((user) => (
                            <option value={user.id}>{user.name} || {user.email} || {user.typeuser == 1 ? 'admin' : user.typeuser == 2 ? 'authors' : user.typeuser == 3 ? 'user' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            WhatsApp
                        </label>
                        <input type="text" id="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="+62 8xxxxxx" value={whatsapp} onChange={(e)=> setWhatsApp(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Instagram
                        </label>
                        <input type="text" id="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="link instagram" value={instagram} onChange={(e)=> setInstagram(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Github
                        </label>
                        <input type="text" id="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Link Github" value={github} onChange={(e)=> setGithub(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Website
                        </label>
                        <input type="text" id="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Link Website" value={website} onChange={(e)=> setWebsite(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Linkedin
                        </label>
                        <input type="text" id="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Link Linkedin" value={linkedin} onChange={(e)=> setLinkedin(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Work As
                        </label>
                        <input type="text" id="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Programmer" value={work_as} onChange={(e)=> setWorkAs(e.target.value)}
                        />
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
                            <option value="1">Approve</option>
                            <option value="2">Pending</option>
                        </select>
                    </div>

                    <button className='btn' onClick={submit}>Tambah</button>
                </ul>
            </div>

        </details>
    </div>
    <div className="p-4 ml-5 bg-white shadow-inner mt-3  sm:rounded-lg">
        <div className="flex w-full">
            <h1 className="text-gray-600 font-bold p-3 text-sm">
                <span className="mr-4"> <i class="fa-solid fa-earth-asia"></i> : {authors.length} </span>
                <span className="mr-4"><i class="fa-solid fa-paper-plane"></i> : {status1.length}</span>
                <span className="mr-2"><i class="fa-solid fa-xmark"></i> : {status2.length}</span>
            </h1>
            <div className="flex items-center justify-content-end ml-auto w-40 lg:w-60">
                <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <input type="text" id="simple-search" value={search} onChange={(e)=> setSearch(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Authors ..." required />
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
                        <th>Peran</th>
                        <th>Status</th>
                        <th>Work As</th>
                        <th>Dibuat</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAuthors.map((author, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={`/storage/${author.profil}`} alt={author.name} />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{author.name}</div>
                                    <span className="badge badge-ghost badge-sm">{author.user_id.email}</span>
                                </div>
                            </div>
                        </td>
                        <td>{author.tutorials_count}</td>
                        <td>
                            <button className='flex my-2 '> { author.user_id.typeuser == 1 ? <span
                                    className="btn btn-xs bg-green-700 text-white">Master</span> :
                                author.user_id.typeuser == 2 ?
                                <span className="btn btn-xs bg-blue-700 text-white">Author</span> :
                                author.user_id.typeuser == 3 ?
                                <span className="btn btn-xs bg-red-700 text-white">User</span> : 'unknown' }
                            </button>
                        </td>
                        <td>
                            {author.status == 1 ? (
                            <button className='btn btn-xs btn-success'>Approve</button>
                            ) : author.status == 2 ? (
                            <button className='btn btn-xs btn-danger'>pending</button>
                            ) : (
                            ''
                            )}
                        </td>
                        <td>{author.work_as}</td>
                        <td>{author.created_at.split("T")[0]}</td>
                        <th>
                            <a href={`/author/${author.id_author}`}> <button className="btn btn-ghost btn-xs"><i
                                        class="fa-solid fa-eye text-indigo-700"></i></button></a>
                            <a href={`/admin/authorsEdit/${author.id}/${author.id_author}`}><button
                                    className="btn btn-ghost btn-xs"><i
                                        class="fa-solid fa-pen-to-square text-green-800"></i></button></a>
                            <a href={`/admin/authorsDelete/${author.id}/${author.id_author}`}><button
                                    className="btn btn-ghost btn-xs"><i
                                        class="fa-solid fa-trash text-red-700"></i></button></a>
                        </th>
                    </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-center font-bold text-gray-500 p-3">{filteredAuthors.length == 0 ? (
                <span>--- Upss !! {search} tidak ditemukan ---</span>
                ) : ''}
            </p>
        </div>
    </div>
</AuthenticatedLayout>
);
}
