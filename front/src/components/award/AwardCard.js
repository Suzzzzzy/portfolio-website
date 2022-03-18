import { Card, Row, Button, Col } from 'react-bootstrap';

function AwardCard({ award, setIsEditing, isEditable }) {
  const { title, description, authority, when_date } = award;

  return (
		<Card.Text>
			<Row className="align-items-center">
				<Col>
					{title}
					<br />
					<span className="text-muted">{description}</span>
					<br />
					<span className="text-muted">{authority}</span>
					<br />
					<span className="text-muted">{when_date}</span>
				</Col>
				{isEditable && (
				<Col xs lg="1">
					<Button
						variant="outline-info"
						size="sm"
						onClick={() => setIsEditing((prev) => !prev)}
						className="mr-3"
					>
						편집
					</Button>
				</Col>
				)}
			</Row>
		</Card.Text>
  );
}

export default AwardCard;