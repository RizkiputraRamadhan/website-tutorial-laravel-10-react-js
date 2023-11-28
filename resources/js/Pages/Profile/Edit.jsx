import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AuthNavAuthorsLayout from '@/Layouts/AuthNavAuthorsLayout';
import AuthNavUsersLayout from '@/Layouts/AuthNavUsersLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
export default function Edit({ auth, mustVerifyEmail, status, id_authors }) {
const { flash } = usePage().props
const [name, setName] = useState('');
const [user_id] = useState(auth.user.id);
const [approve] = useState(1);
const [profil, setProfil] = useState('');
const [whatsapp, setWhatsApp] = useState('');
const [instagram, setInstagram] = useState('');
const [github, setGithub] = useState('');
const [website, setWebsite] = useState('');
const [linkedin, setLinkedin] = useState('');
const [work_as, setWorkAs] = useState('');
if(id_authors) {

}
useEffect(() => {
setName(id_authors.name || '');
setProfil(id_authors.profil || '');
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
user_id,
approve,
whatsapp,
instagram,
github,
website,
linkedin,
work_as,
};
if(!id_authors) {
    router.post(`/authors/authorsStore`, data)
} else {
    router.post(`/authors/authorsUpdate/${id_authors.id}/${id_authors.name}`, data)
}
};
return (
<>
    {auth.user.typeuser == 1 ? (
    <AuthenticatedLayout user={auth.user}>

        <Head title="Profile" />
        <div className="py-12">
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
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status}
                        className="max-w-xl" />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>


                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>

    ) : auth.user.typeuser == 2 ? (
    <AuthNavAuthorsLayout user={auth.user}>

        <Head title="Profile" />


        <div className="py-12">
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
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status}
                        className="max-w-xl" />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div className='mb-5'>
                        <h2 className="text-lg font-medium text-gray-900">Informasi Author</h2>
                    </div>
                    <div>
                        <ul className="">
                            <div className="mb-6">
                                <label htmlFor="text"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name Author
                                </label>
                                <input type="text" id="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                                    required onChange={handleImage} />
                            </div>
                            {!id_authors.profil ? '' :
                            <>
                                <h1 className="text-gray-500 text-xs mb-2">Profil old</h1>
                                <div className="w-20 h-20">

                                    <img className='rounded' src={`/storage/${id_authors.profil}`} />
                                </div>
                            </>
                            }
                            <div className="mb-6">
                                <label htmlFor="text"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    WhatsApp
                                </label>
                                <input type="text" id="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="+62 8xxxxxx" value={whatsapp} onChange={(e)=>
                                setWhatsApp(e.target.value)}
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
                                    placeholder="Link Website" value={website} onChange={(e)=>
                                setWebsite(e.target.value)}
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
                            <button className='btn btn-sm btn-primary' onClick={submit}>Update</button>
                        </ul>
                    </div>
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </div>
    </AuthNavAuthorsLayout>

    ) : auth.user.typeuser == 3 ? (
    <AuthNavUsersLayout user={auth.user}>

        <Head title="Profile" />
        <div className="py-12">
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
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status}
                        className="max-w-xl" />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </div>
    </AuthNavUsersLayout>

    ) : ''}
</>
);
}
