CREATE TABLE `user` (
  `user_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password_hash` CHAR(64) NOT NULL,
  `salt` CHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(255) NOT NULL,
  `role` ENUM ('admin', 'owner', 'public', 'tenant') NOT NULL,
  `is_online` BOOLEAN NOT NULL DEFAULT 0,
  `is_verified` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username)
);

CREATE TABLE `accommodation` (
  `accom_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `owner_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `place_id` VARCHAR(50) NOT NULL,
  `type` ENUM ('hotel', 'apartment', 'bed space', 'dormitory', 'transient space') NOT NULL,
  `description` TEXT,
  `landmarks` TEXT,
  `size_sqm` FLOAT NOT NULL,
  `min_pax` INT NOT NULL,
  `max_pax` INT NOT NULL,
  `price_min` DECIMAL(10,2),
  `price_max` DECIMAL(10,2),
  `num_views` INT NOT NULL DEFAULT 0,
  `num_rooms` INT NOT NULL,
  `num_beds` INT NOT NULL,
  `num_cr` INT NOT NULL,
  `proximity` ENUM ('within campus', 'outside campus') NOT NULL,
  `furnishing` ENUM ('fully furnished', 'semi-furnished', 'unfurnished') NOT NULL,
  `appliances` ENUM ('complete', 'incomplete') NOT NULL,
  `fire_exit` ENUM ('available', 'not available') NOT NULL,
  `cctv` ENUM ('available', 'not available') NOT NULL,
  `internet` ENUM ('available', 'not available') NOT NULL,
  `air_conditioning` ENUM ('available', 'not available') NOT NULL,
  `bidet` ENUM ('available', 'not available') NOT NULL,
  `study_area` ENUM ('available', 'not available') NOT NULL,
  `cooking_rules` ENUM ('allowed', 'not allowed', 'with restrictions') NOT NULL,
  `pet_rules` ENUM ('allowed', 'not allowed', 'with restrictions') NOT NULL,
  `laundry_area` ENUM ('available', 'not available') NOT NULL,
  `cooking_area` ENUM ('available', 'not available') NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  `deleted_at` TIMESTAMP,
  `deleted_by` INT,
  `delete_reason` TEXT,
  INDEX idx_owner_id (owner_id),
  INDEX idx_type (type),
  INDEX idx_price_min_max (price_min, price_max),
  INDEX idx_pax_min_max (min_pax, max_pax),
  INDEX idx_proximity (proximity),
  INDEX idx_furnishing (furnishing),
  INDEX idx_appliances (appliances),
  INDEX idx_fire_exit (fire_exit),
  INDEX idx_cctv (cctv),
  INDEX idx_internet (internet),
  INDEX idx_aircon (air_conditioning),
  INDEX idx_bidet (bidet),
  INDEX idx_study_area (study_area),
  INDEX idx_cooking_rules (cooking_rules),
  INDEX idx_pet_rules (pet_rules),
  INDEX idx_laundry_area (laundry_area),
  INDEX idx_cooking_area (cooking_area)
);

-- allow for storing additional details about an accommodation, such as parking availability
CREATE TABLE `accommodation_details` (
  `details_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `accom_id` INT NOT NULL,
  `details_key` VARCHAR(50) NOT NULL,
  `details_value` VARCHAR(200) NOT NULL
);

CREATE TABLE `locations` (
  `location_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `type` ENUM ('campus', 'hospital', 'market') NOT NULL
);

-- INSERT INTO `locations` (`name`, `latitude`, `longitude`, `type`)
-- VALUES ('UPLB Campus', <latitude>, <longitude>, 'campus'),
--        ('Hospital 1', <latitude>, <longitude>, 'hospital'),
--        ('Hospital 2', <latitude>, <longitude>, 'hospital'),
--        ('Market 1', <latitude>, <longitude>, 'market'),
--       ('Market 2', <latitude>, <longitude>, 'market');

