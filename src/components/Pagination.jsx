export default function Pagination( {currentPage, next, prev} ){
  
    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" onClick={prev} className="btn btn-secondary">Prev</button>
        <button type="button" className="btn btn-secondary">{currentPage}</button>
        <button type="button" onClick={next} className="btn btn-secondary">Next</button>
      </div>
    )
  
  }