import React, { useState, useEffect } from 'react'
import HorizontalScroller from './custom/HorizontalScroller';
import { Button } from './ui/button';

export default function Genres() {

    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(true);

    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US')
            .then(response => response.json())
            .then(data => {
                setData(data.genres);
                setLoader(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (

        // genres bar
        <div className='max-w-full grid'>
            {loader ? <p>Loading...</p> :
                <HorizontalScroller className='flex overflow-hidden'>
                    {data.map((genre) => {
                        return (
                            <div key={genre.id} className="">
                                <Button className="px-4 py-2 bg-zinc-800 text-white hover:bg-zinc-500 rounded-xl">
                                    {genre.name}
                                </Button>
                            </div>
                        );
                    })}
                </HorizontalScroller>}
        </div>
  )
}
