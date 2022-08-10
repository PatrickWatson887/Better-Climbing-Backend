BEGIN;

CREATE TABLE coaches (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  profile_pic_url TEXT,
  rating NUMERIC(2, 1)
  CHECK (rating >= 0.00 and rating <= 5.00),
  location TEXT,
  latitude float,
  longitude float,
  description TEXT,
  summary TEXT,
  phone_number VARCHAR(15),
  email_address TEXT,
  years_climbing int,
  years_coaching int,
  business_name text
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  title text,
  description text
);

CREATE TABLE synonyms (
  id SERIAL PRIMARY KEY,
  title text
);

CREATE TABLE tags_synonyms (
  id SERIAL PRIMARY KEY,
  tag_id int NOT NULL REFERENCES tags (id),
  synonym_id int NOT NULL REFERENCES synonyms (id)
);

CREATE TABLE coaches_tags (
  id SERIAL PRIMARY KEY,
  coach_id int NOT NULL REFERENCES coaches (id),
  tag_id int NOT NULL REFERENCES tags (id)
);

CREATE TABLE qualifications (
  id SERIAL PRIMARY KEY,
  acronym varchar(5),
  title text
);

CREATE TABLE coaches_qualifications ( 
  id SERIAL PRIMARY KEY,
  coach_id int NOT NULL REFERENCES coaches (id),
  qualification_id int NOT NULL REFERENCES qualifications (id)
);

CREATE TABLE professional_organisations (
  id SERIAL PRIMARY KEY,
  title text,
  link text
);

CREATE TABLE coaches_professional_organisations (
  id SERIAL PRIMARY KEY,
  coach_id int NOT NULL REFERENCES coaches (id),
  prof_org_id int NOT NULL REFERENCES professional_organisations (id)
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL
);

CREATE TABLE coaches_features (
  id SERIAL PRIMARY KEY,
  coach_id int NOT NULL REFERENCES coaches (id),
  feature_id int NOT NULL REFERENCES features (id)
);
  -- date_featured date NOT NULL

CREATE TABLE coaches_items (
  id SERIAL PRIMARY KEY,
  coach_id int NOT NULL REFERENCES coaches (id),
  price float NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  spaces int NOT NULL,
  spaces_filled int
);

CREATE TABLE items_tags (
  id SERIAL PRIMARY KEY,
  item_id INT NOT NULL REFERENCES coaches_items (id),
  tag_id int NOT NULL REFERENCES tags (id)
);

CREATE TABLE walls (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  profile_pic_url TEXT NOT NULL,
  address TEXT
);

CREATE TABLE classes (
  id BIGSERIAL PRIMARY KEY,
  title text NOT NULL,
  coach_id BIGINT REFERENCES coaches (id),
  wall_id BIGINT REFERENCES walls (id),
  description text NOT NULL,
  location text NOT NULL,
  cost NUMERIC(9, 2) NOT NULL
  CHECK (cost >= 0.00)
);

-- ENTRIES FOR TAGS
INSERT INTO
  tags (title, description)
VALUES
  ('Male',''),
  ('Female',''),
  ('Indoor',''),
  ('Outdoor',''),
  ('Remote',''),
  ('Beginner',''),
  ('Intermediate',''),
  ('Elite',''),
  ('Bouldering',''),
  ('Sport Climbing',''),
  ('Traditional Climbing',''),
  ('Multipitch Climbing',''),
  ('Hiking',''),
  ('Mountaineering',''),
  ('Strength and Conditioning',''),
  ('Mental','');
  

  -- ENTRIES FOR SYNONYMS
INSERT INTO
  synonyms (title)
VALUES
  ('Man'),
  ('Women'),
  ('Gym'),
  ('Rock'),
  ('Online'),
  ('Covid'),
  ('First'),
  ('New'),
  ('Medium'),
  ('Advanced'),
  ('Pads'),
  ('Power'),
  ('Strength'),
  ('Endurance'),
  ('Rope'),
  ('Outdoors'),
  ('Mountain'),
  ('Walking'),
  ('Indoors'),
  ('Brain');

  -- ENTRIES FOR TAGS_SYNONYMS
