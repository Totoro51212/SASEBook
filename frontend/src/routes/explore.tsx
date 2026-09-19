import { useState } from "react";
import "./Explore.css";

// The different filters available on the Explore page
type Category = "All" | "People" | "Chapters" | "Events" | "Sponsors";

// Describes what information every Explore item needs
type ExploreItem = {
  id: number;
  type: Exclude<Category, "All">;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

// Temporary data for testing the Explore page
// Later, this will be replaced with data from the backend/database
const exploreItems: ExploreItem[] = [
  {
    id: 1,
    type: "People",
    title: "Alex Chen",
    subtitle: "Computer Engineering",
    description:
      "Interested in embedded systems, robotics, and hardware.",
    tags: ["Hardware", "Robotics", "Embedded Systems"],
  },
  {
    id: 2,
    type: "People",
    title: "JJ Nguyen",
    subtitle: "Data Science",
    description:
      "Interested in machine learning and data analytics.",
    tags: ["AI", "Data", "Machine Learning"],
  },
  {
    id: 3,
    type: "Chapters",
    title: "Florida Polytechnic University SASE",
    subtitle: "Lakeland, Florida",
    description:
      "Connect with SASE members at Florida Poly.",
    tags: ["Chapter", "Florida"],
  },
  {
    id: 4,
    type: "Chapters",
    title: "University of Central Florida SASE",
    subtitle: "Orlando, Florida",
    description:
      "Explore the UCF SASE community and upcoming events.",
    tags: ["Chapter", "Florida"],
  },
  {
    id: 5,
    type: "Events",
    title: "Resume Workshop",
    subtitle: "September 25 • 6:00 PM",
    description:
      "Build and improve your resume with other SASE members.",
    tags: ["Professional", "Workshop"],
  },
  {
    id: 6,
    type: "Events",
    title: "SASE Networking Night",
    subtitle: "October 2 • 7:00 PM",
    description:
      "Meet students, professionals, and other SASE members.",
    tags: ["Networking", "Career"],
  },
  {
    id: 7,
    type: "Sponsors",
    title: "Example Sponsor",
    subtitle: "Engineering & Technology",
    description:
      "Discover career opportunities with a SASE partner.",
    tags: ["Sponsor", "Careers"],
  },
];

export default function Explore() {
  // Stores what the user types into the search bar
  const [search, setSearch] = useState("");

  // Stores which filter is currently selected
  const [category, setCategory] = useState<Category>("All");

  // Stores the item the user clicks on
  // null means that no item is currently selected
  const [selectedItem, setSelectedItem] =
    useState<ExploreItem | null>(null);

  // Filter buttons displayed on the page
  const categories: Category[] = [
    "All",
    "People",
    "Chapters",
    "Events",
    "Sponsors",
  ];

  // Filters items using both the selected category and search bar
  const filteredItems = exploreItems.filter((item) => {
    const matchesCategory =
      category === "All" || item.type === category;

    // Makes the search ignore uppercase/lowercase
    const searchText = search.toLowerCase();

    // Searches through all important information on the item
    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.subtitle.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchText)
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="explore-page">

      {/* Top section */}
      <section className="explore-header">
        <p className="explore-label">SASEBOOK</p>

        <h1>Explore the SASE Community</h1>

        <p className="explore-description">
          Discover members, chapters, events, sponsors, and opportunities
          across the SASE network.
        </p>

        {/* Search bar */}
        <input
          className="explore-search"
          type="text"
          placeholder="Search members, chapters, events, interests..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {/* Category filters */}
        <div className="explore-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="explore-results">

        {/* Result count */}
        <div className="results-heading">
          <h2>
            {category === "All" ? "Explore SASE" : category}
          </h2>

          <span>
            {filteredItems.length}{" "}
            {filteredItems.length === 1
              ? "result"
              : "results"}
          </span>
        </div>

        {/* Result cards */}
        <div className="explore-grid">
          {filteredItems.map((item) => (
            <article
              className="explore-card"
              key={item.id}
            >
              {/* Type of result */}
              <span className="card-type">
                {item.type}
              </span>

              <h3>{item.title}</h3>

              <p className="card-subtitle">
                {item.subtitle}
              </p>

              <p>{item.description}</p>

              {/* Tags */}
              <div className="card-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Opens the item's detail popup */}
              <button
                className="view-button"
                onClick={() => setSelectedItem(item)}
              >
                View{" "}
                {item.type === "People"
                  ? "Profile"
                  : item.type.slice(0, -1)}
              </button>
            </article>
          ))}
        </div>

        {/* Appears when the search has no matches */}
        {filteredItems.length === 0 && (
          <div className="no-results">
            <h3>No results found</h3>
            <p>Try searching for something else.</p>
          </div>
        )}

      </section>

      {/* Detail popup */}
      {selectedItem && (
        <div
          className="detail-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="detail-card"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Close popup */}
            <button
              className="close-button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
            >
              ×
            </button>

            {/* Item information */}
            <span className="card-type">
              {selectedItem.type}
            </span>

            <h2>{selectedItem.title}</h2>

            <p className="card-subtitle">
              {selectedItem.subtitle}
            </p>

            <p>{selectedItem.description}</p>

            {/* Item tags */}
            <div className="card-tags">
              {selectedItem.tags.map((tag) => (
                <span key={tag}>
                  {tag}
                </span>
              ))}
            </div>

          </div>
        </div>
      )}

    </main>
  );
}