import { CONTACT } from "../constants/constants";

export default function Contact() {
    return (
        <section
            className="border-b border-neutral-900 py-16 px-6 sm:px-12">
            {/* 标题 */}
            <h1
                className="text-center text-3xl sm:text-4xl font-semibold mb-8 text-white">
                Get in Touch
            </h1>

            {/* 内容区域 */}
            <div className="max-w-lg mx-auto flex flex-col gap-6 text-center text-neutral-300">
                {/* 地址 */}
                <div className="flex flex-col items-center">
                    <span className="text-sm font-medium uppercase text-neutral-500">Address</span>
                    <p className="text-lg">{CONTACT.address}</p>
                </div>

                {/* 电话号码 */}
                <div className="flex flex-col items-center">
                    <span className="text-sm font-medium uppercase text-neutral-500">Phone</span>
                    <p className="text-lg">{CONTACT.phoneNo}</p>
                </div>

                {/* 邮箱 */}
                <div className="flex flex-col items-center">
                    <span className="text-sm font-medium uppercase text-neutral-500">Email</span>
                    <a
                        href={`mailto:${CONTACT.email}`}
                        className="text-lg text-purple-400 font-medium hover:text-purple-300 transition-all"
                    >
                        {CONTACT.email}
                    </a>
                </div>
            </div>
        </section>
    );
}
