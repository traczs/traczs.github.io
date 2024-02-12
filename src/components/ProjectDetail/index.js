import React from "react";
import FoodPredict from "../FoodPredict";

const ProjectDetail = ({ projectId }) => {
    // Conditionally render FoodPredict component if projectId is "foodPredict"
    if (projectId === "foodPredict") {
        return <FoodPredict />;
    }

    // Otherwise, render regular project details
    return (
        <div>
            <h3>Project Details</h3>
            <p>Project ID: {projectId}</p>
            {/* Render other project details here */}
        </div>
    );
};

export default ProjectDetail;
