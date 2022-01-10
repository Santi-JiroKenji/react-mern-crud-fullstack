import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { addData, deleteData } from "./context/ContextProvider";
import { updateData } from "./context/ContextProvider";

const Home = () => {

  const [getStudentData, setStudentData] = useState([]);
  console.log(getStudentData);

  const { creData, setCreData } = useContext(addData);

  const { upData, setUpData } = useContext(updateData);

  const { dltData, setDltData } = useContext(deleteData);

  const getData = async () => {
    const res = await fetch("/api/v1/students/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setStudentData(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteStudent = async (id) => {
    const res2 = await fetch(`/api/v1/students/deleteStudent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteData = await res2.json();
    console.log(deleteData);

    if (res2.status === 422 || !deleteData) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDltData(deleteData);
      getData();
    }
  };

  return (
    <>
      {creData ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{creData.name}</strong> added succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {upData ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{upData.name}</strong> updated succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltData ? (
        <>
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{dltData.name}</strong> deleted succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">
              Add data
            </NavLink>
          </div>

          <table className="table">
            <thead>
              <tr style={{ background: "gray", color: "#fff" }}>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Student ID</th>
                <th scope="col">Level</th>
                <th scope="col">Age</th>
                <th scope="col">Email</th>
                <th scope="col">mobile</th>
                <th scope="col">Desc</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getStudentData.map((element, id) => {
                return (
                  <>
                    <tr key={id}>
                      <th scope="row">{id + 1}</th>
                      <td>{element.name}</td>
                      <td>{element.studentID}</td>
                      <td>{element.level}</td>
                      <td>{element.age}</td>
                      <td>{element.email}</td>
                      <td>+66 {element.mobile}</td>
                      <td>{element.desc}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element._id}`}>
                          {" "}
                          <button className="btn btn-success" style={{padding: "3px 7px"}}>
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${element._id}`}>
                          {" "}
                          <button
                            className="btn btn-warning"
                            style={{ color: "#fff", padding: "3px 7px"}}
                          >
                            <CreateIcon />
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-danger"
                          style={{ padding: "3px 7px" }}
                          onClick={() => deleteStudent(element._id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
