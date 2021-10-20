import { Fragment, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
//ui
import CardGrey from "../../../../../../ui/card-grey/CardGrey";
//css
import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
  const showContentHandler = () => {
    props.onShowContent(props.data);
  };

  const editContentHandler = () => {
    props.onEditContent(props.data);
  };

  const deleteContentHandler = () => {
    props.onDeleteContent(props.data.id);
  };

  return (
    <Fragment>
      <li>
        <CardGrey>
          <Row>
            <Col lg={3} md={3} sm={12}>
              <img
                src={props.data.photo_url}
                className="img-thumbnail"
                alt="No Image Found"
              />
            </Col>
            <Col lg={7} md={7} sm={12}>
              <div className={classes["dm-item-info"]}>
                <h4>{props.data.name}</h4>
                <figure>
                  <blockquote>
                    <p>{props.data.summary}</p>
                  </blockquote>
                </figure>
              </div>
            </Col>
            <Col lg={2} md={2} sm={12}>
              <Button
                className={`btn btn-dark d-block my-2 ${classes["dm-btn-options"]}`}
                onClick={showContentHandler}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
              <Button
                className={`btn btn-dark d-block my-2 ${classes["dm-btn-options"]}`}
                onClick={editContentHandler}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                className={`btn btn-dark d-block my-2 ${classes["dm-btn-options"]}`}
                onClick={deleteContentHandler}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Col>
          </Row>
        </CardGrey>
        <br />
      </li>
    </Fragment>
  );
};

export default ResultItem;
