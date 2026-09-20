-- ============================================================
-- SASEBook Development Seed Data
-- Run AFTER schema.sql
-- ============================================================


-- ============================================================
-- 1. CHAPTERS
-- ============================================================

INSERT INTO chapters
(name, university, city, state, region, description)
VALUES
(
    'Florida Polytechnic University SASE',
    'Florida Polytechnic University',
    'Lakeland',
    'Florida',
    'Southeast',
    'Building a community for Asian heritage scientists and engineers through professional development, cultural events, and community engagement.'
),
(
    'University of Central Florida SASE',
    'University of Central Florida',
    'Orlando',
    'Florida',
    'Southeast',
    'Connecting UCF students through professional development, networking, mentorship, and Asian heritage community events.'
),
(
    'University of South Florida SASE',
    'University of South Florida',
    'Tampa',
    'Florida',
    'Southeast',
    'Supporting students in STEM through career development, mentorship, networking, and cultural programming.'
);


-- ============================================================
-- 2. PROFILES
-- Demo emails only - not real contact information.
-- ============================================================

INSERT INTO profiles
(name, email, major, graduation_year, interests, chapter_id)
VALUES
(
    'Kristian Nguyen',
    'kristian.demo@sasebook.test',
    'Computer Engineering',
    2028,
    'Computer Hardware, Robotics, Data',
    (
        SELECT id
        FROM chapters
        WHERE name = 'Florida Polytechnic University SASE'
    )
),
(
    'Jamie Lee',
    'jamie.lee@sasebook.test',
    'Computer Science',
    2028,
    'Software, AI, Hackathons',
    (
        SELECT id
        FROM chapters
        WHERE name = 'Florida Polytechnic University SASE'
    )
),
(
    'Jordan Park',
    'jordan.park@sasebook.test',
    'Mechanical Engineering',
    2029,
    'Robotics, Manufacturing, Design',
    (
        SELECT id
        FROM chapters
        WHERE name = 'Florida Polytechnic University SASE'
    )
),
(
    'Morgan Chen',
    'morgan.chen@sasebook.test',
    'Electrical Engineering',
    2030,
    'Embedded Systems, Electronics',
    (
        SELECT id
        FROM chapters
        WHERE name = 'Florida Polytechnic University SASE'
    )
),
(
    'Emily Tran',
    'emily.tran@sasebook.test',
    'Aerospace Engineering',
    2027,
    'Aerospace, Space, Leadership',
    (
        SELECT id
        FROM chapters
        WHERE name = 'University of Central Florida SASE'
    )
),
(
    'Ryan Liu',
    'ryan.liu@sasebook.test',
    'Computer Engineering',
    2028,
    'Hardware, Embedded Systems, Autonomous Systems',
    (
        SELECT id
        FROM chapters
        WHERE name = 'University of Central Florida SASE'
    )
),
(
    'Kevin Huang',
    'kevin.huang@sasebook.test',
    'Biomedical Engineering',
    2027,
    'Medical Devices, Research',
    (
        SELECT id
        FROM chapters
        WHERE name = 'University of South Florida SASE'
    )
),
(
    'Sophia Nguyen',
    'sophia.nguyen@sasebook.test',
    'Computer Science',
    2028,
    'Data Science, AI, Machine Learning',
    (
        SELECT id
        FROM chapters
        WHERE name = 'University of South Florida SASE'
    )
),
(
    'Daniel Kim',
    'daniel.kim@sasebook.test',
    'Mechanical Engineering',
    2025,
    'Mentorship, Engineering Careers, Manufacturing',
    (
        SELECT id
        FROM chapters
        WHERE name = 'Florida Polytechnic University SASE'
    )
);


-- ============================================================
-- 3. EVENTS
-- ============================================================

INSERT INTO events
(
    chapter_id,
    name,
    description,
    event_type,
    event_date,
    location,
    rsvp_count,
    attendance
)
VALUES
(
    (
        SELECT id
        FROM chapters
        WHERE name = 'Florida Polytechnic University SASE'
    ),
    'Resume Workshop',
    'Prepare for the career fair with resume reviews, examples, and advice from SASE officers.',
    'Professional',
    '2026-09-25 18:00:00',
    'Innovation Center',
    24,
    0
),
(
    (
        SELECT id
        FROM chapters
        WHERE name = 'Florida Polytechnic University SASE'
    ),
    'SASE General Body Meeting',
    'Meet other members, hear chapter updates, and learn about upcoming SASE events.',
    'General Body Meeting',
    '2026-10-02 19:00:00',
    'IST 1067',
    31,
    0
),
(
    (
        SELECT id
        FROM chapters
        WHERE name = 'Florida Polytechnic University SASE'
    ),
    'Game Night',
    'Take a break from classes and hang out with other SASE members.',
    'Social',
    '2026-10-09 19:30:00',
    'Student Development Center',
    27,
    0
),
(
    (
        SELECT id
        FROM chapters
        WHERE name = 'University of Central Florida SASE'
    ),
    'Industry Networking Night',
    'Network with engineers and recruiters from companies across Central Florida.',
    'Professional',
    '2026-10-06 18:30:00',
    'UCF Engineering Atrium',
    46,
    0
);


-- ============================================================
-- 4. SPONSORS
-- ============================================================

INSERT INTO sponsors
(name, industry, city, state, website)
VALUES
(
    'NVIDIA',
    'Semiconductors and Artificial Intelligence',
    'Santa Clara',
    'California',
    'https://www.nvidia.com/'
),
(
    'Lockheed Martin',
    'Aerospace and Defense',
    'Bethesda',
    'Maryland',
    'https://www.lockheedmartin.com/'
),
(
    'AMD',
    'Semiconductors',
    'Santa Clara',
    'California',
    'https://www.amd.com/'
),
(
    'JPMorganChase',
    'Financial Services and Technology',
    'New York',
    'New York',
    'https://www.jpmorganchase.com/'
),
(
    'Siemens',
    'Engineering and Technology',
    'Orlando',
    'Florida',
    'https://www.siemens.com/'
);


-- ============================================================
-- 5. QUICK TESTS
-- ============================================================

SELECT * FROM chapters;
SELECT * FROM profiles;
SELECT * FROM events;
SELECT * FROM sponsors;

-- ============================================================
-- 6. POSTS (Required for Feed UI testing)
-- ============================================================

INSERT INTO posts
(profile_id, content)
VALUES
(
    (SELECT id FROM profiles WHERE email = 'kristian.demo@sasebook.test'),
    'Excited to start building our hackathon project! Let me know if anyone wants to team up.'
),
(
    (SELECT id FROM profiles WHERE email = 'jamie.lee@sasebook.test'),
    'Does anyone have a good template for a React Native login screen?'
),
(
    (SELECT id FROM profiles WHERE email = 'emily.tran@sasebook.test'),
    'Just registered for the Industry Networking Night. Looking forward to meeting the recruiters from Lockheed Martin.'
);