import React, { Component } from 'react'
import { Book } from '.'
import * as BooksAPI from '../BooksAPI'

class WantToRead extends Component {
    render(){
        return(
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <Book />
                </ol>
            </div>
        )
    }
}

export default WantToRead
