import React from "react";
import FoodPredict from "../FoodPredict";

const ProjectDetail = ({ projectId }) => {
    if (projectId === "foodPredict") {
        return <FoodPredict />;
    }

    return (
        <div>
            <h3>Project Details</h3>
            <p>Project ID: {projectId}</p>
        </div>
    );
};

export default ProjectDetail;
