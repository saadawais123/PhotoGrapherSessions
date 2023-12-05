-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: PhotoSessions
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblPhotographers`
--

DROP TABLE IF EXISTS `tblPhotographers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblPhotographers` (
  `PhotographersID` int NOT NULL AUTO_INCREMENT,
  `PhotographerCompanyName` varchar(255) DEFAULT NULL,
  `Instagram` varchar(255) DEFAULT NULL,
  `Website` varchar(255) DEFAULT NULL,
  `Facebook` varchar(255) DEFAULT NULL,
  `PreferredContactMethod` varchar(255) DEFAULT NULL,
  `CompanyNotes` varchar(255) DEFAULT NULL,
  `PhotographerFirstName` varchar(255) DEFAULT NULL,
  `PhotographerLastName` varchar(255) DEFAULT NULL,
  `PhotographerPhone` varchar(255) DEFAULT NULL,
  `PhotographerEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PhotographersID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPhotographers`
--

LOCK TABLES `tblPhotographers` WRITE;
/*!40000 ALTER TABLE `tblPhotographers` DISABLE KEYS */;
INSERT INTO `tblPhotographers` VALUES (1,'Andreana Rico','https://www.instagram.com/adriricophotography/',NULL,NULL,NULL,NULL,'Andreana','Rico',NULL,NULL),(2,'Kayleigh L Photography',NULL,NULL,'https://www.facebook.com/KayleighLPhotography',NULL,NULL,'Kayleigh',NULL,NULL,NULL),(3,'Claudia Carina',NULL,NULL,NULL,NULL,NULL,'Claudia','Claudia',NULL,NULL),(4,'RASHANDRA CLINE PHOTOGRAPHY','https://www.instagram.com/adriricophotography/','https://www.rashandracline.com/','https://www.facebook.com/rashandraclinephoto',NULL,NULL,'Rashandra','Cline',NULL,'rashandracphoto@gmail.com'),(5,'SALT + LIGHT PHOTOGRAPHY',NULL,'saltylight.mypixieset.com',NULL,NULL,NULL,'Julianne','Parker','661-714-9415',NULL);
/*!40000 ALTER TABLE `tblPhotographers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblPhotographersSessions`
--

DROP TABLE IF EXISTS `tblPhotographersSessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblPhotographersSessions` (
  `SessionRowID` int NOT NULL AUTO_INCREMENT,
  `SessionName` varchar(255) DEFAULT NULL,
  `PhotographersID` int DEFAULT NULL,
  `SessionDate` datetime DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL,
  `Zip` varchar(255) DEFAULT NULL,
  `LocationLongitude` varchar(255) DEFAULT NULL,
  `LocationLatitude` varchar(255) DEFAULT NULL,
  `Region` varchar(255) DEFAULT NULL,
  `SubRegion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SessionRowID`),
  KEY `PhotographersID` (`PhotographersID`),
  KEY `Region` (`Region`),
  CONSTRAINT `tblphotographerssessions_ibfk_1` FOREIGN KEY (`PhotographersID`) REFERENCES `tblPhotographers` (`PhotographersID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tblphotographerssessions_ibfk_2` FOREIGN KEY (`Region`) REFERENCES `tblRegions` (`Region`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPhotographersSessions`
--

