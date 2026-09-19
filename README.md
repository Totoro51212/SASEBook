# SASEBook 🌏
The Rice Cookers' project for SASEHack 2026

> **Connect. Discover. Build Together.**

# Purpose

SASEBook is an application for bringing the SASE community and other like-minded individuals together.

SASE is a network of students, university chapters, officers, regional leaders, sponsors, and professionals. However, information about events, chapters, members, and opportunities can be spread across multiple platforms.

SASEBook aims to bring these parts of the community together in one place.

Our goal is to make SASE easier to navigate not only for members, but also for the officers and leaders who help run the organization.

---

# The Problem

Different members of the SASE community have different needs.

### 👤 Members

Members need an easy way to:

- Discover upcoming SASE events
- Find and connect with other SASE members
- Discover members with similar majors, skills, or career interests
- Explore SASE chapters outside of their university
- Find nearby chapters and sponsors
- Stay updated with their chapter

### 🏫 Chapter Officers

Chapter officers need simple tools to:

- Create and announce events
- Notify members about upcoming events
- Post chapter announcements
- Manage their chapter's information
- Keep members engaged
- Track chapter activity

Information can become spread across social media, messaging apps, calendars, spreadsheets, and other platforms.

SASEBook gives officers a central place to communicate with their chapter.

### 🌎 Regional & National Leadership

Regional and national SASE leaders may also need to understand what is happening across multiple chapters.

For example:

- How many events are chapters hosting?
- What types of events are being organized?
- Which chapters are active?
- How many members are participating?
- What does activity look like across a region?

Instead of requiring officers to repeatedly report information they have already entered elsewhere, SASEBook can use normal chapter activity to provide useful regional data.

---

# Our Solution 🚀

SASEBook creates one shared platform for the SASE community.

The platform is designed around three major groups:

**Members → Chapter Officers → Regional/National Leadership**

| User | SASEBook Experience |
|------|---------------------|
| 👤 Members | Discover people, chapters, events, sponsors, and opportunities |
| 🏫 Chapter Officers | Create events, make announcements, notify members, and manage their chapter |
| 🌎 Leadership | View chapter activity and aggregated regional information |

One of our main goals is to make information useful without creating more work.

For example:

> **Officer creates an event → Members discover the event → Regional activity data updates**

One action can benefit multiple parts of the SASE community.

---

# Core Features ✨

## 👤 Member Profiles

Members can create profiles that include information such as:

- Name
- University
- SASE chapter
- Major
- Graduation year
- Interests
- Skills
- Career interests

This allows members to discover people across SASE with similar academic, professional, or personal interests.

---

## 🔎 Member Discovery

Members can search the SASE network to find people with shared interests.

For example:

**Computer Engineering → Hardware → Robotics**

This allows networking to extend beyond the people someone already knows within their own chapter.

---

## 🏫 Chapter Pages

Each SASE chapter can have its own page containing:

- Chapter information
- Officers
- Members
- Announcements
- Upcoming events

Chapter pages provide one central location for members to see what is happening within their chapter.

---

## 📅 Events

Chapter officers can create and publish events including:

- General body meetings
- Professional development workshops
- Social events
- Community service
- Academic events
- Networking events
- Conferences

Members can then discover upcoming events through SASEBook.

---

## 🔔 Chapter Announcements & Notifications

Officers can use SASEBook to communicate important information directly to their members.

An officer creating an event could:

1. Create the event
2. Publish it to the chapter page
3. Announce it to members
4. Send a notification
5. Update the event later from one location

The goal is to reduce repetitive work while making it easier for members to stay informed.

---

## 🗺️ Interactive SASE Map

SASEBook makes the SASE network easier to explore geographically.

The map can display:

- 🏫 SASE chapters
- 🏢 Sponsors and partner companies
- 📅 Events

Users can explore the map to discover chapters and opportunities outside of their own university.

Selecting a location can provide more information and connect the user to its SASEBook page.

---

## 📊 Regional Insights

Chapter activity can also provide useful information for SASE regional and national leadership.

SASEBook can organize information such as:

- Number of events
- Events by category
- Chapter activity
- Member participation
- Activity by region
- Participating chapters

For example:

```text
Southeast Region
────────────────────────

24 Chapters
87 Events This Semester

Professional Development    31
Social                      24
Community Service           18
Academic                    14
```

Instead of creating another reporting task for officers, SASEBook can make information generated through normal chapter activity useful throughout the organization.

---

# Why SASEBook? 🎯

SASE already has an incredible network.

SASEBook is not trying to create that community — **the community already exists.**

Our goal is to make that network easier to see, explore, manage, and connect with.

For members:

> **Help me connect.**

For chapter officers:

> **Help me organize.**

For regional leadership:

> **Help me understand.**

---

# Project Stack 🛠️

## Frontend

SASEBook frontend utilizes **TypeScript with the React framework**, compiled using **npm and Vite**.

### Current Technologies

- TypeScript
- React
- Vite
- Node.js
- npm
- Git / GitHub

Additional technologies will be documented here as they are added during development.

---

# Installation and Development 💻

## Prerequisites

- [Node.js (version 18 or higher)](https://nodejs.org/en/download)
- [Python 3.14](https://www.python.org/downloads/)
- npm package manager
- Git

## Clone the Repository

```bash
git clone https://github.com/Totoro51212/SASEBook.git
cd SASEBook
```

## Install npm Dependencies

```bash
cd frontend
npm install
```

## Run Dev Build for Testing

```bash
cd frontend
npm install
npm run dev
```

Vite will display a local development address in the terminal.

Open that address in your browser to view SASEBook.

---

# Team Development Workflow 🌿

Because multiple team members are working on SASEBook, new features should be developed on separate branches when possible.

Create a branch:

```bash
git checkout -b feature/feature-name
```

For example:

```bash
git checkout -b feature/chapter-map
```

After making changes:

```bash
git add .
git commit -m "Add chapter map"
git push origin feature/chapter-map
```

Then create a Pull Request so the feature can be reviewed before being merged into the main branch.

---

# Future Ideas 🔮

Once the core SASEBook experience is complete, possible future features include:

- Direct messaging
- Event RSVP
- QR event check-in
- Push notifications
- Personalized networking recommendations
- Sponsor/company profiles
- Conference mode
- Career and internship discovery
- Advanced regional analytics
- Event attendance analytics
- Chapter engagement metrics

These are stretch goals. Our priority during SASEHack is creating a functional core experience first.

---

# SASEHack 2026 🏆

SASEBook was created by **The Rice Cookers** for **SASEHack 2026**.

This is our team's **first hackathon**.

Our goal is to create a functional prototype that addresses a real challenge within a community we are already part of while learning new technologies and working together as a development team.

---

# Team — The Rice Cookers 🍚

---

# Our Vision ❤️

SASE is more than individual university chapters.

It is a network of students, officers, regional leaders, professionals, sponsors, mentors, and communities.

**SASEBook is our attempt to bring that network together.**

> ### Connect the community. Empower the chapters. Understand the network.
