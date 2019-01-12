import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import './EventItem.scss';
import eventShape from '../../Helpers/props/eventShape';

class EventItem extends React.Component {
  static propTypes = {
    event: eventShape,
  }

  render() {
    const { event } = this.props;
    return (
      <div className="event-item text-center">
        <Card>
          <CardBody>
            <CardTitle>{event.event}</CardTitle>
            <CardSubtitle>{event.startDate}</CardSubtitle>
            <CardText>{event.location}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default EventItem;
