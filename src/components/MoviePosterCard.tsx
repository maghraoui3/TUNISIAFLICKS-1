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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { IoMdStar } from "react-icons/io";
import { FaHeart, FaBookmark, FaShareAlt, FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { SlOptionsVertical, SlOptions } from "react-icons/sl";
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from './ui/button';

const MovieCard = ({ posterImg, title, voteAverage, releaseDate, dropDown }: { dropDown?: any, posterImg: string, title: string, voteAverage: any, releaseDate: any }) => {
    return (
        <Link href={"/"}>
            <div className='w-full h-[216px] sm:h-[250px] rounded-xl p-0 z-0 relative'
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterImg})`,
                    backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
                }} >
                {dropDown ?
                    <label className='absolute z-50 right-1 top-1 px-3 py-[5.5px] bg-gray-900 rounded-xl scale-75 sm:scale-100'>
                        {dropDown}
                    </label>
                    : null}
                <div className='absolute left-0 top-0 w-full h-[216px] sm:h-[250px] z-10 bg-black opacity-10 transition-opacity ease-in-out duration-700 hover:opacity-0' />
                <label className='absolute left-1 top-1 bg-gray-900 pb-1 px-2 rounded-xl scale-75 sm:scale-100'>
                    <IoMdStar className='inline-block mr-1 text-yellow-400' />
                    <p className="inline-block bbc-text-shadow p-0 text-xs">{voteAverage.toString().substring(0, 3)}</p>
                </label>
                <div className='absolute bottom-5 left-3'>
                    <p className='text-white text-sm sm:text-base font-semibold bbc-text-shadow'>{title}</p>
                    <p className='text-white text-xs sm:text-xs font-semibold bbc-text-shadow'>{releaseDate.substring(0, 4)}</p>
                </div>
            </div>
        </Link>
    )
}

const CustomContextMenu = ({ children, title }) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                {/* <ContextMenuLabel className='font-bold text-base'>{title}d</ContextMenuLabel> */}
                <ContextMenuLabel className='font-bold text-base'>{title}</ContextMenuLabel>
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
    )
}

const CustomDropDownMenu = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SlOptions />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}




export default function MoviePosterCard({ id, posterImg, title, voteAverage, releaseDate }) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <CustomContextMenu title={title}>
                <MovieCard posterImg={posterImg} title={title} voteAverage={voteAverage} releaseDate={releaseDate} />
            </CustomContextMenu>
        )
    }
    return (
        <div>
            <MovieCard posterImg={posterImg} dropDown={<CustomDropDownMenu />} title={title} voteAverage={voteAverage} releaseDate={releaseDate} />
        </div>
    )
}
