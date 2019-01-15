import React from 'react';
import './Events.scss';
import EventItem from '../../EventItem/EventItem';
import smashRequests from '../../../Helpers/data/smashRequests';
import authRequests from '../../../Helpers/data/authRequests';
import EventForm from '../../EventForm/EventForm';
import eventRequests from '../../../Helpers/data/eventRequests';

class Events extends React.Component {
  state = {
    events: [],
    isEditing: false,
    editId: '-1',
  }

  componentDidMount() {
    const currentUid = authRequests.getCurrentUid();
    smashRequests.getEventsFromMeAndFriends(currentUid)
      .then((events) => {
        this.setState({ events });
      })
      .catch((error) => {
        console.error('error on getEventsFromMeAndFriends', error);
      });
  }

  formSubmitEvent = (newEvent) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      eventRequests.updateEvent(editId, newEvent)
        .then(() => {
          const currentUid = authRequests.getCurrentUid();
          smashRequests.getEventsFromMeAndFriends(currentUid)
            .then((events) => {
              this.setState({ events, isEditing: false, editId: '-1' });
            })
            .catch((error) => {
              console.error('error on getEventsFromMeAndFriends', error);
            });
        })
        .catch(error => console.error('error on updateEvent', error));
    } else {
      eventRequests.postRequest(newEvent)
        .then(() => {
          const currentUid = authRequests.getCurrentUid();
          smashRequests.getEventsFromMeAndFriends(currentUid)
            .then((events) => {
              this.setState({ events });
            })
            .catch((error) => {
              console.error('error on getEventsFromMeAndFriends', error);
            });
        })
        .catch(error => console.error('error on postRequest', error));
    }
  }

  passEventToEdit = eventId => this.setState({ isEditing: true, editId: eventId })

  deleteEvent = (eventId) => {
    eventRequests.deleteEvent(eventId)
      .then(() => {
        const currentUid = authRequests.getCurrentUid();
        smashRequests.getEventsFromMeAndFriends(currentUid)
          .then((events) => {
            this.setState({ events });
          })
          .catch((error) => {
            console.error('error on getEventsFromMeAndFriends', error);
          });
      })
      .catch(error => console.error('error on deleteEvent', error));
  }

  render() {
    const { events, isEditing, editId } = this.state;
    const eventItemComponents = events.map(event => (
      <EventItem
        event={event}
        key={event.id}
        deleteSingleEvent={this.deleteEvent}
        passEventToEdit={this.passEventToEdit}
      />
    ));
    return (
      <div className='events col d-flex justify-content-center'>
        <EventForm onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
        <div className='col-6 mt-5'>{eventItemComponents}</div>
      </div>
    );
  }
}

export default Events;
