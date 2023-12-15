import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
export default function Users({ auth, users, type1, type2, type3, usersEdit }) {
    const { flash } = usePage().props
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [typeUser, setType] = useState('');
    const [password, setPwd] = useState('');

    useEffect(() => {
    setName(usersEdit.name || '');
    setEmail(usersEdit.email || '');
    setType(usersEdit.typeuser || '');
    setPwd(usersEdit.password || '');
    }, [usersEdit]);


    const submit = () => {
    const data = {
    name,
    email,
    typeUser,
    password,
    };
    router.post(`/admin/usersUpdate/${usersEdit.id}/${usersEdit.name}`, data)
    };
return (
<AuthenticatedLayout user={auth.user}>

    <Head title="Users" />
    <div className="sm:px-6 ">
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
        <div className="bg-white overflow-hidden sm:rounded-lg">
            <div className="p-6 text-gray-900 ">
                <div className="text-sm breadcrumbs font-bold">
                    <ul>
                        <li> <i class="fa-solid fa-pencil mr-3"></i><a href='/admin/dashboard'>Home</a></li>
                        <li><a href='/admin/users'>Edit</a></li>
                        <li>{usersEdit.name}</li>
                    </ul>
                </div>
            </div>
            <div>
                <ul className="p-5 shadow rounded mt-2">
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name
                        </label>
                        <input type="email" id="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input type="text" id="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                           Password
                        </label>
                        <input type="password" id="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Password" value={password} onChange={(e)=> setPwd(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="type user"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Peran
                        </label>
                        <select id="type user"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required value={typeUser} onChange={(e)=> setType(e.target.value)}
                            >
                            <option value="0">Pilih Peran</option>
                            <option value="1">Master</option>
                            <option value="2">Authors</option>
                            <option value="3">Users</option>
                        </select>
                    </div>
                    <button className='btn' onClick={submit}>Update Sekarang</button>
                </ul>
            </div>
        </div>
    </div>
    <div className="p-4 ml-5 bg-white shadow-inner mt-3  sm:rounded-lg">
        <h1 className="text-gray-600 font-bold text-sm"> <span className="mr-4"> <i class="fa-solid fa-earth-asia"></i>
                : {users.length} </span> <span className="mr-4"> <i class="fa-solid fa-user-tie text-green-700"></i> :
                {type1} </span> <span className="mr-4"> <i class="fa-solid fa-user-tie text-blue-700"></i> : {type2}
            </span> <span className="mr-4"> <i class="fa-solid fa-user-tie text-red-700"></i> : {type3} </span> </h1>
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Peran</th>
                        <th>Dibuat</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={index + 1} className={usersEdit.id == user.id ? 'bg-primary text-lg' : ''}>
                        <td>{index + 1}</td>
                        <td>
                            <div className="flex items-center gap-3">
                                <div>
                                    <div className="font-bold">{user.name}</div>
                                </div>
                            </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.typeuser == 1 ? <button className="btn btn-xs bg-green-700 text-white"> Master
                            </button> : user.typeuser == 2 ? <button className="btn btn-xs bg-blue-700 text-white">
                                Authors </button> : user.typeuser == 3 ? <button
                                className="btn btn-xs bg-red-700 text-white"> User </button> : ''}</td>
                        <td>{user.created_at.split("T")[0]}</td>

                        <th>
                            <a href={`/admin/usersEdit/${user.id}/${user.name.replace(/ /g, '-' )}`}>
                                <button className="btn btn-ghost btn-xs">
                                    <i class="fa-solid fa-pen-to-square text-green-800"></i>
                                </button>
                            </a>
                        </th>
                    </tr>
                    ))}
                </tbody>

            </table>
        </div>
    </div>
</AuthenticatedLayout>
);
}
