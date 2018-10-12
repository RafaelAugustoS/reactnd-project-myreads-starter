import React, { Component } from 'react'
import { Book } from '../'

class BookCase extends Component {
    _renderBook(){
        const type = this.props.title.split(' ').join('').toLowerCase()
        
        const filter = this.props.books.filter(value => {
            return value.shelf.toLowerCase() === type
        })
        
        return filter.map(item => 
            <Book
                Item={item}
                key={item.id}
                handle={() => this.props.handle()}
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