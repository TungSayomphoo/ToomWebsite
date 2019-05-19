-- MySQL dump 10.16  Distrib 10.1.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: toom
-- ------------------------------------------------------
-- Server version	10.1.38-MariaDB-0ubuntu0.18.04.1

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'test','test','test@test.com'),(2,'admin@tung','qazxcde68','y.sayomphoo@kkumail.com');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `bike` VALUES ('','HONDA','Scoopy','แดง'),(' กรุงเทพมหานคร','HONDA','Scoopy','แดง'),('\" phoneNum \"','\" bikeBrand \"','\" bikeModel \"','\" bikeColor'),('080','honda','click','black'),('0800000001','honda','click','black'),('0850053627','HONDA','Scoopy','แดง'),('0896235853','HONDA','Scoopy','แดง'),('1234','Honda','Honda','Honda'),('1กณ','HONDA','Click125i','red'),('1กณ 5234 ขอนแก่น','้honda','click','แดง'),('1กณ ขอนแก่น','HONDA','Click125i','red'),('2กณ 5234 ขอนแก่น','HONDA','Click125i','red'),('5234 ขอนแก่น','YAMAHA','Click125i','แดง'),('5678','Honda','test02','blue'),('??9123','???????','scoopy','??'),('ab1234','honda','click125i','red'),('ab5678','honda','click125i','blue'),('null','HONDA','Scoopy','แดง'),('test 1กณ 5234 ขอนแก่น','HONDA','Click125i','แดง'),('กดน182ขอนแก่น','HONDA','Scoopy','แดง'),('กดพ 123 ขอนแก่น','HONDA','click','แดง'),('กพ 8933','HONDA','click 125i','แดง'),('กพด 142 ขอนแก่น','HONDA','Scoopy','แดง'),('พกด 123 กรุงเทพมหานคร','HONDA','Scoopy','แดง'),('พพงง กรุงเทพมหานคร','HONDA','Scoopy','แดง'),('พพพพ กรุงเทพมหานคร','HONDA','Scoopy','แดง'),('หกด 332 กรุงเทพมหานคร','HONDA','Scoopy','แดง'),('หกด 345 กรุงเทพมหานคร','HONDA','Scoopy','แดง');
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
INSERT INTO `customer` VALUES ('00832577467','',''),('00889141380',NULL,''),('0642298917','หมาอ้วน','FattyDog1997@gmail.com'),('0800000001','test01','email01'),('0816625725','',''),('0832577467','ตั้ง','y.sayomphoo@kkumail.com'),('0846382334','เจ๊มีน','meen@gmail.com'),('0850053627','stitch','123@hotmail.com'),('0865850485','ไอ้ทิว','tiwtew@hotmail.com'),('0889141380','ฟี่','minestory01@gmail.com'),('0892749920','tung',''),('0896235800','tung005','tung01@gmail.com'),('0896235853','น้ำเพชร','taonika_k@hotmail.com'),('08962358535','',''),('0982109264',NULL,'');
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
INSERT INTO `history` VALUES (1,'2019-04-05','02:20:55','0800000001','1กณ',16,102,'test',0,'เสร็จสิ้น'),(3,'2019-04-05','02:21:21','0800000001','1กณ',16,102,'test',0,'กำลังดำเนินการ'),(4,'2019-04-05','02:22:00','0800000001','1กณ',16,102,'test',0,'แจ้งซ่อม'),(6,'2019-04-10','15:15:07','0896235853',NULL,16.4208,102.833,NULL,NULL,NULL),(7,'2019-04-10','15:49:38','0889141380',NULL,16.4208,102.833,NULL,NULL,NULL),(9,'2019-04-14','15:53:10','0846382334','พกด 123 กรุงเทพมหานคร',16.4017,102.814,'แบตเตอร์รี่หมด',10,'เสร็จสิ้น'),(13,'2019-04-30','01:11:11','0832577467','test 1กณ 5234 ขอนแก่น',16.4797,102.818,'เบรคแตก',350,'เสร็จสิ้น'),(14,'2019-05-01','18:45:53','0832577467','5234 ขอนแก่น',16.4724,102.825,'ยางรั่ว',20,'เสร็จสิ้น'),(15,'2019-05-01','21:30:52','0896235853','กดพ 123 ขอนแก่น',16.4724,102.823,'สตาร์ทไม่ติด',50,'เสร็จสิ้น'),(16,'2019-05-01','21:52:07','0896235853','กดพ 123 ขอนแก่น',16.4724,102.823,'สตาร์ทไม่ติด',200,'เสร็จสิ้น'),(17,'2019-05-18','00:31:58','0896235853','กดพ 123 ขอนแก่น',16.4322,102.835,'สตาร์ทไม่ติด',0,'แจ้งซ่อม');
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
INSERT INTO `owner` VALUES ('0865850485','1234'),('0865850485','5678'),(NULL,'null'),(NULL,'0896235853'),(NULL,'0850053627'),('0800000001','1กณ'),('0800000001','1กณ ขอนแก่น'),('0800000001','2กณ 5234 ขอนแก่น'),('0850053627','กพด 142 ขอนแก่น'),('0642298917','กพ 8933'),('0832577467','test 1กณ 5234 ขอนแก่น'),('0846382334','พกด 123 กรุงเทพมหานคร'),('0832577467','5234 ขอนแก่น'),('0896235853','กดพ 123 ขอนแก่น');
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

-- Dump completed on 2019-05-19  2:27:53
