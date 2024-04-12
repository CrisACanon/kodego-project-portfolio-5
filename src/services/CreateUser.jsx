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
import "../services/CreateUser.css";

function CreateUser() {
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

    api.post("/users.php", inputs).then(function (response) {
      console.log(response.data);
      navigate("/users");
    });
  };
  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <MDBCard className="user-title">Create User</MDBCard>
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
                  label="Username*"
                  type="text"
                  size="lg"
                  name="name"
                  required
                />
                <MDBInput
                  onChange={handleChange}
                  className="text-input"
                  label="Email Address*"
                  type="text"
                  size="lg"
                  name="email"
                  required
                />
                <MDBInput
                  onChange={handleChange}
                  className="text-input"
                  label="Contact Number*"
                  type="text"
                  size="lg"
                  name="contact"
                  required
                />
                <MDBInput
                  onChange={handleChange}
                  className="text-input*"
                  label="Address"
                  type="text"
                  size="lg"
                  name="address"
                  required
                />
                <MDBBtn
                  className="me-1 mt-2"
                  color="success"
                  type="submit"
                  rounded
                >
                  Create User
                </MDBBtn>
                <MDBBtn
                  className="me-1"
                  color="warning"
                  rounded="true"
                  tag="a"
                  href="/users"
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
export default CreateUser;
