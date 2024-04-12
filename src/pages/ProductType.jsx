import { useEffect, useState } from "react";

import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import useAPI from "../http";
import "./ProductType.css";

function ProductType() {
  const api = useAPI();
  const [productype, setProducType] = useState([]);

  useEffect(() => {
    getProductType();
  }, []);

  function getProductType() {
    api.get("/producttype.php").then(function (response) {
      setProducType(response.data);
    });
  }

  const deleteProductType = (id) => {
    api.delete(`/producttype.php/${id}`).then(function (response) {
      console.log(response.data);
      getProductType();
    });
  };

  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <h2 className="text-center">Product Type List</h2>
        </div>

        <MDBBtn
          color="primary"
          rounded="true"
          size="sm"
          tag="a"
          href="/create/producttype"
        >
          + Create Product Type
        </MDBBtn>

        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <MDBRow>
            <MDBCol size="12">
              <MDBTable responsive>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">No. </th>
                    <th scope="col">ProductType Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                {productype.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={8} className="text-center mb-0">
                        No data found.
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  productype.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.prodtype}</td>
                        <td>
                          {" "}
                          <img
                            src={`http://localhost/pdo-php-api/producttype/${item.image}`}
                            height={40}
                            width={70}
                          />
                        </td>
                        <td>
                          <div className="btn-action">
                            <MDBBtn
                              color="warning"
                              rounded="true"
                              size="sm"
                              tag="a"
                              href={`/producttype/${item.prodtype_id}/edit`}
                            >
                              Edit
                            </MDBBtn>

                            <MDBBtn
                              color="danger"
                              rounded="true"
                              size="sm"
                              onClick={() =>
                                deleteProductType(item.prodtype_id)
                              }
                            >
                              Delete
                            </MDBBtn>
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
    </>
  );
}

export default ProductType;
