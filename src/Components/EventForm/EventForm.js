import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import './EventForm.scss';
import PropTypes from 'prop-types';

const defaultEvent = {
  uid: '',
  event: '',
  startDate: 0,
  location: '',
};

class EventForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    newEvent: defaultEvent,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempEvent = { ...this.state.newEvent };
    tempEvent[name] = e.target.value;
    this.setState({ newEvent: tempEvent });
  }

  nameChange = e => this.formFieldStringState('event', e)

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myEvent = { ...this.state.newEvent };
    onSubmit(myEvent);
    this.setState({ newEvent: defaultEvent });
  }

  render() {
    const { newEvent } = this.state;
    return (
      <Form>
        <FormGroup>
          <Label for="exampleName">Event Name:</Label>
          <Input
            type="name"
            name="name"
            id="exampleName"
            placeholder="type event name"
            value={newEvent.event}
            onChange={this.nameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleDate">Event Date:</Label>
          <Input type="date" name="date" id="exampleDate" placeholder="type event date" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleLocation">Event Location:</Label>
          <Input type="location" name="location" id="exampleLocation" placeholder="type event location" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default EventForm;
