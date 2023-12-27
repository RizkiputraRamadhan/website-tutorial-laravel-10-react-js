import DemoTutorialLayout from '@/Layouts/ShowTutorialLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react'
export default function Dashboard({ auth, showTutor, fkAuthor, fkPlaylist }) {
const copyLink = `https://kuli-it.my.id/news/${showTutor.title.replace(/ /g, '-' )}`;
const copyToClipboard = () => {
const textArea = document.createElement('textarea');
textArea.value = copyLink;
document.body.appendChild(textArea);
textArea.select();
document.execCommand('copy');
document.body.removeChild(textArea);
}
return (
<DemoTutorialLayout user={auth.user}
    >

    <Head title="Demo" />

    <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-600">
                    <h2 class="font-bold text-2xl lg:text-3xl dark:text-gray-400">{showTutor.title} | <span
                            className="lg:text-2xl text-xl font-sans">#{fkPlaylist.name}</span> </h2>
                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="bg-white rounded-lg max-w-md mb-5 flex">
                        <div className="avatar">
                            <div
                                className="w-10 h-10 lg:w-14 lg:h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                <img src={`/storage/${fkAuthor.profil}`} />
                            </div>
                        </div>
                        <div className="w-px bg-gray-300 mx-4"></div>
                        <div className="flex-grow ">
                            <div className="flex ">
                                <a href={`/author/${fkAuthor.name.replace(/ /g, '_' )}`}>
                                    <p className="text-gray-700 text-sm lg:text-xl font-bold  mb-1 mr-2 ">
                                        {fkAuthor.name}
                                    </p>
                                </a>
                                <a href={`https://instagram.com/${fkAuthor.ig}`}
                                    className="text-gray-700 hover:text-primary">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                                <a href={`https://github.com/${fkAuthor.github}`}
                                    className="text-gray-700 hover:text-primary">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                            <p className="text-gray-600 text-xs lg:text-sm italic"> <span className="not-italic">
                                    {showTutor.updated_at.split("T")[0]} | </span> <strong>{fkAuthor.work_as}</strong>
                            </p>
                        </div>
                    </div>
                    <div className="max-w-6xl flex justify-center">
                        <img src={`/storage/${showTutor.image}`} alt="" className='rounded w-full' />
                    </div>
                    <div className="flex mt-5 mb-5">
                        <a href='/news' className='mr-2'>
                            <button class="btn btn-xs lg:btn-sm"> <i
                                    class="fa-solid fa-house-user  bg-primary p-1 rounded-full"></i>
                                Tutorial <i class="fa-solid fa-arrow-right fa-fade"></i></button>
                        </a>
                        <a href={`/news/category/${fkPlaylist.id}/${fkPlaylist.name }`}>
                            <button class="btn  btn-xs lg:btn-sm"> <i
                                    class="fa-solid bg-primary p-1 rounded-full fa-hashtag"></i>
                                {fkPlaylist.name
                                } <i class="fa-solid fa-arrow-right fa-fade"></i> </button>
                        </a>
                    </div>
                    <div className="m-2">
                    <p className="text-sm lg:text-xl text-gray-700" dangerouslySetInnerHTML={{ __html: showTutor.content }} />
                        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div className="tooltip tooltip-right" data-tip={copyLink}>
                            <button className="btn" onClick={copyToClipboard}>Copy Link <i class="far fa-copy"></i>
                            </button>
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] w-36  shadow bg-base-100 rounded-box ">
                            <li>
                                <a className="justify-end">
                                    <span>berhasil disalin</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button className="btn ml-2" >
                     Baca Nanti<i className="fa-regular justify-start fa-bookmark"></i></button>
                </div>
            </div>
        </div>
    </div>
</DemoTutorialLayout>
);
}
