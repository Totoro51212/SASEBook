-- 1. Reset Tables (reverse dependency order to avoid foreign key errors)
DROP TABLE IF EXISTS sponsors CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS chapters CASCADE;

-- 2. Create Chapters Table
CREATE TABLE chapters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) UNIQUE NOT NULL,
    university VARCHAR(150),
    city VARCHAR(100),
    state VARCHAR(50),
    region VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Profiles Table
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    major VARCHAR(100),
    graduation_year INT,
    interests TEXT,
    chapter_id INT REFERENCES chapters(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- 4. Create Events Table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    chapter_id INT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    event_type VARCHAR(100),
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    rsvp_count INT DEFAULT 0,
    attendance INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Sponsors Table
CREATE TABLE sponsors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    industry VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(50),
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);