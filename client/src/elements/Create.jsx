import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/add_user", values)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container vh-100 vw-100 bg-primary text-white d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-md-6 offset-md-3">
          <h3 className="text-center mb-4">Add Student</h3>
          <div className="d-flex justify-content-end mb-3">
            <Link to="/" className="btn btn-success">
              Home
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
            <div className="form-group my-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                required
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                required
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                required
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                required
                onChange={(e) => setValues({ ...values, dob: e.target.value })}
              />
            </div>
            <div className="form-group my-3 text-center">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