INSERT INTO
  tags_synonyms (tag_id, synonym_id)
VALUES
  (1, 1),
  (2, 2),  
  (3, 3),
  (4, 4),
  (5, 5),
  (5, 6),
  (6, 7),
  (6, 8),  
  (7, 9),
  (8, 10),
  (9, 11),
  (9, 12),
  (9, 13),
  (10, 14),  
  (10, 15),
  (11, 15),
  (11, 16),
  (11, 17),
  (12, 15),
  (12, 16),
  (13, 18),
  (13, 17),
  (13, 16),
  (12, 18),
  (12, 16),
  (13, 19),
  (13, 3),
  (13, 20);

-- ON CONFLICT (title) DO NOTHING;
-- ENTRIES FOR COACHES
INSERT INTO
  coaches (first_name, surname, profile_pic_url, rating, location, latitude, longitude, description, summary, phone_number, email_address)
VALUES
  ('Andrew', 'Woods', 'https://tinyurl.com/2p9f6c5h', 3.0, 'Belfast, Northern Ireland', 54.607868, -5.926437, 'Climbed for 12 years, coached adults and children classes for 5 years', 'Owns hats', '07427611191', 'awoods@fakemail.co.uk'),
  ('Patrick' , 'Watson', 'https://tinyurl.com/2p8mv7uz', 4.0, 'CarrickFergus, Northern Ireland', 54.7158, -5.8058,'Climbed for 10 years, new to coaching', 'Has a deliveroo account', '12345678910', 'pwatson@fakemail.co.uk'),
  ('Danaan', 'Markey', 'https://tinyurl.com/4fbrwezm', 4.0, 'Sheffield, England', 53.383331, 1.466667, 'Climbed for over a decade, experience coaching a range of clients including German National team', 'Can ride horses', '10987654321', 'dmarkey@fakemail.co.uk'),
  ('Ross', 'Cooper', 'https://tinyurl.com/2p9f6c5h', 5.0, 'Belfast, Northern Ireland', 54.607868, -5.926437, 'Climbed for 12 years, coached adults and children classes for 5 years', 'Owns hats', '07427611191', 'awoods@fakemail.co.uk'),
  ('James', 'Wilkinson', 'https://tinyurl.com/2p8mv7uz', 2.0, 'CarrickFergus, Northern Ireland', 54.7158, -5.8058,'Climbed for 10 years, new to coaching', 'Has a deliveroo account', '12345678910', 'pwatson@fakemail.co.uk'),
  ('Michael', 'Gamble', 'https://tinyurl.com/4fbrwezm', 4.0, 'Sheffield, England', 53.383331, 1.466667, 'Climbed for over a decade, experience coaching a range of clients including German National team', 'Can ride horses', '10987654321', 'dmarkey@fakemail.co.uk'),
  ('Billy', 'Burns', 'https://tinyurl.com/2p9f6c5h', 3.0, 'Belfast, Northern Ireland', 54.607868, -5.926437, 'Climbed for 12 years, coached adults and children classes for 5 years', 'Owns hats', '07427611191', 'awoods@fakemail.co.uk'),
  ('Dom', 'Beck', 'https://tinyurl.com/2p8mv7uz', 4.0, 'CarrickFergus, Northern Ireland', 54.7158, -5.8058,'Climbed for 10 years, new to coaching', 'Has a deliveroo account', '12345678910', 'pwatson@fakemail.co.uk'),
  ('Eoin', 'Aicken', 'https://tinyurl.com/4fbrwezm', 4.0, 'Sheffield, England', 53.383331, 1.466667, 'Climbed for over a decade, experience coaching a range of clients including German National team', 'Can ride horses', '10987654321', 'dmarkey@fakemail.co.uk'),
  ('Owen', 'Acton', 'https://tinyurl.com/2p9f6c5h', 3.0, 'Belfast, Northern Ireland', 54.607868, -5.926437, 'Climbed for 12 years, coached adults and children classes for 5 years', 'Owns hats', '07427611191', 'awoods@fakemail.co.uk'),
  ('Priya', 'Duffy', 'https://tinyurl.com/2p8mv7uz', 4.0, 'CarrickFergus, Northern Ireland', 54.7158, -5.8058,'Climbed for 10 years, new to coaching', 'Has a deliveroo account', '12345678910', 'pwatson@fakemail.co.uk'),
  ('Catriona', 'Dickson', 'https://tinyurl.com/4fbrwezm', 4.0, 'Sheffield, England', 53.383331, 1.466667, 'Climbed for over a decade, experience coaching a range of clients including German National team', 'Can ride horses', '10987654321', 'dmarkey@fakemail.co.uk');
