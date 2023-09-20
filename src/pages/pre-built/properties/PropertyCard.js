import React, { useContext, useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import Dropzone from "react-dropzone";
import ProductLGE from "../../../images/product/lg-e.jpg";
import makeAnimated from "react-select/animated";
import { RSelect } from "../../../components/Component";

import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import {
  BlockHead,
  BlockDes,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
  Icon,
  Button,
  Block,
  Row,
  Col,
  PaginationComponent
} from "../../../components/Component";
import { useForm } from "react-hook-form";
import {
  Card,
  DropdownItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Badge,
  CloseButton,
  Spinner
} from "reactstrap";
import { PropertyContext } from "./PropertyContext";
import { productCardData } from "./PropertyData";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const token = localStorage.getItem("accessToken");
const tagData = [
  { value: "house", label: "House" },
  { value: "vila", label: "Vila" },
  { value: "home", label: "Home" },
  { value: "apartment", label: "Apartment" }
];
const PropertyCard = () => {
  const { contextData } = useContext(PropertyContext);
  const animatedComponents = makeAnimated();

  const [data, setData] = contextData;
  const [smOption, setSmOption] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    rent: 0,
    address: "",
    country: "",
    state: "",
    local: "",
    lang: 0,
    long: 0,
    video: "",
    tag: "",
    bedrooms: 0,
    toilet: 0,
    dinning: 0,
    bathroom: 0,
    pool: 0
  });
  const [view, setView] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(9);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);


  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      rent: 0,
      address: "",
      country: "",
      state: "",
      local: "",
      lang: "",
      long: "",
      video: "",
      tag: "",
      bedrooms: 0,
      toilet: 0,
      dinning: 0,
      bathroom: 0,
      pool: 0
    });
    reset({});
  };

  //scroll off when sidebar shows
  useEffect(() => {
    view ? document.body.classList.add("toggle-shown") : document.body.classList.remove("toggle-shown");
  }, [view]);

  // Changing state value when searching name
  useEffect(() => {
    if (filter !== "") {
      const filteredObject = productCardData.filter((item) => {
        return item.name.toLowerCase().includes(filter.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...productCardData]);
    }
  }, [filter, setData]);

  const toggle = () => {
    setView(!view);
  };

  const onFormSubmit = async (form) => {

    setLoading(true);

    const {
      name,
      title,
      rent,
      address,
      country,
      state,
      local,
      lang,
      long,
      video,
      tag,
      bedrooms,
      toilet,
      dinning,
      bathroom,
      pool
    } = form;
    const newSlider = files.map((file, index) => {
      return {
        id: index,
        img: file.url || ProductLGE
      };
    });
    let submittedData = {
      name,
      title,
      rent,
      address,
      country,
      state,
      local,
      lang,
      long,
      image: files.length > 0 ? files[0].url : ProductLGE,
      video,
      tag,
      bedrooms,
      toilet,
      dinning,
      bathroom,
      pool,
      available: true,
      images: newSlider
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(submittedData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${token}`
        }
      };
      const response = await (await fetch("https://homely-h0gx.onrender.com/v1/asset/", options)).json();
      setLoading(false);
      if (response.success === false) return toast.error(response.error);
      if (response.success === true) setData([submittedData, response.data]);
      setView(false);
      setFiles([]);
      toast.success("Property added successfully");
      resetForm();
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }

  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  // filter text
  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // handles ondrop function of dropzone
  const handleDropChange = async (acceptedFiles) => {
    try {
      setLoading(true);

      const uploadedImageUrls = await Promise.all(
        acceptedFiles.map(async (file) => {
          // Create a preview URL
          const preview = URL.createObjectURL(file);

          // Upload the file to Cloudinary
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "s94wgnqj");
          formData.append("api_key", "635147918881644");

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dckonxwzh/image/upload`,
            formData
          );

          // Return the preview URL and the Cloudinary URL
          return { preview, url: response.data.secure_url };
        })
      );
      setFiles(
        uploadedImageUrls.map((file) =>
          Object.assign(file, {
            preview: file.preview,
            url: file.url
          })
        )
      );
      setLoading(false);

    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error uploading images to Cloudinary:", error);
    }
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { reset, register, handleSubmit, formState: { errors } } = useForm();

  return (
    <React.Fragment>
      <Head title="Properties"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Properties</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          onChange={onFilterChange}
                          placeholder="Quick search by name"
                        />
                      </div>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Status
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>New properties</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Unavailable</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button className="toggle btn-icon d-md-none" color="primary" onClick={toggle}>
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button className="toggle d-none d-md-inline-flex" color="primary" onClick={toggle}>
                        <Icon name="plus"></Icon>
                        <span>Add Property</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            {currentItems.length > 0 ? (
              currentItems.map((item) => {
                return (
                  <Col sm={6} xl={4} key={item._id}>
                    <Card className="card-bordered product-card">
                      <div className="product-thumb">
                        <Link to={`${process.env.PUBLIC_URL}/property-details/${item._id}`}>
                          <img className="card-img-top" src={item.image} alt="" />
                        </Link>
                        <ul className="product-badges">
                          {item.new && (
                            <li>
                              <Badge color="success">New</Badge>
                            </li>
                          )}
                          {item.hot && (
                            <li>
                              <Badge color="danger">New</Badge>
                            </li>
                          )}
                        </ul>
                        <ul className="product-actions">
                          <li>
                            <a href="#cart" onClick={(ev) => ev.preventDefault()}>
                              <Icon name="cart"></Icon>
                            </a>
                          </li>
                          <li>
                            <a href="#like" onClick={(ev) => ev.preventDefault()}>
                              <Icon name="heart"></Icon>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-inner text-center">
                        <ul className="product-tags">
                          <li>
                            <Link to={`${process.env.PUBLIC_URL}/property-details/${item.id}`}>{item.name}</Link>
                          </li>
                        </ul>
                        <h5 className="product-title">
                          <Link to={`${process.env.PUBLIC_URL}/property-details/${item.id}`}>{item.title}</Link>
                        </h5>
                        <div className="product-price text-primary h5">
                          {item.rent?.toLocaleString() &&
                            <small className="text-muted del fs-13px">${item.rent?.toLocaleString()}</small>} $
                          {item.rent?.toLocaleString()}
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <div className="ms-2">No product found</div>
            )}
          </Row>
          {currentItems.length > 0 && (
            <div className="mt-3">
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          )}
        </Block>

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${view ? "content-active" : ""}`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Property</BlockTitle>
              <BlockDes>
                <p>Add new information for a property.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Property Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("name", { required: "This field is required" })}
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Property Title
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("title", { required: "This field is required" })}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="form-control" />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Address
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("address", { required: "This field is required" })}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="form-control" />
                      {errors.address && <span className="invalid">{errors.address.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Country
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("country", { required: "This field is required" })}
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="form-control" />
                      {errors.country && <span className="invalid">{errors.country.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      State
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("state", { required: "This field is required" })}
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="form-control" />
                      {errors.state && <span className="invalid">{errors.state.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Local/Town
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("local", { required: "This field is required" })}
                        value={formData.local}
                        onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                        className="form-control" />
                      {errors.local && <span className="invalid">{errors.local.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Latitude
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        {...register("lang", { required: "This field is required" })}
                        value={formData.lang}
                        onChange={(e) => setFormData({ ...formData, lang: e.target.value })}
                        className="form-control" />
                      {errors.lang && <span className="invalid">{errors.lang.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Longitude
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        {...register("long", { required: "This field is required" })}
                        value={formData.long}
                        onChange={(e) => setFormData({ ...formData, long: e.target.value })}
                        className="form-control" />
                      {errors.long && <span className="invalid">{errors.long.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Video URL
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        {...register("video", { required: "This field is required" })}
                        value={formData.video}
                        onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                        className="form-control" />
                      {errors.video && <span className="invalid">{errors.video.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Tag
                    </label>


                    <div className="form-control-wrap">
                      <RSelect
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultData={tagData[0]}
                        // value={formData.tag}
                        options={tagData}
                        onChange={(selectedOption) => {
                          // selectedOption will contain the selected option
                          const selectedValue = selectedOption.value; // Assuming your option has a 'value' property
                          setFormData({ ...formData, tag: selectedValue });
                        }}
                      />
                      {errors.tag && <span className="invalid">{errors.tag.message}</span>}
                    </div>
                  </div>
                </Col>


                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="stock">
                      Rent
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        {...register("rent", { required: "This field is required" })}
                        value={formData.rent}
                        onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                        className="form-control" />
                      {errors.rent && <span className="invalid">{errors.rent.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="SKU">
                      Bedrooms
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        {...register("bedrooms", { required: "This field is required" })}
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      />
                      {errors.bedrooms && <span className="invalid">{errors.bedrooms.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="SKU">
                      Toilet
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        {...register("toilet", { required: "This field is required" })}
                        value={formData.toilet}
                        onChange={(e) => setFormData({ ...formData, toilet: e.target.value })}
                      />
                      {errors.toilet && <span className="invalid">{errors.toilet.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="SKU">
                      Dinning
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        {...register("dinning", { required: "This field is required" })}
                        value={formData.dinning}
                        onChange={(e) => setFormData({ ...formData, dinning: e.target.value })}
                      />
                      {errors.dinning && <span className="invalid">{errors.dinning.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="SKU">
                      Bathrooms
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        {...register("bathroom", { required: "This field is required" })}
                        value={formData.bathroom}
                        onChange={(e) => setFormData({ ...formData, bathroom: e.target.value })}
                      />
                      {errors.bathroom && <span className="invalid">{errors.bathroom.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="SKU">
                      Pools
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        {...register("pool", { required: "This field is required" })}
                        value={formData.pool}
                        onChange={(e) => setFormData({ ...formData, pool: e.target.value })}
                      />
                      {errors.pool && <span className="invalid">{errors.pool.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone small bg-lighter my-2 dz-clickable">
                          <input {...getInputProps()} />
                          {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                            >
                              <div className="dz-image">
                                <img src={file.preview} alt="preview" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Col>
                <Col size="12">
                  <Button color="primary" disabled={loading}>
                          {loading ? <Spinner size="sm" color="light" /> :
                            <span>Add Property</span>
                          }
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>
        {view && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
      <ToastContainer />
    </React.Fragment>
  );
};
export default PropertyCard;
