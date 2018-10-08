import React, { Component } from 'react'
import { Book } from '.'
import * as BooksAPI from '../BooksAPI'

class Read extends Component {
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

export default Read
