import React, { useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import ImageContainer from "../../../components/partials/gallery/GalleryImage";
import { Card } from "reactstrap";
import {
  BlockBetween,
  BlockDes,
  Block,
  BlockHeadContent,
  BlockHead,
  BlockTitle,
  Col,
  Row,
  Icon,
  Button,
  UserAvatar
} from "../../../components/Component";
import { galleryData } from "./GalleryData";
import { findUpper } from "../../../utils/Utils";

const GalleryCard = () => {
  const [data] = useState(galleryData);
  return (
    <React.Fragment>
      <Head title="Gallery"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween className="g-3">
            <BlockHeadContent>
              <BlockTitle page>Properties</BlockTitle>
              <BlockDes className="text-soft">
                <p>
                  You have total <span className="text-base">1,257</span> Media.
                </p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button className="btn btn-primary d-none d-sm-inline-flex">
                <Icon name="plus-round-fill"></Icon>
                <span>Add New</span>
              </Button>
              <Button color="light" outline className="btn-icon bg-primary d-inline-flex d-sm-none">
                <Icon name="plus-round-fill"></Icon>
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            {data.map((item) => {
              return (
                <Col sm={6} key={item.id}>
                  <Card className="card-bordered gallery">
                    <ImageContainer img={item.img} />
                    <div className="gallery-body card-inner align-center justify-between flex-wrap g-2">
                      <div className="user-card">
                        <div class="slider-init"
                             data-slick='{"arrows": false, "dots": true, "slidesToShow": 3, "slidesToScroll": 1, "infinite":false, "responsive":[ {"breakpoint": 992,"settings":{"slidesToShow": 2}}, {"breakpoint": 768,"settings":{"slidesToShow": 1}} ]}'>
                          <div class="col">
                            <div class="card card-bordered">
                              <img src="/demo4/images/stock/a.jpg" className="card-img-top" alt=""/>
                          </div>
                          <div class="col">
                            <div class="card card-bordered">
                              <img src="/demo4/images/stock/b.jpg"
                                                                 className="card-img-top" alt=""/>
                          </div>
                          <div class="col">
                            <div class="card card-bordered">
                              <img src="/demo4/images/stock/c.jpg"
                                                                 className="card-img-top" alt=""/>
                          </div>
                          <div class="col">
                            <div class="card card-bordered">
                              <img src="/demo4/images/stock/d.jpg"
                                                                 className="card-img-top" alt=""/>
                          </div>
                        </div>
                        <UserAvatar
                          theme={item.theme}
                          text={findUpper(item.userName)}
                          image={item.userImg}
                        ></UserAvatar>
                        <div className="user-info">
                          <span className="lead-text">{item.userName}</span>
                          <span className="sub-text">{item.userEmail}</span>
                        </div>
                      </div>
                      <div>
                        <Button className="btn-p-0 btn-nofocus">
                          <Icon name="heart"></Icon>
                          <span>{item.heart}</span>
                        </Button>
                      </div>
                    </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
            );
            })}
            </Row>
            </Block>
            </Content>
            </React.Fragment>
            )
              ;
            };

              export default GalleryCard;
