const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const winston = require("winston");

require("dotenv").config();

// const {initialiseLogger} = require('./logger.js');
// const logger = initialiseLogger('server');

const {
  getVenueDetails,
  getAllVenues,
  postVenueDetails,
  updateEventStatus,
  getPendingEvents,
  getPendingEventsByID,
  updateVenueDetails,
  deleteVenue,
  getAllEventsByID
} = require("./database.helpers.js");

const {initialiseLogger} = require('./logger');
const logger = initialiseLogger('server');

const app = express();
app.use(cors());
app.use(bodyparser.json());

// const logger = winston.createLogger({
//   level: "debug", // the maximum level to log
//   exitOnError: false,
//   format: winston.format.json(), // format messages as JSON
//   defaultMeta: {
//     service: "user-service",
//   }, // printed with each message
//   //transports - what you're logging out to
//   transports: [
//     new winston.transports.File({
//       // log messages with info or higher severity
//       filename: "combined.log",
//     }),
//   ],
// });
// // two transports (files) are specified below
// new winston.transports.File({
//   // log errors only
//   filename: "error.log",
//   level: "error",
//   handleExceptions: true,
// });

const makeError = (code, desc) => {
  logger.error(code + " | " + desc);
  return { status_code: code, error: desc };
};

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/gigstr/venues/venue-details-for/:venue_id", (req, res) => {
  const venueId = req.params.venue_id;
  if (Number.isInteger(parseInt(venueId))) {
    logger.info("Getting venues at id :" + venueId + " from DB...");
    getVenueDetails(venueId)
      .then((data) => {
        if (data[0] !== undefined) {
          logger.info("Data obtained from DB, " + JSON.stringify(data));
          res.status(200).json(data);
        } else {
          console.log("Venue with ID " + venueId + " not found.");
          res.status(404).json(makeError(404, "Venue with ID " + venueId + " not found."));
        }
      })
      .catch((error) => {
        console.log("DB Error Encountered: " + error.message);
        res.status(501).json(makeError(501, "DB Error Encountered: " + error.message));
      });
  } else {
    console.log("406 | Supplied value must be an integer, received " + venueId + ".");
    res.status(406).json(makeError(406, "Supplied value must be an integer, received " + venueId + "."));
  }
});

app.get("/gigstr/venues/venue-details/get-all-venues", (req, res) => {
  logger.info("Getting all venue data from DB...");
  getAllVenues()
    .then((data) => {
      if (data !== null) {
        logger.info("Data obtained from DB, " + JSON.stringify(data));
        res.status(200).json(data);
      } else {
        console.log("404 | Venues not found.");
        res.status(404).json(makeError(404, "Venues not found."));
      }
    })
    .catch((error) => {
      console.log("500 | Internal Server error", error);
      res.status(500).json(makeError(500, "Error in get all venues query"));
    });
});

