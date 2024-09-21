"use client"
import React from 'react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import Link from 'next/link';
import { IoMdStar } from "react-icons/io";
import { FaHeart, FaBookmark, FaShareAlt, FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";

export default function MoviePoserCard({ data }) {
    return (
        <div key={data.id} className="transition-transform ease-in-out duration-400 select-none basis-[145px] md:basis-[167px] my-4 p-0 ml-4 hover:scale-110 hover:z-10">
            <ContextMenu>
                <ContextMenuTrigger>
                    <Link href={"/"}>
                        <div className='w-full h-[216px] sm:h-[250px] rounded-xl p-0 z-0 relative'
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.poster_path})`,
                                backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
                            }} >
                            <div className='absolute left-0 top-0 w-full h-[216px] sm:h-[250px] z-10 bg-black opacity-10 transition-opacity ease-in-out duration-700 hover:opacity-0' />
                            <label className='absolute left-1 top-1 bg-gray-900 pb-1 px-2 rounded-xl scale-75 sm:scale-100'>
                                <IoMdStar className='inline-block mr-1 text-yellow-400' />
                                <p className="inline-block bbc-text-shadow p-0 text-xs">{data.vote_average.toString().substring(0, 3)}</p>
                            </label>
                            <div className='absolute bottom-5 left-3'>
                                <p className='text-white text-sm sm:text-base font-semibold bbc-text-shadow'>{data.title}</p>
                                <p className='text-white text-xs sm:text-xs font-semibold bbc-text-shadow'>{data.release_date.substring(0, 4)}</p>
                            </div>
                        </div>
                    </Link>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuLabel className='font-bold text-base'>{data.title}</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <ContextMenuItem><FaHeart className='mr-2' />Add To Favorites</ContextMenuItem>
                    <ContextMenuItem><FaBookmark className='mr-2' />Add To BookMarks</ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger><FaShareAlt className='mr-2' />Share</ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                            <ContextMenuItem><FaFacebook className='mr-2' />Facebook</ContextMenuItem>
                            <ContextMenuItem><FaXTwitter className='mr-2' />X</ContextMenuItem>
                            <ContextMenuItem><FaWhatsapp className='mr-2' />Telegram</ContextMenuItem>
                            <ContextMenuItem><FaTelegram className='mr-2' />Telegram</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem><LuCopy className='mr-2' />Copy Link</ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    )
}
