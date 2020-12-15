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
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                On
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
                    className="btn btn-info btn-sm"
                    onClick={addProduct}
                >
                    New Product
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>{generateItens()}</tbody>
                </table>
                <button
                    type="button"
                    value="Submit"
                    className="btn btn-outline-primary"
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

