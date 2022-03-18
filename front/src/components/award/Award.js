import React, { useState } from 'react';
import AwardCard from './AwardCard';
import AwardEditForm from './AwardEditForm';

function Award({ award, setAwards, isEditable }) {
	const [ isEditing, setIsEditing ] = useState(false);
	return (
		<>
			{isEditing ? (
				<AwardEditForm
					award={award}
					setAwards={setAwards}
					setIsEditing={setIsEditing}
				/>
			) : (
				<AwardCard
					award={award}
					setIsEditing={setIsEditing}
					isEditable={isEditable}
				/>
			)}
		</>
	);
}

export default Award;