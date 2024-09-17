import logo from "../assets/Logo.png"
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoBookSharp } from "react-icons/io5";
import { HiOutlineDocumentDownload } from "react-icons/hi";
export default function Navbar() {
    return (
        <nav className="mb-20 flex items-center justify-between py-6">
            <div className="flex gap-4 items-center flex-shrink-0">
                <img className="mx-2 w-10" src={logo} alt="logo" />
            </div>
            <div className="m-8 flex items-center justify-center gap-4 text-2xl">
                <a target="_blank" href="https://www.linkedin.com/in/yuelin-liu-867ab6259/"> <FaLinkedin /></a>
                <a target="_blank" href="https://github.com/liuyuelintop"><FaGithub /></a>
                <a target="_blank" href="https://next-blog-alpha-sable-40.vercel.app/"><IoBookSharp /></a>
                <a
                    className="flex items-center"
                    target="_blank"
                    href="https://drive.google.com/file/d/1fXgTRPyUQBYm7QINTSQvcNWuce9z8CUU/view"
                >
                    <HiOutlineDocumentDownload /> cv
                </a>
            </div>

        </nav >
    )
}
