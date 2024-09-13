"use client";
import MoviePoserCard from '@/components/MoviePoserCard';
import React, { useState, useEffect } from 'react'
import PaginationComponent from '@/components/PaginationComponent';

export default function Page({ params }: { params: { id: string } }) {

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage, params.id]);

    const fetchMovies = (page: number) => {
        setLoader(true);
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b5d2609c326586f7f753f77b085a0b31&with_genres=${params.id}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setData(data.results);
                setLoader(false);
                setTotalPages(data.total_pages);
            })
            .catch(error => {
                console.log(error);
                setLoader(false);
            });
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        loader
            ? <p>Loading...</p>
            : <div className='w-full'>
                <p className='my-3 text-xl'>Genres</p>
                <div className='flex w-full flex-wrap'>
                    {data.map((movie, index) => <MoviePoserCard key={index} data={movie} />)}
                </div>
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    maxVisiblePages={5}
                />
            </div>
    )
}
