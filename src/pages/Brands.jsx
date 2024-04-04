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
import "./Brands.css";

function Brands() {
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
    api.get("/brand.php").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  };

  function getEditUser() {
    api.get(`/brand.php/${id}`).then(function (response) {
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

    api.post("/brand.php", inputs).then(function (response) {
      console.log(response.data);

      getUsers();
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();

    api.put(`/brand.php/${id}`, inputs).then(function (response) {
      console.log(response.data);
    });
  };

  const deleteBrand = (id) => {
    api.delete(`/brand.php/${id}`).then(function (response) {
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
          <h2 className="text-center">Brands Information</h2>
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
              label="Brand Title"
              type="text"
              size="lg"
              name="Brand_Title"
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
            placeholder="Search Brand..."
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
                    <th scope="col">Brand Id</th>
                    <th scope="col">Brand Title</th>
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
                        <td>{item.Brand_Id}</td>
                        <td>{item.Brand_Title}</td>

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
                                onClick={() => deleteBrand(item.Brand_Id)}
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
              <MDBModalTitle>Edit Brand</MDBModalTitle>
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
                  label="Brand Title"
                  type="text"
                  size="lg"
                  name="Brand_Title"
                  value={inputs.Brand_Title}
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

export default Brands;
