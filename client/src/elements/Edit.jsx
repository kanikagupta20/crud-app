import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        const studentData = res.data.map((student) => ({
          ...student,
          dob: new Date(student.dob).toISOString().split("T")[0], // Extracting only the date part
        }));
        setData(studentData);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary text-white d-flex align-items-center justify-content-center">
      <div className="card w-50">
        <div className="card-body">
          <h1 className="card-title">Edit User {id}</h1>
          <Link to="/" className="btn btn-success mb-3">
            Back
          </Link>
          {data.map((student) => (
            <form onSubmit={handleSubmit} key={student.id}>
              <div className="form-group my-3">
                <label htmlFor="name">Name</label>
                <input
                  className="form-control"
                  value={student.name}
                  type="text"
                  name="name"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], name: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  value={student.email}
                  type="email"
                  name="email"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], email: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="phone">Phone</label>
                <input
                  className="form-control"
                  value={student.phone}
                  type="tel"
                  name="phone"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], phone: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  className="form-control"
                  value={student.dob}
                  type="date"
                  name="dob"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], dob: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3 text-center">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Edit;
