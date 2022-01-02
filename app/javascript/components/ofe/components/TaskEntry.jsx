// Task entry

import React from "react";
import { Checkbox, CollectionItem, Row, Col, Icon, Chip } from "react-materialize";
import { Link } from "react-router-dom";

export default function TaskEntry(props) {
  return (
    <Link to={`/edit/${props.task.id}`} className="collection-item" title="Click to expand">
      <div className="secondary-content">
        <Icon>
          chevron_right
        </Icon>
      </div>
      <div className="secondary-content">Due: {
        new Date(props.task.due)
          .toLocaleDateString(undefined, {dateStyle: "short"})
        }
      </div>
      {/*
      <Checkbox className="left" filledIn checked={props.task.done}
        label="" value="checked" />
      */}
      <div>
        <span className="title">
          {props.task.done ? "☑" : "☐"} {props.task.name}
        </span>
        <div>{props.task.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
      </div>
    </Link>
  )
};
