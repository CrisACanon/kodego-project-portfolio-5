import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import "../services/EditProductType.css";
import useAPI from "../http";

function EditProductType() {
  const api = useAPI();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProductType();
  }, []);

  function getProductType() {
    api.get(`/producttype.php/${id}`).then(function (response) {
      console.log(response.data);
      setInputs(response.data);
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api.put(`/producttype.php/${id}`, inputs).then(function (response) {
      console.log(response.data);
      navigate("/producttype");
    });
  };

  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <MDBCard className="user-title">Edit Product Type</MDBCard>
          <hr />
          <MDBCard>
            <MDBCardBody>
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
                  value={inputs.prodtype}
                  className="text-input"
                  label="Product Type*"
                  type="text"
                  size="lg"
                  name="prodtype"
                  onChange={handleChange}
                />

                <MDBBtn
                  className="me-1 mt-2"
                  color="success"
                  type="submit"
                  rounded="true"
                >
                  Save Changes
                </MDBBtn>
                <MDBBtn
                  className="me-1 mt-2"
                  color="warning"
                  rounded="true"
                  tag="a"
                  href="/producttype"
                >
                  Cancel
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>
    </>
  );
}
export default EditProductType;
