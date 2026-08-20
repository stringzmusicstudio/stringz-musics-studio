"use client";

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

export default function FloatingSocialDock() {
  return (
    <div className="fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 md:block">
     <div className="flex flex-col gap-1 rounded-r-2xl border-y border-r border-white/5 bg-white/5 p-1.5 backdrop-blur-3xl">

        <a
          href="https://www.instagram.com/stringz.music.studio/"
          target="_blank"
          rel="noreferrer"
          className="group flex h-9 w-9 items-center justify-center rounded-xl text-white/55 transition hover:bg-yellow-400 hover:text-black"
        >
          <FaInstagram size={17} />
        </a>

        <a
          href="https://www.facebook.com/100095015471247"
          target="_blank"
          rel="noreferrer"
         className="group flex h-9 w-9 items-center justify-center rounded-xl text-white/55 transition hover:bg-yellow-400 hover:text-black"
        >
          <FaFacebookF size={15} />
        </a>

        <a
          href="https://whatsapp.com/channel/0029Vb8XHtG30LKNFN6Xr61F"
          target="_blank"
          rel="noreferrer"
         className="group flex h-9 w-9 items-center justify-center rounded-xl text-white/55 transition hover:bg-yellow-400 hover:text-black"
        >
          <FaWhatsapp size={17} />
        </a>

      </div>
    </div>
  );
}