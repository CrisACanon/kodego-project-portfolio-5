import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import "../services/EditUser.css";
import useAPI from "../http";

function EditUser() {
  const api = useAPI();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    api.get(`/users.php/${id}`).then(function (response) {
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

    api.put(`/users.php/${id}`, inputs).then(function (response) {
      console.log(response.data);
      navigate("/users");
    });
  };

  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <MDBCard className="user-title">Edit User</MDBCard>
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
                  value={inputs.name}
                  className="text-input"
                  label="Username*"
                  type="text"
                  size="lg"
                  name="name"
                  onChange={handleChange}
                />
                <MDBInput
                  value={inputs.email}
                  className="text-input"
                  label="Email Address*"
                  type="text"
                  size="lg"
                  name="email"
                  onChange={handleChange}
                />
                <MDBInput
                  value={inputs.contact}
                  className="text-input"
                  label="Contact Number*"
                  type="text"
                  size="lg"
                  name="contact"
                  onChange={handleChange}
                />
                <MDBInput
                  value={inputs.address}
                  className="text-input"
                  label="Address*"
                  type="text"
                  size="lg"
                  name="address"
                  onChange={handleChange}
                />
                <MDBBtn
                  className="me-1"
                  color="success"
                  type="submit"
                  rounded="true"
                >
                  Save Changes
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
export default EditUser;
