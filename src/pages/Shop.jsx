import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  //MDBContainer,
} from "mdb-react-ui-kit";
import useAPI from "../http";
import "./Shop.css";

//const address = import.meta.env.VITE_API_P_IMAGE;
function Shop() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <MDBContainer className="container">
        <MDBRow className=" row-cols-1 row-cols-md-3 g-4">
          {products.map((item, index) => {
            return (
              <MDBCol key={index}>
                <MDBCard className=" h-100">
                  <MDBCardImage
                    className="card-img"
                    src={`http://localhost/pdo-php-api/products/${item.image}`}
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>{item.prod_title}</MDBCardTitle>
                    <MDBCardTitle>Price: {item.prod_price}</MDBCardTitle>
                    <MDBCardText></MDBCardText>
                  </MDBCardBody>
                  <MDBBtn onSubmit={handleSubmit}>Add to Cart</MDBBtn>
                </MDBCard>
              </MDBCol>
            );
          })}
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Shop;
