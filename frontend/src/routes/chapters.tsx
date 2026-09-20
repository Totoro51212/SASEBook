import { type FormEvent, useMemo, useState } from "react";
import "../styles/chapters.css";

type ChapterTab = "Overview" | "Events" | "Members" | "Officers";

type EventType =
  | "Professional"
  | "Social"
  | "General Body Meeting"
  | "Workshop"
  | "Community";

type ChapterEvent = {
  id: number;
  chapterId: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
  description: string;
};

type MemberVisibility = "officers" | "members" | "everyone";

type ChapterMember = {
  id: number;
  name: string;
  major: string;
  year: string;
  visibility: MemberVisibility;
};

type Officer = {
  id: number;
  name: string;
  position: string;
  major: string;
};

type Chapter = {
  id: number;
  slug: string;
  shortName: string;
  university: string;
  chapterName: string;
  location: string;
  region: string;
  description: string;
  memberCount: number;
  founded: string;
  members: ChapterMember[];
  officers: Officer[];
};

const chapters: Chapter[] = [
  {
    id: 1,
    slug: "fpu",
    shortName: "FPU",
    university: "Florida Polytechnic University",
    chapterName: "Florida Polytechnic University SASE",
    location: "Lakeland, Florida",
    region: "Southeast",
    description:
      "Building a community for Asian heritage scientists and engineers at Florida Polytechnic University through professional development, cultural events, and community engagement.",
    memberCount: 85,
    founded: "2021",
    officers: [
      {
        id: 1,
        name: "Kristian Nguyen",
        position: "Secretary",
        major: "Computer Engineering",
      },
      {
        id: 2,
        name: "Alex Chen",
        position: "President",
        major: "Computer Science",
      },
      {
        id: 3,
        name: "Maya Patel",
        position: "Vice President",
        major: "Data Science",
      },
      {
        id: 4,
        name: "Daniel Kim",
        position: "Treasurer",
        major: "Mechanical Engineering",
      },
    ],
    members: [
      {
        id: 1,
        name: "Jamie Lee",
        major: "Computer Science",
        year: "Junior",
        visibility: "everyone",
      },
      {
        id: 2,
        name: "Jordan Park",
        major: "Mechanical Engineering",
        year: "Sophomore",
        visibility: "members",
      },
      {
        id: 3,
        name: "Taylor Nguyen",
        major: "Data Science",
        year: "Senior",
        visibility: "officers",
      },
      {
        id: 4,
        name: "Morgan Chen",
        major: "Electrical Engineering",
        year: "Freshman",
        visibility: "everyone",
      },
    ],
  },
  {
    id: 2,
    slug: "ucf",
    shortName: "UCF",
    university: "University of Central Florida",
    chapterName: "University of Central Florida SASE",
    location: "Orlando, Florida",
    region: "Southeast",
    description:
      "Connecting UCF students through professional development, networking, mentorship, and Asian heritage community events.",
    memberCount: 142,
    founded: "2015",
    officers: [
      {
        id: 5,
        name: "Emily Tran",
        position: "President",
        major: "Aerospace Engineering",
      },
      {
        id: 6,
        name: "Ryan Liu",
        position: "Vice President",
        major: "Computer Engineering",
      },
    ],
    members: [
      {
        id: 5,
        name: "Chris Wong",
        major: "Computer Engineering",
        year: "Junior",
        visibility: "everyone",
      },
      {
        id: 6,
        name: "Ashley Kim",
        major: "Aerospace Engineering",
        year: "Senior",
        visibility: "members",
      },
    ],
  },
  {
    id: 3,
    slug: "usf",
    shortName: "USF",
    university: "University of South Florida",
    chapterName: "University of South Florida SASE",
    location: "Tampa, Florida",
    region: "Southeast",
    description:
      "Supporting students in STEM through career development, mentorship, networking, and cultural programming.",
    memberCount: 108,
    founded: "2017",
    officers: [
      {
        id: 7,
        name: "Kevin Huang",
        position: "President",
        major: "Biomedical Engineering",
      },
      {
        id: 8,
        name: "Sophia Nguyen",
        position: "Secretary",
        major: "Computer Science",
      },
    ],
    members: [
      {
        id: 7,
        name: "Andrew Li",
        major: "Biomedical Engineering",
        year: "Sophomore",
        visibility: "everyone",
      },
    ],
  },
];

