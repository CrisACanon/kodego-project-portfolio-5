import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
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
import "./Brands.css";

function Brands() {
  const api = useAPI();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrands();
  }, []);

  function getBrands() {
    api.get("/brands.php").then(function (response) {
      console.log(response.data);
      setBrands(response.data);
    });
  }

  const deleteBrand = (id) => {
    api.delete(`/brands.php/${id}`).then(function (response) {
      console.log(response.data);
      getBrands();
    });
  };

  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <h2 className="text-center">Brands List</h2>
        </div>

        <MDBBtn
          color="primary"
          rounded="true"
          size="sm"
          tag="a"
          href="/create/brand"
        >
          + Create Brand
        </MDBBtn>

        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <MDBRow>
            <MDBCol size="12">
              <MDBTable>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Brand Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                {brands.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={8} className="text-center mb-0">
                        No data found.
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  brands.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.brand}</td>
                        <td>
                          <img
                            src={`http://localhost/pdo-php-api/brands/${item.brand_image}`}
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
                              href={`/brand/${item.brand_id}/edit`}
                            >
                              Edit
                            </MDBBtn>

                            <MDBBtn
                              color="danger"
                              rounded="true"
                              size="sm"
                              onClick={() => deleteBrand(item.brand_id)}
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

export default Brands;
