const {Pool} = require ('pg');
require('dotenv').config();

let pool;
const setPool = newPool => {
    pool = newPool
}

const getDBConnDetails = () =>{
    if(process.env.SERVERLESS_MODE == "true"){
        return {
            user: "postgres",
            password: "mysecretpassword",
            database: "postgres",
            host: "database-1.cluster-c8sfeopkdbom.eu-west-2.rds.amazonaws.com",
        }
    } else {
        return {
            user: "postgres",
            password: "mysecretpassword",
            database: "postgres",
            host: "localhost",
            port: 5432,
        }
    }
}

const initPool = async () => {
    let dbConnDetails;
    if (process.env.AWS_DB_SECRETS) {
        // using AWS secrets manager
        const awsSecrets = require('./awsSecrets');
        dbConnDetails = await awsSecrets.getSecrets(process.env.AWS_DB_SECRETS, process.env.AWS_REGION);
    } else {
        dbConnDetails = getDBConnDetails();
        console.log("DB connect variables", dbConnDetails)
    }
    // this creates a pool of reusable database connections
    const newPool = new Pool({
        ...dbConnDetails,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    });
    return newPool;
};

initPool().then(setPool)

const getAllVenues = async () => {
  const query = `SELECT * FROM venue v order by venue_id  desc;`;
  const params = [];
  const results = await pool.query(query,params);
  return results.rows;
};


  const postVenueDetails = async (venueDetails) =>{

    const query = `INSERT INTO venue (
        venue_email,
        venue_name,
        venue_postcode,
        venue_address_line1,
        venue_address_line2,  
        venue_city,
        venue_capacity,
        venue_price,
        venue_availability_start,
        venue_availability_end,
        venue_picture_url
        )

        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11
            )

            RETURNING venue_id;`;

    const params = [
        venueDetails.venue_email,
        venueDetails.venue_name,
        venueDetails.venue_postcode,
        venueDetails.venue_address_line1,
        venueDetails.venue_address_line2,
        venueDetails.venue_city,
        venueDetails.venue_capacity,
        venueDetails.venue_price,
        venueDetails.venue_availability_start,
        venueDetails.venue_availability_end,
        venueDetails.venue_picture_url

    ];

    const results = await pool.query(query, params);
    return results.rows;
}

const getVenueDetails = async (venueId) =>{
    const query = `SELECT * FROM venue WHERE venue_id=$1;`
    const params = [venueId];
    const results = await pool.query(query,params);
    return results.rows;
}

const updateEventStatus = async (status) => {
  const query = `UPDATE event 
    SET booking_status = $1 WHERE event_id = $2;`;
  const params = [status.booking_status, status.event_id];
  const results = await pool.query(query, params);
  return results.rows;
};

const updateVenueDetails = async (details) => {
    console.log(details)
    const query = `UPDATE venue
     SET 
     venue_email = $1, 
     venue_name = $2, 
     venue_postcode = $3, 
     venue_address_line1 = $4, 
     venue_address_line2 = $5, 
     venue_city = $6, 
     venue_capacity = $7, 
     venue_price = $8, 
     venue_availability_start = $9, 
     venue_picture_url = $10
     WHERE venue_id = $11`;
    const params = [
        details.venue_email,
        details.venue_name, 
        details.venue_postcode,
        details.venue_address_line1, 
        details.venue_address_line2, 
        details.venue_city, 
        details.venue_capacity, 
        details.venue_price, 
        details.venue_availability_start, 
        details.venue_picture_url,
        details.venue_id
    ];
    const results = await pool.query(query,params);
    return results.rows;
}

const getPendingEvents = async () =>{
    const query = `SELECT * FROM event WHERE booking_status = 'pending' order by venue_id  desc`
    const results = await pool.query(query);
    return results.rows;
}

const deleteVenue = async (data) =>{ 
    const query = `DELETE FROM venue WHERE venue_id=$1`
    const params = [data]
    const results = await pool.query(query, params);
    return results.rows;
}

const getPendingEventsByID = async (data) => {
  const query = `SELECT * FROM event JOIN venue ON event.venue_id = venue.venue_id 
                JOIN artist ON event.artist_id = artist.artist_id 
                WHERE event.booking_status = 'pending' AND 
                venue.venue_id = $1 ORDER BY event.start_date `;
  const params = [data];
  const results = await pool.query(query, params);
  return results.rows;
};

const getAllEventsByID = async (data) => {
  const query = `SELECT * FROM event JOIN venue ON event.venue_id = venue.venue_id 
    JOIN artist ON event.artist_id = artist.artist_id WHERE venue.venue_id = $1`;
  const params = [data];
  const results = await pool.query(query, params);
  return results.rows;
};


module.exports = {
  getVenueDetails,
  postVenueDetails,
  updateEventStatus,
  getPendingEvents,
  deleteVenue,
  updateVenueDetails,
  getAllVenues,
  getPendingEventsByID,
  getAllEventsByID
};
