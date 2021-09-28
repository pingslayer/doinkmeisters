import { Fragment } from "react";
import { useState } from "react";
import { Row, Col, Container, Form, Card, Button } from "react-bootstrap";
import classes from "./AddGames.module.css";

const AddGames = () => {
  return (
    <Fragment>
      <div className={classes["dm-add-data-wrapper"]}>
        <Container>
          <Card className={`${classes["dm-form-card"]}`}>
            <Row className="mt-5">
              <Col lg={2} md={2} sm={0}></Col>
              <Col lg={8} md={8} sm={12}>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Name
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Nick Name
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Logo URL
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Description
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Status
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Select
                        className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mt-3 mb-3">
                    <Col lg={{ span: 8 }}></Col>
                    <Col
                      lg={{ span: 4 }}
                      className="d-flex justify-content-end"
                    >
                      <button type="submit" className={classes["dm-login-btn"]}>
                        Log In
                      </button>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
              <Col lg={2} md={2} sm={0}></Col>
            </Row>
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

export default AddGames;
