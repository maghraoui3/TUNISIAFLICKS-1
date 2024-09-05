import React from 'react'

export default function Page() {
  return (
    <div>
        {/* search bar */}
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
                    className="transition-all duration-75 ease-in-out block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 dark:bg-[#1a161f] text-gray-300 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-[#1a161f] focus:border-white dark:focus:border-gray-500 focus:ring-white focus:text-gray-900 sm:text-sm"
                    placeholder="Search"
                    autoComplete="off"
                    type="search"
                  />
                </div>
              </div>
            </div>
        {/* Content */}
        <div></div>
    </div>
  )
}
