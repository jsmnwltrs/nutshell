import React from 'react';
import './Home.scss';

class Home extends React.Component {
  changeView = (e) => {
    const view = e.target.closest('.card').id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
      <div className="Home mx-auto">
        <div className="card-deck mt-3">
          <div className="card border-dark" id="messages" onClick={this.changeView}>
              <div className="card-body text-center">
                <h4 className="card-title"><i className="fas fa-comments fa-5x"></i></h4>
                <h6 className="card-subtitle mb-2 text-muted">Messages</h6>
                <p className="card-text">Newer better AOL</p>
              </div>
            </div>
          <div className="card border-dark" id="friends" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-user-friends fa-5x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Friends</h6>
              <p className="card-text">Lame Friends</p>
            </div>
          </div>
          <div className="card border-dark" id="weather" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-sun fa-5x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Weather</h6>
              <p className="card-text">Current Weather</p>
            </div>
          </div>
        </div>
        <div className="card-deck mt-3">
          <div className="card border-dark" id="events" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="far fa-calendar-alt fa-5x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Events</h6>
              <p className="card-text">Upcoming Events</p>
            </div>
          </div>
          <div className="card border-dark bg-warning" id="home" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-smile-beam fa-5x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Nutshell</h6>
              <p className="card-text">Welcome to Nutshell!</p>
            </div>
          </div>
          <div className="card border-dark" id="articles" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="far fa-newspaper fa-5x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">Articles</h6>
              <p className="card-text">News Articles</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
