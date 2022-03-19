import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
// import * as Api from "../../api";

function Project({ Project, setProjects, isEditable }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {isEditing ? (
                <ProjectEditForm
                    currentProject={Project}
                    setProjects={setProjects}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <ProjectCard
                    Project={Project}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    );
}

export default Project;
