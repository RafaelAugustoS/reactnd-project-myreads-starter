import React, { Component } from 'react'
import { Book } from '.'
import * as BooksAPI from '../BooksAPI'

class Currently extends Component {
    state = {
        books: []
    }

    componentDidMount(){
        this._callApi()
    }

    _callApi(){
        BooksAPI.getAll()
        .then(res => {
            console.log(res)
            this.setState({books: res})
        })
    }

    _renderBooks(){
        return this.state.books.map(book => 
            <Book 
                key={book.id}
                Title={book.title} 
                Author={book.authors[0]} 
                Imagem={book.imageLinks.thumbnail} 
            />
        )
    }

    render(){
        return(
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this._renderBooks()}
                </ol>
            </div>
        )
    }
}

export default Currently
