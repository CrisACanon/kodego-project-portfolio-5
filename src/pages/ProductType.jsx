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
import "./ProductType.css";

function ProductType() {
  const api = useApi();
  const { id } = useParams();
  const [inputs, setInputs] = useState([]);
  const [producttype, setProductType] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);

  useEffect(() => {
    getProductType();
    getEditProductType();
    return () => {};
  }, []);

  const getProductType = () => {
    api.get("/product-type.php").then(function (response) {
      console.log(response.data);
      setProductType(response.data);
    });
  };

  function getEditProductType() {
    api.get(`/product-type.php/${id}`).then(function (response) {
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

    api.post("/product-type.php", inputs).then(function (response) {
      console.log(response.data);

      getProductType();
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();

    api.put(`/product-type.php/${id}`, inputs).then(function (response) {
      console.log(response.data);
    });
  };

  const deleteProductType = (id) => {
    api.delete(`/product-type.php/${id}`).then(function (response) {
      console.log(response.data);
      getProductType();
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
    getProductType();
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
              label="Product Type"
              type="text"
              size="lg"
              name="Prod_Type_Title"
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
            placeholder="Search Product Type..."
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
                    <th scope="col">Product-Type ID</th>
                    <th scope="col">Product-Type</th>
                    <th scope="col">Category ID</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                {producttype.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={8} className="text-center mb-0">
                        No data found.
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  producttype.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <td>{item.ProdType_Id}</td>
                        <td>{item.Prod_Type_Title}</td>
                        <td>{item.Cat_Id}</td>

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
                                onClick={() =>
                                  deleteProductType(item.ProdType_Id)
                                }
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
                  label="Product Type"
                  type="text"
                  size="lg"
                  name="Prod_Type_Title"
                  value={inputs.Prod_Type_Title}
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

export default ProductType;
