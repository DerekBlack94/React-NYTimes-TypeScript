import React, {Component} from 'react'
import NYTIndex from "./NYTIndex"

type Articles = {
    results: any
    searchItem: string
    startDate: number | string
    endDate: number | string
    pageNumber: number

};

class NYTAPP extends React.Component<{}, Articles> {
    constructor(props:any){
        super(props)
        this.state = {
            results: [],
            searchItem: '',
            startDate: '',
            endDate: '',
            pageNumber: 0,

        }
        // this.fetchArticles = this.fetchArticles(this)
    }

    fetchArticles = () => {
        const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
        const KEY = 'obUzVQbFKwHbeBYFmCyv4mbZXGBRrPjS '
        let URL = `${baseURL}?api-key=${KEY}&page=${this.state.pageNumber}&q=${this.state.searchItem}`

        if(this.state.startDate !== '') {
            console.log(this.state.startDate)
            URL += '&begin_date=' + this.state.startDate
        };

        if(this.state.endDate !== '') {
            URL += '&end_date=' + this.state.endDate
        }

        fetch(URL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                results: data.response.docs
            })
        })

    }

    handleSubmit = (e: any) => {
        e.preventDefault()
        this.setState({
            results: [],
        })
        this.fetchArticles();

    };

    nextPage = (e: any) => {
        e.preventDefault()
        this.setState({
            pageNumber: this.state.pageNumber + 1
        }, () => {this.fetchArticles()})
    }

    previousPage = (e: any) => {
        e.preventDefault()
        if(this.state.pageNumber > 0) {
            this.setState({
                pageNumber: this.state.pageNumber -1

            }, () => {this.fetchArticles()})
        } else {
            return
        }
        this.fetchArticles();
    }

    render() {
        return(
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <p>
                        <label> Enter Search Term :</label>
                        <input type="text" id="search" className="search" required onChange={(e) => this.setState({searchItem: e.target.value})}></input>
                    </p>
                    <br/>
                    <p>
                        <label htmlFor="start-date">
                            Start Date: (format YYYYMMDD): {""}
                        </label>
                    </p>
                    <p>
                        <input type="date" id="start-date" className="start-date" pattern='[0-9]{8}'
                        onChange={(e) => this.setState({ startDate : e.target.value})}></input>
                    </p>
                    <br/>
                    <p>
                    <label htmlFor="end-date">
                            End Date: (format YYYYMMDD): {""}
                    </label>
                    </p>
                    <p>
                    <input type="date" id="end-date" className="end-date" pattern='[0-9]{8}'
                        onChange={(e) => this.setState({ endDate : e.target.value})}></input>
                    </p>
                    <br/>
                    <button>Submit Search</button>

                </form>
                <button onClick={(e) => this.previousPage(e)}>Previous Page </button>
                <button onClick={(e) => this.nextPage(e)}> Next Page</button>
                <br/>
                <NYTIndex results={this.state.results} />
            </div>

        )
    }

}
 export default NYTAPP;