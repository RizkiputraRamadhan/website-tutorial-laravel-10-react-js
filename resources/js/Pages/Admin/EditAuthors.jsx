import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
export default function editAkun({ auth, id_authors, authors, users }, props) {
const { flash } = usePage().props
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

useEffect(() => {
setName(id_authors.name || '');
setProfil(id_authors.profil || '');
setStatus(id_authors.status || '');
setUserId(id_authors.user_id || '');
setWhatsApp(id_authors.wa || '');
setInstagram(id_authors.ig || '');
setGithub(id_authors.github || '');
setWebsite(id_authors.web || '');
setLinkedin(id_authors.linkedin || '');
setWorkAs(id_authors.work_as || '');
}, [id_authors]);

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
router.post(`/admin/authorsUpdate/${id_authors.id}/${id_authors.name}`, data)
};
return (
<AuthenticatedLayout user={auth.user}>

    <Head title="Authors" />

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
                            <button onClick={()=> {window.location.href=""}} className="btn btn-sm">Tutup</button>
                        </div>
                    </>
                    )}
                </div>
                <div className="p-6 text-gray-900 ">
                    <div className="text-sm breadcrumbs font-bold">
                        <ul>
                            <li> <i class="fa-solid fa-pencil mr-3"></i><a href='/admin/dashboard'>Home</a></li>
                            <li><a href='/admin/authors'>Edit</a></li>
                            <li>{id_authors.name}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <ul className="p-5 shadow rounded mt-2">
                        <div className="mb-6">
                            <label htmlFor="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                        <h1 className="text-gray-500 text-xs mb-2">Profil old</h1>
                        <div className="w-20 h-20">
                            <img className='rounded' src={`/storage/${id_authors.profil}`} />
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
                                <option value={user.id}>{user.name} || {user.email}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                WhatsApp
                            </label>
                            <input type="text" id="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="+62 8xxxxxx" value={whatsapp} onChange={(e)=> setWhatsApp(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Instagram
                            </label>
                            <input type="text" id="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="link instagram" value={instagram} onChange={(e)=>
                            setInstagram(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Github
                            </label>
                            <input type="text" id="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Link Github" value={github} onChange={(e)=> setGithub(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Website
                            </label>
                            <input type="text" id="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Link Website" value={website} onChange={(e)=> setWebsite(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Linkedin
                            </label>
                            <input type="text" id="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Link Linkedin" value={linkedin} onChange={(e)=>
                            setLinkedin(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                            <th>Peran</th>
                            <th>Status</th>
                            <th>Work As</th>
                            <th>Dibuat</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map((author, index) => (
                        <tr key={index + 1} className={id_authors.id==author.id ? 'bg-primary text-lg' : '' }>
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
                            <td>
                                <a href={`/admin/authorsEdit/${author.id}/${author.id_author}`}>
                                    <button className="btn btn-ghost btn-xs">
                                        <i class="fa-solid fa-pen-to-square text-green-800"></i>
                                    </button>
                                </a>
                            </td>
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