-- REPORT FOR USERS END
CREATE TABLE admin_report (
    `report_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `report_name` VARCHAR(100) NOT NULL,
    `report_file` VARCHAR(100) NOT NULL,
    `report_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the summary table to store the summary of results based on price/type/location/etc
CREATE TABLE admin_report_summary (
    `summary_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `type` ENUM('hotel', 'apartment', 'bed space', 'dormitory', 'transient space') NOT NULL,
    `location` ENUM('within campus', 'outside campus') NOT NULL,
    `price_range` VARCHAR(10) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

-- Create a report pdf file
-- SELECT a.name, a.type, a.price_min, a.price_max, a.proximity, a.furnishing, a.bed_space, a.num_rooms, a.num_cr, a.size_sqm, a.owner_id, s.price_range, s.type, s.location
-- FROM accommodation AS a
-- JOIN admin_report_summary AS s ON a.type = s.type AND a.proximity = s.location
-- WHERE a.is_deleted = FALSE
-- ORDER BY a.type, a.proximity, a.price_min;
-- INSERT INTO admin_report (report_name, report_file, report_date)
-- VALUES ('Accommodation Report', 'accommodation_report.pdf', NOW());

-- REPORT FOR ACCOMODATION OWNERS END
CREATE TABLE `owner_report` (
  `report_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `accommodation_type` ENUM ('hotel', 'apartment', 'bed space', 'dormitory', 'transient space'),
  `location` ENUM ('within campus', 'outside campus'),
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

CREATE TABLE `owner_accommodation_report` (
  `report_id` INT PRIMARY KEY NOT NULL,
  `accom_id` INT NOT NULL,
  `overdue_rent` FLOAT NOT NULL DEFAULT 0,
  `total_cash_received` FLOAT NOT NULL DEFAULT 0,
  `projected_income_per_month` FLOAT NOT NULL DEFAULT 0,
  `unpaid_rent` FLOAT NOT NULL DEFAULT 0
);

-- Custom report filters
CREATE TABLE `report_filters` (
  `filter_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `filter_name` VARCHAR(50) NOT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE `report_filter_values` (
  `filter_value_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `filter_id` INT NOT NULL,
  `filter_value` VARCHAR(50) NOT NULL
);

CREATE TABLE archived_accommodation (
  `archived_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `accom_id` INT NOT NULL,
  `archived_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `archived_by` INT NOT NULL,
  `reason` TEXT
);

CREATE TABLE bookmark (
  `interested_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `accom_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `message` (
  `message_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `recipient_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `sent_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `notification` (
  `notification_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `message` TEXT NOT NULL,
  `is_read` BOOLEAN NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL
);

CREATE TABLE `forum` (
  `forum_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `accom_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `content` TEXT NOT NULL,
  `status` ENUM ('active', 'archived', 'deleted') NOT NULL
);

CREATE TABLE `review` (
  `review_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `accom_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` INT NOT NULL,
  `safety_rating` ENUM ('very safe', 'safe', 'somewhat safe', 'unsafe', 'very unsafe') NOT NULL,
  `cleanliness` ENUM ('very clean', 'clean', 'somewhat clean', 'dirty', 'very dirty') NOT NULL,
  `content` TEXT NOT NULL,
  `status` ENUM ('active', 'archived', 'deleted') NOT NULL
);

CREATE TABLE `booking` (
  `booking_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `booking_date` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `accom_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `move_in_date` DATE,
  `move_out_date` DATE,
  `notes` TEXT,
  `status` ENUM ('pending', 'approved', 'rejected', 'cancelled') NOT NULL,
  `is_soft_deleted` BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE `image` (
  `image_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255),
  `file_name` VARCHAR(255),
  `caption` TEXT,
  `accom_id` INT NOT NULL
);

ALTER TABLE `accommodation` ADD FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `accommodation` ADD FOREIGN KEY (`deleted_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `message` ADD FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `message` ADD FOREIGN KEY (`recipient_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `admin_report` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `owner_report` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `forum` ADD FOREIGN KEY (`accom_id`) REFERENCES `accommodation` (`accom_id`) ON DELETE CASCADE;

ALTER TABLE `forum` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `review` ADD FOREIGN KEY (`accom_id`) REFERENCES `accommodation` (`accom_id`) ON DELETE CASCADE;

ALTER TABLE `review` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `notification` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `report_filter_values` ADD FOREIGN KEY (`filter_id`) REFERENCES `report_filters` (`filter_id`);

ALTER TABLE `image` ADD FOREIGN KEY (`accom_id`) REFERENCES `accommodation` (`accom_id`)  ON DELETE CASCADE;

ALTER TABLE `accommodation_details` ADD FOREIGN KEY (`accom_id`) REFERENCES `accommodation` (`accom_id`) ON DELETE CASCADE;

ALTER TABLE `owner_accommodation_report` ADD FOREIGN KEY (`accom_id`) REFERENCES `accommodation` (`accom_id`) ON DELETE CASCADE;

ALTER TABLE `owner_accommodation_report` ADD FOREIGN KEY (`report_id`) REFERENCES `owner_report` (`report_id`) ON DELETE CASCADE;

ALTER TABLE `archived_accommodation` ADD FOREIGN KEY (`accom_id`) REFERENCES `accommodation` (`accom_id`) ON DELETE CASCADE;

ALTER TABLE `archived_accommodation` ADD FOREIGN KEY (`archived_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `bookmark` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `bookmark` ADD FOREIGN KEY (`accom_id`) REFERENCES `accommodation` (`accom_id`) ON DELETE CASCADE;

ALTER TABLE `booking` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `booking` ADD FOREIGN KEY (`accom_id`) REFERENCES `accommodation` (`accom_id`) ON DELETE CASCADE;
