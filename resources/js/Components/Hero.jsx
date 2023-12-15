const Hero = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={`/storage/hero.gif`} className="mask mask-hexagon max-w-full lg:max-w-sm rounded-lg shadow-2xl" />
                <div className='text-center lg:text-left'>
                <h1 className="text-5xl font-bold">Kuli IT Tecno</h1>
                <p className="py-6 text-3x1 ">A personal website that provides various interesting content ranging from news and tutorials to even tools that are useful for everyone.</p>
                <a href="#cari" className="btn btn-primary">Cari Playlist Kamu</a>
                </div>
            </div>
        </div>
    )
}
export default Hero;
