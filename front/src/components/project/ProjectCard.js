import { Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ Project, isEditable, setIsEditing }) {
    return (
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    {Project.title}
                    <br />
                    <span className="text-muted">{Project.description}</span>
                    <br />
                    <span className="text-muted">{Project.from_date}</span>
                    <br />
                    <span className="text-muted">{Project.to_date}</span>
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

export default ProjectCard;
