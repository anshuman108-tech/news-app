import React from 'react'

const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } =props;
    return (
        <div className="my-3">
            <div className="card" style={{ width: "18rem" }}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1, left: '90%' }}>
                    {source}
                </span>
                <img src={!imageUrl ? "https://cryptopotato.com/wp-content/uploads/2022/05/Terra_Rebirth.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-danger">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target={'blank'} className="btn btn-sm btn-primary">Read More</a >
                </div>
            </div>
        </div>
    )
}

export default Newsitem
