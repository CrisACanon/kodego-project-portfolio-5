import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../http";
import "../services/CreateProduct.css";

function Addproduct() {
  const api = useAPI();
  const navigate = useNavigate();
  const [ptitle, setPtitle] = useState("");
  const [pprice, setPprice] = useState("");
  const [pfile, setPfile] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [pspecs, setPspecs] = useState("");
  const [brandId, setBrandId] = useState("");
  const [message, setMessage] = useState("");
  // const [brand, setBrand] = useState([]);
  //const [value, setValue] = useState("");
  /*
  useEffect(() => {
    getBrand();

    return () => {};
  }, []);

  function getBrand() {
    api
      .get("/brands.php")
      .then((res) => setBrand(res.data))
      .catch((err) => console.log(err));
  }
*/

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("prod_title", ptitle);
    formData.append("prod_price", pprice);
    formData.append("image", pfile);
    formData.append("prod_desc", pdesc);
    formData.append("prod_specs", pspecs);
    formData.append("brand_id", brandId);

    const responce = await api.post("/createproducts.php", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (responce.data.success) {
      setMessage(responce.data.success);
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
  };

  /*function handleSelect(e) {
    setValue(e.target.value);
  }*/

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-4">
            <h5 className="mb-4">Add Product </h5>
            <p className="text-warning">{message}</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-3">Title </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setPtitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Price </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setPprice(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Image</label>
                <div className="col-sm-9">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setPfile(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Description </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setPdesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Specification </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setPspecs(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row hidden">
                <label className="col-sm-3">Brand Id </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setBrandId(e.target.value)}
                    //value={value}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3"></label>
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Addproduct;

/*
<div className="mb-3 row">
<label className="col-sm-3">Brand </label>
<div className="col-sm-9 ">
  <select onChange={handleSelect} className="form-control">
    <option value="0" disabled>
      Select Brand
    </option>
    {brand.map((brand, index) => {
      return (
        <option key={index} value={brand.brand_id}>
          {brand.brand}
        </option>
      );
    })}
  </select>
</div>
</div>
*/
