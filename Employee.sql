CREATE DATABASE `testing`;

CREATE TABLE `Employee` (
 `ID` int(11) NOT NULL,
 `LastName` varchar(200) NOT NULL,
 `FirstName` varchar(200) NOT NULL,
 `Email` varchar(30) NOT NULL,
 `DOB` date NOT NULL,
 `Phone` varchar(20) NOT NULL,
 `row_created_user` char(20) DEFAULT NULL,
 `row_created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`ID`)
);