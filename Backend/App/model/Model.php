<?php

class Model{
    
    private $db;  
    
    function __construct(){
        $this->db = $this->connect();
        /** Auto deploy */
        $this->_deploy();
    }

    private function connect(){
        return new PDO('mysql:host=localhost;dbname=agrippa;charset=utf8', 'root', '');
    }
    
    private function _deploy(){
        $query = $this->db->query('SHOW TABLES');
        $tables = $query->fetchAll();
        if(count($tables)==0){
            $sql =<<<END
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
              `sesiones` int(11) NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
            
            --
            -- Dumping data for table `paciente`
            --
            
            INSERT INTO `paciente` (`id_paciente`, `nombre`, `apellido`, `dni`, `telefono`, `fecha_nacimiento`, `edad`, `fecha_ingreso`, `anamnesis`, `evaluacion_inicial`, `objetivos_terapeuticos`, `tratamiento`, `estudios`, `sesiones`) VALUES
            (1, 'Omar', 'Roselli', 29555208, 2234379450, '1982-07-11', 41, '2024-04-22', 'Esta todo roto', 'Si, está todo roto', 'Arreglarlo', 'Entrenamiento', '', 10),
            (2, 'Malena', 'Griffiths', 31625325, 1158744291, '1985-07-01', 38, '2024-04-21', 'Es puerca', 'Si, es muy puerca', '', '', '', 8),
            (3, 'Matu', 'Venier', 54210961, 2494576229, '2014-08-28', 9, '2024-04-27', 'Cochina como la tia', 'Muy puerca', 'Que sea mas puerca', 'porquedad', '', 15);
            
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
            (1, 'malenagriffiths@gmail.com', '$2y$10\$X.NhwsrILBR87epH0RAMlOFdQTR/bqa8O1AskpM3ncI3Ndum7t5Xy');
            
            --
            -- Indexes for dumped tables
            --
            
            --
            -- Indexes for table `paciente`
            --
            ALTER TABLE `paciente`
              ADD PRIMARY KEY (`id_paciente`);
            
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
              MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
            
            --
            -- AUTO_INCREMENT for table `users`
            --
            ALTER TABLE `users`
              MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
            COMMIT;
            END;
            $this->db->query($sql);
        }
    }

    function lista(){
        $sentencia = $this->db->prepare( "select * from paciente");
        $sentencia->execute();
        return $sentencia->fetchAll(PDO::FETCH_OBJ);
    }
    function eventos(){
        $sentencia = $this->db->prepare("select * from turno");
        $sentencia->execute();
        return $sentencia->fetchAll(PDO::FETCH_OBJ);
    }

    function getUser($user){
        $query = $this->db->prepare("select * from users where name_user=?");
        $query->execute(array($user));
        return $query->fetchAll(PDO:: FETCH_OBJ);
    }

    function addPaciente($new){
      $query = $this->db->prepare("INSERT INTO paciente(nombre,apellido,dni,telefono,fecha_nacimiento,edad,fecha_ingreso,anamnesis,evaluacion_inicial,objetivos_terapeuticos,tratamiento,estudios,sesiones)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)");
      $query->execute(array($new['nombre'],$new['apellido'],$new['dni'],$new['telefono'],$new['fechaNacimiento'],$new['edad'],$new['fechaIngreso'],$new['anamnesis'],$new['evaluacion'],$new['objetivos'],$new['tratamiento'],$new['estudios'],$new['sesiones']));
      header('Location: '.HOME);
      die();
    }
}