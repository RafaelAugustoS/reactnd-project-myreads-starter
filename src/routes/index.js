import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// Views
import App from '../views/App'
import Search from '../views/Search'

class Routers extends Component {
    render(){
        return(
            <div>
                <Route exact path="/" component={App} />
                <Route path="/search" component={Search} />                
            </div>
        )
    }
}

export default Routers