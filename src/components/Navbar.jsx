import { useState } from "react";
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoBookSharp } from "react-icons/io5";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useCV } from '../hooks/useCV';

export default function Navbar() {
    const { cvUrl, isLoading, error, retry } = useCV();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md shadow-md z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo */}
                <div className="flex items-center gap-4">
                    <span className="text-white text-lg font-semibold">Yuelin's Portfolio</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 text-neutral-300">
                    <a target="_blank" href="https://www.linkedin.com/in/liuyuelintop" className="hover:text-white transition flex items-center">
                        <FaLinkedin />
                    </a>
                    <a target="_blank" href="https://github.com/liuyuelintop" className="hover:text-white transition flex items-center">
                        <FaGithub />
                    </a>
                    <a target="_blank" href="https://blog.liuyuelin.dev/" className="hover:text-white transition flex items-center">
                        <IoBookSharp />
                    </a>
                    <a
                        href={cvUrl}
                        onClick={e => {
                            if (isLoading || error) e.preventDefault();
                            if (error) retry();
                        }}
                        className={`flex items-center gap-2 px-3 py-1 rounded-lg border border-neutral-700 hover:border-white transition ${isLoading ? 'cursor-progress' : 'hover:text-white'
                            }`}
                    >
                        {isLoading ? (
                            <span className="animate-pulse">Loading...</span>
                        ) : error ? (
                            <span className="text-red-500" title={error}>Retry CV</span>
                        ) : (
                            <>
                                <HiOutlineDocumentDownload /> CV
                            </>
                        )}
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-neutral-300 hover:text-white transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-black/70 p-6 flex flex-col items-center gap-4 text-white md:hidden rounded-b-lg shadow-lg">
                    <a target="_blank" href="https://www.linkedin.com/in/liuyuelintop" className="hover:text-purple-400 transition flex items-center gap-2 text-lg" onClick={() => setIsOpen(false)}>
                        <FaLinkedin /> LinkedIn
                    </a>
                    <a target="_blank" href="https://github.com/liuyuelintop" className="hover:text-purple-400 transition flex items-center gap-2 text-lg" onClick={() => setIsOpen(false)}>
                        <FaGithub /> GitHub
                    </a>
                    <a target="_blank" href="https://blog.liuyuelin.dev/" className="hover:text-purple-400 transition flex items-center gap-2 text-lg" onClick={() => setIsOpen(false)}>
                        <IoBookSharp /> Blog
                    </a>
                    <a
                        href={cvUrl}
                        onClick={e => {
                            if (isLoading || error) e.preventDefault();
                            if (error) retry();
                            setIsOpen(false);
                        }}
                        className="hover:text-purple-400 transition flex items-center gap-2 text-lg"
                    >
                        <HiOutlineDocumentDownload />
                        {isLoading ? "Loading..." : error ? "Retry CV" : "Download CV"}
                    </a>
                </div>
            )}
        </nav>
    );
}
