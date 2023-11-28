import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
export default function Users({ auth, users, type1, type2, type3 }) {
const { flash } = usePage().props
const [searchTerm, setSearchTerm] = useState('');
const [filteredUsers, setFilteredUsers] = useState(users);

useEffect(() => {
const filtered = users.filter(user =>
user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
user.email.toLowerCase().includes(searchTerm.toLowerCase())
);
setFilteredUsers(filtered);
}, [searchTerm, users]);

return (
<AuthenticatedLayout user={auth.user}>

    <Head title="Users" />
    <div className="p-2 ml-3 m-2 bg-white  sm:rounded-lg" tabIndex={0}>
    <h1 className='font-bold text-gray-600'> <i class="fa-solid fa-users mr-2"></i> Daftar User Login </h1>
        <div>
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
    </div>

    <div className="flex items-center w-60 ml-5">
        <label for="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i class="fa-solid fa-users"></i>
            </div>
            <input type="text" id="simple-search" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Users ..." required />
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
                    {filteredUsers.map((user, index) => (
                    <tr key={index + 1}>
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
                            <a href={`/admin/usersDelete/${user.id}/`}>
                                <button className="btn btn-ghost btn-xs">
                                    <i class="fa-solid fa-trash text-red-700"></i>
                                </button>
                            </a>
                        </th>
                    </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-center font-bold text-gray-500 p-3">{filteredUsers.length == 0 ? (
                <span>--- Upss !! {searchTerm} tidak ditemukan ---</span>
                ) : ''}
            </p>
        </div>
    </div>
</AuthenticatedLayout>
);
}
