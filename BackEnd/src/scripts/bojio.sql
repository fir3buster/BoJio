CREATE DATABASE bojio;

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(50) NOT NULL UNIQUE, 
    hashed_password VARCHAR(255) NOT NULL, 
    profile_name VARCHAR(30) NOT NULL, 
    first_name VARCHAR(30), 
    last_name VARCHAR(30), 
    profile_picture_url VARCHAR(255), 
    bio VARCHAR(255), 
    gender VARCHAR(10), 
    role VARCHAR(15) DEFAULT 'user', 
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_followers (
    id SERIAL PRIMARY KEY,
    followee_id INT NOT NULL,
    follower_id INT NOT NULL,
    isActive BOOLEAN NOT NULL DEFAULT 'true',
    FOREIGN KEY (followee_id) REFERENCES user_profiles(id),
    FOREIGN KEY (follower_id) REFERENCES user_profiles(id)
);

CREATE TABLE sports_cards (
    id SERIAL PRIMARY KEY,
    sport_type VARCHAR(20) NOT NULL DEFAULT 'tennis',
    skill_level VARCHAR(20) NOT NULL DEFAULT 'beginner',
    skill_rate VARCHAR(10) NOT NULL DEFAULT 'unrated',
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id)
);
















-- SAMPLE
INSERT INTO user_profiles(email, hashed_password, profile_name) VALUES
    ('user1@gmail.com', '12345abcde', 'user1'),
    ('user2@gmail.com', '12345abcde', 'user2'),
    ('user3@gmail.com', '12345abcde', 'user3'),
    ('user4@gmail.com', '12345abcde', 'user4');


