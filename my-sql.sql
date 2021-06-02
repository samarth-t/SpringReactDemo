CREATE DATABASE netflix_db;
 
CREATE TABLE netflixtable(
   show_id      VARCHAR(5) NOT NULL PRIMARY KEY,
   type         VARCHAR(7),
   title        VARCHAR(104),
   director     VARCHAR(208),
   cast         VARCHAR(771),
   country      VARCHAR(123),
   date_added   DATE,
   release_year INTEGER,
   rating       VARCHAR(8),
   duration     VARCHAR(10),
   listed_in    VARCHAR(79),
   description  TEXT(255)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/netflix_titles.csv' 
INTO TABLE netflixtable 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(show_id,type,title,director,cast,country,@date_added,release_year,rating,duration,listed_in,description)
SET date_added = STR_TO_DATE(@date_added, '%M %d, %Y');