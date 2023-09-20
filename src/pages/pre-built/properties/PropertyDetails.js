import React, { useState, useEffect, useRef, useContext } from "react";
import ProductVideo from "../../../images/product/video-a.jpg";
import ModalVideo from "react-modal-video";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import Slider from "react-slick";
import {
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  Row,
  Icon,
  Block
} from "../../../components/Component";
import { Badge, Card } from "reactstrap";
import { PropertyContext } from "./PropertyContext";
import { Link, useParams } from "react-router-dom";
import { SlickArrowLeft, SlickArrowRight } from "../../../components/partials/slick/SlickComponents";

const sliderSettings = {
  className: "slider-init row",
  slidesToShow: 2,
  centerMode: false,
  slidesToScroll: 1,
  infinite: false,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  responsive: [
    { breakpoint: 3000, settings: { slidesToShow: 3 } },
    { breakpoint: 1540, settings: { slidesToShow: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } }
  ]
};

const sliderSettingsDefault = {
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  slide: null,
  responsive: [
    { breakpoint: 1539, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 420, settings: { slidesToShow: 1 } }
  ],
  arrows: false,
  swipeToSlide: true,
  focusOnSelect: true,
  className: "slider-init slider-nav"
};

const PropertyDetails = ({ match }) => {
  const { contextData } = useContext(PropertyContext);

  const [data] = contextData;

  const [sliderData, setSliderData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState({});
  const [colorSector, setColorSelector] = useState(1);
  const [sizeSelector, setSizeSelector] = useState(1);
  const [counter, setCounter] = useState(1);
  const [videoOpen, setVideoOpen] = useState(false);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  // increases quantity number
  const increaseCounter = () => {
    setCounter((prevState) => prevState + 1);
  };

  // decreases quantity number
  const decreaseCounter = () => {
    if (counter !== 0) {
      setCounter((prevState) => prevState - 1);
    }
  };

  // changes slides
  const slideChange = (index) => {
    const product = sliderData.images.find((item) => item.id === index);
    setCurrentSlide(product);
  };

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  let { productId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const id = productId;
        const response = await fetch(`https://homely-h0gx.onrender.com/v1/asset/${productId}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          // Handle error if the response is not okay
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the product exists and has images
        if (data.data && data.data.images && data.data.images.length > 0) {
          setSliderData(data.data);
          setCurrentSlide({ id: 0, img: data.data.image });
        }
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps


  function getYouTubeVideoId(url) {
    // Regular expression to match YouTube video URLs
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]+)$/;

    // Use the regular expression to extract the video ID
    const match = url.match(regExp);

    if (match && match[1]) {
      return match[1];
    } else {
      // Invalid URL or unable to extract video ID
      return null;
    }
  }

  return (
    <React.Fragment>
      <Head title="Property Detail"></Head>
      {sliderData && sliderData.images && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween className="g-3">
              <BlockHeadContent>
                <BlockTitle>Property Details</BlockTitle>
                <BlockDes className="text-soft">
                  <p>Page for property details</p>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Link to={`${process.env.PUBLIC_URL}/properties`}>
                  <Button color="light" outline className="bg-white d-none d-sm-inline-flex">
                    <Icon name="arrow-left"></Icon>
                    <span>Back</span>
                  </Button>
                </Link>
                <Link to={`${process.env.PUBLIC_URL}/properties`}>
                  <Button color="light" outline className="btn-icon bg-white d-inline-flex d-sm-none">
                    <Icon name="arrow-left"></Icon>
                  </Button>
                </Link>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <Card className="card-bordered">
              <div className="card-inner">
                <Row className="pb-5">
                  <Col xl={6}>
                    <div className="product-gallery">
                      <Slider
                        asNavFor={nav2}
                        ref={slider1}
                        arrows={false}
                        fade={true}
                        slidesToShow={1}
                        slidesToScroll={1}
                        initialSlide={currentSlide.id}
                        className="slider-init"
                        prevArrow
                      >
                        <div className="slider-item rounded" key={currentSlide.id}>
                          <img src={currentSlide.img} className="w-100" alt="" />
                        </div>
                      </Slider>
                      <Slider
                        asNavFor={nav1}
                        ref={slider2}
                        afterChange={(newIndex) => slideChange(newIndex)}
                        initialSlide={currentSlide.id}
                        {...sliderSettingsDefault}
                      >
                        {sliderData.images.map((item, index) => {
                          return (
                            <div
                              className={`slider-item ${currentSlide.id === item.id ? "slick-current" : ""}`}
                              key={index}
                            >
                              <div className="thumb">
                                <img src={item.img} alt="" />
                              </div>
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div className="product-info mt-5 me-xxl-5">
                      <h4 className="product-price text-primary">
                        ${sliderData.rent?.toLocaleString()}{" "}
                        <small className="text-muted fs-14px">
                          Rent
                        </small>
                      </h4>
                      <h2 className="product-title">{sliderData.title}</h2>
                      <div className="product-rating">
                        <ul className="rating">
                          <li>
                            <Icon name="star-fill"></Icon>
                          </li>
                          <li>
                            <Icon name="star-fill"></Icon>
                          </li>
                          <li>
                            <Icon name="star-fill"></Icon>
                          </li>
                          <li>
                            <Icon name="star-fill"></Icon>
                          </li>
                          <li>
                            <Icon name="star-half"></Icon>
                          </li>
                        </ul>
                        <div className="amount">(2 Reviews)</div>
                      </div>

                      <div className="product-meta">
                        <h6 className="title">Status</h6>
                        <ul className="custom-control-group">
                          <li>
                            <div className="custom-control custom-radio custom-control-pro no-control">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                name="sizeCheck"
                                id="sizeCheck1"
                                checked={sliderData.available === true}
                              />
                              <label className="custom-control-label" htmlFor="sizeCheck1">
                                {sliderData.available ? "Available" : "Unavailable"}
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-radio custom-control-pro no-control">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                name="sizeCheck"
                                id="sizeCheck1"
                                checked={sliderData.vehicle === true}
                              />
                              <label className="custom-control-label" htmlFor="sizeCheck1">
                                {sliderData.vehicle ? "Car Hire" : "No Car Hire"}
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-radio custom-control-pro no-control">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                name="sizeCheck"
                                id="sizeCheck1"
                                checked={sliderData.gym === true}
                              />
                              <label className="custom-control-label" htmlFor="sizeCheck1">
                                {sliderData.gym ? "Gym" : "No Gym"}
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </Col>
                </Row>

                <hr className="hr border-light" />

                <Row className="g-gs flex-lg-row-reverse pt-5">
                  <Col lg={5}>
                    <div className="video">
                      <img className="video-poster w-100" src={ProductVideo} alt="" />
                      <ModalVideo
                        channel="youtube"
                        autoplay
                        isOpen={videoOpen}
                        videoId={"vYuDncdqGTs" || getYouTubeVideoId(sliderData.video)}
                        onClose={() => setVideoOpen(false)}
                      />
                      <a
                        className="video-play popup-video"
                        href="#video"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setVideoOpen(true);
                        }}
                      >
                        <Icon name="play"></Icon>
                        <span>Watch Video</span>
                      </a>
                    </div>
                  </Col>
                  <Col lg={7}>
                    <div className="product-details entry me-xxl-3">
                      <h3>{sliderData.name}</h3>
                      <ul className="list list-sm list-checked">
                        <li>{sliderData.bedrooms} Bedrooms</li>
                        <li>{sliderData.bathroom} Bathrooms</li>
                        <li>{sliderData.toilet} Toilet</li>
                        <li>{sliderData.pool} Pool</li>
                      </ul>

                      <h3>{sliderData.title}</h3>
                      <p>
                        I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
                        born and I will give you a complete account of the system, and expound the actual teachings.
                        Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Block>

          <Block size="lg">
            <BlockHead>
              <BlockBetween>
                <BlockHeadContent>
                  <BlockTitle>Related Properties</BlockTitle>
                </BlockHeadContent>
              </BlockBetween>
            </BlockHead>
            <Slider {...sliderSettings}>
              {data.map((item, index) => {
                return (
                  <Col key={index}>
                    <Card className="card-bordered product-card me-3 ms-3">
                      <div className="product-thumb">
                        <Link to={`${process.env.PUBLIC_URL}/property-details/${item._id}`}>
                          <img className="card-img-top" src={item.image} alt="" />
                        </Link>
                        <ul className="product-badges">
                          <li>
                            <Badge color="info">{item.tag}</Badge>
                          </li>
                        </ul>
                        <ul className="product-actions">
                          <li>
                            <a href="#cart" onClick={(ev) => ev.preventDefault()}>
                              <Icon name="cart"></Icon>
                            </a>
                          </li>
                          <li>
                            <a href="#heart" onClick={(ev) => ev.preventDefault()}>
                              <Icon name="heart"></Icon>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-inner text-center">
                        <ul className="product-tags">
                          <li>
                            <a href="#product" onClick={(ev) => ev.preventDefault()}>
                              {item.name}
                            </a>
                          </li>
                        </ul>
                        <h5 className="product-title">
                          <Link to={`${process.env.PUBLIC_URL}/property-details/${item._id}`}>{item.title}</Link>
                        </h5>
                        <div className="product-price text-primary h5">
                          <small className="text-muted del fs-13px">${(+item.rent * 0.5)?.toLocaleString()}</small> ${item.rent?.toLocaleString()}
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Slider>
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};

export default PropertyDetails;
