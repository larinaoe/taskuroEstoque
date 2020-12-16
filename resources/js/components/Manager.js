import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { set } from "lodash";
import Dropdown from "react-bootstrap/Dropdown";
import BootstrapTable from "react-bootstrap-table-next";
import Products from "./Products.js";
import Log from "./Log.js";

function Manager() {
    const [menuItem, setMenuItem] = useState(0);

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-dark">  
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fillRule="currentColor"
                                className="bi bi-menu-button-wide-fill"
                                viewBox="0 0 17 17"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 7H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM2 6a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H2z"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M15 11H1v-1h14v1zM2 12.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h13A1.5 1.5 0 0 0 16 3.5v-2A1.5 1.5 0 0 0 14.5 0h-13zm1 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm9.927.427l.396.396a.25.25 0 0 0 .354 0l.396-.396A.25.25 0 0 0 13.396 2h-.792a.25.25 0 0 0-.177.427z"
                                />
                            </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setMenuItem(0)}>
                                Products
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setMenuItem(1)}>
                                Logs
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <h3 className="text-light bg-dark">Stock M System  </h3>
            </nav>

            {menuItem === 0 ? <Products /> : <Log />}
        </div>
    );
}

export default Manager;
// DOM element
if (document.getElementById("manager")) {
    ReactDOM.render(<Manager />, document.getElementById("manager"));
}
