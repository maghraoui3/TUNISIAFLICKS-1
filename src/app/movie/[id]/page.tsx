import React from 'react'

function page({params}: {params: {id: string}}) {
  return (
    <div>movie Page with id {params.id}</div>
  )
}

export default page