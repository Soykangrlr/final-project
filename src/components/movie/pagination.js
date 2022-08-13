function Pagination({setPage,page}) {
  // page arttırma ve azaltma yapıldı
    const pageIncrease=()=>{
        setPage(page=>page+1)
    }
    const pageDecrease=()=>{
        setPage(page=>page-1)
    }
  return (
    <div className="align-content-center">

        <button  disabled={page===1&& true}
        onClick={pageDecrease}   className="btn btn-primary me-2">{"<<"}</button>
                <span className="me-2">{page}</span>
        <button disabled={page===500&& true}
         onClick={pageIncrease} className="btn btn-primary">{">>"}</button>
    </div>
  )
}
export default Pagination