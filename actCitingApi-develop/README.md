# Endpoint development status

**Traffic Light Status System**

🟩 - _Fully functional._
🟨 - _Partially/Close to functional._
🟥 - _Requires major overhaul._

| Endpoint                                    | Type | Parameters  | Body                             | Returns    | Status | Notes                                                                                                                         |
|---------------------------------------------|------|-------------|----------------------------------|------------|--------|-------------------------------------------------------------------------------------------------------------------------------|
| /gigstr/venues/venue-details-for/**param1** | GET  | ID of Venue |                                  | 1 Venue    | 🟩      |                                                                                                                               |
| /gigstr/venues/venue-details/getAllVenues   | GET  |             |                                  | All Venues | 🟩      |                                                                                                                               |
| /gigstr/venues/postVenueDetails                     | POST |             | **Should take venue data**       |            | 🟥      | Cannot take venue in body, attempts to post static venue modelled from old schema. Post request also attempts to return data? |
| /gigstr/venues/postNewVenueOwner            | POST |             | **Should take venue owner data** |            | 🟥      | None of this works, endpoint needs fully rewritten in both server.js and database.helpers.js                                  |
| /gigstr/venues/pendingEvents/               | GET  |             |                                  | All Pending Events | 🟩      |                                                                                                                               |
| /gigstr/venues/pending-events/id/**param1**               | GET  |  ID of Venue           |                                  | Pending Events of at venue| 🟩      |                                                                                                                               |
| /gigstr/venues/newVenue                     | POST |             | **Should take venue data**       |            | 🟥      | Cannot take venue in body, attempts to post static venue modelled from old schema. Post request also attempts to return data? |
| /gigstr/venues/update/EventBookingStatus    | PUT  |             | event_id, booking_status          |            | 🟩       |                                      |                              |
 
 ## Setup

 To run in local mode, set **SERVERLESS_MODE** in **.env** to false. Leave on true otherwise.

 ### Installation 

    npm install
    (if that doesnt work){
        npm init
        npm install --save express
        npm install --save-dev jest
            to see coverage, in package.json change "test": "jest" to --> "test": "jest --coverage",
        npm install nodemon
        npm install cors
        npm install winston
        npm i body-parser
        npm install pg
        npm install dotenv
    }
        
#### Docker Dummy Data Setup
    docker run --rm --name dummyTestData -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
    docker ps -a
    docker exec -it dummyTestData su postgres