const startingEvents: ChapterEvent[] = [
  {
    id: 1,
    chapterId: 1,
    title: "Resume Workshop",
    date: "2026-09-25",
    time: "6:00 PM",
    location: "Innovation Center",
    type: "Professional",
    description:
      "Prepare for the career fair with resume reviews, examples, and advice from SASE officers.",
  },
  {
    id: 2,
    chapterId: 1,
    title: "SASE General Body Meeting",
    date: "2026-10-02",
    time: "7:00 PM",
    location: "IST 1067",
    type: "General Body Meeting",
    description:
      "Meet other members, hear chapter updates, and learn about upcoming SASE events.",
  },
  {
    id: 3,
    chapterId: 1,
    title: "Game Night",
    date: "2026-10-09",
    time: "7:30 PM",
    location: "Student Development Center",
    type: "Social",
    description:
      "Take a break from classes and hang out with other SASE members.",
  },
  {
    id: 4,
    chapterId: 2,
    title: "Industry Networking Night",
    date: "2026-10-06",
    time: "6:30 PM",
    location: "UCF Engineering Atrium",
    type: "Professional",
    description:
      "Network with engineers and recruiters from companies across Central Florida.",
  },
];

export default function Chapters() {
  const [search, setSearch] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [activeTab, setActiveTab] = useState<ChapterTab>("Overview");

  const [events, setEvents] = useState<ChapterEvent[]>(startingEvents);

  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSent, setNotificationSent] = useState(false);

  /*
    Demo permissions.

    For the hackathon demo, we treat the current user as an
    officer of Florida Poly.

    Later this should come from authentication + the database.
  */
  const currentUser = {
    name: "Kristian Nguyen",
    chapterId: 1,
    role: "officer",
  };

  const filteredChapters = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return chapters;
    }

    return chapters.filter((chapter) => {
      return (
        chapter.chapterName.toLowerCase().includes(query) ||
        chapter.university.toLowerCase().includes(query) ||
        chapter.shortName.toLowerCase().includes(query) ||
        chapter.location.toLowerCase().includes(query) ||
        chapter.region.toLowerCase().includes(query)
      );
    });
  }, [search]);

  const getChapterEvents = (chapterId: number) => {
    return events.filter((event) => event.chapterId === chapterId);
  };

  const isOfficerOfChapter = (chapterId: number) => {
    return (
      currentUser.chapterId === chapterId &&
      currentUser.role === "officer"
    );
  };

  /*
    Privacy logic for chapter membership.

    Eventually this check should happen on the backend too.
  */
  const canViewMember = (
    member: ChapterMember,
    chapterId: number
  ) => {
    if (member.visibility === "everyone") {
      return true;
    }

    const sameChapter = currentUser.chapterId === chapterId;

    if (member.visibility === "members" && sameChapter) {
      return true;
    }

    if (
      member.visibility === "officers" &&
      sameChapter &&
      currentUser.role === "officer"
    ) {
      return true;
    }

    return false;
  };

  const openChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setActiveTab("Overview");
    setNotificationSent(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeChapter = () => {
    setSelectedChapter(null);
    setActiveTab("Overview");
  };

  const handleCreateEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedChapter) {
      return;
    }

    const form = new FormData(event.currentTarget);

    const newEvent: ChapterEvent = {
      id: Date.now(),
      chapterId: selectedChapter.id,
      title: String(form.get("title")),
      date: String(form.get("date")),
      time: String(form.get("time")),
      location: String(form.get("location")),
      type: String(form.get("type")) as EventType,
      description: String(form.get("description")),
    };

    setEvents((currentEvents) => [
      ...currentEvents,
      newEvent,
    ]);

    setShowCreateEvent(false);
    setActiveTab("Events");
  };

  const handleSendNotification = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!notificationMessage.trim()) {
      return;
    }

    /*
      Demo behavior for now.

      Next we can store notifications in shared application
      state / backend data so members actually receive them.
    */
    setNotificationSent(true);
    setNotificationMessage("");
    setShowNotification(false);
  };

  if (selectedChapter) {
    const chapterEvents = getChapterEvents(selectedChapter.id);

    const visibleMembers = selectedChapter.members.filter(
      (member) =>
        canViewMember(member, selectedChapter.id)
    );

    const userIsOfficer = isOfficerOfChapter(selectedChapter.id);

    return (
      <main className="chapters-page">
        <section className="chapter-detail">
          <button
            className="chapter-back-button"
            onClick={closeChapter}
          >
            ← Back to Chapters
          </button>

          <div className="chapter-detail-hero">
            <div className="chapter-logo-large">
              {selectedChapter.shortName}
            </div>

            <div className="chapter-detail-heading">
              <span className="chapter-region-badge">
                {selectedChapter.region} Region
              </span>

              <h1>{selectedChapter.chapterName}</h1>

              <p>
                {selectedChapter.location}
              </p>

              <div className="chapter-detail-stats">
                <span>
                  <strong>{selectedChapter.memberCount}</strong>
                  Members
                </span>

                <span>
                  <strong>{chapterEvents.length}</strong>
                  Upcoming Events
                </span>

                <span>
                  <strong>{selectedChapter.founded}</strong>
                  Founded
                </span>
              </div>
            </div>
          </div>

          {userIsOfficer && (
            <section className="officer-dashboard">
              <div>
                <span className="officer-label">
                  OFFICER DASHBOARD
                </span>

                <h2>Manage your chapter</h2>

                <p>
                  Create events and send updates to your
                  chapter members.
                </p>
              </div>

              <div className="officer-actions">
                <button
                  className="chapter-primary-button"
                  onClick={() => setShowCreateEvent(true)}
                >
                  + Create Event
                </button>

                <button
                  className="chapter-secondary-button"
                  onClick={() => setShowNotification(true)}
                >
                  🔔 Send Notification
                </button>
              </div>
            </section>
          )}

          {notificationSent && (
            <div className="chapter-success-message">
              ✓ Notification sent to chapter members.
            </div>
          )}

          <div className="chapter-tabs">
            {(
              [
                "Overview",
                "Events",
                "Members",
                "Officers",
              ] as ChapterTab[]
            ).map((tab) => (
              <button
                key={tab}
                className={
                  activeTab === tab ? "active" : ""
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <section className="chapter-tab-content">
            {activeTab === "Overview" && (
              <>
                <div className="chapter-section-heading">
                  <div>
                    <span className="section-eyebrow">
                      ABOUT
                    </span>

                    <h2>About this chapter</h2>
                  </div>
                </div>

                <div className="chapter-about-card">
                  <p>{selectedChapter.description}</p>

                  <div className="chapter-info-grid">
                    <div>
                      <span>University</span>
                      <strong>
                        {selectedChapter.university}
                      </strong>
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>
                        {selectedChapter.location}
                      </strong>
                    </div>

                    <div>
                      <span>Region</span>
                      <strong>
                        {selectedChapter.region}
                      </strong>
                    </div>

                    <div>
                      <span>Founded</span>
                      <strong>
                        {selectedChapter.founded}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="chapter-section-heading chapter-section-space">
                  <div>
                    <span className="section-eyebrow">
                      COMING UP
                    </span>

                    <h2>Upcoming Events</h2>
                  </div>

                  <button
                    className="chapter-text-button"
                    onClick={() => setActiveTab("Events")}
                  >
                    View all →
                  </button>
                </div>

                <div className="chapter-event-grid">
                  {chapterEvents.slice(0, 3).map((event) => (
                    <article
                      className="chapter-event-card"
                      key={event.id}
                    >
                      <span className="event-type">
                        {event.type}
                      </span>

                      <h3>{event.title}</h3>

                      <p className="event-date">
                        {event.date} • {event.time}
                      </p>

                      <p className="event-location">
                        {event.location}
                      </p>
                    </article>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Events" && (
              <>
                <div className="chapter-section-heading">
                  <div>
                    <span className="section-eyebrow">
                      EVENTS
                    </span>

                    <h2>Upcoming Events</h2>
                  </div>

                  {userIsOfficer && (
                    <button
                      className="chapter-primary-button"
                      onClick={() => setShowCreateEvent(true)}
                    >
                      + Create Event
                    </button>
                  )}
                </div>

                <div className="chapter-event-list">
                  {chapterEvents.length === 0 ? (
                    <div className="chapter-empty">
                      <h3>No upcoming events</h3>

                      <p>
                        This chapter has not posted any
                        upcoming events yet.
                      </p>
                    </div>
                  ) : (
                    chapterEvents.map((event) => (
                      <article
                        className="chapter-event-row"
                        key={event.id}
                      >
                        <div className="event-date-box">
                          <strong>
                            {new Date(
                              `${event.date}T12:00:00`
                            ).toLocaleDateString("en-US", {
                              day: "2-digit",
                            })}
                          </strong>

                          <span>
                            {new Date(
                              `${event.date}T12:00:00`
                            )
                              .toLocaleDateString("en-US", {
                                month: "short",
                              })
                              .toUpperCase()}
                          </span>
                        </div>

                        <div className="event-main-info">
                          <span className="event-type">
                            {event.type}
                          </span>

                          <h3>{event.title}</h3>

                          <p>
                            {event.time} • {event.location}
                          </p>

                          <p className="event-description">
                            {event.description}
                          </p>
                        </div>

                        <button className="chapter-secondary-button">
                          RSVP
                        </button>
                      </article>
                    ))
                  )}
                </div>
              </>
            )}

            {activeTab === "Members" && (
              <>
                <div className="chapter-section-heading">
                  <div>
                    <span className="section-eyebrow">
                      COMMUNITY
                    </span>

                    <h2>Chapter Members</h2>

                    <p>
                      Members shown here depend on each
                      person's chapter privacy settings.
                    </p>
                  </div>
                </div>

                <div className="chapter-privacy-notice">
                  <span>🔒</span>

                  <div>
                    <strong>
                      Membership privacy is respected
                    </strong>

                    <p>
                      Members can choose whether their chapter
                      membership is visible to officers only,
                      chapter members, or everyone.
                    </p>
                  </div>
                </div>

                <div className="member-grid">
                  {visibleMembers.map((member) => (
                    <article
                      className="member-card"
                      key={member.id}
                    >
                      <div className="member-avatar">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <h3>{member.name}</h3>

                        <p>{member.major}</p>

                        <span>{member.year}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Officers" && (
              <>
                <div className="chapter-section-heading">
                  <div>
                    <span className="section-eyebrow">
                      LEADERSHIP
                    </span>

                    <h2>Chapter Officers</h2>
                  </div>
                </div>

                <div className="officer-grid">
                  {selectedChapter.officers.map((officer) => (
                    <article
                      className="officer-card"
                      key={officer.id}
                    >
                      <div className="officer-avatar">
                        {officer.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <span>{officer.position}</span>

                        <h3>{officer.name}</h3>

                        <p>{officer.major}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        </section>

        {showCreateEvent && (
          <div
            className="chapter-modal-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setShowCreateEvent(false);
              }
            }}
          >
            <div className="chapter-modal">
              <button
                className="chapter-modal-close"
                onClick={() => setShowCreateEvent(false)}
              >
                ×
              </button>

              <span className="section-eyebrow">
                OFFICER TOOLS
              </span>

              <h2>Create Event</h2>

              <p>
                This event will appear on your chapter page.
                Next we'll connect this same event data to
                Explore.
              </p>

              <form
                className="chapter-form"
                onSubmit={handleCreateEvent}
              >
                <label>
                  Event Name
                  <input
                    name="title"
                    placeholder="Resume Workshop"
                    required
                  />
                </label>

                <div className="chapter-form-row">
                  <label>
                    Date
                    <input
                      name="date"
                      type="date"
                      required
                    />
                  </label>

                  <label>
                    Time
                    <input
                      name="time"
                      type="time"
                      required
                    />
                  </label>
                </div>

                <label>
                  Location
                  <input
                    name="location"
                    placeholder="Innovation Center"
                    required
                  />
                </label>

                <label>
                  Event Type
                  <select
                    name="type"
                    defaultValue="Professional"
                  >
                    <option>Professional</option>
                    <option>Social</option>
                    <option>General Body Meeting</option>
                    <option>Workshop</option>
                    <option>Community</option>
                  </select>
                </label>

                <label>
                  Description
                  <textarea
                    name="description"
                    placeholder="Tell members what this event is about..."
                    rows={5}
                    required
                  />
                </label>

                <button
                  className="chapter-primary-button chapter-form-submit"
                  type="submit"
                >
                  Publish Event
                </button>
              </form>
            </div>
          </div>
        )}

        {showNotification && (
          <div
            className="chapter-modal-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setShowNotification(false);
              }
            }}
          >
            <div className="chapter-modal">
              <button
                className="chapter-modal-close"
                onClick={() => setShowNotification(false)}
              >
                ×
              </button>

              <span className="section-eyebrow">
                OFFICER TOOLS
              </span>

              <h2>Send Notification</h2>

              <p>
                Send an announcement to members of{" "}
                {selectedChapter.shortName} SASE.
              </p>

              <form
                className="chapter-form"
                onSubmit={handleSendNotification}
              >
                <label>
                  Notification
                  <textarea
                    value={notificationMessage}
                    onChange={(event) =>
                      setNotificationMessage(
                        event.target.value
                      )
                    }
                    placeholder="Resume Workshop starts tomorrow at 6 PM!"
                    rows={5}
                    required
                  />
                </label>

                <div className="notification-preview">
                  <span>🔔</span>

                  <div>
                    <strong>
                      {selectedChapter.shortName} SASE
                    </strong>

                    <p>
                      {notificationMessage ||
                        "Your notification preview will appear here."}
                    </p>
                  </div>
                </div>

                <button
                  className="chapter-primary-button chapter-form-submit"
                  type="submit"
                >
                  Send to Chapter
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="chapters-page">
      <section className="chapters-hero">
        <span className="chapters-eyebrow">
          SASE CHAPTERS
        </span>

        <h1>Find your community.</h1>

        <p>
          Discover SASE chapters, meet members, find events,
          and connect with your local community.
        </p>

        <div className="chapters-search-wrapper">
          <span className="chapters-search-icon">⌕</span>

          <input
            className="chapters-search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search chapters, universities, or locations..."
          />
        </div>
      </section>

      <section className="chapter-stats">
        <div>
          <strong>{chapters.length}</strong>
          <span>Chapters</span>
        </div>

        <div>
          <strong>
            {chapters.reduce(
              (total, chapter) =>
                total + chapter.memberCount,
              0
            )}
          </strong>
          <span>Members</span>
        </div>

        <div>
          <strong>{events.length}</strong>
          <span>Upcoming Events</span>
        </div>
      </section>

      <section className="chapter-directory">
        <div className="chapter-section-heading">
          <div>
            <span className="section-eyebrow">
              CHAPTER DIRECTORY
            </span>

            <h2>Explore Chapters</h2>
          </div>

          <span className="chapter-result-count">
            {filteredChapters.length} result
            {filteredChapters.length === 1 ? "" : "s"}
          </span>
        </div>

        {filteredChapters.length === 0 ? (
          <div className="chapter-empty">
            <h3>No chapters found</h3>

            <p>
              Try searching for a different university,
              abbreviation, or location.
            </p>
          </div>
        ) : (
          <div className="chapter-grid">
            {filteredChapters.map((chapter) => {
              const chapterEvents = getChapterEvents(
                chapter.id
              );

              return (
                <article
                  className="chapter-card"
                  key={chapter.id}
                >
                  <div className="chapter-card-top">
                    <div className="chapter-logo">
                      {chapter.shortName}
                    </div>

                    <div>
                      <span className="chapter-region-badge">
                        {chapter.region}
                      </span>

                      <h3>{chapter.chapterName}</h3>

                      <p>{chapter.location}</p>
                    </div>
                  </div>

                  <p className="chapter-card-description">
                    {chapter.description}
                  </p>

                  <div className="chapter-card-stats">
                    <div>
                      <strong>
                        {chapter.memberCount}
                      </strong>

                      <span>Members</span>
                    </div>

                    <div>
                      <strong>
                        {chapterEvents.length}
                      </strong>

                      <span>Events</span>
                    </div>
                  </div>

                  <button
                    className="chapter-primary-button"
                    onClick={() => openChapter(chapter)}
                  >
                    View Chapter
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}