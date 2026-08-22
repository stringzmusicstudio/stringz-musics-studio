"use client";

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

export default function FloatingSocialDock() {
  return (
    <div
      className="
        fixed right-0 top-1/2 z-50 -translate-y-1/2
        md:left-0 md:right-auto
      "
    >
      <div
        className="
          flex flex-col
          gap-0.5
          rounded-l-2xl
          border-y border-l border-white/5
          bg-white/5
          p-1
          backdrop-blur-3xl

          md:gap-1
          md:rounded-l-none
          md:rounded-r-2xl
          md:border-l-0
          md:border-r
          md:p-1.5
        "
      >
        <a
          href="https://www.instagram.com/stringz.music.studio/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="
            group flex h-8 w-8 items-center justify-center
            rounded-xl text-white/55 transition
            hover:bg-yellow-400 hover:text-black

            md:h-9 md:w-9
          "
        >
          <FaInstagram className="text-[15px] md:text-[17px]" />
        </a>

        <a
          href="https://www.facebook.com/100095015471247"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="
            group flex h-8 w-8 items-center justify-center
            rounded-xl text-white/55 transition
            hover:bg-yellow-400 hover:text-black

            md:h-9 md:w-9
          "
        >
          <FaFacebookF className="text-[13px] md:text-[15px]" />
        </a>

        <a
          href="https://whatsapp.com/channel/0029Vb8XHtG30LKNFN6Xr61F"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="
            group flex h-8 w-8 items-center justify-center
            rounded-xl text-white/55 transition
            hover:bg-yellow-400 hover:text-black

            md:h-9 md:w-9
          "
        >
          <FaWhatsapp className="text-[15px] md:text-[17px]" />
        </a>
      </div>
    </div>
  );
}