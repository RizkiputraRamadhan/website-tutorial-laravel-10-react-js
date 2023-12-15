import React, { useState, useEffect } from 'react';
const BannerRilisPlaylist = ({rilisPlaylist}) => {
return (
<>
    <div className="bg-white overflow-hidden shadow-sm rounded-lg m-5">
        <div>
            <>
                <div className=" p-3 bg-emerald-300 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        className="stroke-info shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                        <h3 className="font-bold">Kabar Gembira Untuk Kamu !!</h3>
                        <div className="text-sm font-semibold mb-1">Segera rilis playlist baru : </div>
                        {rilisPlaylist.map((rilis, i) => (
                        <div className="text-sm my-2 flex">
                            <img src={`/storage/${rilis.image}`} alt="Logo"
                                className="w-10 rounded-full" />
                            <p className="p-2"> <span className="font-bold">{rilis.name}</span> </p>
                        </div>
                        ))}
                        <p className="text-sm mt-4"> <span className="text-red-800 text-lg">*</span> Sedang dalam pembuatan materi oleh para ahli dibidangnya.</p>
                    </div>
                </div>
            </>
        </div>
    </div>
</>
)

}
export default BannerRilisPlaylist;
