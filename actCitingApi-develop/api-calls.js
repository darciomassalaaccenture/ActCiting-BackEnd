const fetchGetVenueDetails = (fetch) => {
  return fetch('http://localhost:8081/gigstr/venues/venue-details-for/1')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const fetchGetAllVenueDetails = (fetch) => {
    return fetch('http://localhost:8081/gigstr/venues/venue-details/getAllVenues')
      .then((res) => res.json())
      .then((data) => {
        return data;
    });
};

  const fetchGetPendingEvents = (fetch) => {
    return fetch('http://localhost:8081/gigstr/venues/pendingEvents/')
      .then((res) => res.json())
      .then((data) => {
        return data;
    });
};

const fetchGetPendingEventsByID = (fetch) => {
  return fetch('http://localhost:8081/gigstr/venues/pending-events/id/2')
    .then((res) => res.json())
    .then((data) => {
      return data;
  });
};

const fetchPostNewVenue = (fetch) => {
  return fetch('http://localhost:8081/gigstr/venues/newVenue')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

module.exports = {fetchGetVenueDetails, fetchGetAllVenueDetails, fetchGetPendingEvents, fetchPostNewVenue, fetchGetPendingEventsByID}