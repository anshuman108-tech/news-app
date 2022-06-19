import React, { useState, useEffect } from 'react'   //useState, useEffect, useRef etc. are React Hooks
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading1, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2551c227140040cba7be3d3f776b712e&page=${page}&pageSize=${props.pageSize}`;             //my news Api key
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()                //here the parsed data is collected in the form of objects
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }
  
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}- Investigate Daily`;
    updateNews();
    //eslint-disable-next-line
  }, [])


  // const handlePrevClick = async () => {
  //   setPage(page - 1)
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2551c227140040cba7be3d3f776b712e&page=${page + 1}&pageSize=${props.pageSize}`;             //my news Api key
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  //This function will run after the constructor
  return (
    <>
      <h1 className='text-center' style={{ margin: '85px 0px 25px 0px', fontSize: '48px' }}>Investigate - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading1 && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >

        <div className="container">
          <div className="row">
            {
              // !loading1 && 
              articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
          </div>
        </div>
      </InfiniteScroll>


      {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
  )
}

export default News

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number
}