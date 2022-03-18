import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";


function ProjectEditForm() {

    return (
        <>
            <h4>프로젝트</h4>
            <Form>
                <Form.Group className="mb-3" controlId="projectTitle">
                    <Form.Label>프로젝트 제목</Form.Label>
                    <Form.Control type="text" placeholder="프로젝트 제목" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectDescription">
                    <Form.Label>상세내역</Form.Label>
                    <Form.Control type="text" placeholder="상새내역" />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col><DatePicker /></Col>
                        <Col><DatePicker /></Col>
                    </Row>
                </Form.Group>
                <Form.Group as={Row} className="mt-3 text-center mb-4">
                    <Col sm={{ span: 20 }}>
                        <Button variant="primary" type="submit" className="me-3">
                            확인
                        </Button>
                        <Button variant="secondary">
                            취소
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>

    );
}

export default ProjectEditForm