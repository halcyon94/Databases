CREATE TABLE if not exists `Employees` (
 `EID` int(10) auto_increment,
 `LastName` varchar(20) NOT NULL,
 `FirstName` varchar(20) NOT NULL,
 `Email` varchar(30) NOT NULL,
 `DOB` date NOT NULL,
 `Phone` varchar(20) NOT NULL,
 `row_created_user` char(20) NOT NULL,
 `row_created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`ID`)
);

CREATE TABLE if not exists `Position` (
 `pid` int(10) auto_increment,
 `title` varchar(20) NOT NULL,
 `rate` int(10) NOT NULL,
 `row_created_user` char(20) NOT NULL,
 `row_created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`pid`)
 );

CREATE TABLE if not exists `WorksAs` (
 `id` int(10) auto_increment,
 `pid` int(10) NOT NULL,
 `eid` int(10) NOT NULL,
 `start` date NOT NULL,
 `end` date DEFAULT NULL,
 `row_created_user` char(20) DEFAULT NULL,
 `row_created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`pid`),
 CONSTRAINT `WorksAs_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `Employees` (`eid`),
 CONSTRAINT `WorksAs_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `Position` (`pid`)
 );

CREATE TABLE if not exists `Security` (
 `login` varchar(20) NOT NULL,
 `password` varchar(40) NOT NULL,
 `eid` int(10) NOT NULL,
 `row_created_user` char(20) DEFAULT NULL,
 `row_created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT `Security_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `Employees` (`eid`),
 PRIMARY KEY (`login`)
 );

CREATE TABLE if not exists `HourLog` (
 `day` int(10) auto_increment,
 `time` varchar(20) NOT NULL,
 `eid` int(10) NOT NULL,
 `ipaddr` varchar(30) NOT NULL,
  PRIMARY KEY (`eid`,`day`,`time`)
 );

CREATE TABLE if not exists `Schedule` (
 `day` date NOT NULL DEFAULT '0000-00-00',
 `time` time NOT NULL DEFAULT '00:00:00',
 `eid` int(10) NOT NULL,
 `row_created_user` char(20) DEFAULT NULL,
 `row_created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT `Schedule_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `Employees` (`eid`),
 PRIMARY KEY (`eid`,`day`,`time`)
 );

CREATE TABLE if not exists `PayEarned` (
 `payperiod` date NOT NULL DEFAULT '0000-00-00',
 `eid` int(10) NOT NULL,
 `hoursworked` int(10) NOT NULL DEFAULT 0,
 `salary` double(6,2) NOT NULL DEFAULT 0,
 CONSTRAINT `PayEarned_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `Employees` (`eid`),
 PRIMARY KEY (`payperiod`,`eid`)
 );
