import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary text-white d-flex align-items-center justify-content-center">
      <div className="card w-50">
        <div className="card-body">
          <h1 className="card-title">User {id}</h1>
          <Link to="/" className="btn btn-success mb-3">Back</Link>
          {data.map((student) => (
            <ul className="list-group" key={student.id}>
              <li className="list-group-item">
                <b>ID: </b>{student.id}
              </li>
              <li className="list-group-item">
                <b>Name: </b>{student.name}
              </li>
              <li className="list-group-item">
                <b>Email: </b>{student.email}
              </li>
              <li className="list-group-item">
                <b>Phone: </b>{student.phone}
              </li>
              <li className="list-group-item">
                <b>Date of Birth: </b>{formatDate(student.dob)}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Read;
