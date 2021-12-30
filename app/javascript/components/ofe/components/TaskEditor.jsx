// Task edit form

import React from "react";
import { DatePicker, TextInput, Textarea, Checkbox, Button, Icon } from "react-materialize";
import { fallback } from "../deps/lib";

export default class TaskEditor extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.handleDoneChecked = this.handleDoneChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    const defaults = props.cur !== undefined
      ? {...props.cur}
      : {
        name: "",
        desc: "",
        tags: [],
        done: false,
        due: new Date().addDays(1), // tomorrow
      };
    
    console.log([props.cur, defaults]);
    defaults.tags = defaults.tags.join();
    defaults.due = new Date(defaults.due);
    
    this.state = { form: defaults };
  }
  
  handleChange(event) {
    this.handleChangeRaw(event.target.name, event.target.value);
  }
  handleChangeRaw(which, value) {
    this.setState((state, props) => (
      { form: Object.assign({...state.form}, { [which]: value }) }
    ));
  }
  handleDoneChecked(event) {
    this.handleChangeRaw("done", event.target.checked);
  }
  handleSubmit(event) {
    event.preventDefault();
    
    const newTask = {...this.state.form};
    newTask.tags = newTask.tags.split(',');
    newTask.due = newTask.due.toDateString();
    this.props.onSubmit(newTask);
  }

  render(props) {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput label="Name" name="name" onChange={this.handleChange} value={this.state.form.name} />
        <TextInput label="Tags" name="tags" onChange={this.handleChange} value={this.state.form.tags} />
        <Checkbox label="Done" onChange={this.handleDoneChecked} checked={this.state.form.done}
          value="Done" filledIn />
        <DatePicker label="Due date" onChange={(e) => this.handleChangeRaw("due", e)}
          value={this.state.form.due.toLocaleDateString("en-SG", { dateStyle: "medium" })}
          options={{ defaultDate: this.state.form.due }} />
        <Textarea label="Description" name="desc" onChange={this.handleChange} value={this.state.form.desc} />
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
