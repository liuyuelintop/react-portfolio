import { generalImages } from "../constants/assets"; // ✅ 引入 assets
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoBookSharp } from "react-icons/io5";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useCV } from '../hooks/useCV'; // 📌 封装自定义Hook

export default function Navbar() {
    const { cvUrl, isLoading, error, retry } = useCV();

    return (
        <nav className="mb-20 flex items-center justify-between py-6">
            <div className="flex gap-4 items-center flex-shrink-0">
                <img className="mx-2 w-10" src={generalImages.logo} alt="logo" />
            </div>
            <div className="m-8 flex items-center justify-center gap-4 text-2xl">
                <a target="_blank" href="https://www.linkedin.com/in/yuelin-liu-867ab6259/"> <FaLinkedin /></a>
                <a target="_blank" href="https://github.com/liuyuelintop"><FaGithub /></a>
                <a target="_blank" href="https://blog.liuyuelin.dev/"><IoBookSharp /></a>
                <a
                    href={cvUrl}
                    onClick={e => {
                        if (isLoading || error) e.preventDefault();
                        if (error) retry();
                    }}
                    className={`flex items-center ${isLoading ? 'cursor-progress' : ''}`}
                >
                    {isLoading ? (
                        <span className="animate-pulse">Loading CV...</span>
                    ) : error ? (
                        <span className="text-red-500" title={error}>Retry CV</span>
                    ) : (
                        <>
                            <HiOutlineDocumentDownload /> CV
                        </>
                    )}
                </a>
            </div>

        </nav >
    )
}