-- ENTRIES FOR COACHES_TAGS
INSERT INTO
  coaches_tags (coach_id, tag_id)
VALUES
  (1, 1),
  (1, 4),
  (1, 8),  
  (1, 5),
  (2, 10),
  (2, 13),
  (2, 11),
  (2, 12),  
  (3, 4),
  (3, 7),
  (3, 2),
  (4, 11),
  (4, 8),  
  (4, 2),
  (4, 10),
  (4, 6),
  (5, 6),
  (5, 5),  
  (5, 7),
  (5, 10),
  (6, 9),
  (6, 8),
  (6, 2),  
  (7, 1),
  (7, 5),
  (7, 5),
  (7, 2),
  (8, 2),  
  (8, 9),
  (9, 4),
  (9, 11),
  (10, 12),
  (10, 7),  
  (11, 12),
  (12, 4),
  (12, 13);

-- ENTRIES FOR Features
INSERT INTO
  features (title, description)
VALUES
  ('Most Viewed', 'This coaches profile was viewed the most in the past week'),
  ('Most Returns', 'This coach had the most repeat customers this week'),
  ('Newest', 'This is our newest coach on the platform'),
  ('Best Rated', 'This coach has the highest average rating');

-- ENTRIES FOR COACHES_FEATURES
INSERT INTO
  coaches_features (coach_id, feature_id)
VALUES
  (1, 3),
  (2, 1),
  (3, 4);
  
-- ENTRIES FOR COACHES_ITEMS
INSERT INTO
  coaches_items (coach_id, price, title, description, spaces, spaces_filled)
