import React, { Component } from 'react'
import * as BooksAPI from '../../BooksAPI'
import PropTypes from 'prop-types'

class Book extends Component {
    static PropTypes = {
        Imagem: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Author: PropTypes.string.isRequired
    }

    state = {
        teste: ''
    }

    componentDidMount(){
        console.log(this.props)
    }

    async _update(book, value){
		try{
			await BooksAPI.update(book, value)
			this.props.Handler()
		}catch(e){
			console.log(e)
		}
	}


    render(){
        const Item = this.props.Item

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${Item.imageLinks.thumbnail ? Item.imageLinks.thumbnail : ''}")` }}></div>
                        <div className="book-shelf-changer">
                            <select 
                                onChange={(value) => this._update(Item, value.target.value)}
                                value={Item.shelf ? Item.shelf : 'none'}
                            >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>

                    <div className="book-title">{Item.title}</div>
                    <div className="book-authors">{Item.author}</div>
                </div>
            </li>
        )
    }
}



export { Book }