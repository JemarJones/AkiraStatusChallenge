import React, { Component } from 'react';

import { getStatus } from '../utils/api';
import { TIME_FORMAT } from '../utils/config';
import '../styles/Status.css';

import Clock from './Clock';

/**
 * Used to show current Akira status information.
 */
class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Whether we have the data we need to render the status information.
      loaded: false
    };
  }

  componentDidMount() {
    // Get the current status info
    getStatus()
      .then(data => {
        this.setState({
          loaded: true,
          open: data.is_open_for_business,
          openTime: data.open_hours_today.open_at,
          closingTime: data.open_hours_today.close_at,
          serverOffset: data.system_time.diff(new Date())
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { loaded, open, openTime, closingTime, serverOffset } = this.state;
    if (!loaded) {
      return <div className='regular-text'>Loading...</div>;
    }

    return (
      <div className='content'>
        <div className='regular-text'>
          Today's Hours:<br />
          {openTime.format(TIME_FORMAT)} - {closingTime.format(TIME_FORMAT)}
        </div>
        <div className='clock-container'>
          <Clock offset={serverOffset} />
        </div>
        <div className='regular-text'>
          {open ? 'We\'re open!' : 'Sorry, we\'re closed.'}
        </div>
      </div>
    );
  }
}

export default Status;
