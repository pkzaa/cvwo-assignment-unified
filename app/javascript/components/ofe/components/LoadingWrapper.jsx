// Wrapper with loading indicator

import React from "react";
import { Preloader, Row, Col } from "react-materialize";

export default function LoadingWrapper(props) {
  if (props.done) {
    return props.children;
  } else {
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
}
