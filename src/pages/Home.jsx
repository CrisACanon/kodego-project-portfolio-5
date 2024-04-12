import React from "react";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";
import useAPI from "../http";
import "./Home.css";

const Home = () => {
  const api = useAPI();
  const [promo, setPromo] = useState([]);
  const [products, setProducts] = useState([]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getPromo();

    return () => {};
  }, []);

  function getPromo() {
    api.get("/promocarousel.php").then(function (response) {
      setPromo(response.data);
    });
  }

  useEffect(() => {
    api
      .get("/producttype.php")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <MDBCarousel showControls showIndicators dark fade>
        {promo.map((item, index) => {
          return (
            <MDBCarouselItem key={index}>
              <img
                src={`http://localhost/pdo-php-api/promo/${item.promo_image}`}
                className="carousel d-block w-100"
                alt="..."
              />
              <MDBCarouselCaption>
                <p>{item.promo_des}</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          );
        })}
      </MDBCarousel>

      <div className="text-center mt-4">
        <h1>Products</h1>
      </div>
      <div className="slider">
        <Slider {...settings}>
          {products.map((product, index) => {
            return (
              <div key={index} className="box">
                <img
                  src={`http://localhost/pdo-php-api/producttype/${product.image}`}
                />
                <h3>{product.prodtype}</h3>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default Home;
