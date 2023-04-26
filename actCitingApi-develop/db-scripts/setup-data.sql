--Venue

INSERT INTO venue  (venue_email, venue_name, venue_postcode, venue_address_line1, venue_city, venue_capacity, venue_price, venue_availability_start, venue_picture_url)
			VALUES ('bwaywell3@prweb.com', 'The Little Scarlet Door', 'W1D 4DL', '12-13 Greek St', 'London', 130, 780,  '2022-08-29', 'https://asset.venuescanner.com/photos/MVorR/med_f1553ca7d789f59c852bad85037b5ef9.jpg');

INSERT INTO venue  (venue_email, venue_name, venue_postcode, venue_address_line1, venue_city, venue_capacity, venue_price, venue_availability_start, venue_picture_url)
			VALUES ('agalier1@timesonline.co.uk', 'Walkers of Whitehall', 'SW1A 2DD', '15 Craigs Ct', 'London', 100, 830, '2022-09-23', 'https://asset.venuescanner.com/photos/oZBqp/med_0286df4f9908925dca79b007d252adc8.jpg');

INSERT INTO venue  (venue_email, venue_name, venue_postcode, venue_address_line1, venue_city, venue_capacity, venue_price, venue_availability_start, venue_picture_url)
			VALUES ('cboullen2@ucla.edu', 'Leonardo Royal London City', 'EC3N 2BQ', '8-14, Coopers Row', 'London', 250, 400, '2022-09-10', 'https://asset.venuescanner.com/photos/MNXMM/med_bb78ca95b14df47bb17f03f88ec4960e.jpg');

INSERT INTO venue  (venue_email, venue_name, venue_postcode, venue_address_line1, venue_city, venue_capacity, venue_price, venue_availability_start, venue_picture_url)
			VALUES ('bwaywell3@prweb.com', 'PANTECHNICON', 'SW1X 8LB', '19 Motcomb St', 'London', 250, 1020, '2022-10-10', 'https://media-cdn.tripadvisor.com/media/photo-s/21/dc/8a/ac/eldr-roof-garden-at-pantechnic.jpg');

INSERT INTO venue  (venue_email, venue_name, venue_postcode, venue_address_line1, venue_city, venue_capacity, venue_price, venue_availability_start, venue_picture_url)
			VALUES ('bwaywell3@prweb.com', 'Escape Live', 'L1 3DS', '3 College Ln', 'Liverpool', 320, 930, '2022-09-16', 'https://asset.venuescanner.com/photos/Bojq6/med_4470002bcacf6dc6250f51c647f3c8b2.jpg');

INSERT INTO venue  (venue_email, venue_name, venue_postcode, venue_address_line1, venue_city, venue_capacity, venue_price, venue_availability_start, venue_picture_url)
			VALUES ('dmcgaughey4@storify.com', 'The Baltic Hotel', 'L1 0AF', '16 Jamaica St', 'Livepool', 250, 350, '2022-08-14', 'https://asset.venuescanner.com/photos/3MkIZ/med_4b04b9130bb78a7237d654b5887b389d.jpg');



--Artist

INSERT INTO artist (artist_name, artist_email)
	VALUES ('Maddox Manning', 'Maddox.Manning43@hotmail.com');
	
INSERT INTO artist (artist_name, artist_email)
	VALUES ('Christopher Rotherburg', 'Chris.Rotherburg54@gmail.com');

INSERT INTO artist (artist_name, artist_email)
	VALUES ('Alisa Gilmore', 'Alisa.Gilmore234@gmail.com');

INSERT INTO artist (artist_name, artist_email)
	VALUES ('Shayla Mcdaniel', 'Mcdaniel.Shayla@yahoo.co.uk');

INSERT INTO artist (artist_name, artist_email)
	VALUES ('Lucian Hull', 'Hull.Lucian345@outlook.com');

INSERT INTO artist (artist_name, artist_email)
	VALUES ('Raymond Marlowe', 'Ray.Marlowe432@gmail.com');



--Event

INSERT INTO event (artist_id, venue_id, event_name, start_date, start_time, end_date, end_time, event_description, event_genre, event_image_url, booking_status)
VALUES (1, 2, 'Maddox Manning Live', '2022-10-13', '18:30', '2022-10-13', '11:00', 'Maddox Manning Live!', 'Rock', 'https://pixabay.com/get/g0e6f577516c260a1a77c38921b9d05b5ae217ce8e0ddbc7fcb70f6bf1255cc2758c0fb70765637f8a071e2bc36939f9a_640.jpg', 'pending');


