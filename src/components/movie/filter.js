// Sıralama soncunda olamayan filmler gelince kaldırdım
//Çalışır durumda açıklama satırını kaldırıp deneyebilirsiniz

// function Filter(
    // {setSorting}
    // ) {
//     const sortingOptions = [
//         { title: "Yeni Çıkan ", value: "release_date.desc" },
//         { title: "Film Adına Göre [A-Z]", value: "original_title.desc" },
//         { title: "Film Adına Göre [Z-A]", value: "original_title.asc" },
//         { title: "IMDB Puanına Göre Artan", value: "vote_average.desc" },
//         { title: "IMDB Puanına Göre Azalan", value: "vote_average.asc" },
//     ];
//     const handleSorting=(e)=>{
//         setSorting(e.target.value)
//     }
//     return (
//         <div className="dropstart" >
//             <a className="btn btn-outline-success dropdown-toggle " data-bs-toggle="dropdown"><i className="fa-solid fa-arrow-down-short-wide"></i></a>
//             <div className="dropdown-menu" >
//             {sortingOptions.map(sorting=>
//                  <div className="form-check" >
//                  <input className="form-check-input" type="radio" name="sorting" id={sorting.value} value={sorting.value} onClick={handleSorting}/>
//                      <label className="form-check-label" htmlFor={sorting.value} onClick={(e)=>e.stopPropagation()} >
//                         {sorting.title}
//                      </label>
//              </div>
//                 )}
               
              
//             </div>
//         </div>
//     )
// // }
// export default Filter