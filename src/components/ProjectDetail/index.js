// src/components/ProjectDetail/index.js
import React from "react";
import { useParams } from "react-router-dom";
import { dataportfolio } from "../../content_option"; //
import FoodPredict from "../FoodPredict"; //
// Import other project-specific components if ProjectDetail handles them

// Props interface for clarity (TypeScript-like, conceptual here)
// interface ProjectDetailProps {
//  projectId?: string; // Make projectId optional if also using useParams
// }

export const ProjectDetail = (props) => {
    // Use projectId from props if available, otherwise fallback to useParams
    const params = useParams();
    const currentProjectId = props.projectId || params.projectId;

    const project = dataportfolio.find((p) => p.id === currentProjectId);

    if (!project && currentProjectId !== "foodPredict") {
        // Adjusted condition slightly
        // Or if only foodPredict is handled explicitly and others should show project.description
        // This condition might need refinement based on how generic IDs are handled
        return <div>Project not found!</div>;
    }

    // Specific component rendering based on ID
    if (currentProjectId === "foodPredict") {
        return <FoodPredict />; //
    }

    // Fallback for other projects if they have details in dataportfolio
    if (project) {
        return (
            <div>
                <h3>{project.description}</h3>
                {/* You can add more detailed generic rendering here if needed */}
                {project.details && <p>{project.details}</p>}
                {/* Example: if you add a 'details' string to your content_option.js items */}
            </div>
        );
    }

    return <div>Select a project to view details.</div>; // Default or error state
};
