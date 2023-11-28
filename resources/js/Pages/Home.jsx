import { Head } from '@inertiajs/react';
export default function Home({ auth }) {
return (
<>

    <Head title="Dashboard" />

    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">{auth ? (
                    <>
                    Anda sekarang
                    <a className='btn btn-sm btn-primary'>  { auth.name }</a>
                    <a className='btn btn-sm btn-primary' href='/login'> Dashboard</a>
                    </>
                ) : (
                    <>
                        <a className='btn btn-sm btn-primary' href='/login'> Login</a>
                        <a className='btn btn-sm btn-primary' href='/register'> Register</a>
                    </>
                    )
                    }
                </div>
            </div>
        </div>
    </div>
</>
);
}
