import { useMemo, useState } from "react";
import "../styles/people.css";

type MemberType = "Student" | "Alumni";

type Person = {
  id: number;
  name: string;
  initials: string;
  type: MemberType;
  chapter: string;
  chapterShort: string;
  major: string;
  year: string;
  location: string;
  bio: string;
  skills: string[];
  interests: string[];
  chapterVisibility: "officers" | "members" | "everyone";
};

const people: Person[] = [
  {
    id: 1,
    name: "Kristian Nguyen",
    initials: "KN",
    type: "Student",
    chapter: "Florida Polytechnic University",
    chapterShort: "FPU",
    major: "Computer Engineering",
    year: "Junior",
    location: "Lakeland, Florida",
    bio: "Computer engineering student interested in hardware, data, robotics, and building technology that connects people.",
    skills: ["C++", "Python", "SQL", "Hardware"],
    interests: ["Computer Hardware", "Robotics", "Data"],
    chapterVisibility: "everyone",
  },
  {
    id: 2,
    name: "Jamie Lee",
    initials: "JL",
    type: "Student",
    chapter: "Florida Polytechnic University",
    chapterShort: "FPU",
    major: "Computer Science",
    year: "Junior",
    location: "Lakeland, Florida",
    bio: "Computer science student interested in software engineering, AI, and meeting other students in technology.",
    skills: ["Python", "JavaScript", "React"],
    interests: ["Software", "AI", "Hackathons"],
    chapterVisibility: "everyone",
  },
  {
    id: 3,
    name: "Jordan Park",
    initials: "JP",
    type: "Student",
    chapter: "Florida Polytechnic University",
    chapterShort: "FPU",
    major: "Mechanical Engineering",
    year: "Sophomore",
    location: "Lakeland, Florida",
    bio: "Mechanical engineering student interested in robotics, manufacturing, and product design.",
    skills: ["CAD", "SolidWorks", "MATLAB"],
    interests: ["Robotics", "Manufacturing", "Design"],
    chapterVisibility: "members",
  },
  {
    id: 4,
    name: "Morgan Chen",
    initials: "MC",
    type: "Student",
    chapter: "Florida Polytechnic University",
    chapterShort: "FPU",
    major: "Electrical Engineering",
    year: "Freshman",
    location: "Lakeland, Florida",
    bio: "Electrical engineering student exploring embedded systems, electronics, and engineering organizations.",
    skills: ["C", "Circuits", "Arduino"],
    interests: ["Embedded Systems", "Electronics"],
    chapterVisibility: "everyone",
  },
  {
    id: 5,
    name: "Emily Tran",
    initials: "ET",
    type: "Student",
    chapter: "University of Central Florida",
    chapterShort: "UCF",
    major: "Aerospace Engineering",
    year: "Senior",
    location: "Orlando, Florida",
    bio: "Aerospace engineering student interested in propulsion, space systems, and engineering leadership.",
    skills: ["MATLAB", "CAD", "Simulation"],
    interests: ["Aerospace", "Space", "Leadership"],
    chapterVisibility: "everyone",
  },
  {
    id: 6,
    name: "Ryan Liu",
    initials: "RL",
    type: "Student",
    chapter: "University of Central Florida",
    chapterShort: "UCF",
    major: "Computer Engineering",
    year: "Junior",
    location: "Orlando, Florida",
    bio: "Computer engineering student interested in embedded systems, processors, and autonomous technology.",
    skills: ["C++", "FPGA", "Embedded C"],
    interests: ["Hardware", "Autonomous Systems"],
    chapterVisibility: "everyone",
  },
  {
    id: 7,
    name: "Kevin Huang",
    initials: "KH",
    type: "Student",
    chapter: "University of South Florida",
    chapterShort: "USF",
    major: "Biomedical Engineering",
    year: "Senior",
    location: "Tampa, Florida",
    bio: "Biomedical engineering student interested in medical devices and improving healthcare through engineering.",
    skills: ["MATLAB", "Research", "CAD"],
    interests: ["Medical Devices", "Research"],
    chapterVisibility: "everyone",
  },
  {
    id: 8,
    name: "Sophia Nguyen",
    initials: "SN",
    type: "Student",
    chapter: "University of South Florida",
    chapterShort: "USF",
    major: "Computer Science",
    year: "Junior",
    location: "Tampa, Florida",
    bio: "Computer science student interested in data science, machine learning, and building useful applications.",
    skills: ["Python", "SQL", "Machine Learning"],
    interests: ["Data Science", "AI"],
    chapterVisibility: "everyone",
  },
  {
    id: 9,
    name: "Daniel Kim",
    initials: "DK",
    type: "Alumni",
    chapter: "Florida Polytechnic University",
    chapterShort: "FPU",
    major: "Mechanical Engineering",
    year: "Class of 2025",
    location: "Orlando, Florida",
    bio: "SASE alumnus working in engineering and interested in mentoring students entering the industry.",
    skills: ["CAD", "Manufacturing", "Leadership"],
    interests: ["Mentorship", "Engineering Careers"],
    chapterVisibility: "everyone",
  },
];

