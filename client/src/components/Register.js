import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { addData } from "./context/ContextProvider";

const Register = () => {
  const { creData, setCreData } = useContext(addData);

  const history = useHistory();

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

  const addInputData = async (e) => {
    e.preventDefault();

    const { name, studentID, level, age, email, mobile, desc } = inputVal;

    const res = await fetch("/api/v1/students/register", {
      method: "POST",
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

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      history.push("/");
      setCreData(data);
      console.log("data added");
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

          <button type="submit" onClick={addInputData} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
