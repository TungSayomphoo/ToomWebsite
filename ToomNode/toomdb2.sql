-- MySQL dump 10.17  Distrib 10.3.12-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: toom
-- ------------------------------------------------------
-- Server version	10.3.12-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `toom`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `toom` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `toom`;

--
-- Table structure for table `bike`
--

DROP TABLE IF EXISTS `bike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bike` (
  `bike_licence` varchar(100) NOT NULL,
  `bike_brand` varchar(100) DEFAULT NULL,
  `bike_model` varchar(100) DEFAULT NULL,
  `bike_color` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`bike_licence`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bike`
--

LOCK TABLES `bike` WRITE;
/*!40000 ALTER TABLE `bike` DISABLE KEYS */;
INSERT INTO `bike` VALUES ('??9123','???????','scoopy','??'),('ab1234','honda','click125i','red'),('ab5678','honda','click125i','blue');
/*!40000 ALTER TABLE `bike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `cus_phone` varchar(100) NOT NULL,
  `cus_name` varchar(100) DEFAULT NULL,
  `cus_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cus_phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('+660800000001','jirot','jirot@gmail.com'),('+660800000002','tung002','tung02@gmail.com'),('+660800000003','tung003','tung03@gmail.com'),('+660800000005','Tanika','tanika@gmail.com'),('+660800000006','fee','fee@gmail.com');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `his_num` int(11) NOT NULL,
  `his_date` date DEFAULT NULL,
  `his_time` time DEFAULT NULL,
  `cus_phone` varchar(100) DEFAULT NULL,
  `bike_licence` varchar(100) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `detail` varchar(100) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`his_num`),
  KEY `f_cus_phone` (`cus_phone`),
  KEY `f_bike_licence` (`bike_licence`),
  CONSTRAINT `f_bike_licence` FOREIGN KEY (`bike_licence`) REFERENCES `bike` (`bike_licence`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `f_cus_phone` FOREIGN KEY (`cus_phone`) REFERENCES `customer` (`cus_phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,'1997-12-04','12:54:56','+660800000001','ab1234',55.55,44.44,'adasdasd',888,'แจ้งซ่อม'),(2,'2015-05-31','05:18:06','+660800000002','ab5678',55.55,44.44,'test',888,'แจ้งซ่อม'),(3,'2003-01-11','09:30:15','+660800000001','??9123',30.3,33.33,'dis',200,'done'),(4,'2004-12-04','12:54:56','+660800000001','ab1234',10.1,11.11,'dis',200,'pick up'),(5,'2004-12-04','04:54:56','+660800000001','ab1234',10.1,11.11,'dis',200,'repair');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owner` (
  `cus_phone` varchar(100) DEFAULT NULL,
  `bike_licence` varchar(100) DEFAULT NULL,
  KEY `f_cus_phone2` (`cus_phone`),
  KEY `f_bike_licence2` (`bike_licence`),
  CONSTRAINT `f_bike_licence2` FOREIGN KEY (`bike_licence`) REFERENCES `bike` (`bike_licence`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `f_cus_phone2` FOREIGN KEY (`cus_phone`) REFERENCES `customer` (`cus_phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
INSERT INTO `owner` VALUES ('+660800000001','ab1234'),('+660800000002','ab5678'),('+660800000003','??9123'),('+660800000001','ab5678');
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-13 23:45:11
