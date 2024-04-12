import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import "../services/EditCategory.css";
import useAPI from "../http";

function EditCategory() {
  const api = useAPI();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getCategory();
  }, []);

  function getCategory() {
    api.get(`/category.php/${id}`).then(function (response) {
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

    api.put(`/category.php/${id}`, inputs).then(function (response) {
      console.log(response.data);
      navigate("/category");
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
                  value={inputs.category}
                  className="text-input"
                  label="Category"
                  type="text"
                  size="lg"
                  name="category"
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
export default EditCategory;