const checkVenueDetails = (venueDetails) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(venueDetails.venue_email)) {
    return makeError(406, "Email must be in the correct format, received");
  } else if (venueDetails.venue_name == undefined || venueDetails.venue_name === "") {
    return makeError(406, "Venue name must not be blank, received " + venueDetails.venue_name + ".");
  } else if (venueDetails.venue_postcode == undefined || venueDetails.venue_postcode === "" || venueDetails.venue_postcode < 8) {
    return makeError(406, "Postcode field is invalid, received " + venueDetails.venue_postcode + ".");
  } else if (!/^([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/i.test(venueDetails.venue_postcode)) {
    return makeError(406, "Postcode field is invalid, received " + venueDetails.venue_postcode + ".");
  } else if (venueDetails.venue_address_line1 == undefined || venueDetails.venue_address_line1 === "") {
    return makeError(
      406,
      "Address line 1 field must not be empty. Please insert a valid UK address, received " + venueDetails.venue_address_line1 + "."
    );
  } else if (venueDetails.venue_city == undefined || venueDetails.venue_city === "") {
    return makeError(406, "City field must not be empty, received " + venueDetails.venue_city + ".");
  } else if (venueDetails.venue_price == undefined || venueDetails.venue_price === "") {
    return makeError(406, "Price field must not be empty, received" + venue_price + ".");
  } else if (!Number.isInteger(venueDetails.venue_price)) {
    return makeError(406, "Price must be an integer, received " + venueDetails.venue_price + ".");
  } else if (venueDetails.venue_capacity == undefined || venueDetails.capacity === "") {
    return makeError(406, "Capacity field must not be empty, received " + venueDetails.capacity + ".");
  } else if (!Number.isInteger(venueDetails.venue_capacity)) {
    return makeError(406, "Capacity must be an integer, received " + venueDetails.venue_capacity + ".");
  } else if (venueDetails.venue_availability_start == undefined || venueDetails.venue_availability_start === "") {
    return makeError(406, "Start date field must not be empty, received " + venueDetails.venue_availability_start + ".");
  } else if (venueDetails.venue_availability_end == undefined || venueDetails.venue_availability_end === "") {
    return makeError(406, "End date field must not be empty, received " + venueDetails.venue_availability_end + ".");
  } else if (venueDetails.venue_price == undefined || venueDetails.venue_price === "") {
    return makeError(406, "Price field, received " + venueDetails.venue_price + ".");
  } else {
    return makeError(200, "Success");
  }
};

app.post("/gigstr/venues/new-venue", (req, res) => {
  const venueDetails = req.body;
  logger.info("Checking details for new venue...");
  const venueDetailsCheck = checkVenueDetails(venueDetails);
  if (venueDetailsCheck.status_code == 200) {
    logger.info("Venue details okay.");
    postVenueDetails(venueDetails)
      .then((data) => {
        if (data !== undefined) {
          logger.info("New venue added.");
          res.status(200).json("New Venue Added");
        } else {
          res.status(404).json(makeError(404, "Venue could not be added"));
        }
      })
      .catch((error) => {
        console.log("Error in posting venue details");
        res.status(501).json(makeError(501, "Error in query: " + error));
      });
  } else {
    console.log(venueDetailsCheck.status_code + " | " + venueDetailsCheck.error);
    res.status(venueDetailsCheck.status_code).json(venueDetailsCheck);
  }
});

app.get("/gigstr/venues/pending-events/", (req, res) => {
  logger.info("Getting pending venue data from DB...");
  getPendingEvents()
    .then((data) => {
      if (data !== undefined) {
        logger.info("Pending events returned: " + JSON.stringify(data));
        res.status(200).json(data);
      } else {
        console.log("404 | No pending events.");
        res.status(404).json(makeError(404, "No pending events."));
      }
    })
    .catch((error) => {
      console.log("500 | Error: ", error.message);
      res.status(500).json(makeError(500, error.message));
    });
});

app.put("/gigstr/venues/update/event-booking-status", (req, res) => {
  try {
    const eventBooking = req.body;
    if (!["accepted", "pending", "declined"].includes(eventBooking.booking_status)) {
      console.log("406 | booking_status must be 'accepted', 'pending' or 'declined', received " + eventBooking.booking_status + ".");
      res
        .status(406)
        .json(makeError(406, "booking_status must be 'accepted', 'pending' or 'declined', received " + eventBooking.booking_status + "."));
    } else if (!Number.isInteger(parseInt(eventBooking.event_id))) {
      console.log("406 | event_id must be an integer, received " + eventBooking.event_id + ".");
      res.status(406).json(makeError(406, "406 | event_id must be an integer, received " + eventBooking.event_id + "."));
    } else {
      updateEventStatus(eventBooking)
        .then((data) => {
          logger.info("Event status successfully changed.")
          res.status(204).json("Event status successfully changed.");
        })
        .catch((error) => {
          console.log("Error in updating event booking status");
          res.status(500).json(makeError(500, "Error in updating event booking status"));
        });
    }
  } catch (error) {
    console.log("Error: " + err);
    res.status(500).json(makeError(500, err));
  }
});

app.put("/gigstr/venues/update/update-venue-details", (req, res) => {
  try {
    const venueDetails = req.body;
    const venueDetailsCheck = checkVenueDetails(venueDetails);
    if (venueDetailsCheck.status_code == 200) {
      updateVenueDetails(venueDetails)
        .then((data) => {
          res.status(204).json("Venue details successfully updated.");
        })
        .catch((error) => {
          console.log("Error in updating venue details", error);
          res.status(500).json("Database refused query, " + JSON.stringify(error.message));
        });
    } else {
      console.log(venueDetailsCheck.status_code + " | " + venueDetailsCheck.error);
      res.status(venueDetailsCheck.status_code).json(venueDetailsCheck);
    }
  } catch (error) {
    console.log("Error: " + err);
    res.status(500).json("Error: " + JSON.stringify(error.message));
  }
});

app.get("/gigstr/venues/pending-events/id/:venue_id", (req, res) => {
  const venueId = req.params.venue_id;
  logger.info("Getting all pending events at ID: " + venueId + "...")
  if (!Number.isInteger(parseInt(venueId))) {
    console.log("406 | event_id must be an integer, received " + venueId + ".");
    res.status(406).json(makeError(406, "406 | venue_id must be an integer, received " + venueId + "."));
  } else {
    getPendingEventsByID(venueId)
      .then((data) => {
        if (data[0] !== undefined) {
          logger.info("Pending events found: " + JSON.stringify(data))
          res.status(200).json(data);
        } else {
          console.log("404 | No pending events at venue " + venueId);
          res.status(404).json(makeError(404, "No pending events at venue " + venueId));
        }
      })
      .catch((error) => {
        console.log("500 | Error: " + error);
        res.status(500).json(makeError(500, "No pending events at venue " + venueId));
      });
  }
});

app.delete("/gigstr/venues/delete-venue/:venue_id", (req, res) => {
  const venueId = req.params.venue_id;
  logger.info("Deleting venue at ID: " + venueId + "...")
  if (!Number.isInteger(parseInt(venueId))) {
    console.log("406 | venue_id must be an integer, received " + venueId + ".");
    res.status(406).json(makeError(406, "406 | venue_id must be an integer, received " + venueId + "."));
  } else {
    deleteVenue(venueId)
      .then((data) => {
        logger.info("Venue " + venueId + " successfully deleted.")
        res.status(204).json("Venue successfully deleted.");
      })
      .catch((error) => {
        console.log("500 | Error: " + error);
        res.status(500).json(makeError(500, "Pending events at this venue, venue_id: " + venueId));
      });
  }
});

app.get("/gigstr/venues/all-events/:venue_id", (req,res) =>{
  const venueId = req.params.venue_id;
  logger.info("Getting all events at ID: " + venueId + "...")
  if (!Number.isInteger(parseInt(venueId))) {
    console.log("406 | event_id must be an integer, received " + venueId + ".");
    res.status(406).json(makeError(406, "406 | venue_id must be an integer, received " + venueId + "."));
  } else {
    getAllEventsByID(venueId)
      .then((data) => {
        if (data[0] !== undefined) {
          logger.info("Events found: " + JSON.stringify(data))
          res.status(200).json(data);
        } else {
          console.log("404 | No events at venue " + venueId);
          res.status(404).json(makeError(404, "No events at venue " + venueId));
        }
      })
      .catch((error) => {
        console.log("500 | Error: " + error);
        res.status(500).json(makeError(500, "No events at venue " + venueId));
      });
  }
})
const PORT = 8081;

if (process.env.SERVERLESS_MODE !== "true") {
  app.listen(PORT, () => {
    console.log(`express server up and running on port ${PORT}`);
  });
} else {
  const serverless = require("serverless-http");
  module.exports.handler = serverless(app);
}
