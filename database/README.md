# ERD for STALS Accommodation App

## Users Table

The users table stores information about the users of the system, such as their username, password, email, phone number, and role. It also tracks whether a user is currently online and whether their account has been verified.

## Accommodations Table

The accommodations table stores information about each accommodation, such as its name, address, type, description, size, price, and availability. It also tracks the number of views the accommodation has received and whether it has been deleted. This table has a foreign key constraint on the users table, to associate each accommodation with its owner.

## Accommodation Details Table

The accommodation_details table stores additional details about each accommodation, such as parking availability, room types, and room dimensions. It has a foreign key constraint on the accommodations table, to associate each detail with its accommodation.

## Amenities Table

The amenities table stores information about the amenities that are available at each accommodation, such as Wi-Fi, air conditioning, and laundry facilities.

## Accommodation Amenities Table

The accommodation_amenities table establishes a many-to-many relationship between accommodations and amenities. It has foreign key constraints on both the accommodations and amenities tables.

## Appliances Table

The appliances table stores information about the appliances that are available at each accommodation, such as a refrigerator, microwave, and stove.

## Accommodation Appliances Table

The accommodation_appliances table establishes a many-to-many relationship between accommodations and appliances. It has foreign key constraints on both the accommodations and appliances tables.

## Locations Table

The locations table stores information about nearby landmarks, such as hospitals, markets, and campuses. It tracks the name, latitude, longitude, and type of each landmark.

## Report

The report table stores the report details for accommodations such as the report type, description, and status.

## Report Accommodation Table

The report_accommodation table is a junction table between the report and accommodation tables.

## Report Filters Table

The report_filters table stores custom report filters that can be applied to accommodations.

## Report Filter Values Table

The report_filter_values table stores the possible values for custom report filters.

## Filter Value Accommodation Table

The filter_value_accommodation table is a junction table between the report_filter_values and accommodation tables.

## Bookmark Table

The bookmark table stores information about the accommodations that users have bookmarked.

## Message Table

The message table stores information about messages between users such as the sender, recipient, and content.

## Notification Table

The notification table stores information about notifications such as the message and whether it has been read.

## Like Table

The like table stores information about the likes made by users.

## Reply Table

The reply table stores information about replies made by users.

## Forum Table

The forum table stores information about forum posts such as the title and content.

## Forum Likes Table

The forum_likes table is a junction table between the forum and like tables.

## Forum Replies Table

The forum_replies table is a junction table between the forum and reply tables.

## Review Table

The review table stores information about the reviews made by users such as the rating, safety rating, and cleanliness.

## Booking Table

The booking table stores information about bookings made by users such as the move-in and move-out dates, notes, and status.
