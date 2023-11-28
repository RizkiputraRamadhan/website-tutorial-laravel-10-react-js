import AuthNavAuthorsLayout from '@/Layouts/AuthNavAuthorsLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react'
export default function Dashboard({ auth, tutorials, drafts,publish ,playlist }, props) {
const { flash, additionalInfo } = usePage().props

const getOperatingSystemIcon = (os) => {
    if (os.toLowerCase().includes('windows')) {
        return <i class="fa-brands fa-windows lg:text-6xl text-3xl"></i>;
    } else if (os.toLowerCase().includes('linux')) {
        return <i className="fa-brands fa-linux text-3xl"></i>;
    } else if (os.toLowerCase().includes('android')) {
        return <i className="fa-solid fa-mobile text-3xl"></i>;
    } else if (os.toLowerCase().includes('ios') || os.toLowerCase().includes('iphone') || os.toLowerCase().includes('ipad')) {
        return <i className="fa-brands fa-apple text-3xl"></i>;
    } else {
        return <i class="fa-regular fa-hourglass fa-spin  text-3xl"></i>;
    }
  };


return (
<AuthNavAuthorsLayout user={auth.user}>

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
            <img className='w-32 m-auto' src={`/storage/kuliit_logo.png`} alt="" />
            <h1 className="text-center font-semibold text-lg text-gray-600">Dashboard Author Kuli IT Tecno</h1>
            <h1 className="text-center text-sm text-gray-600">WELCOME AUTHOR { auth.user.name.toUpperCase() }</h1>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-2 m-auto p-5 ">
            <>
                <div className="rounded-lg shadow hover:shadow-indigo-500 shadow-indigo-300">
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
                <div className="rounded-lg lg:-mt-0 -mt-6 shadow hover:shadow-yellow-500 shadow-yellow-300">
                    <div className="stat">
                        <div className="stat-figure ">
                            <div className="w-16 rounded-full">
                                <i class="text-3xl fa-solid fa-signs-post"></i>
                            </div>
                        </div>
                        <div className="stat-title font-bold text-black">Tutorial Yang Kamu Tulis </div>
                        <div className="text-xs">Count : {tutorials.length == 0 ? 'belum ada tutor yang ditulis' :
                            tutorials.length}</div>
                    </div>
                </div>

                <div className="rounded-lg lg:-mt-0 -mt-6 shadow hover:shadow-red-500 shadow-red-300">
                    <div className="stat">
                        <div className="stat-figure ">
                            <div className="w-16 rounded-full">
                                <i class="text-3xl fa-solid fa-signs-post"></i>
                            </div>
                        </div>
                        <div className="stat-title font-bold text-black">Tutorial Belum Dipublish </div>
                        <div className="text-xs">Count : {drafts > 0 ? <span className="text-red-900">{drafts}</span> :
                            'tidak ada' }</div>
                    </div>
                </div>

                <div className="rounded-lg lg:-mt-0 -mt-6 shadow hover:shadow-blue-500 shadow-blue-300">
                    <div className="stat">
                        <div className="stat-figure ">
                            <div className="w-16 rounded-full">
                                <i class="fa-solid fa-paper-plane text-3xl "> </i>
                            </div>
                        </div>
                        <div className="stat-title font-bold text-black">Tutorial Sudah Dipublish </div>
                        <div className="text-xs">Count : {publish == 0 ? 'tidak ada' : publish}</div>
                    </div>
                </div>
            </>
        </div>
    </div>
    <div className="p-2 ml-3 m-2 bg-white  sm:rounded-lg" tabIndex={0}>
        <h1 className="font-bold"> <i className="fa-solid fa-house mr-3 "></i> Information</h1>
        <div className="p-2 ml-3 mt-5 m-2 bg-white ">
            <div className="rounded-lg lg:-mt-0 -mt-6 border border-black">
                <div className="stat">
                    <div className="lg:stat-figure ">
                        <div className="w-16 rounded-full">
                          {getOperatingSystemIcon(additionalInfo['Operating System'])}
                        </div>
                    </div>
                    <div className="stat-title font-bold text-black">Perangkat : {additionalInfo['Operating System']} </div>
                    <div className="stat-title font-bold text-black">IP Address: {additionalInfo.IP}</div>
                    <div className="stat-title font-bold text-black">Peran User: Penulis</div>
                    <div className="stat-title font-bold text-black">Jam Login : -</div>
                    <div className="stat-title font-bold text-black">TGL login : -</div>
                </div>
            </div>
        </div>
    </div>
</AuthNavAuthorsLayout>
);
}
