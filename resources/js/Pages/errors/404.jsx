import InterfaceLayout from '@/Layouts/InterfaceLayout';
import { Head } from '@inertiajs/react';
const NotFound = ({ auth, playNavbar, error }) => {
return (
<InterfaceLayout user={auth} playNavbar={playNavbar}>
<>

    < Head title='404' />
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={`/storage/404.gif`}
                className="mask max-w-full lg:max-w-sm rounded-lg shadow-2xl" />
            <div className='text-center lg:text-left'>
                <h1 className="text-5xl font-bold">Halaman 404</h1>
                <p className="py-6 text-3x1 "><span className="font-semibold">{error ? error : 'Halaman'}</span> tidak ada, Cek kembali alamat URL, mungkin tidak aktif atau salah mengetik.</p>
               <a href="/"> <button className="btn btn-primary">Kembali ke Home</button> </a>
            </div>
        </div>
    </div>
</>
</InterfaceLayout>
)
}
export default NotFound;
