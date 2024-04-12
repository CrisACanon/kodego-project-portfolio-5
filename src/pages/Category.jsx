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
import "./Category.css";

function Category() {
  const api = useAPI();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  function getCategory() {
    api.get("/category.php").then(function (response) {
      console.log(response.data);
      setCategories(response.data);
    });
  }

  const deleteCategory = (id) => {
    api.delete(`/category.php/${id}`).then(function (response) {
      console.log(response.data);
      getCategory();
    });
  };

  return (
    <>
      <MDBContainer>
        <div className="input-card">
          <h2 className="text-center">Category List</h2>
        </div>

        <MDBBtn
          color="primary"
          rounded="true"
          size="sm"
          tag="a"
          href="/create/category"
        >
          + Create Category
        </MDBBtn>

        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <MDBRow>
            <MDBCol size="12">
              <MDBTable>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">Category ID</th>
                    <th scope="col">Category Title</th>
                    <th scope="col">Actions</th>
                  </tr>
                </MDBTableHead>
                {categories.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={8} className="text-center mb-0">
                        No data found.
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  categories.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <td>{item.cat_Id}</td>
                        <td>{item.category}</td>
                        <td>
                          <div className="btn-action">
                            <MDBBtn
                              color="warning"
                              rounded="true"
                              size="sm"
                              tag="a"
                              href={`/category/${item.cat_Id}/edit`}
                            >
                              Edit
                            </MDBBtn>

                            <MDBBtn
                              color="danger"
                              rounded="true"
                              size="sm"
                              onClick={() => deleteCategory(item.cat_Id)}
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
export default Category;
