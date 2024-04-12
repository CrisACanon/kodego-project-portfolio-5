import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBFile,
} from "mdb-react-ui-kit";
import useAPI from "../http";
import "../services/CreatePromo.css";

function CreatePromo() {
  const api = useAPI();
  const navigate = useNavigate();
  const [promodes, setPromoDes] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const uploadBrand = async () => {
    const formData = new FormData();
    formData.append("promo_des", promodes);
    formData.append("promo_image", image);

    const responce = await api.post("/createpromo.php", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (responce.data.success) {
      setMessage(responce.data.success);
      setTimeout(() => {
        navigate("/promo");
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadBrand();
  };

  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <MDBCard className="user-title">Create Promo</MDBCard>
          <p className="message">{message}</p>
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
                  className="text-input"
                  label="Promo Description*"
                  type="text"
                  size="lg"
                  name="brand"
                  onChange={(e) => setPromoDes(e.target.value)}
                  required
                />
                <MDBFile
                  className="text-input"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <MDBBtn
                  className="me-1 mt-2"
                  color="success"
                  type="submit"
                  rounded
                >
                  Create Promo
                </MDBBtn>
                <MDBBtn
                  className="me-1 mt-2"
                  color="warning"
                  rounded="true"
                  tag="a"
                  href="/promo"
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
export default CreatePromo;
