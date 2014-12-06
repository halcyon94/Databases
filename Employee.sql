USE DATABASE `managementsystem`;

CREATE TABLE if not exists `Employee` (
 `EID` int(10) auto_increment,
 `LastName` varchar(20) NOT NULL,
 `FirstName` varchar(20) NOT NULL,
 `Email` varchar(30) NOT NULL,
 `DOB` date NOT NULL,
 `Phone` varchar(20) NOT NULL,
 `row_created_user` char(20) DEFAULT NULL,
 `row_created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`ID`)
);

CREATE TABLE if not exists `HourLog` (
 `day` int(10) auto_increment,
 `time` varchar(20) NOT NULL,
 `eid` int(10) NOT NULL,
 `ipaddr` varchar(30) NOT NULL,
  PRIMARY KEY (`eid`,`day`,`time`)
 );








