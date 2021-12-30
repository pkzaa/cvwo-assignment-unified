// Wrapper for async tasks - supports loading indicators and replacing error messages

import React from "react";
import { Preloader, Row, Col } from "react-materialize";

export default function AsyncWrapper(props) {
  return !props.done
    ? <LoadingIndicator />
    : props.error
    ? <ErrorBox error={props.error} />
    : props.children;
}

function LoadingIndicator(props) {
  return (
    <Row>
      <Col s={12} className="center">
        <Preloader
          active
          color="blue"
          flashing
        />
      </Col>
    </Row>
  )
}
