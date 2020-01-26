import React from 'react'
import { Link } from 'react-router-dom';

class Main extends React.Component{
    render() {
        return(
            <div>
                <div className="jumbotron">
                    <h1 className="display-4">Amazing React, Bootstrap and Webpack</h1>
                    <hr className="my-4"/>
                    <p>It uses utility classes for typography and spacing to space content out
                        within the larger container.</p>
                </div>
            </div>
        )
    }
}

export default Main;
