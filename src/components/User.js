import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import { allUsers } from "../services/User";
import Table from "react-bootstrap/Table";
function User() {
  const [listUsers, setlistUsers] = useState([]);
  useEffect(() => {
    dataUsers();
  }, []);

  const dataUsers = async () => {
    const data = await allUsers();
    if (data && data.data && data.data.EC === 0) {
      console.log(data);
      setlistUsers(data.data.DT);
    }
  };
  console.log(listUsers);
  return (
    <Container className="mt-3">
      <Row className="d-flex justify-content-center">
        <Col className="col-12 col-md-6 box p-4">
          <h1>Table User</h1>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length > 0 ? (
                listUsers.map((item, i) => {
                  return (
                    <>
                      <tr key={`row-${i}`}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item?.Group?.description}</td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <>Not found ....</>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default User;
