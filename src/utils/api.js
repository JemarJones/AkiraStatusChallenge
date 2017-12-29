import { STATUS_URL } from './config';
import moment from 'moment';

/**
 * @return {An object containing akira status information.}
 */
const getStatus = () => {
  return fetch(STATUS_URL).then(response => {
    if (!response.ok) {
      throw response;
    }

    return response.json().then(data => {
      // Create moment objects for all the dates.
      return {
        ...data,
        open_hours_today: {
          ...data.open_hours_today,
          open_at: moment(data.open_hours_today.open_at),
          close_at: moment(data.open_hours_today.close_at)
        },
        system_time: moment(data.system_time)
      };
    });
  });
};

export { getStatus };
