-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2024 at 03:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agrippa`
--

-- --------------------------------------------------------

--
-- Table structure for table `paciente`
--

CREATE TABLE `paciente` (
  `id_paciente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` int(11) NOT NULL,
  `telefono` bigint(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `edad` int(11) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `anamnesis` varchar(1000) NOT NULL,
  `evaluacion_inicial` varchar(1000) NOT NULL,
  `objetivos_terapeuticos` varchar(1000) NOT NULL,
  `tratamiento` varchar(1000) NOT NULL,
  `estudios` longblob NOT NULL,
  `sesiones` int(11) NOT NULL DEFAULT 1,
  `ses_remanentes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `nombre`, `apellido`, `dni`, `telefono`, `fecha_nacimiento`, `edad`, `fecha_ingreso`, `anamnesis`, `evaluacion_inicial`, `objetivos_terapeuticos`, `tratamiento`, `estudios`, `sesiones`, `ses_remanentes`) VALUES
(1, 'Omar', 'Roselli', 29555208, 2234379450, '1982-07-11', 41, '2024-04-22', 'Esta todo roto', 'Si, está todo roto', 'Arreglarlo', 'Entrenamiento', '', 10, 0),
(2, 'Malena', 'Griffiths', 31625325, 1158744291, '1985-07-01', 38, '2024-04-21', 'Es puerca', 'Si, es muy puerca', '', '', '', 8, 6),
(3, 'Matu', 'Venier', 54210961, 2494576229, '2014-08-28', 9, '2024-04-27', 'Cochina como la tia', 'Muy puerca', 'Que sea mas puerca', 'porquedad', '', 15, 11),
(7, 'carlos', 'test', 55555555, 44444444, '2024-05-10', 54, '2024-05-25', 'esta es la anamnesis', 'esta es la evaluacion inicial', 'Estos son los objetivos terapeuticos', 'Este es el tratamiento', 0x4172726179, 25, 25),
(8, 'Pepe', 'Poo', 213234, 234235235, '0000-00-00', 23, '0000-00-00', '', '', '', '', '', 4, 1),
(9, 'Winnie', 'Poo', 0, 0, '0000-00-00', 0, '0000-00-00', '', '', '', '', 0x4172726179, 4, 4),
(12, 'Pato', 'Lucas', 0, 0, '0000-00-00', 0, '0000-00-00', '', '', '', '', 0x4172726179, 0, 0),
(13, 'Mickey', 'Mouse', 0, 0, '0000-00-00', 0, '0000-00-00', '', '', '', '', 0x4172726179, 0, 0),
(14, 'nuevo', 'otro', 0, 0, '0000-00-00', 0, '0000-00-00', '', '', '', '', 0x4172726179, 0, 0),
(15, 'Segunda', 'Pruba', 0, 0, '0000-00-00', 0, '0000-00-00', '', '', '', '', 0x4172726179, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `turno`
--

CREATE TABLE `turno` (
  `fechaInicio` datetime NOT NULL,
  `paciente` int(11) NOT NULL,
  `inicio` time NOT NULL,
  `turno_id` int(11) NOT NULL,
  `final` time NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fechaFinal` datetime NOT NULL,
  `estado` varchar(50) NOT NULL,
  `numero_turno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `turno`
--

INSERT INTO `turno` (`fechaInicio`, `paciente`, `inicio`, `turno_id`, `final`, `nombre`, `fechaFinal`, `estado`, `numero_turno`) VALUES
('2024-05-14 09:00:00', 1, '09:00:00', 39, '09:40:00', 'Roselli, Omar', '2024-05-14 09:40:00', 'listo', 1),
('2024-05-14 09:40:00', 1, '09:40:00', 40, '10:20:00', 'Roselli, Omar', '2024-05-14 10:20:00', '', 2),
('2024-05-14 10:20:00', 1, '10:20:00', 41, '11:00:00', 'Roselli, Omar', '2024-05-14 11:00:00', '', 3),
('2024-05-14 09:00:00', 1, '09:00:00', 42, '09:40:00', 'Roselli, Omar', '2024-05-14 09:40:00', '', 4),
('2024-05-14 09:40:00', 1, '09:40:00', 43, '10:20:00', 'Roselli, Omar', '2024-05-14 10:20:00', '', 5),
('2024-05-14 10:20:00', 1, '10:20:00', 44, '11:00:00', 'Roselli, Omar', '2024-05-14 11:00:00', '', 6),
('2024-05-14 09:00:00', 1, '09:00:00', 45, '09:40:00', 'Roselli, Omar', '2024-05-14 09:40:00', '', 7),
('2024-05-14 09:40:00', 1, '09:40:00', 46, '10:20:00', 'Roselli, Omar', '2024-05-14 10:20:00', '', 8),
('2024-05-14 10:20:00', 1, '10:20:00', 47, '11:00:00', 'Roselli, Omar', '2024-05-14 11:00:00', '', 9),
('2024-05-14 10:20:00', 1, '10:20:00', 48, '11:00:00', 'Roselli, Omar', '2024-05-14 11:00:00', '', 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(100) NOT NULL,
  `pass_user` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `pass_user`) VALUES
(1, 'malenagriffiths@gmail.com', '$2y$10$X.NhwsrILBR87epH0RAMlOFdQTR/bqa8O1AskpM3ncI3Ndum7t5Xy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id_paciente`);

--
-- Indexes for table `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`turno_id`),
  ADD KEY `paciente` (`paciente`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `turno`
--
ALTER TABLE `turno`
  MODIFY `turno_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `turno`
--
ALTER TABLE `turno`
  ADD CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`paciente`) REFERENCES `paciente` (`id_paciente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
