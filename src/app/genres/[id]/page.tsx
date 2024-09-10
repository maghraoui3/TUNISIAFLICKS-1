"use client";
import React, { useState, useEffect } from 'react'

export default function Page({ params }: { params: { id: string } }) {

    const [data, setData] = useState(1);
    const [pages, setPages] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b5d2609c326586f7f753f77b085a0b31&with_genres=${params.id}&page=${page}`)
          .then(response => response.json())
          .then(data => {
            setData(data);
          })
          .catch(error => {
            console.log(error);
          });
      }, [page, params.id]);

  return (
    <div>{params.id}</div>
  )
}
