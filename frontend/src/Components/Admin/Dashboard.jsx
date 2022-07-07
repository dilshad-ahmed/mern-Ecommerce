import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminProducts } from "../../features/product/adminProductSlice";
import { getOrderList } from "../../features/orderAdmin/orderAdminSlice";
import { getUsersList } from "../../features/userAdmin/userListSlice";

const Dashboard = () => {
    const [fullView, setFullView] = useState(false);
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector(
        (state) => state.adminProducts
    );
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.userList);

    let totalPrice = 0;
    products &&
        products.forEach((item) => {
            totalPrice += item.price;
        });

    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(getOrderList());
        dispatch(getUsersList());
    }, [dispatch]);

    return (
        <>
            <div className="container-fluid vh-80">
                <div className="row">
                    <div
                        className={
                            fullView
                                ? "d-none"
                                : "col-lg-2 col-3 border-end vh-80 pt-5 text-white bg-dark "
                        }>
                        <Sidebar />
                    </div>

                    <div className={fullView ? "col-12" : "col-lg-10 col-9"}>
                        <div className="header">
                            <div className="d-flex justify-content-between align-items-center py-2">
                                <IconButton
                                    onClick={(e) =>
                                        setFullView(!fullView ? true : false)
                                    }
                                    aria-label="menu">
                                    <MenuIcon fontSize="inherit" />
                                </IconButton>
                                <h3 className="text-center"> Dashboard</h3>
                            </div>
                            <div className="box-container row">
                                <div className="col-md-3 col-sm-6">
                                    <div className="box bg-success rounded-3 text-white p-3 shadown-sm mb-3">
                                        <p className="fs-4 mb-1">Price</p>
                                        <p className="mb-0">{totalPrice}</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <Link
                                        to="/admin/products"
                                        className="text-decoration-none">
                                        <div className="box bg-danger rounded-3 text-white p-3 shadown-sm mb-3">
                                            <p className="fs-4 mb-1">
                                                Products
                                            </p>
                                            <p className="mb-0">
                                                {products && products.length}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <Link
                                        to="/admin/orders"
                                        className="text-decoration-none">
                                        <div className="box bg-warning rounded-3 text-white p-3 shadown-sm mb-3">
                                            <p className="fs-4 mb-1">Orders</p>
                                            <p className="mb-0">
                                                {orders && orders.length}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <Link
                                        to="/admin/users"
                                        className="text-decoration-none">
                                        <div className="box bg-primary rounded-3 text-white p-3 shadown-sm mb-3">
                                            <p className="fs-4 mb-1">Users</p>
                                            <p className="mb-0">
                                                {users && users.length}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
