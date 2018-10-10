import React, { Component } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class BooksApp extends Component {
	state = {
		books: [],
		select: ''
	}

	componentDidMount(){
        this._callApi()
    }

    async _callApi(){
        const res = await BooksAPI.getAll()

        this.setState({books: res})
	}
	
	async _update(book, value){
		try{
			await BooksAPI.update(book, value)
			this._callApi()
		}catch(e){
			console.log(e)
		}
	}

	_renderCard(type){
		const filter = this.state.books.filter(value => {
            return value.shelf === type
		})
		
		return filter.map(book => 
			<li key={book.id}>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
						<div className="book-shelf-changer">
							<select 
								value={book.shelf} 
								onChange={(e) => this._update(book, e.target.value)}
								ref={book.id}
							>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>

					<div className="book-title">{book.title}</div>
					<div className="book-authors">{book.authors.join(', ')}</div>
				</div>
			</li>
		)
	}

	render() {
		return (
			<div className="app">
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						<div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Currently Reading</h2>
								<div className="bookshelf-books">
                					<ol className="books-grid">
										{this._renderCard('currentlyReading')}
									</ol>
								</div>
							</div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Want to Read</h2>
								<div className="bookshelf-books">
                					<ol className="books-grid">
										{this._renderCard('wantToRead')}
									</ol>
								</div>
							</div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Read</h2>
								<div className="bookshelf-books">
                					<ol className="books-grid">
										{this._renderCard('read')}
									</ol>
								</div>
							</div>
						</div>
					</div>
					<div className="open-search">
						<Link to="/search">
							Add a book
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default BooksApp
