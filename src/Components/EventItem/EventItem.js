import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import './EventItem.scss';
import PropTypes from 'prop-types';
import eventShape from '../../Helpers/props/eventShape';
import authRequests from '../../Helpers/data/authRequests';


class EventItem extends React.Component {
  static propTypes = {
    event: eventShape,
    deleteSingleEvent: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleEvent, event } = this.props;
    deleteSingleEvent(event.id);
  }

  render() {
    const { event } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (event.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-dark" onClick={this.deleteEvent}><i className="far fa-trash-alt"/></button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };

    return (
      <div className="event-item text-center">
        <Card>
          <CardBody>
            <CardTitle>{event.event}</CardTitle>
            <CardSubtitle>{event.startDate}</CardSubtitle>
            <CardText>{event.location}</CardText>
            {makeButtons()}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default EventItem;
