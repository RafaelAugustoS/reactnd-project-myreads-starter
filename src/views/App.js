import React, { Component } from 'react'
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import { BookCase } from '../components'

class BooksApp extends Component {
	state = {
		books: []
	}

	componentDidMount(){
		this.loadBooks()
	}
	
	loadBooks = async () => {
		const books = await BooksAPI.getAll()
		this.setState({books})
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
							<BookCase
								title="Currently Reading"
								books={this.state.books}
								handle={() => this.loadBooks()}
							/>

							<BookCase
								title="Want To Read"
								books={this.state.books}
								handle={() => this.loadBooks()}
							/>

							<BookCase
								title="Read"
								books={this.state.books}
								handle={() => this.loadBooks()}
							/>
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
