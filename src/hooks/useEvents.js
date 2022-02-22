import {useState, useEffect} from 'react';

import {EventService} from '@services/apiClient';

const useEvents = eventsDate => {
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    getEvents();
  }, [shouldRefetch]);

  const getEvents = async () => {
    try {
      setEventsLoading(true);
      let res;
      if (!eventsDate) {
        res = await EventService.find();
        setEvents(res.data);
      } else {
        // if param passed return just events on that date
        res = await EventService.find({
          query: {
            start: {
              $gte: new Date(eventsDate),
            },
          },
        });
      }
      setEvents(res.data);
      setEventsLoading(false);
    } catch (error) {
      console.log('[Error fetch events]', error);
      setEventsError(error);
      setEventsLoading(false);
    }
  };

  return {events, eventsError, eventsLoading, refetch};
};

export default useEvents;
