import React, { Component } from 'react'
import * as BooksAPI from '../../BooksAPI'
import { Book } from '../'

class BookCase extends Component {
    state = {
        books: [],
        select: '',
        status: false
    }

    componentDidMount(){
        this._callApi()
    }

    _callApi(){
        BooksAPI.getAll()
        .then(res => {
            this.setState({books: res})
        })
    }

    _renderBook(){
        const type = this.props.title.split(' ').join('').toLowerCase()
        const filter = this.state.books.filter(value => {
            return value.shelf.toLowerCase() === type
        })
        
        return filter.map(item => 
            <Book
                Item={item}
                key={item.id}
                Handler={() => this._callApi()}
            />
        )
    }

    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this._renderBook()}
                    </ol>
                </div>
            </div>
        )
    }
}

export { BookCase }