import React from "react";
import "../components/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="color">
        <div className="container">
          <div className="row py-5 text-white">
            <div className="col-md-3 col-sm-12">
              <h4>CUSTOMER SERVICE</h4>
              <p>Cancellation Policy</p>
              <p>Delivery</p>
              <p>Order and Payments</p>
              <p>Payment FAQs</p>
              <p>Return and Refunds</p>
              <p>Service Area Directory</p>
              <p>erms and Condition</p>
              <p>Parranty Information</p>
              <p>Warranty Policy</p>
            </div>
            <div className="col-md-3 col-sm-12">
              <h4>COMPANY</h4>
              <p>Careers</p>
              <p>Contact Us</p>
              <p>FAQs</p>
              <p>News and Articles</p>
              <p>Our Company</p>
              <p>Reviews</p>
              <p>Store Location</p>
            </div>
            <div className="col-md-3 col-sm-12">
              <h4>LINKS</h4>
              <p>Corporate</p>
              <p>Community</p>
              <p>Lazada Official Store</p>
              <p>Shopee Official Store</p>
            </div>
            <div className="col-md-3 col-sm-12">
              <h4>CONTACT US</h4>
              <p>Email: email@email.com.ph</p>
              <p>Mobile: 09123456789</p>
              <p>Tel: 083-123-456</p>
            </div>
          </div>
          <div className="text-white text-center">
            © 2021 Copyright: Marbel Computer Center
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
