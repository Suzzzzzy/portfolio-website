import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function AwardEditForm({ award, setIsEditing, setAwards }) {

  const [title, setTitle] = useState(award.title);
  const [description, setDescription] = useState(award.description);
	const [authority, setAuthority] = useState(award.authority);
	const [whenDate, setWhenDate] = useState(new Date(award.when_date));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await Api.put(`awards/${award.id}`, {
      title,
      description,
			authority,
			when_date,
    });
    
    const updatedAward = res.data;
    
    setAwards(updatedAward);

    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="awardEditTitle" className="mb-3">
            <Form.Control
              type="text"
              placeholder="수상내역"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="awardEditDescription">
            <Form.Control
              type="text"
              placeholder="상세내역"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

					<Form.Group controlId="awardEditAuthority">
            <Form.Control
              type="text"
              placeholder="발급기관"
              value={authority}
              onChange={(e) => setAuthority(e.target.value)}
            />
          </Form.Group>

					<Form.Group as={Row} className="mt-3">
						<Col xs="auto">
							<DatePicker
								selected={when_date}
								onChange={(date) => setWhenDate(date)}
							/>
						</Col>
      		</Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AwardEditForm;