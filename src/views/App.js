import React, { Component } from 'react'
import '../App.css'
import Currently from '../components/Currently'
import WantToRead from '../components/WantToRead'
import Read from '../components/Read'
import { Link } from 'react-router-dom'

import Search from './Search'

class BooksApp extends Component {
	state = {
		showSearchPage: false
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
								<Currently />
							</div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Want to Read</h2>
								<WantToRead />
							</div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Read</h2>
								<Read />
							</div>
						</div>
					</div>
					<div className="open-search">
						<Link to="/create">
							Add a book
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default BooksApp
