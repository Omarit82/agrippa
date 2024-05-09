-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2024 a las 19:06:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agrippa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
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
  `sesiones` int(11) NOT NULL,
  `ses_completas` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `nombre`, `apellido`, `dni`, `telefono`, `fecha_nacimiento`, `edad`, `fecha_ingreso`, `anamnesis`, `evaluacion_inicial`, `objetivos_terapeuticos`, `tratamiento`, `estudios`, `sesiones`, `ses_completas`) VALUES
(1, 'Omar', 'Roselli', 29555208, 2234379450, '1982-07-11', 41, '2024-04-22', 'Esta todo roto', 'Si, está todo roto', 'Arreglarlo', 'Entrenamiento', '', 10, 0),
(2, 'Malena', 'Griffiths', 31625325, 1158744291, '1985-07-01', 38, '2024-04-21', 'Es puerca', 'Si, es muy puerca', '', '', '', 8, 0),
(3, 'Matu', 'Venier', 54210961, 2494576229, '2014-08-28', 9, '2024-04-27', 'Cochina como la tia', 'Muy puerca', 'Que sea mas puerca', 'porquedad', '', 15, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno`
--

CREATE TABLE `turno` (
  `date` date NOT NULL,
  `paciente` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `id_horario` int(11) NOT NULL,
  `sesiones_totales` int(11) NOT NULL,
  `turno_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(100) NOT NULL,
  `pass_user` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `pass_user`) VALUES
(1, 'malenagriffiths@gmail.com', '$2y$10$X.NhwsrILBR87epH0RAMlOFdQTR/bqa8O1AskpM3ncI3Ndum7t5Xy');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id_paciente`);

--
-- Indices de la tabla `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`turno_id`),
  ADD KEY `paciente` (`paciente`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `turno_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `turno`
--
ALTER TABLE `turno`
  ADD CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`paciente`) REFERENCES `paciente` (`id_paciente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