type FilterType = "All" | "Students" | "Alumni";

export default function People() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");
  const [chapterFilter, setChapterFilter] = useState("All Chapters");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [connectedIds, setConnectedIds] = useState<number[]>([]);

  /*
    Temporary demo user.

    Later this will come from authentication/database data.
  */
  const currentUser = {
    chapter: "Florida Polytechnic University",
    role: "officer",
  };

  const canViewChapter = (person: Person) => {
    if (person.chapterVisibility === "everyone") {
      return true;
    }

    const sameChapter = currentUser.chapter === person.chapter;

    if (person.chapterVisibility === "members" && sameChapter) {
      return true;
    }

    if (
      person.chapterVisibility === "officers" &&
      sameChapter &&
      currentUser.role === "officer"
    ) {
      return true;
    }

    return false;
  };

  const chapters = [
    "All Chapters",
    ...Array.from(new Set(people.map((person) => person.chapterShort))),
  ];

  const filteredPeople = useMemo(() => {
    const query = search.toLowerCase().trim();

    return people.filter((person) => {
      const matchesSearch =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.major.toLowerCase().includes(query) ||
        person.chapter.toLowerCase().includes(query) ||
        person.chapterShort.toLowerCase().includes(query) ||
        person.location.toLowerCase().includes(query) ||
        person.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        ) ||
        person.interests.some((interest) =>
          interest.toLowerCase().includes(query)
        );

      const matchesType =
        filter === "All" ||
        (filter === "Students" && person.type === "Student") ||
        (filter === "Alumni" && person.type === "Alumni");

      const matchesChapter =
        chapterFilter === "All Chapters" ||
        person.chapterShort === chapterFilter;

      return matchesSearch && matchesType && matchesChapter;
    });
  }, [search, filter, chapterFilter]);

  const toggleConnection = (personId: number) => {
    setConnectedIds((current) =>
      current.includes(personId)
        ? current.filter((id) => id !== personId)
        : [...current, personId]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setFilter("All");
    setChapterFilter("All Chapters");
  };

  return (
    <main className="people-page">
      <section className="people-hero">
        <span className="people-eyebrow">SASE COMMUNITY</span>

        <h1>Meet the network.</h1>

        <p>
          Find students, alumni, engineers, and future collaborators
          across the SASE community.
        </p>

        <div className="people-search-wrapper">
          <span className="people-search-icon">⌕</span>

          <input
            className="people-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, major, chapter, skill, or interest..."
          />
        </div>
      </section>

      <section className="people-stats">
        <div>
          <strong>{people.length}</strong>
          <span>People</span>
        </div>

        <div>
          <strong>
            {new Set(people.map((person) => person.chapterShort)).size}
          </strong>
          <span>Chapters</span>
        </div>

        <div>
          <strong>
            {people.filter((person) => person.type === "Student").length}
          </strong>
          <span>Students</span>
        </div>

        <div>
          <strong>
            {people.filter((person) => person.type === "Alumni").length}
          </strong>
          <span>Alumni</span>
        </div>
      </section>

      <section className="people-directory">
        <div className="people-directory-header">
          <div>
            <span className="people-section-eyebrow">
              PEOPLE DIRECTORY
            </span>

            <h2>Discover People</h2>
          </div>

          <span className="people-result-count">
            {filteredPeople.length} result
            {filteredPeople.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="people-controls">
          <div className="people-filter-buttons">
            {(["All", "Students", "Alumni"] as FilterType[]).map(
              (option) => (
                <button
                  key={option}
                  className={
                    filter === option
                      ? "people-filter active"
                      : "people-filter"
                  }
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              )
            )}
          </div>

          <select
            className="people-chapter-select"
            value={chapterFilter}
            onChange={(event) => setChapterFilter(event.target.value)}
          >
            {chapters.map((chapter) => (
              <option key={chapter}>{chapter}</option>
            ))}
          </select>
        </div>

        {filteredPeople.length === 0 ? (
          <div className="people-empty">
            <div className="people-empty-icon">⌕</div>

            <h3>No people found</h3>

            <p>
              Try searching for another name, major, chapter, or
              skill.
            </p>

            <button onClick={clearFilters}>Clear Filters</button>
          </div>
        ) : (
          <div className="people-grid">
            {filteredPeople.map((person) => {
              const connected = connectedIds.includes(person.id);
              const showChapter = canViewChapter(person);

              return (
                <article className="person-card" key={person.id}>
                  <div className="person-card-top">
                    <div className="person-avatar">
                      {person.initials}
                    </div>

                    <div className="person-card-heading">
                      <div className="person-card-badges">
                        <span className="person-type-badge">
                          {person.type}
                        </span>

                        {showChapter && (
                          <span className="person-chapter-badge">
                            {person.chapterShort}
                          </span>
                        )}
                      </div>

                      <h3>{person.name}</h3>

                      <p>{person.major}</p>
                    </div>
                  </div>

                  <div className="person-info">
                    <div>
                      <span className="person-info-icon">◷</span>
                      <span>{person.year}</span>
                    </div>

                    <div>
                      <span className="person-info-icon">⌖</span>
                      <span>{person.location}</span>
                    </div>

                    {showChapter ? (
                      <div>
                        <span className="person-info-icon">◆</span>
                        <span>{person.chapterShort} SASE</span>
                      </div>
                    ) : (
                      <div>
                        <span className="person-info-icon">🔒</span>
                        <span>Chapter private</span>
                      </div>
                    )}
                  </div>

                  <p className="person-bio">{person.bio}</p>

                  <div className="person-skill-section">
                    <span className="person-small-label">SKILLS</span>

                    <div className="person-tags">
                      {person.skills.slice(0, 3).map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="person-card-actions">
                    <button
                      className="person-view-button"
                      onClick={() => setSelectedPerson(person)}
                    >
                      View Profile
                    </button>

                    <button
                      className={
                        connected
                          ? "person-connect-button connected"
                          : "person-connect-button"
                      }
                      onClick={() => toggleConnection(person.id)}
                    >
                      {connected ? "Connected ✓" : "Connect"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {selectedPerson && (
        <div
          className="people-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPerson(null);
            }
          }}
        >
          <div className="people-modal">
            <button
              className="people-modal-close"
              onClick={() => setSelectedPerson(null)}
            >
              ×
            </button>

            <div className="people-modal-header">
              <div className="people-modal-avatar">
                {selectedPerson.initials}
              </div>

              <div>
                <div className="person-card-badges">
                  <span className="person-type-badge">
                    {selectedPerson.type}
                  </span>

                  {canViewChapter(selectedPerson) && (
                    <span className="person-chapter-badge">
                      {selectedPerson.chapterShort}
                    </span>
                  )}
                </div>

                <h2>{selectedPerson.name}</h2>

                <p>
                  {selectedPerson.major} • {selectedPerson.year}
                </p>
              </div>
            </div>

            <div className="people-modal-divider" />

            <div className="people-modal-info">
              <div>
                <span>LOCATION</span>
                <strong>{selectedPerson.location}</strong>
              </div>

              <div>
                <span>CHAPTER</span>

                <strong>
                  {canViewChapter(selectedPerson)
                    ? `${selectedPerson.chapterShort} SASE`
                    : "Private"}
                </strong>
              </div>
            </div>

            <section className="people-modal-section">
              <span className="person-small-label">ABOUT</span>

              <p>{selectedPerson.bio}</p>
            </section>

            <section className="people-modal-section">
              <span className="person-small-label">SKILLS</span>

              <div className="person-tags">
                {selectedPerson.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>

            <section className="people-modal-section">
              <span className="person-small-label">INTERESTS</span>

              <div className="person-tags interests">
                {selectedPerson.interests.map((interest) => (
                  <span key={interest}>{interest}</span>
                ))}
              </div>
            </section>

            <button
              className={
                connectedIds.includes(selectedPerson.id)
                  ? "people-modal-connect connected"
                  : "people-modal-connect"
              }
              onClick={() => toggleConnection(selectedPerson.id)}
            >
              {connectedIds.includes(selectedPerson.id)
                ? "Connected ✓"
                : `Connect with ${selectedPerson.name.split(" ")[0]}`}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}