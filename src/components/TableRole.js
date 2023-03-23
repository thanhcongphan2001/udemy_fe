import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fetchAllRole, deleteRole } from "../services/roleService";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
const TableRole = forwardRef((props, ref) => {
  const [listRoles, setlistRoles] = useState([]);
  useEffect(() => {
    getAllRoles();
  }, []);
  useImperativeHandle(ref, () => ({
    fetchlistRolesAgain() {
      getAllRoles();
    },
  }));
  const getAllRoles = async () => {
    let data = await fetchAllRole();
    if (data && data.data.EC === 0) {
      setlistRoles(data.data.DT);
    }
  };
  const handleDeleteRole = async (role) => {
    let data = await deleteRole(role);
    if (data && data.data.EC === 0) {
      toast.success(data.data.EM);
      await getAllRoles();
    }
  };
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Url</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            listRoles.map((item, i) => {
              return (
                <>
                  <tr key={`row-${i}`}>
                    <td>{item.id}</td>
                    <td>{item.url}</td>
                    <td>{item.description}</td>

                    <td className="d-flex">
                      <button
                        className="btn btn-danger mr-1"
                        onClick={() => handleDeleteRole(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>
                <>Not found ....</>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
});
export default TableRole;
