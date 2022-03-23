import React, { useState } from "react";
import PLCard from "./PLCard";
import PLEditForm from "./PLEditForm";

function PL({ pl, setPLs, isPL }) {

  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <PLEditForm
          currentPL={pl}
          setPLs={setPLs}
          setIsEditing={setIsEditing}
        />
      ) : (
        <PLCard
          pl={pl}
          isPL={isPL}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default PL;
