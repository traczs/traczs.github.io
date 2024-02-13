import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Portfolio = () => {
    return (
        <HelmetProvider>
            <Container className="About-header">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title> Portfolio | {meta.title} </title>{" "}
                    <meta name="description" content={meta.description} />
                </Helmet>
                <Row className="mb-5 mt-3 pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>
                <Row>
                    <Col lg="8">
                        <Outlet />
                    </Col>
                </Row>
                <div className="mb-5 po_items_ho">
                    {dataportfolio.map((data, i) => {
                        return (
                            <div key={i} className="po_item">
                                <img src={data.img} alt="" />
                                <div className="content">
                                    <p>{data.description}</p>
                                    {data.link || data.id ? (
                                        <React.Fragment>
                                            {data.link &&
                                            data.link.startsWith("http") ? (
                                                <a href={data.link}>
                                                    view project
                                                </a>
                                            ) : (
                                                <Link
                                                    to={`/portfolio/${data.id}`}
                                                >
                                                    view project
                                                </Link>
                                            )}
                                        </React.Fragment>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </HelmetProvider>
    );
};
