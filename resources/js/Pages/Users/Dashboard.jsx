import AuthNavUsersLayout from '@/Layouts/AuthNavUsersLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react'
export default function Dashboard({ auth }, props) {
const { flash } = usePage().props
return (
<AuthNavUsersLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard
    </h2>}
    >

    <Head title="Dashboard" />

    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <alert>
                        {flash.message && (
                        <>
                            <div className="alert shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    className="stroke-info shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <h3 className="font-bold">Welcome To Kuli IT Tecno!</h3>
                                    <div className="text-xs">{flash.message}</div>
                                </div>
                                <button onClick={() => {window.location.href=""}} className="btn btn-sm">Refresh</button>
                            </div>
                        </>
                        )}
                    </alert>
                <div className="p-6 text-gray-900">You're logged in!</div>
            </div>
        </div>
    </div>
</AuthNavUsersLayout>
);
}
