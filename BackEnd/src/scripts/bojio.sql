CREATE DATABASE bojio;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_type VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(50) NOT NULL UNIQUE, 
    hashed_password VARCHAR(255) NOT NULL, 
    profile_name VARCHAR(30), 
    first_name VARCHAR(30), 
    last_name VARCHAR(30), 
    profile_picture_url VARCHAR(255), 
    bio VARCHAR(255), 
    gender VARCHAR(10), 
    role VARCHAR(15) DEFAULT 'user', 
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_user_data (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY(user_id) REFERENCES user_profiles(id)
);

CREATE TABLE user_followers (
    id SERIAL PRIMARY KEY,
    following_id INT NOT NULL,
    follower_id INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (followee_id) REFERENCES user_profiles(id),
    FOREIGN KEY (follower_id) REFERENCES user_profiles(id)
);

CREATE TABLE sports_cards (
    id SERIAL PRIMARY KEY,
    sport_type VARCHAR(20) NOT NULL DEFAULT 'tennis',
    skill_level VARCHAR(20) DEFAULT 'beginner',
    skill_rate VARCHAR(10) DEFAULT 'unrated',
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id)
);

-- display past and upcoming activities based compare with current time
-- past activities of anyone must be is_going when checking together with activity_user_decision
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    user_id INT,
    sport_type VARCHAR(20) DEFAULT 'tennis',
    title VARCHAR(30) NOT NULL,
    schedule TIMESTAMP NOT NULL,
    location VARCHAR(50) NOT NULL,
    game_type VARCHAR(10),
    min_people INT,
    max_people INT,
    skill_level DECIMAL(2,1),
    game_private BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id)
);

-- when host creates a game, userdecision is created too.
-- if a host invites someone, is_going will be default false, is_active will becomes true (invited).
--  when user is not host, he will receive message to join the game which will change is going to true.
--  when user declined to leave the game, is_active and is_going will becomes false

--  second scenario when a user saw a game in public and want to join, when he goes into the game (there will be a button for him to join)
-- so when the logic on controller is that when get the game activities, check on activity_user_decisions, 
-- 1. if there's one and is active and is going. means joined,
-- 2. if there's one and is active but not going. means invited.
-- 3. if there's one and not active or there's none. means you want to join the game (public = you will se the game on public activities, private = won't see forever)

CREATE TABLE activity_user_decisions (
    id SERIAL PRIMARY KEY,
    activity_id INT,
    user_id INT,
    is_going BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (activity_id) REFERENCES activities(id),
    FOREIGN KEY (user_id) REFERENCES user_profiles(id)
);

















-- SAMPLE
INSERT INTO user_profiles(email, hashed_password, profile_name) VALUES
    ('user1@gmail.com', '12345abcde', 'user1'),
    ('user2@gmail.com', '12345abcde', 'user2'),
    ('user3@gmail.com', '12345abcde', 'user3'),
    ('user4@gmail.com', '12345abcde', 'user4');


