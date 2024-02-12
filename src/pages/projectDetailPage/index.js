import React from "react";
import ProjectDetail from "../../components/ProjectDetail";
import { useParams } from "react-router-dom";

const ProjectDetailPage = () => {
    const { projectId } = useParams(); // Retrieve projectId from URL params
    // You can fetch project details based on the projectId here, if needed

    return (
        <div>
            <h2>Let's take a look at the project:</h2>
            <ProjectDetail projectId={projectId} />
        </div>
    );
};

export default ProjectDetailPage;
