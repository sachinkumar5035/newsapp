import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';



export class News extends Component {

    static defaultProps = {
        country : 'in',
        pagesize: 5,
        category: 'general'
    }


    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
      }

    constructor(props){
        super(props);
        //console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        //console.log("component did mount");
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize))){ // check if totalresults has been shown or not
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=1&pagesize=${this.props.pagesize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            })
            console.log(parsedData);
        }
    }

     handlePrevClick = async ()=>{
        console.log("prev click");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page:this.state.page-1,
            articles: parsedData.articles,
            loading: false
        })
        console.log(parsedData);
    }

    handleNextClick =  async ()=>{
        console.log("next click");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page:this.state.page+1,
            articles: parsedData.articles,
            loading: false
        })
        console.log(parsedData);
    }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:"35px 0px"}}>Top {this.props.category} headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4 my-2" key={element.url} >
                <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage?element.urlToImage:"./newsimg.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}

        </div>
         <div className="container d-flex justify-content-between">
             <button type="button" disabled={this.state.page<=1} className="btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous </button>
             <button type="button" disabled={this.state.page+1>(Math.ceil(this.state.totalResults/this.props.pagesize))} className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>
         </div>
      </div>
    )
  }
}

export default News
