import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import { Book } from '../components'
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

        this.send = debounce(this.send, 1000)
    }

    async componentDidMount(){
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
           <Book
                Item={item}
                key={item.id}
           />
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