import React, { useState } from 'react';
import AwardEditForm from './AwardEditForm';
import AwardCard from './AwardCard';

function Award({ award, isEditable, setAwards }) {
	// useState 통해 isEditing 상태 생성
	const [ isEditing, setIsEditing ] = useState(false);

	return (
		<>
			{isEditing ? (
				<AwardEditForm award={award} setIsEditing={setIsEditing} setAwards={setAwards} />
			) : (
				<AwardCard award={award} isEditable={isEditable} setIsEditing={setIsEditing} />
			)}
		</>
	);
}

export default Award;