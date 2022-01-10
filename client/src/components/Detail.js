import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { NavLink, useParams, useHistory } from "react-router-dom";

const Detail = () => {
  const [getStudentData, setStudentData] = useState([]);
  console.log(getStudentData);

  const { id } = useParams("");
  console.log(id);

  const history = useHistory();

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
      console.log("student deleted");
      history.push("/");
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>
        Welcome to Detail{" "}
        <span style={{ fontWeight: "600", textTransform: "uppercase" }}>
          {getStudentData.name}
        </span>
      </h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getStudentData._id}`}>
              {" "}
              <button className="btn btn-warning mx-2" style={{color: "#fff"}}>
                <CreateIcon />
              </button>
            </NavLink>
            <button
              className="btn btn-danger"
              onClick={() => deleteStudent(getStudentData._id)}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">
                Name: <span>{getStudentData.name}</span>
              </h3>
              <h3 className="mt-3">
                Student ID: <span>{getStudentData.studentID}</span>
              </h3>
              <p className="mt-3">
                <PhoneAndroidIcon />
                Mobile: <span>+66 {getStudentData.mobile}</span>
              </p>
              <p className="mt-3">
                <MailOutlineIcon />
                Email: <span>{getStudentData.email}</span>
              </p>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
              <p className="mt-3">
                <WorkIcon />
                Level: <span>{getStudentData.level}</span>
              </p>
              <p className="mt-3">
                <DateRangeOutlinedIcon />
                Age: <span>{getStudentData.age}</span>
              </p>
              <p className="mt-3">
                Description: <span>{getStudentData.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
