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
import authRequests from '../../Helpers/data/authRequests';
import eventRequests from '../../Helpers/data/eventRequests';

const defaultEvent = {
  uid: '',
  event: '',
  startDate: 0,
  location: '',
};

class EventForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
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

  formFieldNumberState = (name, e) => {
    e.preventDefault();
    const tempEvent = { ...this.state.newEvent };
    tempEvent[name] = e.target.value;
    this.setState({ newEvent: tempEvent });
  }

  nameChange = e => this.formFieldStringState('event', e)

  locationChange = e => this.formFieldStringState('location', e)

  dateChange = e => this.formFieldNumberState('startDate', e)

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myEvent = { ...this.state.newEvent };
    myEvent.uid = authRequests.getCurrentUid();
    onSubmit(myEvent);
    this.setState({ newEvent: defaultEvent });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      eventRequests.getSingleEvent(editId)
        .then((event) => {
          this.setState({ newEvent: event.data });
        })
        .catch(error => console.error('error on getSingleEvent', error));
    }
  }

  render() {
    const { newEvent } = this.state;
    return (
      <Form onSubmit={this.formSubmit}>
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
          <Input
            type="date"
            name="date"
            id="exampleDate"
            placeholder="type event date"
            value={newEvent.startDate}
            onChange={this.dateChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleLocation">Event Location:</Label>
          <Input
            type="location"
            name="location"
            id="exampleLocation"
            placeholder="type event location"
            value={newEvent.location}
            onChange={this.locationChange}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default EventForm;
