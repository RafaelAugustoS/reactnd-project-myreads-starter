import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Routers from './routes'
import './index.css'

ReactDOM.render(
    <BrowserRouter>
        <Routers />
    </BrowserRouter>, 
    document.getElementById('root')
)
