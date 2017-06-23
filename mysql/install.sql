-- MySQL Script generated by MySQL Workbench
-- 06/23/17 14:43:42
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema gagscraper
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gagscraper
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gagscraper` DEFAULT CHARACTER SET utf8 ;
USE `gagscraper` ;

-- -----------------------------------------------------
-- Table `gagscraper`.`subscriber`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gagscraper`.`subscriber` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gagscraper`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gagscraper`.`post` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(12) NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gagscraper`.`scraps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gagscraper`.`scraps` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_scrap` INT UNSIGNED NOT NULL,
  `upvotes` INT(6) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `scraps_post_idx` (`id_scrap` ASC),
  CONSTRAINT `scraps_post`
    FOREIGN KEY (`id_scrap`)
    REFERENCES `gagscraper`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
