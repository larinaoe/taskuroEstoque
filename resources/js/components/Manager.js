import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { set } from "lodash";
import Dropdown from "react-bootstrap/Dropdown";
import BootstrapTable from "react-bootstrap-table-next";
import Products from './Products.js';
import Log from './Log.js';

function Manager(){
    const [menuItem, setMenuItem] = useState(0);

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <button onClick={ () => setMenuItem(0) } className="btn btn-primary">Products</button>
                <button onClick={ () => setMenuItem(1) } className="btn btn-secondary">Logs</button>
            </nav>

            {
                menuItem === 0 ? <Products/> : <Log/>
            }

        </div>
    );
}

export default Manager;
// DOM element
if (document.getElementById("manager")) {
    ReactDOM.render(<Manager />, document.getElementById("manager"));
}