VALUES
 (1, 45,'1-1', 'A one on one lesson with me that lasts 1 hour', 1, 0),
  (1, 25, '6-1', 'A six on one group lesson with me that lasts 1 hour', 6, 2),
  (1, 90, '1-1', 'A one on one lesson with me that lasts 1 hour', 1, 1),  
  (1, 35, 'Conditioning', 'A one on one conditioning lesson with me that lasts 1 hour', 1, 0),
  (2, 60,'1-1', 'A one on one lesson with me that lasts 1 hour', 1, 0),
  (2, 45, '1-1', 'A one on one lesson with me that lasts 1 hour', 1, 1),
  (2, 35, '6-1', 'A six on one group lesson with me that lasts 1 hour', 6, 2),
  (2, 25, '3-1', 'A three on one group lesson with me that lasts 1 hour', 3, 1),  
  (3, 45, 'Conditioning', 'A one on one conditioning lesson with me that lasts 1 hour', 1, 0),
  (3, 65, '1-1', 'A one on one lesson with me that lasts 1 hour', 1, 1),
  (3, 40,'1-1', 'A one on one lesson with me that lasts 1 hour', 1, 0),
  (4, 30, '2-1', 'A two on one lesson with me that lasts 1 hour', 2, 0),
  (4, 25, '6-1', 'A six on one group lesson with me that lasts 1 hour', 6, 2),  
  (4, 35, '1-1', 'A one on one lesson with me that lasts 1 hour', 1, 1),
  (4, 30, 'Conditioning', 'A one on one conditioning lesson with me that lasts 1 hour', 1, 0),
  (4, 20,'1-1', 'A one on one lesson with me that lasts 1 hour', 1, 0),
  (5, 20, '2-1', 'A two on one lesson with me that lasts 1 hour', 2, 0),
  (5, 55, '1-1', 'A one on one lesson with me that lasts 1 hour', 1, 1),  
  (5, 25, '3-1', 'A three on one group lesson with me that lasts 1 hour', 3, 1),
  (5, 45,'1-1', 'A one on one lesson with me that lasts 1 hour', 1, 0),
  (6, 55,'1-1', 'A one on one lesson with me that lasts 1 hour', 1, 0),
  (6, 25, '1-1', 'A one on one lesson with me that lasts 1 hour', 1, 1),
  (6, 90,'1-1', 'A one on one lesson with me that lasts 1 hour', 1, 0),  
  (7, 35, '2-1', 'A two on one lesson with me that lasts 1 hour', 2, 0),
  (7, 50,'1-1', 'A one on one lesson with me that lasts 1 hour', 1, 0),
  (7, 45, 'Conditioning', 'A one on one conditioning lesson with me that lasts 1 hour', 1, 0),
  (7, 55, 'Conditioning', 'A one on one conditioning lesson with me that lasts 1 hour', 1, 0),
  (8, 100,'1-1', 'A one on one lesson with me that lasts 1 hour', 1, 0),  
  (8, 20, 'Conditioning', 'A one on one conditioning lesson with me that lasts 1 hour', 1, 0),
  (9, 50, '2-1', 'A two on one lesson with me that lasts 1 hour', 2, 0),
  (9, 35, '1-1', 'A one on one lesson with me that lasts 1 hour', 1, 1),
  (10, 25, 'Conditioning', 'A one on one conditioning lesson with me that lasts 1 hour', 1, 0),
  (10, 35, '6-1', 'A six on one group lesson with me that lasts 1 hour', 6, 2),  
  (11, 25, '1-1', 'A one on one lesson with me that lasts 1 hour', 1, 1),
  (12, 35, '3-1', 'A three on one group lesson with me that lasts 1 hour', 3, 1),
  (12, 20, '2-1', 'A two on one lesson with me that lasts 1 hour', 2, 0);

  INSERT INTO
  items_tags (item_id, tag_id)
VALUES
  (1, 1),
  (2, 4),
  (3, 8),  
  (4, 5),
  (5, 10),
  (6, 13),
  (7, 11),
  (8, 12),  
  (9, 4),
  (10, 7),
  (11, 2),
  (12, 11),
  (13, 8),  
  (14, 2),
  (15, 10),
  (16, 6),
  (17, 6),
  (18, 5),  
  (19, 7),
  (20, 10),
  (21, 9),
  (22, 8),
  (23, 2),  
  (24, 1),
  (25, 5),
  (26, 5),
  (27, 2),
  (28, 2),  
  (29, 9),
  (30, 4);

-- ENTRIES FOR WALLS
INSERT INTO
  walls(name, profile_pic_url, address)
VALUES
  ('Boulderworld', 'https://tinyurl.com/2p9e5c4t', 'Unit 1, Boucher Business Centre, Apollo Rd, Belfast BT12 6HP'),
  ('Ozone Indoor Arena', 'https://tinyurl.com/mrxhp7xn', 'Ormeau Embankment, Belfast BT6 8LT');

COMMIT;

ANALYZE tags;
ANALYZE synonyms;
ANALYZE tags_synonyms;
ANALYZE coaches;
ANALYZE coaches_tags;
ANALYZE qualifications;
ANALYZE coaches_qualifications;
ANALYZE professional_organisations;
ANALYZE coaches_professional_organisations;
ANALYZE features;
ANALYZE coaches_features;
ANALYZE coaches_items;
ANALYZE items_tags;
ANALYZE walls;
ANALYZE classes;
