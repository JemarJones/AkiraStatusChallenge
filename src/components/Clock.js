import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../styles/Clock.css';

import { TIME_FORMAT } from '../utils/config';

/**
 * The Clock component will render both an analog and digital clock given an offset.
 * The implementation of the analog clock is inpired by https://cssanimation.rocks/clocks.
 */
class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: this.getCurrentTime()
    };
    this.setNextMinuteTick(this.state.currentTime);
  }

  /**
   * @return {The current time as offset by the server}
   */
  getCurrentTime() {
    return moment().add(this.props.offset, 'milliseconds');
  }

  /**
   * Sets up the next tick of the minute hand, and if needed, the hour hand.
   * Second ticks are handled by an animation, but the next minute/hour ticket
   * depends on the current time.
   * @param {moment} currentTime The current time, to be used to calculate the next tick.
   */
  setNextMinuteTick(currentTime) {
    const secondsToNextTick = 60 - currentTime.seconds();
    setTimeout(() => {
      // Set the current time state, this will trigger a rerendering which should move the hands that should be moved in this tick.
      const currentTime = this.getCurrentTime();
      this.setState({
        currentTime
      });
      this.setNextMinuteTick(currentTime);
    }, secondsToNextTick * 1000);
  }

  render() {
    const { currentTime } = this.state;

    // Degrees per hour = 360 / 12, Degrees per total minutes = 360 / (12*60)
    const hoursAngle =
      currentTime.hours() * 30 + currentTime.minutes() * (1 / 2);
    // Degrees per minute or second = 360 / 60
    const minutesAngle = currentTime.minutes() * 6;
    const secondsAngle = currentTime.seconds() * 6;

    return (
      <div>
        <article className='clock'>
          <div key={`h${currentTime}`} className='hand-container'>
            <div
              className='hour-hand'
              style={{
                transform: `rotateZ(${hoursAngle}deg)`
              }}
            />
          </div>
          <div key={`m${currentTime}`} className='hand-container'>
            <div
              className='minute-hand'
              style={{
                transform: `rotateZ(${minutesAngle}deg)`
              }}
            />
          </div>
          <div
            key={`s${currentTime}`}
            className='hand-container seconds-container'
          >
            <div
              className='second-hand'
              style={{
                transform: `rotateZ(${secondsAngle}deg)`
              }}
            />
          </div>
        </article>
        {/* An analog clock is nice, but we should digitally show it as well for accesibility.*/}
        <div className='regular-text'>
          <time currenttime={currentTime.toISOString()}>
            {currentTime.format(TIME_FORMAT)}
          </time>
        </div>
      </div>
    );
  }
}

Clock.propTypes = {
  // The difference between the server system time and the local browser time.
  offset: PropTypes.number.isRequired
};

export default Clock;