LOCK TABLES `tblPhotographersSessions` WRITE;
/*!40000 ALTER TABLE `tblPhotographersSessions` DISABLE KEYS */;
INSERT INTO `tblPhotographersSessions` VALUES (19,'Valentine Mini Session',2,'2023-12-21 00:00:00','Huntington Beach Studio',NULL,'Huntington Beach','Ca',NULL,'73.856743','18.52043','Los Angeles',NULL),(20,'Valentine Mini Session',2,'2023-02-04 00:00:00','Costa Mesa Studio Studio',NULL,'Costa Mesa','Ca',NULL,NULL,NULL,'Los Angeles',NULL),(21,'Valentine Mini Session',3,'2023-01-28 00:00:00','Anaheim Studio',NULL,'Anaheim','Ca',NULL,NULL,NULL,'Los Angeles',NULL),(22,'Valentine Mini Session',3,'2023-01-29 00:00:00','Anaheim Studio',NULL,'Anaheim','Ca',NULL,NULL,NULL,'Los Angeles',NULL),(23,'Spring Mini\'s - Blossom and Wildflowers',5,'2023-02-19 00:00:00',NULL,NULL,'Fresno','Ca',NULL,NULL,NULL,'Southern Central Valley',NULL),(24,'Spring Mini\'s - Blossom and Wildflowers',5,'2023-03-11 00:00:00',NULL,NULL,'Fresno','Ca',NULL,NULL,NULL,'Southern Central Valley',NULL),(25,'Spring Mini\'s - Blossom and Wildflowers',5,'2023-02-18 00:00:00',NULL,NULL,'Fresno','Ca',NULL,NULL,NULL,'Southern Central Valley',NULL),(26,'Almond Orchard Mini',5,'2023-02-11 00:00:00','Almond Orchards, Fugitt Family Farms',NULL,'Bakersfield','Ca',NULL,NULL,NULL,'Southern Central Valley',NULL),(27,'Almond Orchard Mini',5,'2023-02-18 00:00:00','Almond Orchards, Fugitt Family Farms',NULL,'Bakersfield','Ca',NULL,NULL,NULL,'Southern Central Valley',NULL);
/*!40000 ALTER TABLE `tblPhotographersSessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblPhotographersSessionsTypes`
--

DROP TABLE IF EXISTS `tblPhotographersSessionsTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblPhotographersSessionsTypes` (
  `PhotographersSessionsTypeRowID` int NOT NULL AUTO_INCREMENT,
  `SessionRowID` int DEFAULT NULL,
  `SessionType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PhotographersSessionsTypeRowID`),
  KEY `SessionRowID` (`SessionRowID`),
  KEY `SessionType` (`SessionType`),
  CONSTRAINT `tblphotographerssessionstypes_ibfk_1` FOREIGN KEY (`SessionRowID`) REFERENCES `tblPhotographersSessions` (`SessionRowID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tblphotographerssessionstypes_ibfk_2` FOREIGN KEY (`SessionType`) REFERENCES `tblSessionTypes` (`SessionType`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPhotographersSessionsTypes`
--

LOCK TABLES `tblPhotographersSessionsTypes` WRITE;
/*!40000 ALTER TABLE `tblPhotographersSessionsTypes` DISABLE KEYS */;
INSERT INTO `tblPhotographersSessionsTypes` VALUES (19,19,'Valentines Day'),(20,20,'Valentines Day'),(21,21,'Valentines Day'),(22,22,'Valentines Day'),(23,23,'Spring Mini'),(24,24,'Spring Mini'),(25,25,'Spring Mini'),(26,26,'Family'),(27,27,'Family');
/*!40000 ALTER TABLE `tblPhotographersSessionsTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblRegions`
--

DROP TABLE IF EXISTS `tblRegions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblRegions` (
  `Region` varchar(255) NOT NULL,
  PRIMARY KEY (`Region`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblRegions`
--

LOCK TABLES `tblRegions` WRITE;
/*!40000 ALTER TABLE `tblRegions` DISABLE KEYS */;
INSERT INTO `tblRegions` VALUES ('Los Angeles'),('Northern Central Valley'),('San Deigo'),('SF Bay Area'),('Southern Central Valley');
/*!40000 ALTER TABLE `tblRegions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblRegionsSubRegion`
--

DROP TABLE IF EXISTS `tblRegionsSubRegion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblRegionsSubRegion` (
  `Region` varchar(255) NOT NULL,
  `SubRegion` varchar(255) NOT NULL,
  PRIMARY KEY (`Region`,`SubRegion`),
  CONSTRAINT `tblregionssubregion_ibfk_1` FOREIGN KEY (`Region`) REFERENCES `tblRegions` (`Region`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblRegionsSubRegion`
--

LOCK TABLES `tblRegionsSubRegion` WRITE;
/*!40000 ALTER TABLE `tblRegionsSubRegion` DISABLE KEYS */;
INSERT INTO `tblRegionsSubRegion` VALUES ('Los Angeles','Central Los Angeles'),('Los Angeles','Long Beach'),('San Deigo','City of San Deigo'),('San Deigo','North San Deigo County'),('San Deigo','South San Deigo County'),('SF Bay Area','East Bay'),('SF Bay Area','South Bay');
/*!40000 ALTER TABLE `tblRegionsSubRegion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblSessionTypes`
--

DROP TABLE IF EXISTS `tblSessionTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblSessionTypes` (
  `SessionType` varchar(255) NOT NULL,
  PRIMARY KEY (`SessionType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblSessionTypes`
--

LOCK TABLES `tblSessionTypes` WRITE;
/*!40000 ALTER TABLE `tblSessionTypes` DISABLE KEYS */;
INSERT INTO `tblSessionTypes` VALUES ('Almond Blossom Mini'),('Boudoir'),('Couples'),('Family'),('Glamour'),('Maternity'),('Spring Mini'),('Valentines Day');
/*!40000 ALTER TABLE `tblSessionTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'PhotoSessions'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-23 15:14:02
