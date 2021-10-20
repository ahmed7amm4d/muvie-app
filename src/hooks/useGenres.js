const useGenres = (selectedGenres) => {
    if (selectedGenres.length < 1) {
        return '';
    } 
    const genreIds = selectedGenres.map((genre) => {
        return genre.id;
    });
    return genreIds.reduce((acc, curr) => {
        return acc + ',' + curr;
    })
};

export default useGenres;