import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { updateData } from "./context/ContextProvider";

const Edit = () => {
  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const { upData, setUpData } = useContext(updateData);

  const history = useHistory("");

  const [inputVal, setInputVal] = useState({
    name: "",
    studentID: "",
    level: "",
    age: "",
    email: "",
    mobile: "",
    desc: "",
  });

  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputVal((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getData = async () => {
    const res = await fetch(`/api/v1/students/getStudent/${id}`, {
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
      setInputVal(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateStudent = async (e) => {
    e.preventDefault();

    const { name, studentID, level, age, email, mobile, desc } = inputVal;

    const res2 = await fetch(`/api/v1/students/updateStudent/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        studentID,
        level,
        age,
        email,
        mobile,
        desc,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      history.push("/");
      setUpData(data2);
    }
  };

  return (
    <div className="container">
      {/* <NavLink to="/">home</NavLink> */}
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inputVal.name}
              onChange={setData}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Student ID
            </label>
            <input
              type="text"
              value={inputVal.studentID}
              onChange={setData}
              name="studentID"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Level
            </label>
            <input
              type="text"
              value={inputVal.level}
              onChange={setData}
              name="level"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Age
            </label>
            <input
              type="number"
              value={inputVal.age}
              onChange={setData}
              name="age"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={inputVal.email}
              onChange={setData}
              name="email"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inputVal.mobile}
              onChange={setData}
              name="mobile"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              name="desc"
              value={inputVal.desc}
              onChange={setData}
              className="form-control"
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={updateStudent}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
