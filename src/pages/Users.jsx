import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";

import useApi from "../http";
import "./Users.css";

function Users() {
  const api = useApi();
  const { id } = useParams();
  const [inputs, setInputs] = useState([]);
  const [users, setUsers] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);

  useEffect(() => {
    getUsers();
    getEditUser();
    return () => {};
  }, []);

  const getUsers = () => {
    api.get("/users.php").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  };

  function getEditUser() {
    api.get(`/users.php/${id}`).then(function (response) {
      console.log(response.data);
      console.log(id);
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
    // console.log(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api.post("/users.php", inputs).then(function (response) {
      console.log(response.data);

      getUsers();
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();

    api.put(`/users.php/${id}`, inputs).then(function (response) {
      console.log(response.data);
    });
  };

  const deleteUser = (id) => {
    api.delete(`/users.php/${id}`).then(function (response) {
      console.log(response.data);
      getUsers();
      console.log(id);
    });
  };

  /*
  function handleSearch(e) {
    e.preventDefault();
    api
      .get(`/users.php?Username=${value}`)
      .then((res) => {
        setData(res.data);
        setValue("");
        console.log(value);
      })
      .catch((err) => console.log(err));
  }
*/
  const handleReset = () => {
    getUsers();
  };

  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <h2 className="text-center">Users Information</h2>
          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center",
            }}
            onSubmit={handleSubmit}
          >
            <MDBInput
              onChange={handleChange}
              className="text-input"
              label="Username"
              type="text"
              size="lg"
              name="Username"
            />
            <MDBInput
              onChange={handleChange}
              className="text-input"
              label="Email Address"
              type="email"
              size="lg"
              name="User_EmailAdd"
            />
            <MDBInput
              onChange={handleChange}
              className="text-input"
              label="Address"
              type="text"
              size="lg"
              name="User_Address"
            />
            <MDBInput
              onChange={handleChange}
              className="text-input"
              label="Contact Number"
              type="text"
              size="lg"
              name="User_Contact"
            />
            <MDBBtn className="me-1" color="success" type="submit">
              Create
            </MDBBtn>
          </form>
        </div>
        <hr />
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          className="d-flex input-group w-auto "
          //onSubmit={handleSearch}
        >
          <MDBInput
            type="text"
            className="form-control"
            placeholder="Search Username..."
            // value={value}
            // onChange={(e) => setValue(e.target.value)}
          />

          <MDBBtn type="submit" color="dark">
            Search
          </MDBBtn>
          <MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>
            Reset
          </MDBBtn>
        </form>
        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <MDBRow>
            <MDBCol size="12">
              <MDBTable>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email Address</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact #</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                {users.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={8} className="text-center mb-0">
                        No data found.
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  users.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <td>{item.User_Id}</td>
                        <td>{item.Username}</td>
                        <td>{item.User_EmailAdd}</td>
                        <td>{item.User_Address}</td>
                        <td>{item.User_Contact}</td>
                        <td>
                          <div className="btn-action">
                            <p>
                              <MDBBtn
                                color="warning"
                                rounded
                                size="sm"
                                onClick={toggleOpen}
                              >
                                Edit
                              </MDBBtn>

                              <MDBBtn
                                color="danger"
                                rounded
                                size="sm"
                                onClick={() => deleteUser(item.User_Id)}
                              >
                                Delete
                              </MDBBtn>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </MDBTableBody>
                  ))
                )}
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>

      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit User</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form
                style={{
                  margin: "auto",
                  padding: "15px",
                  maxWidth: "400px",
                  alignContent: "center",
                }}
                onSubmit={handleEdit}
              >
                <MDBInput
                  onChange={handleChange}
                  className="text-input"
                  label="Username"
                  type="text"
                  size="lg"
                  name="Username"
                  value={inputs.Username}
                />
                <MDBInput
                  onChange={handleChange}
                  className="text-input"
                  label="Email Address"
                  type="email"
                  size="lg"
                  name="User_EmailAdd"
                  value={inputs.User_EmailAdd}
                />
                <MDBInput
                  onChange={handleChange}
                  className="text-input"
                  label="Address"
                  type="text"
                  size="lg"
                  name="User_Address"
                  value={inputs.User_Address}
                />
                <MDBInput
                  onChange={handleChange}
                  className="text-input"
                  label="Contact Number"
                  type="text"
                  size="lg"
                  name="User_Contact"
                  value={inputs.User_Contact}
                />

                <MDBBtn color="secondary" onClick={toggleOpen}>
                  Close
                </MDBBtn>
                <MDBBtn type="submit">Save changes</MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default Users;
