import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import { debounce } from 'lodash'

class Search extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            inputText: '',
            myBooks: [],
            result: [],
            message: ''
        }

        this.send = debounce(this.send, 300)
    }

    componentDidMount(){
        this._callApi()
    }

    async _callApi(){
        const res = await BooksAPI.getAll()

        this.setState({myBooks: res})
	}

    async send(){
        try{
            if(this.state.inputText.length > 0){
                const result = await BooksAPI.search(this.state.inputText)

                if(!result.error){
                    result.map(item => {
                        this.state.myBooks.forEach((b, key) => {
                            if(b.id === item.id){
                                item.shelf = b.shelf
                            }
                        })
                    })
                    this.setState({result: result, message: ''})
                }else{
                    this.setState({result: result.items, message: result.error})
                }   
            }else{
                this.setState({result: [], message: ''})
            }
        }catch(e){
            console.log(e)
        }
    }

    async add(book, value){
        try{
            const res = await BooksAPI.update(book, value)
        }catch(e){
            console.log(e)
        }
    }

    renderBooks(){
        return this.state.result.map(item => 
           <li key={item.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${item.imageLinks ? item.imageLinks.thumbnail : ''}")` }}></div>
                        <div className="book-shelf-changer">
							<select
                                value={item.shelf ? item.shelf : 'none'} 
                                onChange={(e) => this.add(item, e.target.value)}
							>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
                    </div>

                    <div className="book-title">{item.title}</div>
					<div className="book-authors">{item.authors}</div>
                </div>
            </li> 
        )
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author" 
                            onKeyUp={this.send.bind(this)} 
                            value={this.state.inputText}
                            onChange={(value) => this.setState({inputText: value.target.value})}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { this.renderBooks() }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search