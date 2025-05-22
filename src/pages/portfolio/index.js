import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option"; //
import { Outlet } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import FoodPredict from "../../components/FoodPredict"; //
import { ProjectDetail } from "../../components/ProjectDetail"; //

export const Portfolio = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [popupContent, setPopupContent] = useState(null);
    const [popupExternalLink, setPopupExternalLink] = useState(null);
    const [isLoadingModal, setIsLoadingModal] = useState(false);

    const handleOpenModal = async (item) => {
        setIsLoadingModal(true);
        setPopupTitle(item.modalContent?.title || item.description);
        setPopupExternalLink(item.externalLink || null);
        setShowPopup(true);

        if (!item.modalContent) {
            // Fallback if modalContent is not defined, could show external link if available
            if (item.externalLink) {
                setPopupContent(
                    <div>
                        <p>More details can be found at the external link.</p>
                    </div>
                );
            } else {
                setPopupContent(
                    <div>No further details available for this item.</div>
                );
            }
            setIsLoadingModal(false);
            return;
        }

        const { type, src, componentName } = item.modalContent;

        switch (type) {
            case "markdown":
                try {
                    const response = await fetch(`/markdown/${src}`); // checks in in public/markdown
                    if (!response.ok)
                        throw new Error(
                            `Failed to fetch ${src}: ${response.statusText}`
                        );
                    const text = await response.text();
                    setPopupContent(<ReactMarkdown>{text}</ReactMarkdown>);
                } catch (error) {
                    console.error("Error fetching markdown:", error);
                    setPopupContent(
                        <div>
                            Error loading writeup. Please try again later.
                        </div>
                    );
                }
                break;
            case "pdf":
                const pdfUrl = `/pdfs/${src}`; // checks in public/pdfs
                setPopupContent(
                    <iframe
                        src={pdfUrl}
                        style={{
                            width: "100%",
                            height: "75vh",
                            border: "none",
                        }}
                        title={popupTitle}
                    >
                        <p>
                            Your browser does not support PDFs. Please{" "}
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                download the PDF
                            </a>{" "}
                            to view it.
                        </p>
                    </iframe>
                );
                break;
            case "component":
                let componentToRender = null;
                if (componentName === "FoodPredict") {
                    componentToRender = <FoodPredict />;
                } else if (componentName === "ProjectDetail" && item.id) {
                    componentToRender = <ProjectDetail projectId={item.id} />;
                } else {
                    console.warn(`Unknown componentName: ${componentName}`);
                    componentToRender = (
                        <div>The requested component could not be loaded.</div>
                    );
                }
                setPopupContent(componentToRender);
                break;
            case "externalLinkOnly":
                setPopupContent(
                    <div>
                        <p>
                            This project's details are primarily available on
                            GitHub.
                        </p>
                    </div>
                );
                break;
            default:
                console.warn(`Unknown modal content type: ${type}`);
                setPopupContent(
                    <div>
                        Content type not supported or details are unavailable.
                    </div>
                );
        }
        setIsLoadingModal(false);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupTitle("");
        setPopupContent(null);
        setPopupExternalLink(null);
        setIsLoadingModal(false);
    };

    return (
        <HelmetProvider>
            <Container className="About-header">
                {/* Helmet stuff */}
                <Row className="mb-5 mt-3 pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mb-4"> Portfolio </h1>
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>
                <Outlet /> {/* Keep if other portfolio child routes exist */}
                <div className="mb-5 po_items_ho">
                    {dataportfolio.map((data, i) => {
                        // Determine if there's enough content to warrant a "View Details" button
                        const hasModalAction =
                            data.modalContent || data.externalLink;

                        return (
                            <div key={i} className="po_item">
                                <img src={data.img} alt={data.description} />
                                <div className="content">
                                    <p>{data.description}</p>
                                    {/* Unified "View Details" button if modal content or link exists */}
                                    {hasModalAction ? (
                                        <button
                                            onClick={() =>
                                                handleOpenModal(data)
                                            }
                                            className="view-details-btn" // New class for this unified button
                                        >
                                            View Details
                                        </button>
                                    ) : (
                                        <p
                                            style={{
                                                fontSize: "0.8rem",
                                                opacity: 0.7,
                                            }}
                                        >
                                            (No further details)
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {showPopup && (
                    <div className="popup-overlay" onClick={handleClosePopup}>
                        <div
                            className="popup-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="popup-header">
                                <h3 className="popup-title">{popupTitle}</h3>
                                <button
                                    className="popup-close-btn"
                                    onClick={handleClosePopup}
                                >
                                    X
                                </button>
                            </div>
                            <div className="popup-content-area">
                                {isLoadingModal ? (
                                    <p>Loading...</p>
                                ) : (
                                    popupContent
                                )}
                            </div>
                            {popupExternalLink && (
                                <div className="popup-footer">
                                    <a
                                        href={popupExternalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link-btn"
                                    >
                                        View on GitHub / External Site
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Container>
        </HelmetProvider>
    );
};
