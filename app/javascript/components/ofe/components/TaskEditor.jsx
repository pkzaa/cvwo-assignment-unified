// Task edit form

import React from "react";
import { DatePicker, TextInput, Checkbox, Button, Icon } from "react-materialize";
import { fallback } from "../deps/lib";

export default class TaskEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.form = fallback(props.cur, {
      name: "",
      desc: "",
      tags: [],
      done: false,
      due: new Date(), // now
    });
    
    this.state.form.tags = this.state.form.tags.join();
    this.state.form.due = new Date(this.state.form.due);
  }
  
  handleChange(which, event) {
    this.handleChangeRaw(which, event.target.value);
  }
  handleChangeRaw(which, value) {
    this.setState({ form: Object.assign({...this.state.form}, { [which]: value }) });
  }
  handleDoneChecked(event) {
    this.handleChangeRaw("done", event.target.checked);
  }
  handleSubmit(event) {
    event.preventDefault();
    
    const newTask = {...this.state.form};
    newTask.tags = newTask.tags.split(',');
    this.props.onSubmit(newTask);
  }

  render(props) {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <TextInput label="Name" onChange={(e) => this.handleChange("name", e)} value={this.state.form.name} />
        <TextInput label="Tags" onChange={(e) => this.handleChange("tags", e)} value={this.state.form.tags} />
        <Checkbox label="Done" onChange={(e) => this.handleDoneChecked(e)} checked={this.state.form.done}
          value="Done" filledIn />
        <DatePicker label="Due date" onChange={(e) => this.handleChangeRaw("due", e)}
          value={this.state.form.due.toLocaleDateString("en-SG", { dateStyle: "medium" })}
          options={{ defaultDate: this.state.form.due }} />
        <TextInput label="Description" onChange={(e) => this.handleChange("desc", e)} value={this.state.form.desc} />
        <Button
          node="button"
          type="submit"
          waves="light"
        >
          Save
          <Icon right>
            save
          </Icon>
        </Button>
      </form>
    )
  }
}
