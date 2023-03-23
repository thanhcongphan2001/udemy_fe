import { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { AiFillPlusCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { toast } from "react-toastify";
import { createRoles } from "../services/roleService";
import TableRole from "./TableRole";
const Role = () => {
  const dataChildDefault = { url: "", description: "", isValidUrl: true };
  const childRef = useRef();
  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault,
    
  });
  
  const handleChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (value && name === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChilds(_listChilds);
  };
  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    
    setListChilds(_listChilds);
  };
  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };
  const buildDataToPerSist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };
  const handleSave = async () => {
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url;
    });
    if (!invalidObj) {
      let data = buildDataToPerSist();
      let res = await createRoles(data);

      if (res && res.data && res.data.EC === 0) {
        toast.success(res.data.EM);
        console.log(childRef);
        childRef.current.fetchlistRolesAgain();
        let _listChilds = _.cloneDeep(listChilds);
        Object.entries(_listChilds).map(([key, child], index) => {
          _listChilds[key].url = "";
        });
        setListChilds(_listChilds);
      }
    } else {
      toast.error("input url must not be emty ....");
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalidObj[0];
      _listChilds[key]["isValidUrl"] = false;
      setListChilds(_listChilds);
    }
  };

  return (
    <>
      <div className="container">
        <div className="mt-3">
          <div className="">
            <h1>ADD A NEW ROLE ......</h1>
          </div>
          <div className="role-parent">
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <div className="row row-child" key={`child-${key}`}>
                  <div className=" col-5 form-group">
                    <label>Url:</label>
                    <input
                      className={
                        child.isValidUrl
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      type="text"
                      value={child.url}
                      onChange={(e) =>
                        handleChangeInput("url", e.target.value, key)
                      }
                    />
                  </div>
                  <div className=" col-5 form-group">
                    <label>Description:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={child.description}
                      onChange={(e) =>
                        handleChangeInput("description", e.target.value, key)
                      }
                    />
                  </div>
                  <div className=" col-2 mt-4">
                    <i
                      style={{ fontSize: "22px", cursor: "pointer" }}
                      className="text-primary"
                      onClick={handleAddNewInput}
                    >
                      <AiFillPlusCircle />
                    </i>
                    {index >= 1 && (
                      <i
                        style={{ fontSize: "22px", cursor: "pointer" }}
                        className="text-danger ml-3"
                        onClick={() => handleDeleteInput(key)}
                      >
                        <TiDelete />
                      </i>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3">
            <button className="btn btn-warning" onClick={handleSave}>
              {" "}
              Save
            </button>
          </div>
        </div>
        <hr></hr>
        <div className="mt-3">
          <TableRole ref={childRef} />
        </div>
      </div>
    </>
  );
};
export default Role;
