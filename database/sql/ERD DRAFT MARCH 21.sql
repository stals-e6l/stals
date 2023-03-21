-- Create the users table to store user information
CREATE TABLE `user` (
  `user_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password_hash` CHAR(64) NOT NULL,
  `salt` CHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(255) NOT NULL,
  `role` ENUM ('admin', 'owner', 'public', 'tenant') NOT NULL,
  `is_online` BOOLEAN NOT NULL DEFAULT FALSE,
  `is_verified` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX idx_email (email)
);
-- Create the accommodations table to store accommodation information
CREATE TABLE `accommodation` (
  `accommodation_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `owner_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `place_id` VARCHAR(50) NOT NULL,
  `type` ENUM (
    'hotel',
    'apartment',
    'bed space',
    'dormitory',
    'transient space'
  ) NOT NULL,
  `description` TEXT,
  `landmarks` TEXT,
  `size_sqm` FLOAT NOT NULL,
  `min_pax` INT NOT NULL,
  `max_pax` INT NOT NULL,
  `price_min` DECIMAL(10, 2),
  `price_max` DECIMAL(10, 2),
  `num_views` INT NOT NULL DEFAULT 0,
  `num_rooms` INT NOT NULL,
  `num_beds` INT NOT NULL,
  `num_cr` INT NOT NULL,
  `location` ENUM ('within campus', 'outside campus') NOT NULL,
  `furnishing` ENUM (
    'fully furnished',
    'semi-furnished',
    'unfurnished'
  ) NOT NULL,
  `cooking_rules` ENUM ('allowed', 'not allowed', 'with restrictions') NOT NULL,
  `pet_rules` ENUM ('allowed', 'not allowed', 'with restrictions') NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  `deleted_at` DATETIME,
  `deleted_by` INT,
  `delete_reason` TEXT,
  INDEX idx_owner_id (owner_id),
  INDEX idx_type (`type`),
  INDEX idx_price_range (price_min, price_max),
  INDEX idx_pax_min_max (min_pax, max_pax),
  INDEX idx_location (`location`),
  CONSTRAINT `fk_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_deleted_by` FOREIGN KEY (`deleted_by`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
);
-- Allow for storing additional details about an accommodation, such as parking availability
CREATE TABLE `accommodation_details` (
  `details_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `accommodation_id` INT NOT NULL,
  `details_key` VARCHAR(50) NOT NULL,
  `details_value` VARCHAR(200) NOT NULL,
  FOREIGN KEY (`accommodation_id`) REFERENCES `accommodation` (`accommodation_id`)
);
-- Create the amenities table to store amenities information
CREATE TABLE `amenities` (
  amenities_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);
-- Create the accommodation_amenities table to store the many-to-many relationship between accommodations and amenities
CREATE TABLE `accommodation_amenities` (
  accommodation_id INT NOT NULL,
  amenities_id INT NOT NULL,
  PRIMARY KEY (accommodation_id, amenities_id),
  CONSTRAINT `fk_accommodation_id` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodation` (`accommodation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_amenities_id` FOREIGN KEY (`amenities_id`) REFERENCES `amenities` (`amenities_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Create the appliances table to store appliances information
CREATE TABLE `appliances` (
  `appliances_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL
);
-- Create the accommodation_appliances table to store the many-to-many relationship between accommodations and appliances
CREATE TABLE accommodation_appliances (
  accommodation_id INT NOT NULL,
  appliances_id INT NOT NULL,
  PRIMARY KEY (accommodation_id, appliances_id),
  CONSTRAINT `fk_accommodation_id` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodation` (`accommodation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_appliances_id` FOREIGN KEY (`appliances_id`) REFERENCES `appliances` (`appliances_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Create the locations table to store location information
CREATE TABLE `locations` (
  `location_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `type` ENUM ('campus', 'hospital', 'market') NOT NULL
);
-- generate pdf reports that includes important details about available accommodations such as price range, location, accessibility, landmarks, etc.
-- the report should contain a summary of results based on selected criteria that also sorts based on price/type/location/etc.
CREATE TABLE report (
  `report_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `report_name` VARCHAR(100) NOT NULL,
  `report_file` VARCHAR(100) NOT NULL,
  `report_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

-- Create the summary table to store the summary of results based on price/type/location/etc
CREATE TABLE report_accommodation (
  `report_accommodation_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `report_id` INT NOT NULL,
  `accommodation_id` INT NOT NULL,
  FOREIGN KEY (`report_id`) REFERENCES `report` (`report_id`) ON DELETE CASCADE,
  FOREIGN KEY (`accommodation_id`) REFERENCES `accommodation` (`accommodation_id`) ON DELETE CASCADE
);

-- Custom report filters
CREATE TABLE `report_filters` (
  `filter_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `filter_name` VARCHAR(50) NOT NULL
);

CREATE TABLE filter_value_accommodation (
  `filter_value_accommodation_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `filter_value_id` INT NOT NULL,
  `accommodation_id` INT NOT NULL,
  FOREIGN KEY (`filter_value_id`) REFERENCES `report_filter_values` (`filter_value_id`) ON DELETE CASCADE,
  FOREIGN KEY (`accommodation_id`) REFERENCES `accommodation` (`accommodation_id`) ON DELETE CASCADE
);

CREATE TABLE `report_filter_values` (
  `filter_value_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `filter_id` INT NOT NULL,
  `filter_value` VARCHAR(50) NOT NULL,
  FOREIGN KEY (`filter_id`) REFERENCES `report_filters` (`filter_id`)
);

CREATE TABLE bookmark (
  `interested_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `accommodation_id` INT NOT NULL,
  `created_at` DATETIME DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (accommodation_id) REFERENCES accommodation(accommodation_id)
);
CREATE TABLE `message` (
  `message_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `recipient_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `sent_at` DATETIME DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (sender_id) REFERENCES user(user_id),
  FOREIGN KEY (recipient_id) REFERENCES user(user_id)
);
CREATE TABLE `notification` (
  `notification_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `message` TEXT NOT NULL,
  `is_read` BOOLEAN NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE `like` (
  `like_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `reply` (
  `reply_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `forum` (
  `forum_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `accommodation_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  FOREIGN KEY (`accommodation_id`) REFERENCES `accommodation` (`accommodation_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `forum_likes` (
  `forum_id` INT NOT NULL,
  `like_id` INT NOT NULL,
  PRIMARY KEY (`forum_id`, `like_id`),
  FOREIGN KEY (`forum_id`) REFERENCES `forum` (`forum_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`like_id`) REFERENCES `like` (`like_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `forum_replies` (
  `forum_id` INT NOT NULL,
  `reply_id` INT NOT NULL,
  PRIMARY KEY (`forum_id`, `reply_id`),
  FOREIGN KEY (`forum_id`) REFERENCES `forum` (`forum_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`reply_id`) REFERENCES `reply` (`reply_id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `review` (
  `review_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `accommodation_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` INT NOT NULL,
  `safety_rating` ENUM (
    'very safe',
    'safe',
    'somewhat safe',
    'unsafe',
    'very unsafe'
  ) NOT NULL,
  `cleanliness` ENUM (
    'very clean',
    'clean',
    'somewhat clean',
    'dirty',
    'very dirty'
  ) NOT NULL,
  `content` TEXT NOT NULL,
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  `deleted_at` DATETIME,
  `deleted_by` INT,
  `delete_reason` TEXT,
  FOREIGN KEY (accommodation_id) REFERENCES accommodation(accommodation_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE `booking` (
  `booking_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `booking_date` DATETIME DEFAULT (CURRENT_TIMESTAMP),
  `accommodation_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `move_in_date` DATE,
  `move_out_date` DATE,
  `notes` TEXT,
  `status` ENUM ('pending', 'approved', 'rejected', 'cancelled') NOT NULL,
  `is_soft_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (accommodation_id) REFERENCES accommodation(accommodation_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);
-- Create the media table to store media information for accommodations, reviews, and user profiles
CREATE TABLE media (
  media_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  media_type ENUM ('image', 'video', 'audio') NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_size INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Create the accommodation_media table to store the relationship between accommodations and media
CREATE TABLE accommodation_media (
  accommodation_id INT NOT NULL,
  media_id INT NOT NULL,
  PRIMARY KEY (accommodation_id, media_id),
  CONSTRAINT fk_accommodation_media_accommodation_id FOREIGN KEY (accommodation_id) REFERENCES accommodation (accommodation_id) ON DELETE CASCADE,
  CONSTRAINT fk_accommodation_media_media_id FOREIGN KEY (media_id) REFERENCES media (media_id) ON DELETE CASCADE
);
-- Create the review_media table to store the relationship between reviews and media
CREATE TABLE review_media (
  review_id INT NOT NULL,
  media_id INT NOT NULL,
  PRIMARY KEY (review_id, media_id),
  CONSTRAINT fk_review_media_review_id FOREIGN KEY (review_id) REFERENCES review (review_id) ON DELETE CASCADE,
  CONSTRAINT fk_review_media_media_id FOREIGN KEY (media_id) REFERENCES media (media_id) ON DELETE CASCADE
);
-- Create the user_media table to store the relationship between users and media
CREATE TABLE user_media (
  user_id INT NOT NULL,
  media_id INT NOT NULL,
  PRIMARY KEY (user_id, media_id),
  CONSTRAINT fk_user_media_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE,
  CONSTRAINT fk_user_media_media_id FOREIGN KEY (media_id) REFERENCES media (media_id) ON DELETE CASCADE
);