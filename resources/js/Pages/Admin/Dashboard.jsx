import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react'
export default function Dashboard({ auth, laravelVersion, phpVersion, users, tutorial, authors, playlist }, props) {
const { flash } = usePage().props
return (
<AuthenticatedLayout user={auth.user}>

    <Head title="Dashboard" />

    <div className="py-2  ">
        <div className="sm:px-6 ">
            <div className="bg-white overflow-hidden sm:rounded-lg">
                <div className='p-2'>
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
        </div>
    </div>
    <div className="p-2 ml-3 m-2 bg-white  sm:rounded-lg ">
        <div className="">
            <img className='w-32 m-auto' src={`/storage/kuliit_logo.png`}  alt="" />
           <h1 className="text-center font-semibold text-lg text-gray-600">Dashboard Master Kuli IT Tecno</h1>
           <h1 className="text-center text-sm text-gray-600">Welcome Admin { auth.user.name }</h1>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 p-5">
            <>
                <div className="rounded-lg shadow hover:shadow-red-500 shadow-red-300">
                    <div className="stat">
                        <div className="stat-figure ">
                            <div className="w-16 rounded-full">
                                <i class="fa-solid text-3xl fa-circle-play"></i>
                            </div>
                        </div>
                        <div className="stat-title font-bold text-black">Playlist</div>
                        <div className="text-xs">Count : {playlist}</div>
                    </div>
                </div>
                <div className="rounded-lg shadow hover:shadow-green-500 shadow-green-300">
                    <div className="stat">
                        <div className="stat-figure ">
                            <div className="w-16 rounded-full">
                                <i class="text-3xl fa-solid fa-users"></i>
                            </div>
                        </div>
                        <div className="stat-title font-bold text-black">Users </div>
                        <div className="text-xs">Count : {users}</div>
                    </div>
                </div>
                <div className="rounded-lg shadow hover:shadow-blue-500 shadow-blue-300">
                    <div className="stat">
                        <div className="stat-figure ">
                            <div className="w-16 rounded-full">
                                <i class="text-3xl fa-solid fa-pen-to-square"></i>
                            </div>
                        </div>
                        <div className="stat-title font-bold text-black">Authors </div>
                        <div className="text-xs">Count : {authors}</div>
                    </div>
                </div>
                <div className="rounded-lg shadow hover:shadow-yellow-500 shadow-yellow-300">
                    <div className="stat">
                        <div className="stat-figure ">
                            <div className="w-16 rounded-full">
                                <i class="text-3xl fa-solid fa-signs-post"></i>
                            </div>
                        </div>
                        <div className="stat-title font-bold text-black">Posingan </div>
                        <div className="text-xs">Count : {tutorial}</div>
                    </div>
                </div>
            </>
        </div>
    </div>
    <div className="p-2 ml-3 m-2 bg-white  sm:rounded-lg" tabIndex={0}>
        <h1 className="font-bold"> <i className="fa-solid fa-house mr-3 "></i> Information</h1>
        <div className="p-2 ml-3 m-2 bg-white ">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className='font-bold text-capitalize text-black text-sm'>Database Information</th>
                        </tr>
                        <tr>
                            <th>Name database </th>
                            <th className='text-black'>: Kuli It Tecno</th>
                        </tr>
                        <tr>
                            <th>Password </th>
                            <th className='text-black'>: 12312313</th>
                        </tr>
                        <tr>
                            <th>Kapasitas Database </th>
                            <th className='text-black'>: 4000 data</th>
                        </tr>
                        <tr>
                            <th>Keseluruhan Data </th>
                            <th className='text-black'>: 2000 digunakan</th>
                        </tr>
                        <th></th>
                        <th className='text-black'>: 2000 Kosong</th>

                        <tr>
                            <th className='font-bold text-capitalize text-black text-sm'>Hosting Information</th>
                        </tr>
                        <tr>
                            <th>Email Host </th>
                            <th className='text-black'>: Poertra@gmail,com</th>
                        </tr>
                        <tr>
                            <th>Password Host </th>
                            <th className='text-black'>: 123123</th>
                        </tr>
                        <tr>
                            <th>Platfom </th>
                            <th className='text-black'>: Niagahoster</th>
                        </tr>
                        <tr>
                            <th>TGl Chekout </th>
                            <th className='text-black'>: 12 sep 2021</th>
                        </tr>
                        <tr>
                            <th>TGl Explayed </th>
                            <th className='text-black'>: 13 sep 2021</th>
                        </tr>
                        <th></th>
                        <th className='text-black'>: 10 bulan lagi </th>


                        <tr>
                            <th className='font-bold text-capitalize text-black text-sm'>Tecnologi Information</th>
                        </tr>
                        <tr>
                            <th>Laravel </th>
                            <th className='text-black'>: v{laravelVersion}</th>
                        </tr>
                        <tr>
                            <th>PHP </th>
                            <th className='text-black'>: v{phpVersion}</th>
                        </tr>
                        <tr>
                            <th>Node JS </th>
                            <th className='text-black'>: v18.18</th>
                        </tr>
                        <tr>
                            <th>React JS </th>
                            <th className='text-black'>: -</th>
                        </tr>
                        <tr>
                            <th>Inertia </th>
                            <th className='text-black'>: -</th>
                        </tr>
                        <tr>
                            <th>Vite </th>
                            <th className='text-black'>: v4.5.0</th>
                        </tr>
                        <tr>
                            <th>Tailwind </th>
                            <th className='text-black'>: -</th>
                        </tr>
                        <tr>
                            <th>Daisyui </th>
                            <th className='text-black'>: -</th>
                        </tr>
                        <th></th>

                    </thead>
                </table>
            </div>
        </div>
    </div>
</AuthenticatedLayout>
);
}
