import axios from "axios";
import React, { useContext,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { env } from "./config";
import context from "./Context";
import { toast } from 'react-toastify'

function Users() {
  let Context = useContext(context);
  let navigate = useNavigate()

  useEffect(()=>{
    Context.setUserModified(true)
    },[])

  let deleteuser = async (id) => {
    try {
      let ask = window.confirm("Confirm delete");
      if (ask) {
        let user = await axios.delete(`${env.api}/user/${id}`, {
          headers: { authorization: window.localStorage.getItem("app-token")}});
        
        if (user.status === 200) {
          toast.success(user.data.message,{toastId:"30"});
          let exist = Context.users.filter((ele) => ele._id !== id);
          Context.setUsers(exist);
        }
      }
    } catch (error) {
      if(error.response.status === 440) navigate("/")
      toast.error(error.response.data.message,{toastId:"31"});
    }
  };
  return (
    <div>
      {Context.userLoading ? (
        <div
          style={{ height: "400px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="container-fluid mt-3">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Users List</h1>
            <Link
              to="/app/create-user"
              style={{ width: "100px" }}
              className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
            >
              <i className="fas fa-download fa-sm text-white-50"></i>Create User
            </Link>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">User Data</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellspacing="0"
                >
                  <thead>
                    <tr>
                      <th>Sl</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Access</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Sl</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Access</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {Context.users.map((user, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{user.firstname}</td>
                          <td>{user.role}</td>
                          <td>{user.email}</td>
                          <td>{String(user.access)}</td>
                          <td>
                            <Link
                              to={`/app/view-user/${user._id}`}
                              style={{ width: "80px" }}
                              className="btn btn-primary ms-2"
                            >
                              View
                            </Link>
                            <Link
                              to={`/app/edit-user/${user._id}`}
                              style={{ width: "80px" }}
                              className="btn btn-warning ms-2"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteuser(user._id)}
                              style={{ width: "80px" }}
                              className="btn btn-danger ms-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