INSERT INTO event (artist_id, venue_id, event_name, start_date, start_time, end_date, end_time, event_description, event_genre, event_image_url, booking_status)
VALUES (3, 4,'Chris Rot', '2022-11-02', '20:00', '2022-11-02', '12:00', 'Chris Rot Ready to Excite!', 'Electronic', 'https://pixabay.com/get/g024494231b3b1d9872d6fe207aa8fe95f3da4fb561aa808f62790bbfd42082fb199bf66e30c591a4338f142d8211c092_640.jpg', 'accepted');


INSERT INTO event (artist_id, venue_id, event_name, start_date, start_time, end_date, end_time, event_description, event_genre, event_image_url, booking_status)
VALUES (6, 2,'Alisa Girlmore', '2022-12-13', '20:00', '2022-12-13', '12:00', 'Guilmore on Guitar', 'Folk', 'https://pixabay.com/get/g5310908fef8c39bd94d7561e23c46bee0805ae643b0d4d60e0ced5c9a6d8368895e19ae1690e6c2a57f9702a687e6dea5687b9d727d53f2f783da4af3043ea35_640.jpg', 'pending');


INSERT INTO event (artist_id, venue_id, event_name, start_date, start_time, end_date, end_time, event_description, event_genre, event_image_url, booking_status)
VALUES (3, 6, 'Shayla Mcdaniel', '2022-10-21', '20:00', '2022-10-21', '12:00', 'Shayla ready to sing her heart out', 'Vocal', 'https://pixabay.com/get/g62264c2350db8c5021d0b4d3ad485a87545f3a45adf37501d420189502dfa12465558558d396bb01c2a1ed01cf5c908d_640.jpg', 'pending');

INSERT INTO event (artist_id, venue_id, event_name, start_date, start_time, end_date, end_time, event_description, event_genre, event_image_url, booking_status)
VALUES (1, 5, 'Lucian Hull', '2022-12-01', '20:00', '2022-12-01', '12:00', 'Music to make you blue', 'Jazz', 'https://pixabay.com/get/g58766ed5f0428bcc7acc6c9b2d68b6c9131bde9199df27f87eed14e7afffb2c18e1ea216f1cad2492b5e61106837bf4cb49ee7abecda1e16f6187fe582946183_640.jpg', 'accepted');

INSERT INTO event (artist_id, venue_id, event_name, start_date, start_time, end_date, end_time, event_description, event_genre, event_image_url, booking_status)
VALUES (2, 6, 'Raymond Marlowe', '2022-12-10', '21:00', '2022-12-10', '12:00', 'Ray ready to Rock', 'Rock', 'https://pixabay.com/get/gdbb896732faddc1fd69080e2ebef524b7583fe335a408c2c295b3860a2c52332ca72867ad834ad8ab08b8cc9ff3106e0a18c87fe7ddd574212685056544a4207_640.jpg', 'accepted');





--Giggoer

INSERT INTO giggoer (giggoer_name, giggoer_email)
	VALUES ('Aaron Daniels', 'aaron.daniels@aarondaniels.com');

INSERT INTO giggoer (giggoer_name, giggoer_email)
	VALUES ('Oliver Lane', 'oliver.lane@walker.com');

INSERT INTO giggoer (giggoer_name, giggoer_email)
	VALUES ('Grace Parsons', 'grace.parsons@smithmusic.com');



--Giggoer_booking

INSERT INTO giggoer_booking (event_id, giggoer_id, shortlist)
	VALUES ('1', '1', true);

INSERT INTO giggoer_booking (event_id, giggoer_id, shortlist)
	VALUES ('2', '2', false);

INSERT INTO giggoer_booking (event_id, giggoer_id, shortlist)
	VALUES ('3', '3', false);



--Review

INSERT INTO review (giggoer_id, event_id,  review_body)
	VALUES ('1', '1', 'The event as a whole was average. I enjoyed seeing my favourite artists, however the stage setup was poor. The sound quality
	was awful.');


INSERT INTO review (giggoer_id, event_id,  review_body)
	VALUES ('2', '2', 'I very much enjoyed the event');


INSERT INTO review (giggoer_id, event_id,  review_body)
	VALUES ('3', '3', 'The event was poorly run with terrible facilities');
