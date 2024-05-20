import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([])
    const [deleted, setDeleted] = useState(true)

    useEffect(()=>{
        if(deleted){
            setDeleted(false)
            axios.get('/students')
            .then((res)=>{
                setData(res.data)
            })
            .catch((err)=>console.log(err))
        }
    }, [deleted])

    function handleDelete(id){
        axios.delete(`/delete/${id}`)
        .then((res)=>{
            setDeleted(true)
        })
        .catch((err)=> console.log(err))
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='container-fluid bg-primary vh-100 vw-100 text-white'>
            <div className='row'>
                <div className='col-12'>
                    <h3 className='text-center my-4'>Users</h3>
                    <div className='d-flex justify-content-end mb-3'>
                        <Link className='btn btn-success' to='/create'>Add Student</Link>
                    </div>
                    <table className='table table-striped table-hover table-dark'>
                        <thead className='thead-light'>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date of Birth</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{formatDate(student.dob)}</td>
                                        <td>
                                            <Link className='btn mx-2 btn-info' to={`/read/${student.id}`}>Read</Link>
                                            <Link className='btn mx-2 btn-warning' to={`/edit/${student.id}`}>Edit</Link>
                                            <button onClick={() => handleDelete(student.id)} className='btn mx-2 btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home
