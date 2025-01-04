"use client";
// import MoviePosterCard from '@/components/MoviePosterCard';
import React, { useState, useEffect } from 'react'
import PaginationComponent from '@/src/components/PaginationComponent';
import PosterCard from '@/src/components/PosterCard'
import routes from '@/src/routes/client/routes';

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
            : <div className='flex flex-col items-center justify-center'>
                <div className='ml-2'>
                    <p className='my-3 text-xl ml-5'>Genres</p> {/* Aligns with the card container */}
                    <div className="mt-5 w-fit">
                        <div className='flex gap-4 flex-wrap justify-start mx-5 w-fit'>
                            {data.map((item, index) => (
                                <PosterCard
                                    key={index}
                                    posterImg={item.poster_path || item.backdrop_path || '/404Poster'}
                                    title={item.title || item.original_title}
                                    voteAverage={item.vote_average || 0}
                                    releaseDate={item.release_date || '..........'}
                                    link={routes.movie(item.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                {data.length > 0 && (
                    <div className="mt-8 mb-4">
                        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                )}
            </div>
    )
}
