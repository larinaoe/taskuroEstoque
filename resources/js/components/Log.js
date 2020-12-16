import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { set } from "lodash";
import Dropdown from "react-bootstrap/Dropdown";
import BootstrapTable from "react-bootstrap-table-next";

function Log() {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        getLogs();
    }, []);

    function getLogs(log) {
        axios.get("api/logs").then(({ data }) => {
            setLogs(data.sort((a, b) => (a.id > b.id ? -1 : 1)));
        });
    }

    const generateItens = () => {
        return logs.map((log, logIndex) => {
            return (
                <tr key={logIndex}>
                    <td>{log.id}</td>
                    <td>
                        <label>{log.name}</label>
                    </td>
                    <td>
                        <label>{log.price}</label>
                    </td>
                    <td>
                        <label>{log.quantity}</label>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className="container mt-3">
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>{generateItens()}</tbody>
                </table>
            </div>
        </div>
    );
}
export default Log;
