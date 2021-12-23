// Task entry

import React from "react";
import { Checkbox, CollectionItem, Row, Col, Icon } from "react-materialize";
import { Link } from "react-router-dom";

export default function TaskEntry(props) {
  return (
    <Link to={`/edit/${props.id}`} className="collection-item" title="Click to expand">
    {props.children}
        <div className="secondary-content">
          <Icon>
            chevron_right
          </Icon>
        </div>
    </Link>
  )
};
