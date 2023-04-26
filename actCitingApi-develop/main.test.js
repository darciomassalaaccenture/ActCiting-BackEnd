const {
  fetchGetVenueDetails,
  fetchGetAllVenueDetails,
  fetchGetPendingEvents,
  fetchPostNewVenue,
  fetchGetPendingEventsByID,
} = require("./api-calls.js");

describe("API Call Tests", () => {
  it("should return all venues.", () => {
    const mockFetch = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              venue_id: 1,
              venue_email: "bwaywell3@prweb.com",
              venue_name: "The Little Scarlet Door",
              venue_postcode: "W1D 4DL",
              venue_address_line1: "12-13 Greek St",
              venue_address_line2: "Floor 2",
              venue_city: "London",
              venue_capacity: 130,
              venue_price: 780,
              venue_availability_start: "2022-08-29",
              venue_picture_url:
                "https://asset.venuescanner.com/photos/MVorR/med_f1553ca7d789f59c852bad85037b5ef9.jpg",
            },
            {
              venue_id: 2,
              venue_email: "agalier1@timesonline.co.uk",
              venue_name: "Walkers of Whitehall",
              venue_postcode: "SW1A 2DD",
              venue_address_line1: "15 Craigs Ct",
              venue_address_line2: "Basement 1",
              venue_city: "London",
              venue_capacity: 120,
              venue_price: 560,
              venue_availability_start: "2022-09-23",
              venue_picture_url:
                "https://asset.venuescanner.com/photos/oZBqp/med_0286df4f9908925dca79b007d252adc8.jpg",
            },
          ]),
      })
    );
    expect.assertions(23);
    return fetchGetAllVenueDetails(mockFetch).then((data) => {
      expect(mockFetch).toBeCalledWith(
        "http://localhost:8081/gigstr/venues/venue-details/getAllVenues"
      );
      expect(data[0].venue_id).toBeTruthy();
      expect(data[0].venue_email).toBeTruthy();
      expect(data[0].venue_name).toBeTruthy();
      expect(data[0].venue_postcode).toBeTruthy();
      expect(data[0].venue_address_line1).toBeTruthy();
      expect(data[0].venue_address_line2).toBeTruthy();
      expect(data[0].venue_city).toBeTruthy();
      expect(data[0].venue_capacity).toBeTruthy();
      expect(data[0].venue_price).toBeTruthy();
      expect(data[0].venue_availability_start).toBeTruthy();
      expect(data[0].venue_picture_url).toBeTruthy();
      expect(data[1].venue_id).toBeTruthy();
      expect(data[1].venue_email).toBeTruthy();
      expect(data[1].venue_name).toBeTruthy();
      expect(data[1].venue_postcode).toBeTruthy();
      expect(data[1].venue_address_line1).toBeTruthy();
      expect(data[1].venue_address_line2).toBeTruthy();
      expect(data[1].venue_city).toBeTruthy();
      expect(data[1].venue_capacity).toBeTruthy();
      expect(data[1].venue_price).toBeTruthy();
      expect(data[1].venue_availability_start).toBeTruthy();
      expect(data[1].venue_picture_url).toBeTruthy();
    });
  });

  it("should return one venue by ID.", () => {
    const mockFetch = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              venue_id: 1,
              venue_email: "bwaywell3@prweb.com",
              venue_name: "The Little Scarlet Door",
              venue_postcode: "W1D 4DL",
              venue_address_line1: "12-13 Greek St",
              venue_address_line2: "Floor 2",
              venue_city: "London",
              venue_capacity: 130,
              venue_price: 780,
              venue_availability_start: "2022-08-29",
              venue_picture_url:
                "https://asset.venuescanner.com/photos/MVorR/med_f1553ca7d789f59c852bad85037b5ef9.jpg",
            },
          ]),
      })
    );
    expect.assertions(12);
    return fetchGetVenueDetails(mockFetch).then((data) => {
      expect(mockFetch).toBeCalledWith(
        "http://localhost:8081/gigstr/venues/venue-details-for/1"
      );
      expect(data[0].venue_id).toBeTruthy();
      expect(data[0].venue_email).toBeTruthy();
      expect(data[0].venue_name).toBeTruthy();
      expect(data[0].venue_postcode).toBeTruthy();
      expect(data[0].venue_address_line1).toBeTruthy();
      expect(data[0].venue_address_line2).toBeTruthy();
      expect(data[0].venue_city).toBeTruthy();
      expect(data[0].venue_capacity).toBeTruthy();
      expect(data[0].venue_price).toBeTruthy();
      expect(data[0].venue_availability_start).toBeTruthy();
      expect(data[0].venue_picture_url).toBeTruthy();
    });
  });
  
  it("should return one pending event by venue ID.", () => {
    const mockFetch = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              event_id: 1,
              artist_id: 1,
              venue_id: 2,
              event_name: "Maddox Manning Live",
              start_date: "2022-10-12T23:00:00.000Z",
              start_time: "18:30:00",
              end_date: "2022-10-12T23:00:00.000Z",
              end_time: "11:00:00",
              event_description: "Maddox Manning Live!",
              event_genre: "Rock",
              event_image_url:
                "https://pixabay.com/get/g0e6f577516c260a1a77c38921b9d05b5ae217ce8e0ddbc7fcb70f6bf1255cc2758c0fb70765637f8a071e2bc36939f9a_640.jpg",
              booking_status: "pending",
              venue_email: "agalier1@timesonline.co.uk",
              venue_name: "Walkers of Whitehall",
              venue_postcode: "SW1A 2DD",
              venue_address_line1: "15 Craigs Ct",
              venue_address_line2: "Room 6",
              venue_city: "London",
              venue_capacity: 100,
              venue_price: 830,
              venue_availability_start: "2022-09-22T23:00:00.000Z",
              venue_picture_url:
                "https://asset.venuescanner.com/photos/oZBqp/med_0286df4f9908925dca79b007d252adc8.jpg",
              artist_name: "Maddox Manning",
              artist_email: "Maddox.Manning43@hotmail.com",
            },
          ]),
      })
    );
    expect.assertions(21);
    return fetchGetPendingEventsByID(mockFetch).then((data) => {
      expect(mockFetch).toBeCalledWith(
        "http://localhost:8081/gigstr/venues/pending-events/id/2"
      );
      expect(data[0].event_id).toBeTruthy();
      expect(data[0].artist_id).toBeTruthy();
      expect(data[0].venue_id).toBeTruthy();
      expect(data[0].event_name).toBeTruthy();
      expect(data[0].start_date).toBeTruthy();
      expect(data[0].start_time).toBeTruthy();
      expect(data[0].end_time).toBeTruthy();
      expect(data[0].event_genre).toBeTruthy();
      expect(data[0].venue_email).toBeTruthy();
      expect(data[0].venue_name).toBeTruthy();
      expect(data[0].venue_postcode).toBeTruthy();
      expect(data[0].venue_address_line1).toBeTruthy();
      expect(data[0].venue_address_line2).toBeTruthy();
      expect(data[0].venue_city).toBeTruthy();
      expect(data[0].venue_capacity).toBeTruthy();
      expect(data[0].venue_price).toBeTruthy();
      expect(data[0].venue_availability_start).toBeTruthy();
      expect(data[0].venue_picture_url).toBeTruthy();
      expect(data[0].artist_name).toBeTruthy();
      expect(data[0].artist_email).toBeTruthy();
    });
  });

  it("should return all pending events.", () => {
    const mockFetch = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              event_id: 1,
              artist_id: 3,
              venue_id: 2,
              event_name: "Maddox Manning Live",
              start_date: "2022-10-13",
              start_time: "18:30:00",
              end_date: "2022-10-13",
              end_time: "11:00:00",
              event_description: "Maddox Manning Live!",
              event_genre: "Rock",
              event_image_url:
                "https://pixabay.com/get/g0e6f577516c260a1a77c38921b9d05b5ae217ce8e0ddbc7fcb70f6bf1255cc2758c0fb70765637f8a071e2bc36939f9a_640.jpg",
              booking_status: "pending",
            },
            {
              event_id: 2,
              artist_id: 3,
              venue_id: 4,
              event_name: "Chris Rot",
              start_date: "2022-11-02",
              start_time: "20:00:00",
              end_date: "2022-11-02",
              end_time: "12:00:00",
              event_description: "Chris Rot Ready to Excite!",
              event_genre: "Electronic",
              event_image_url:
                "https://pixabay.com/get/g024494231b3b1d9872d6fe207aa8fe95f3da4fb561aa808f62790bbfd42082fb199bf66e30c591a4338f142d8211c092_640.jpg",
              booking_status: "pending",
            },
          ]),
      })
    );
    expect.assertions(25);
    return fetchGetPendingEvents(mockFetch).then((data) => {
      expect(mockFetch).toBeCalledWith(
        "http://localhost:8081/gigstr/venues/pendingEvents/"
      );
      expect(data[0].event_id).toBeTruthy();
      expect(data[0].artist_id).toBeTruthy();
      expect(data[0].venue_id).toBeTruthy();
      expect(data[0].event_name).toBeTruthy();
      expect(data[0].start_date).toBeTruthy();
      expect(data[0].start_time).toBeTruthy();
      expect(data[0].end_date).toBeTruthy();
      expect(data[0].end_time).toBeTruthy();
      expect(data[0].event_description).toBeTruthy();
      expect(data[0].event_genre).toBeTruthy();
      expect(data[0].event_image_url).toBeTruthy();
      expect(data[0].booking_status).toBe("pending");
      expect(data[1].event_id).toBeTruthy();
      expect(data[1].artist_id).toBeTruthy();
      expect(data[1].venue_id).toBeTruthy();
      expect(data[1].event_name).toBeTruthy();
      expect(data[1].start_date).toBeTruthy();
      expect(data[1].start_time).toBeTruthy();
      expect(data[1].end_date).toBeTruthy();
      expect(data[1].end_time).toBeTruthy();
      expect(data[1].event_description).toBeTruthy();
      expect(data[1].event_genre).toBeTruthy();
      expect(data[1].event_image_url).toBeTruthy();
      expect(data[1].booking_status).toBe("pending");
    });
  });

  it("should post a new venue.", () => {
    const mockFetch = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              venue_id: 1,
              venue_email: "bwaywell3@prweb.com",
              venue_name: "The Little Scarlet Door",
              venue_postcode: "W1D 4DL",
              venue_address_line1: "12-13 Greek St",
              venue_address_line2: "Floor 2",
              venue_city: "London",
              venue_capacity: 130,
              venue_price: 780,
              venue_availability_start: "2022-08-29",
              venue_picture_url:
                "https://asset.venuescanner.com/photos/MVorR/med_f1553ca7d789f59c852bad85037b5ef9.jpg",
            },
          ]),
      })
    );
    expect.assertions(1);
    return fetchPostNewVenue(mockFetch).then((data) => {
      expect(mockFetch).toBeCalledWith(
        "http://localhost:8081/gigstr/venues/newVenue"
      );
    });
  });
});
