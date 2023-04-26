DROP TABLE IF EXISTS event cascade;
DROP TABLE IF EXISTS venue cascade;
DROP TABLE IF EXISTS giggoer cascade;
DROP TABLE IF EXISTS review cascade;
DROP TABLE IF EXISTS giggoer_booking cascade;
DROP TABLE IF EXISTS artist cascade;


CREATE TABLE event (
    event_id INTEGER GENERATED ALWAYS AS IDENTITY,
	artist_id INTEGER,
	venue_id INTEGER,
    event_name VARCHAR(100),
    start_date DATE NOT NULL,
	start_time TIME NOT NULL,
	end_date DATE,
	end_time TIME,
    event_description VARCHAR(8000),
    event_genre VARCHAR(50),
    event_image_url VARCHAR(255),
	booking_status VARCHAR(10),
    PRIMARY KEY (event_id)
);

CREATE TABLE venue (
    venue_id INTEGER GENERATED ALWAYS AS IDENTITY,
    venue_email VARCHAR(80),
    venue_name VARCHAR(50),
    venue_postcode VARCHAR(8),
	venue_address_line1 VARCHAR(80),
	venue_address_line2 VARCHAR(80),
	venue_city VARCHAR(80),
    venue_capacity INT,
	venue_price INT,
    venue_availability_start DATE NOT NULL,
	venue_picture_url VARCHAR(255),
    PRIMARY KEY (venue_id)
);

CREATE TABLE artist (
	artist_id INTEGER GENERATED ALWAYS AS IDENTITY,
	artist_name VARCHAR(50),
	artist_email VARCHAR(100),
	PRIMARY KEY (artist_id)
);

CREATE TABLE giggoer (
	giggoer_id INTEGER GENERATED ALWAYS AS IDENTITY,
	giggoer_name VARCHAR(50),
	giggoer_email VARCHAR(100),
	PRIMARY KEY (giggoer_id)
);

CREATE TABLE review (
	review_id INTEGER GENERATED ALWAYS AS IDENTITY,
	giggoer_id INTEGER,
	event_id INTEGER,
	review_body VARCHAR(600),
	PRIMARY KEY (review_id)
);

CREATE TABLE giggoer_booking (
	event_id INTEGER,
	giggoer_id INTEGER,
	shortlist BOOLEAN,
	PRIMARY KEY (event_id, giggoer_id)
);

-- ADDING FOREING KEY CONSTRAINTS 

-- Event
ALTER TABLE event 
ADD CONSTRAINT pk_artist_id 
FOREIGN KEY (artist_id)
REFERENCES artist(artist_id);

ALTER TABLE event 
ADD CONSTRAINT pk_venue_id
FOREIGN KEY (venue_id)
REFERENCES venue(venue_id);

-- Review
ALTER TABLE review 
ADD CONSTRAINT pk_giggoer_id 
FOREIGN KEY (giggoer_id)
REFERENCES giggoer(giggoer_id);


-- Giggoer-booking
ALTER TABLE giggoer_booking 
ADD CONSTRAINT pk_giggoer_id 
FOREIGN KEY (giggoer_id)
REFERENCES giggoer(giggoer_id);

ALTER TABLE giggoer_booking 
ADD CONSTRAINT pk_event_id 
FOREIGN KEY (event_id)
REFERENCES event(event_id);