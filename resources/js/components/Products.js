import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { set } from "lodash";
import Dropdown from "react-bootstrap/Dropdown";
import BootstrapTable from "react-bootstrap-table-next";

function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getItem();
    }, []);

    function addProduct() {
        products.push({
            id: 0,
            name: "",
            price: 0,
            quantity: 0,
            isEditing: false
        });
        setProducts([...products]);
    }
    function bulkUpdate() {
        const editedProducts = products.map(product => {
            return {
                ...product,
                price: parseFloat(product.price),
                quantity: parseInt(product.quantity)
            };
        });
        axios.post(
            "/api/bulk-products",
            editedProducts.filter(product => product.isEditing)
        );
    }

    function saveLogic(product, productIndex) {
        if (product.id !== 0) {
            updateItem(product);
            return;
        }

        saveItem(product, productIndex);
    }

    function saveItem(product, productIndex) {
        axios
            .post("/api/products", {
                ...product,
                price: parseFloat(product.price),
                quantity: parseInt(product.quantity)
            })
            .then(({ data }) => {
                products[productIndex].id = data.id;
            });
    }

    function updateItem(product) {
        axios.put(`/api/products/${product.id}`, {
            ...product,
            price: parseFloat(product.price),
            quantity: parseInt(product.quantity)
        });
    }

    function deleteItem(product, productIndex) {
        axios.delete(`/api/products/${product.id}`).then(() => {
            products.splice(productIndex, 1);
            setProducts([...products]);
        });
    }

    function getItem(product) {
        axios.get("/api/products").then(({ data }) => {
            const sortedProducts = data.map(product => {
                return { ...product, isEditing: false };
            });

            setProducts(sortedProducts.sort((a, b) => (a.id > b.id ? 1 : -1)));
        });
    }

    const generateItens = () => {
        return products.map((product, productIndex) => {
            const handleChange = event => {
                products[productIndex].isEditing = true;
                products[productIndex][event.target.name] = event.target.value;
                setProducts([...products]);
            };
            return (
                <tr key={productIndex}>
                    <td>{product.id}</td>
                    <td>
                        <input
                            name="name"
                            className="form-control"
                            type="text"
                            value={product.name}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            name="price"
                            className="form-control"
                            type="number"
                            value={product.price}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            name="quantity"
                            className="form-control"
                            type="number"
                            value={product.quantity}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="secondary"
                                id="dropdown-dark"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    className="bi bi-list"
                                    viewBox="0 0 17 17"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                    />
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => {
                                        saveLogic(product, productIndex);
                                    }}
                                >
                                    Save
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        deleteItem(product, productIndex);
                                    }}
                                >
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className="container mt-3">
            <p></p>
            <div className="card text-left">
                <button
                    type="submit"
                    value="Submit"
                    className="btn btn-light btn-sm"
                    onClick={addProduct}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-plus-circle"
                        viewBox="0 0 17 17"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                        />
                    </svg>
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price $</th>
                            <th scope="col">Quantity</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>{generateItens()}</tbody>
                </table>
                <button
                    type="button"
                    value="Submit"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                        bulkUpdate();
                    }}
                >
                    Save all changes
                </button>
            </div>
        </div>
    );
}

export default Products;
