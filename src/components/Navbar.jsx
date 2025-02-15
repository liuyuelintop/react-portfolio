import logo from "../assets/Logo.png"
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoBookSharp } from "react-icons/io5";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { getLatestCV } from "../utils/api"; // 📌 引入 getLatestCV
import { useEffect, useState } from "react";

export default function Navbar() {
    const [cvUrl, setCvUrl] = useState("#");

    useEffect(() => {
        getLatestCV().then(url => setCvUrl(url));
    }, []);
    return (
        <nav className="mb-20 flex items-center justify-between py-6">
            <div className="flex gap-4 items-center flex-shrink-0">
                <img className="mx-2 w-10" src={logo} alt="logo" />
            </div>
            <div className="m-8 flex items-center justify-center gap-4 text-2xl">
                <a target="_blank" href="https://www.linkedin.com/in/yuelin-liu-867ab6259/"> <FaLinkedin /></a>
                <a target="_blank" href="https://github.com/liuyuelintop"><FaGithub /></a>
                <a target="_blank" href="https://blog.liuyuelin.dev/"><IoBookSharp /></a>
                <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <HiOutlineDocumentDownload /> CV
                </a>
            </div>

        </nav >
    )
}
