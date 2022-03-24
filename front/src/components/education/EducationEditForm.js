import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function EducationEditForm({
    currentEducation,
    setEducations,
    setIsEditing,
}) {

    const [title, setTitle] = useState(currentEducation.title);

    const [description, setDescription] = useState(
        currentEducation.description
    );

    const [whenDate, setWhenDate] = useState(
        new Date(currentEducation.when_date)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();


        const user_id = currentEducation.user_id;
        const when_date = whenDate.toISOString().split("T")[0];


        await Api.put(`educations/${currentEducation.id}`, {
            user_id,
            title,
            description,
            when_date,
        });


        const res = await Api.get("educationlist", user_id);

        setEducations(res.data);

        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="educationEditTitle">
                <Form.Control
                    type="text"
                    placeholder="학력 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="educationEditDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group as={Row} className="mt-3">
                <Col xs="auto">
                    <DatePicker
                        selected={whenDate}
                        onChange={(date) => setWhenDate(date)}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center mb-4">
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
    );
}

export default EducationEditForm;
