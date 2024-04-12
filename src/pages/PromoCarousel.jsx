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

function PromoCarousel() {
  const api = useAPI();
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    getPromo();
  }, []);

  function getPromo() {
    api.get("/promocarousel.php").then(function (response) {
      setPromo(response.data);
    });
  }

  const deletePromo = (id) => {
    api.delete(`/promocarousel.php/${id}`).then(function (response) {
      console.log(response.data);
      getPromo();
    });
  };

  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <h2 className="text-center">Promo List</h2>
        </div>

        <MDBBtn
          color="primary"
          rounded="true"
          size="sm"
          tag="a"
          href="/create/promo"
        >
          + Create Promo
        </MDBBtn>

        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <MDBRow>
            <MDBCol size="12">
              <MDBTable responsive>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">No. </th>
                    <th scope="col">Promo Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                {promo.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={8} className="text-center mb-0">
                        No data found.
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  promo.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.prodtype}</td>
                        <td>
                          {" "}
                          <img
                            src={`http://localhost/pdo-php-api/promo/${item.promo_image}`}
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
                              href={`/producttype/${item.promo_Id}/edit`}
                            >
                              Edit
                            </MDBBtn>

                            <MDBBtn
                              color="danger"
                              rounded="true"
                              size="sm"
                              onClick={() => deletePromo(item.promo_Id)}
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

export default PromoCarousel;
