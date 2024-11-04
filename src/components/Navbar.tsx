"use client";

import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IoMdLogIn } from "react-icons/io";
import { RiLoginCircleFill } from "react-icons/ri";

import { BiSearchAlt2 } from "react-icons/bi";
import { BiSolidSearchAlt2 } from "react-icons/bi";

import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";

import { BiMoviePlay } from "react-icons/bi";
import { BiSolidMoviePlay } from "react-icons/bi";

import { BiTv } from "react-icons/bi";
import { BiSolidTv } from "react-icons/bi";

import { TbMenu2 } from "react-icons/tb";

import { globalStore } from '@/store/store';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const Navbar = () => {
  const pathname = usePathname();

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const mobileNav = [
    { name: 'Home', href: '/', icon: <GoHome className='text-xl' />, activeIcon: <GoHomeFill className='text-xl text-red-500' /> },
    { name: 'Movies', href: '/movies', icon: <BiMoviePlay className='text-xl' />, activeIcon: <BiSolidMoviePlay className='text-xl text-red-500' /> },
    { name: 'Search', href: '/search', icon: <BiSearchAlt2 className='text-xl' />, activeIcon: <BiSolidSearchAlt2 className='text-xl text-red-500' /> },
    { name: 'TV Shows', href: '/tv', icon: <BiTv className='text-xl' />, activeIcon: <BiSolidTv className='text-xl text-red-500' /> },
  ];

  const asideState = globalStore((state: any) => state.fillWithSideBar);
  const updateAsideState = globalStore((state: any) => state.setFillWithSideBar);

  return (
    <nav>
      <div className="bg-gray-800 text-black shadow-md dark:shadow-none shadow-slate-800 fixed top-0 left-0 right-0 z-40 dark:bg-black dark:text-gray-200 dark:border-b-2 dark:border-gray-900">
        <div className="hidden sm:flex mx-auto px-2 sm:px-6 lg:px-8 justify-center">
          <div className="relative flex w-full items-center justify-between h-16 max-w-[2000px]">
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/">
                <p className="flex-shrink-0">
                  <Image src="/A.svg" alt="Logo" width={40} height={40} />
                </p>
              </Link>
              {/* Links */}
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link href="/">
                    <p className="text-red-500 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-xl text-sm font-medium">
                      Movies
                    </p>
                  </Link>
                  <Link href="/tv">
                    <p className="text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-xl text-sm font-medium">
                      TV Shows
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            {/* Search Bar */}
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a6 6 0 105.293 3.293A6.014 6.014 0 0012 8a6 6 0 00-4-5.683V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="transition-all duration-75 ease-in-out block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 dark:bg-[#0d0c0f] text-gray-300 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-[#1a161f] focus:border-white dark:focus:border-gray-500 focus:ring-white focus:text-gray-900 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            {/* User Profile or Login Button */}
            <SignedOut>
              <p className="text-white bg-red-600 hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-500 transition-all ease-in-out delay-75 hover:text-white px-3 py-2 rounded-xl text-sm font-medium">
                <SignInButton />
              </p>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        {/* Top mobile navbar */}
        <div className='sm:hidden p-3 flex gap-4'>
          <TbMenu2 className='text-2xl text-white' onClick={() => updateAsideState(!asideState)} />
          <div className='flex justify-center w-full pr-5'>
            <Image src="/TunisiaFlicks.svg" alt="Logo" width={150} height={50} />
          </div>
        </div>
      </div>

      {/* Bottom mobile navbar */}
      <div className="sm:hidden fixed bottom-0 text-white bg-black w-full py-1 z-50">
        <ul className='flex justify-evenly'>
          {mobileNav.map((item, index) => {
            const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <li key={index} className="flex justify-center p-2">
                <Link href={item.href}>
                  {isActive ? item.activeIcon : item.icon}
                </Link>
              </li>
            );
          })}
          <li className="flex justify-center p-2">
            <SignedOut>
              <SignInButton>
                <IoMdLogIn className='text-xl' />
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
