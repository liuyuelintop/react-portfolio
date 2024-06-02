import logo from "../assets/Logo.png"
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoBookSharp } from "react-icons/io5";

export default function Navbar() {
    return (
        <nav className="mb-20 flex items-center justify-between py-6">
            <div className="flex gap-4 items-center flex-shrink-0">
                <img className="mx-2 w-10" src={logo} alt="logo" />
                <a
                    href="https://raw.githubusercontent.com/liuyuelintop/yl-resume/main/Yuelin_Liu_resume.docx"
                    download
                    className="px-4 py-2 bg-indigo-600 text-neural font-semibold rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-300"
                >
                    Resume
                </a>
            </div>
            <div className="m-8 flex items-center justify-center gap-4 text-2xl">
                <a target="_blank" href="https://www.linkedin.com/in/yuelin-liu-867ab6259/"> <FaLinkedin /></a>
                <a target="_blank" href="https://github.com/liuyuelintop"><FaGithub /></a>
                <a target="_blank" href="https://next-blog-alpha-sable-40.vercel.app/"><IoBookSharp /></a>
            </div>

        </nav >
    )
}
