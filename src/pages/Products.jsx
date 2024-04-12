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
import "./Products.css";

function Products() {
  const api = useAPI();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    api.get("/products.php").then(function (response) {
      console.log(response.data);
      setProducts(response.data);
    });
  }

  const deleteProduct = (id) => {
    api.delete(`/products.php/${id}`).then(function (response) {
      console.log(response.data);
      getProducts();
    });
  };

  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <h2 className="text-center">Products List</h2>
        </div>

        <MDBBtn
          color="primary"
          rounded="true"
          size="sm"
          tag="a"
          href="/create/product"
        >
          + Create Product
        </MDBBtn>

        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <MDBRow>
            <MDBCol size="12">
              <MDBTable>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Product Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Specification</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Type</th>
                    <th scope="col">Image</th>
                    <th scope="col">Qty.</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                {products.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={11} className="text-center mb-0">
                        No data found.
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  products.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.prod_title}</td>
                        <td>{item.prod_desc}</td>
                        <td>{item.prod_specs}</td>
                        <td>{item.brand_id}</td>
                        <td>{item.cat_Id}</td>
                        <td>{item.prodtype_id}</td>
                        <td>
                          <img
                            src={`http://localhost/pdo-php-api/products/${item.image}`}
                            height={40}
                            width={70}
                          />
                        </td>
                        <td>{item.quantity}</td>
                        <td>{item.prod_price}</td>
                        <td>
                          <div className="btn-action">
                            <MDBBtn
                              color="warning"
                              rounded="true"
                              size="sm"
                              tag="a"
                              href={`/brand/${item.prod_id}/edit`}
                            >
                              Edit
                            </MDBBtn>

                            <MDBBtn
                              color="danger"
                              rounded="true"
                              size="sm"
                              onClick={() => deleteProduct(item.prod_id)}
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

export default Products;
