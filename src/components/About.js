import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="mt-3">
          <h1>dự án phân quyền người dùng</h1>
          <p className="mt-3">
            <strong>FE :</strong>
            sử dụng thư viện reactjs 18 react-router-dom v6 bs5 axios để call
            api , sử dụng react-context để quản lí state phân quyền người dùng
            bên phía fe thao tác CRUD
          </p>
          <p className="mt-3">
            <strong>BE :</strong>
            sử dụng Framework Express , RESTful API , phân trang , phân quyền
            user với JWT
          </p>
          <p className="mt-3">
            <strong>DB :</strong>
            sử dụng thư viên sequelize (ORM) với mysql
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
