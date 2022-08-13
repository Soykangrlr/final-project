function CollectionCard({ data}) {
    //Profil Sayfası Collection Liste kartı
    return (
        <div class="collection-card mb-3">
            <img
                src={!data.poster_path ? '/filmDefault.jpg' : `https://image.tmdb.org/t/p/original/${data.poster_path}`}            />
        </div>)
}
export default CollectionCard