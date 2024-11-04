const routes = {
    home: '/',
    movie: (id: string) => (`movie/${id}`),
    tvShow: (id: string) => (`tvShow/${id}`),
}

export default routes