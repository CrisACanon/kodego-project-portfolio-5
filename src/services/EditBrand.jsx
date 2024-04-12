import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import "../services/EditBrand.css";
import useAPI from "../http";

function EditBrand() {
  const api = useAPI();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getBrand();
  }, []);

  function getBrand() {
    api.get(`/brands.php/${id}`).then(function (response) {
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

    api.put(`/brands.php/${id}`, inputs).then(function (response) {
      console.log(response.data);
      navigate("/brands");
    });
  };

  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <MDBCard className="user-title">Edit Brand</MDBCard>
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
                  value={inputs.brand}
                  className="text-input"
                  label="Brand Title*"
                  type="text"
                  size="lg"
                  name="brand"
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
                  href="/brands"
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
export default EditBrand;
