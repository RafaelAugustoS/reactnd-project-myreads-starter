import React, { Component } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { BookCase } from '../components'

class BooksApp extends Component {
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
							/>

							<BookCase
								title="Want To Read"
							/>

							<BookCase
								title="Read"
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
