function Search({onChange}) {
  return (<>
    <div className="row justify-content-center mb-3">
    <div className="col-12 col-md-10 col-lg-8">
        <form className="card card-sm">
            <div className="card-body row no-gutters align-items-center">
                <div className="col-auto">
                    <i className="fas fa-search h4 text-body"></i>
                </div>
            
                <div className="col">
                    <input onChange={onChange} className="form-control form-control-lg form-control-borderless" type="search" placeholder="Filmlerde Ara...."/>
                </div>
            
            </div>
        </form>
    </div>
   
</div>
 <hr/>
 </>
  )
}
export default Search