import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import { allUsers, deleteUserAxios } from "../services/User";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import ModalDelete from "./modaldelete";

import ModalUser from "./modalUser";
import { set } from "lodash";
function User() {
  const [listUsers, setlistUsers] = useState([]);
  const [currentPages, setCurrentPages] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const [datamodal, setDataModal] = useState({});

  //update / create
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  const [dataModalUser, setDataModalUser] = useState({});
  //

  console.log(listUsers);
  useEffect(() => {
    dataUsers();
    console.log("run effect");
  }, [currentPages]);
  // console.log(currentPages, currentLimit);
  const dataUsers = async () => {
    const data = await allUsers(currentPages, currentLimit);

    if (data && data.data && data.data.EC === 0) {
      setTotalPages(data.data.DT.totalPages);
      if (data.data.DT.totalPages > 0 && data.data.DT.users.length === 0) {
        setCurrentPages(data.data.DT.totalPages);
        await allUsers(data.data.DT.totalPages, currentLimit);
      }
      if (data.data.DT.totalPages > 0 && data.data.DT.users.length > 0) {
        setlistUsers(data.data.DT.users);
      }
    }
  };
  const handlePageClick = (event) => {
    setCurrentPages(+event.selected + 1);
  };
  const deleteUser = (user) => {
    setDataModal(user);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setDataModal({});
  };
  const confirmDeleteUser = async () => {
    let res = await deleteUserAxios(datamodal.id);

    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      await dataUsers();
      setShow(false);
    } else {
      toast.error(res.data.EM);
      setShow(false);
    }
  };
  const onHideModalUser = async () => {
    setDataModalUser({});
    setIsShowModalUser(false);
    await dataUsers();
  };
  const handleEditUser = async (user) => {
    setActionModalUser("UPDATE");
    setDataModalUser(user);
    setIsShowModalUser(true);
  };
  const handleRefresh = async () => {
    await dataUsers();
  };
  return (
    <>
      <Container className="mt-3">
        <Row className="d-flex justify-content-center">
          <Col className="col-12 col-md-6 ">
            <h1>Table User</h1>
            <div className="mb-3">
              <button
                className="btn btn-success"
                onClick={() => {
                  handleRefresh();
                }}
              >
                refesh
              </button>

              <button
                className="btn btn-primary mx-2"
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModalUser("CREATE");
                }}
              >
                create new user
              </button>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Action</th>
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
                          <td>{item?.Group?.name}</td>
                          <td className="d-flex">
                            <button
                              className="btn btn-danger mr-1"
                              onClick={() => deleteUser(item)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-success"
                              onClick={() => handleEditUser(item)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <>Not found ....</>
                )}
              </tbody>
            </Table>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={+currentPages - 1}
            />
          </Col>
        </Row>
      </Container>

      <ModalUser
        onHide={onHideModalUser}
        show={isShowModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      />
      <ModalDelete
        show={show}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        datamodal={datamodal}
      />
      {/* <Cc />
      <Cl /> */}
    </>
  );
}

export default User;
