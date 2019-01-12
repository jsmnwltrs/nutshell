import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import './EventItem.scss';
import eventShape from '../../Helpers/props/eventShape';

class EventItem extends React.Component {
  static propType = {
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
