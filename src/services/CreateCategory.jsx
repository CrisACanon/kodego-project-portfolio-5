import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import useAPI from "../http";
import "../services/CreateCategory.css";

function CreateCategory() {
  const api = useAPI();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api.post("/category.php", inputs).then(function (response) {
      console.log(response.data);
      navigate("/category");
    });
  };
  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <MDBCard className="user-title">Create Category</MDBCard>
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
                  onChange={handleChange}
                  className="text-input"
                  label="Category Title*"
                  type="text"
                  size="lg"
                  name="category"
                  required
                />
                <MDBBtn
                  className="me-1 mt-2"
                  color="success"
                  type="submit"
                  rounded
                >
                  Create Category
                </MDBBtn>
                <MDBBtn
                  className="me-1 mt-2"
                  color="warning"
                  rounded="true"
                  tag="a"
                  href="/category"
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

export default CreateCategory;
