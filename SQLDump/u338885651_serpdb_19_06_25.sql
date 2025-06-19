-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 19, 2025 at 10:47 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u338885651_serpdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
CREATE TABLE IF NOT EXISTS `campaigns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `campaign_name` varchar(255) NOT NULL,
  `domain_name` varchar(255) NOT NULL,
  `keywords` text NOT NULL,
  `search_engine` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `campaign_name`, `domain_name`, `keywords`, `search_engine`, `created_at`, `user_id`) VALUES
(1, 'trollfree', 'trollfreeroads.in', 'troll,roads', 'Google', '2025-03-11 05:00:07', 0),
(2, 'example1', 'http://example1.com', 'ex', 'Yahoo', '2025-03-11 05:17:43', 1),
(3, 'example2', 'example2.com', 'exam2', 'Bing', '2025-03-11 05:33:53', 1),
(4, 'bangalore', 'http://bangaloreNews.com', 'banga', 'DuckDuckGo', '2025-03-11 05:39:37', 1),
(5, 'bangaloretourist', 'http://bangaloretourist.com', 'bangalore,tourist', 'DuckDuckGo', '2025-03-11 05:49:16', 1),
(6, 'keralatourist', 'http://keralatourist.com', 'kerala,tourist', 'Google', '2025-03-11 06:05:43', 1),
(7, 'bangaloretourist', 'http://bangaloretouristplaces.com', 'bangalore,tourist', 'Bing', '2025-03-11 06:06:57', 1),
(17, 'keralaMostfamoussss', 'http://keralatourist.com', 'kerala,most', 'Bing', '2025-03-13 05:46:33', 1),
(9, 'keralaMostfamous', 'http://keralatourist.com', 'kerala,most', 'Google', '2025-03-11 06:11:38', 1),
(10, 'keralatourist', 'http://keralatourist.com', 'kerala,tourist', 'Google', '2025-03-11 06:15:19', 1),
(11, 'BestPlaces', 'http://BestTouristPlaces.com', 'Tourist', 'DuckDuckGo', '2025-03-11 07:24:24', 5),
(12, 'swiggy', 'swiggy.in', 'swig', 'Bing', '2025-03-11 10:51:40', 5),
(13, 'newskerala', 'http://newskerala.com', 'news,kerala', 'Yahoo', '2025-03-11 11:43:44', 1),
(14, 'mriscanbangalore', 'mriscanbangalore.com', 'mri scan in bangalore ggg', 'Bing', '2025-03-12 07:25:53', 1);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `login_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `ip_address` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `user_id`, `email`, `login_time`, `ip_address`) VALUES
(1, 1, 'rajesh@gmail.com', '2025-03-11 06:30:35', '::1'),
(2, 5, '2317010ARYA@staloysius.ac.in', '2025-03-11 06:35:23', '::1'),
(3, 5, '2317010ARYA@staloysius.ac.in', '2025-03-11 07:23:25', '::1'),
(4, 5, '2317010ARYA@staloysius.ac.in', '2025-03-11 09:14:48', '::1'),
(5, 5, '2317010ARYA@staloysius.ac.in', '2025-03-11 10:36:08', '::1'),
(6, 5, '2317010ARYA@staloysius.ac.in', '2025-03-11 11:25:06', '::1'),
(7, 1, 'rajesh@gmail.com', '2025-03-11 11:29:28', '::1'),
(8, 1, 'rajesh@gmail.com', '2025-03-11 11:39:55', '::1'),
(9, 1, 'rajesh@gmail.com', '2025-03-12 05:16:39', '::1'),
(10, 1, 'rajesh@gmail.com', '2025-03-12 06:45:05', '::1'),
(11, 1, 'rajesh@gmail.com', '2025-03-13 05:11:58', '::1'),
(12, 1, 'rajesh@gmail.com', '2025-03-17 04:50:15', '::1'),
(13, 1, 'rajesh@gmail.com', '2025-03-17 09:01:34', '::1'),
(14, 1, 'rajesh@gmail.com', '2025-03-17 10:42:41', '::1'),
(15, 1, 'rajesh@gmail.com', '2025-03-17 11:55:29', '::1'),
(16, 1, 'rajesh@gmail.com', '2025-03-18 04:58:28', '::1'),
(17, 1, 'rajesh@gmail.com', '2025-03-19 05:11:38', '::1'),
(18, 1, 'rajesh@gmail.com', '2025-03-19 05:34:57', '::1'),
(19, 1, 'rajesh@gmail.com', '2025-03-19 07:45:52', '::1'),
(20, 1, 'rajesh@gmail.com', '2025-03-20 04:49:51', '::1'),
(21, 1, 'rajesh@gmail.com', '2025-03-20 11:45:44', '::1'),
(22, 1, 'rajesh@gmail.com', '2025-03-20 11:57:17', '::1'),
(23, 1, 'rajesh@gmail.com', '2025-03-20 12:59:19', '::1'),
(24, 1, 'rajesh@gmail.com', '2025-03-21 04:55:41', '::1'),
(25, 1, 'rajesh@gmail.com', '2025-03-24 05:42:34', '::1'),
(26, 1, 'rajesh@gmail.com', '2025-03-25 05:17:04', '::1'),
(27, 1, 'rajesh@gmail.com', '2025-03-25 14:49:01', '::1'),
(28, 1, 'rajesh@gmail.com', '2025-03-26 04:51:19', '::1'),
(29, 1, 'rajesh@gmail.com', '2025-03-26 12:27:32', '::1'),
(30, 1, 'rajesh@gmail.com', '2025-03-26 16:13:51', '::1'),
(31, 1, 'rajesh@gmail.com', '2025-03-27 05:10:45', '::1'),
(32, 1, 'rajesh@gmail.com', '2025-03-27 05:36:32', '::1'),
(33, 1, 'rajesh@gmail.com', '2025-03-28 05:07:57', '::1'),
(34, 1, 'rajesh@gmail.com', '2025-03-28 11:37:51', '::1'),
(35, 1, 'rajesh@gmail.com', '2025-03-31 05:00:10', '::1'),
(36, 1, 'rajesh@gmail.com', '2025-03-31 13:06:17', '::1'),
(37, 1, 'rajesh@gmail.com', '2025-03-31 15:30:55', '::1'),
(38, 1, 'rajesh@gmail.com', '2025-04-01 05:24:36', '::1'),
(39, 1, 'rajesh@gmail.com', '2025-04-02 05:13:47', '::1'),
(40, 1, 'rajesh@gmail.com', '2025-04-03 05:45:46', '::1'),
(41, 1, 'rajesh@gmail.com', '2025-04-04 05:04:46', '::1'),
(42, 1, 'rajesh@gmail.com', '2025-04-04 07:52:11', '::1'),
(43, 1, 'rajesh@gmail.com', '2025-04-05 15:40:39', '::1'),
(44, 1, 'rajesh@gmail.com', '2025-04-05 19:31:45', '::1'),
(45, 1, 'rajesh@gmail.com', '2025-04-06 11:58:06', '::1'),
(46, 1, 'rajesh@gmail.com', '2025-04-06 12:30:40', '::1'),
(47, 1, 'rajesh@gmail.com', '2025-04-06 12:40:24', '::1'),
(48, 1, 'rajesh@gmail.com', '2025-04-06 12:44:09', '::1'),
(49, 1, 'rajesh@gmail.com', '2025-04-06 13:05:52', '::1'),
(50, 1, 'rajesh@gmail.com', '2025-04-07 05:03:39', '::1'),
(51, 5, '2317010ARYA@staloysius.ac.in', '2025-04-07 05:03:55', '::1'),
(52, 1, 'rajesh@gmail.com', '2025-04-07 05:04:07', '::1'),
(53, 1, 'rajesh@gmail.com', '2025-04-08 05:21:40', '::1'),
(54, 1, 'rajesh@gmail.com', '2025-04-08 15:39:53', '::1'),
(55, 1, 'rajesh@gmail.com', '2025-04-09 05:03:13', '::1'),
(56, 1, 'rajesh@gmail.com', '2025-04-10 05:09:03', '::1'),
(57, 1, 'rajesh@gmail.com', '2025-04-15 06:41:46', '::1'),
(58, 1, 'rajesh@gmail.com', '2025-04-16 05:20:42', '::1'),
(59, 1, 'rajesh@gmail.com', '2025-04-16 10:39:07', '::1'),
(60, 1, 'rajesh@gmail.com', '2025-04-17 05:26:16', '::1'),
(61, 1, 'rajesh@gmail.com', '2025-04-21 04:49:25', '::1'),
(62, 1, 'rajesh@gmail.com', '2025-04-22 05:03:12', '::1'),
(63, 1, 'rajesh@gmail.com', '2025-04-23 10:12:41', '::1'),
(64, 1, 'rajesh@gmail.com', '2025-04-23 11:45:15', '::1'),
(65, 1, 'rajesh@gmail.com', '2025-04-23 13:12:13', '::1'),
(66, 1, 'rajesh@gmail.com', '2025-04-25 14:00:23', '::1'),
(67, 1, 'rajesh@gmail.com', '2025-04-25 14:08:37', '::1'),
(68, 1, 'rajesh@gmail.com', '2025-04-25 14:13:41', '::1'),
(69, 1, 'rajesh@gmail.com', '2025-04-25 14:21:30', '::1'),
(70, 1, 'rajesh@gmail.com', '2025-04-25 14:23:56', '::1'),
(71, 1, 'rajesh@gmail.com', '2025-04-27 09:41:39', '::1'),
(72, 1, 'rajesh@gmail.com', '2025-04-28 06:19:55', '::1'),
(73, 1, 'rajesh@gmail.com', '2025-04-28 06:20:32', '::1'),
(74, 1, 'rajesh@gmail.com', '2025-04-28 06:22:17', '::1'),
(75, 1, 'rajesh@gmail.com', '2025-04-28 06:29:45', '::1'),
(76, 1, 'rajesh@gmail.com', '2025-04-28 06:38:39', '::1'),
(77, 1, 'rajesh@gmail.com', '2025-04-28 07:46:53', '::1'),
(78, 1, 'rajesh@gmail.com', '2025-04-28 07:47:53', '::1'),
(79, 1, 'rajesh@gmail.com', '2025-04-28 11:07:05', '::1'),
(80, 1, 'rajesh@gmail.com', '2025-04-28 11:07:55', '::1'),
(81, 1, 'rajesh@gmail.com', '2025-04-28 11:27:08', '::1'),
(82, 1, 'rajesh@gmail.com', '2025-04-29 05:47:48', '::1'),
(83, 1, 'rajesh@gmail.com', '2025-04-30 06:31:19', '::1'),
(84, 1, 'rajesh@gmail.com', '2025-05-02 10:10:22', '::1'),
(85, 1, 'rajesh@gmail.com', '2025-05-04 14:38:08', '::1'),
(86, 1, 'rajesh@gmail.com', '2025-05-04 20:29:11', '::1'),
(87, 1, 'rajesh@gmail.com', '2025-05-04 20:40:01', '::1'),
(88, 1, 'rajesh@gmail.com', '2025-05-05 06:50:12', '::1'),
(89, 1, 'rajesh@gmail.com', '2025-05-05 10:17:58', '::1'),
(90, 1, 'rajesh@gmail.com', '2025-05-05 10:20:32', '::1'),
(91, 1, 'rajesh@gmail.com', '2025-05-05 10:21:19', '::1'),
(92, 1, 'rajesh@gmail.com', '2025-05-05 10:26:55', '::1'),
(93, 1, 'rajesh@gmail.com', '2025-05-05 10:29:04', '::1'),
(94, 1, 'rajesh@gmail.com', '2025-05-05 11:16:40', '::1'),
(95, 1, 'rajesh@gmail.com', '2025-05-05 11:26:31', '::1'),
(96, 1, 'rajesh@gmail.com', '2025-05-05 11:38:15', '::1'),
(97, 1, 'rajesh@gmail.com', '2025-05-06 06:10:12', '::1'),
(98, 1, 'rajesh@gmail.com', '2025-05-06 06:28:15', '::1'),
(99, 1, 'rajesh@gmail.com', '2025-05-06 10:45:02', '::1'),
(100, 1, 'rajesh@gmail.com', '2025-05-06 10:51:02', '::1'),
(101, 1, 'rajesh@gmail.com', '2025-05-06 12:34:03', '::1'),
(102, 1, 'rajesh@gmail.com', '2025-05-07 05:25:43', '::1'),
(103, 1, 'rajesh@gmail.com', '2025-05-07 05:38:59', '::1'),
(104, 1, 'rajesh@gmail.com', '2025-05-07 08:11:39', '::1'),
(105, 1, 'rajesh@gmail.com', '2025-05-07 09:20:31', '::1'),
(106, 1, 'rajesh@gmail.com', '2025-05-07 10:08:25', '::1'),
(107, 1, 'rajesh@gmail.com', '2025-05-07 11:38:21', '::1'),
(108, 1, 'rajesh@gmail.com', '2025-05-07 14:12:18', '::1'),
(109, 1, 'rajesh@gmail.com', '2025-05-07 18:09:02', '::1'),
(110, 1, 'rajesh@gmail.com', '2025-05-08 06:07:33', '::1'),
(111, 1, 'rajesh@gmail.com', '2025-05-08 06:57:11', '::1'),
(112, 1, 'rajesh@gmail.com', '2025-05-08 11:43:49', '::1'),
(113, 1, 'rajesh@gmail.com', '2025-05-09 05:31:24', '::1'),
(114, 5, '2317010ARYA@staloysius.ac.in', '2025-05-09 07:40:54', '::1'),
(115, 1, 'rajesh@gmail.com', '2025-05-09 11:04:55', '::1'),
(116, 5, '2317010ARYA@staloysius.ac.in', '2025-05-09 11:06:03', '::1'),
(117, 1, 'rajesh@gmail.com', '2025-05-09 12:13:22', '::1'),
(118, 1, 'rajesh@gmail.com', '2025-05-09 12:18:41', '::1'),
(119, 1, 'rajesh@gmail.com', '2025-05-09 13:17:24', '::1'),
(120, 1, 'rajesh@gmail.com', '2025-05-12 05:48:54', '::1'),
(121, 1, 'rajesh@gmail.com', '2025-05-15 05:50:55', '::1'),
(122, 1, 'rajesh@gmail.com', '2025-05-15 06:05:13', '::1'),
(123, 1, 'rajesh@gmail.com', '2025-05-16 06:58:55', '::1'),
(124, 1, 'rajesh@gmail.com', '2025-05-16 07:14:09', '::1'),
(125, 7, 'aryathulicheri@gmail.com', '2025-05-19 06:55:47', '::1'),
(126, 1, 'rajesh@gmail.com', '2025-05-20 04:44:23', '::1'),
(127, 1, 'rajesh@gmail.com', '2025-05-20 05:20:04', '::1'),
(128, 1, 'rajesh@gmail.com', '2025-05-20 05:20:12', '::1'),
(129, 1, 'rajesh@gmail.com', '2025-05-20 05:20:14', '::1'),
(130, 1, 'rajesh@gmail.com', '2025-05-20 05:20:47', '::1'),
(131, 1, 'rajesh@gmail.com', '2025-05-20 05:37:03', '::1'),
(132, 1, 'rajesh@gmail.com', '2025-05-20 05:51:50', '::1'),
(133, 1, 'rajesh@gmail.com', '2025-05-20 13:22:03', '::1'),
(134, 1, 'rajesh@gmail.com', '2025-05-20 13:28:07', '::1'),
(135, 1, 'rajesh@gmail.com', '2025-05-21 11:55:50', '::1'),
(136, 7, 'aryathulicheri@gmail.com', '2025-05-22 11:21:12', '::1'),
(137, 7, 'aryathulicheri@gmail.com', '2025-05-23 04:48:15', '::1'),
(138, 1, 'rajesh@gmail.com', '2025-06-05 05:33:10', '::1'),
(139, 7, 'aryathulicheri@gmail.com', '2025-06-10 06:10:13', '::1'),
(140, 7, 'aryathulicheri@gmail.com', '2025-06-10 07:24:50', '::1'),
(141, 7, 'aryathulicheri@gmail.com', '2025-06-10 07:29:32', '::1'),
(142, 7, 'aryathulicheri@gmail.com', '2025-06-10 11:51:51', '::1'),
(143, 7, 'aryathulicheri@gmail.com', '2025-06-10 11:53:01', '::1'),
(144, 7, 'aryathulicheri@gmail.com', '2025-06-10 11:55:59', '::1'),
(145, 7, 'aryathulicheri@gmail.com', '2025-06-10 11:58:34', '::1'),
(146, 7, 'aryathulicheri@gmail.com', '2025-06-10 12:28:29', '::1'),
(147, 7, 'aryathulicheri@gmail.com', '2025-06-10 12:58:06', '::1'),
(148, 7, 'aryathulicheri@gmail.com', '2025-06-11 07:25:00', '::1'),
(149, 7, 'aryathulicheri@gmail.com', '2025-06-11 09:51:22', '::1'),
(150, 7, 'aryathulicheri@gmail.com', '2025-06-11 10:24:52', '::1'),
(151, 7, 'aryathulicheri@gmail.com', '2025-06-13 10:39:04', '::1'),
(152, 7, 'aryathulicheri@gmail.com', '2025-06-17 07:45:20', '::1'),
(153, 7, 'aryathulicheri@gmail.com', '2025-06-17 08:00:23', '::1'),
(154, 7, 'aryathulicheri@gmail.com', '2025-06-17 08:08:11', '::1'),
(155, 10, '2317011ashika@staloysius.ac.in', '2025-06-18 11:02:40', '::1'),
(156, 10, '2317011ashika@staloysius.ac.in', '2025-06-18 11:09:32', '::1'),
(157, 10, '2317011ashika@staloysius.ac.in', '2025-06-18 12:53:38', '::1'),
(158, 12, 'aryathulicheri@gmail.com', '2025-06-18 19:42:41', '::1'),
(159, 12, 'aryathulicheri@gmail.com', '2025-06-18 19:46:38', '::1'),
(160, 14, 'aryathulicheri@gmail.com', '2025-06-18 20:58:31', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `saved_campaigns`
--

DROP TABLE IF EXISTS `saved_campaigns`;
CREATE TABLE IF NOT EXISTS `saved_campaigns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `campaign_name` varchar(255) NOT NULL,
  `domain_name` varchar(255) NOT NULL,
  `keywords` text NOT NULL,
  `search_engine` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `saved_campaigns`
--

INSERT INTO `saved_campaigns` (`id`, `user_id`, `campaign_name`, `domain_name`, `keywords`, `search_engine`, `created_at`, `updated_at`) VALUES
(50, 7, 'mri-scan-narayanpura', 'mriscanbangalore.com', 'mri-scan-narayanpura', 'Google', '2025-05-22 11:21:52', '2025-05-22 11:21:52'),
(3, 5, 'BestPlaces', 'http://BestTouristPlaces.com', 'Tourist', 'DuckDuckGo', '2025-03-11 07:24:10', '2025-03-11 07:24:10'),
(4, 5, 'swiggy', 'swiggy.in', 'swig', 'Bing', '2025-03-11 10:51:25', '2025-03-11 10:51:25'),
(45, 1, 'mriscan_narayanpura_banglr', 'mriscanbangalore.com', 'MRI-scan-abbigere , MRI-scan-aecs-layout-a-block,MRI-scan-aecs-layout,MRI-scan-a-dasarahalli,MRI-scan-aavalahalli,MRI-scan-abbaiah-reddy-layout,MRI-scan-a-narayanapura,hormonal-studies-lab-near-my-location,MRI-scan-hullegowdana-halli,CT-scan-kakolu', 'Google', '2025-03-25 07:56:31', '2025-05-08 11:59:57'),
(44, 1, 'mriscan_narayanpura', 'mriscanbangalore.com', 'mri-scan-in-narayanpura-bangalore', 'Google', '2025-03-25 07:49:31', '2025-05-12 06:52:29'),
(56, 1, 'mriscan', 'bookmyscans.com', 'mriscanbangalore', 'Google', '2025-06-06 12:55:54', '2025-06-09 12:16:20'),
(57, 10, 'mri', 'serp.zieers.com', 'serp', 'Google', '2025-06-18 11:03:18', '2025-06-18 11:03:18'),
(53, 7, 'mriscannarayanpura', 'mriscanbangalore.com', 'mri-scan-narayanpura', 'Google', '2025-06-03 07:45:15', '2025-06-03 07:45:15'),
(58, 12, 'mriscan', 'mriscannarayanpura.com', 'mriscannarayanpura', 'Google', '2025-06-18 19:43:29', '2025-06-18 19:43:29'),
(59, 14, 'mriscan', 'mriscannarayanpura.com', 'mriscannarayanpura', 'Google', '2025-06-18 20:59:08', '2025-06-18 20:59:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `ix_users_id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `timestamp`) VALUES
(1, 'rajesh', 'rajesh@gmail.com', '$2y$10$fCi0o4ZQmwGzKDrzmEz1bOOwb5Yzp5HAEFBIzedQ3BColaXcvAAvi', '2025-03-10 06:55:21'),
(14, 'arya', 'aryathulicheri@gmail.com', '$2y$10$OWYvQ7hPayt7b61GoGtHjuGzkCzLLaodopkNHrYfZt.W1I/oaxyB.', '2025-06-18 20:58:22'),
(15, 'aryat', '2317010arya@staloysius.ac.in', '$2y$10$iRkvb/EDh7NfsA.gHkNJeOJ8aLhrUvfJdnSENkcfDSRvd93huIPlm', '2025-06-18 21:01:45');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
