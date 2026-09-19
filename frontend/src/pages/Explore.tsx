import { useState } from "react";

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
// Later, this can be replaced with data from the backend/database
const exploreItems: ExploreItem[] = [
  {
    id: 1,
    type: "People",
    title: "Alex Chen",
    subtitle: "Computer Engineering",
    description: "Interested in embedded systems, robotics, and hardware.",
    tags: ["Hardware", "Robotics", "Embedded Systems"],
  },
  {
    id: 2,
    type: "People",
    title: "JJ Nguyen",
    subtitle: "Data Science",
    description: "Interested in machine learning and data analytics.",
    tags: ["AI", "Data", "Machine Learning"],
  },
  {
    id: 3,
    type: "Chapters",
    title: "Florida Polytechnic University SASE",
    subtitle: "Lakeland, Florida",
    description: "Connect with SASE members at Florida Poly.",
    tags: ["Chapter", "Florida"],
  },
  {
    id: 4,
    type: "Chapters",
    title: "University of Central Florida SASE",
    subtitle: "Orlando, Florida",
    description: "Explore the UCF SASE community and upcoming events.",
    tags: ["Chapter", "Florida"],
  },
  {
    id: 5,
    type: "Events",
    title: "Resume Workshop",
    subtitle: "September 25 • 6:00 PM",
    description: "Build and improve your resume with other SASE members.",
    tags: ["Professional", "Workshop"],
  },
  {
    id: 6,
    type: "Events",
    title: "SASE Networking Night",
    subtitle: "October 2 • 7:00 PM",
    description: "Meet students, professionals, and other SASE members.",
    tags: ["Networking", "Career"],
  },
  {
    id: 7,
    type: "Sponsors",
    title: "Example Sponsor",
    subtitle: "Engineering & Technology",
    description: "Discover career opportunities with a SASE partner.",
    tags: ["Sponsor", "Careers"],
  },
];

function Explore() {
  // Stores what the user types into the search bar
  const [search, setSearch] = useState("");

  // Stores which filter button is currently selected
  const [category, setCategory] = useState<Category>("All");

  // Filter buttons displayed on the page
  const categories: Category[] = [
    "All",
    "People",
    "Chapters",
    "Events",
    "Sponsors",
  ];

  // Filters the items based on category and search
  const filteredItems = exploreItems.filter((item) => {
    // Check if the item's category matches the selected category
    const matchesCategory =
      category === "All" || item.type === category;

    // Makes searching ignore uppercase/lowercase
    const searchText = search.toLowerCase();

    // Search through the item's information
    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.subtitle.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchText)
      );

    // Item only appears if it passes both checks
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="explore-page">

      {/* Top section of the Explore page */}
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

        {/* Category filter buttons */}
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

      {/* Search/filter results */}
      <section className="explore-results">

        {/* Shows the selected category and number of results */}
        <div className="results-heading">
          <h2>
            {category === "All" ? "Explore SASE" : category}
          </h2>

          <span>
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "result" : "results"}
          </span>
        </div>

        {/* Creates one card for every matching item */}
        <div className="explore-grid">
          {filteredItems.map((item) => (
            <article className="explore-card" key={item.id}>

              {/* Shows whether this is a person, chapter, event, etc. */}
              <span className="card-type">{item.type}</span>

              <h3>{item.title}</h3>

              <p className="card-subtitle">{item.subtitle}</p>

              <p>{item.description}</p>

              {/* Creates the small tags on each card */}
              <div className="card-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {/* Button will eventually open the item's page */}
              <button className="view-button">
                View {item.type === "People" ? "Profile" : item.type.slice(0, -1)}
              </button>
            </article>
          ))}
        </div>

        {/* Only appears when nothing matches the search */}
        {filteredItems.length === 0 && (
          <div className="no-results">
            <h3>No results found</h3>
            <p>Try searching for something else.</p>
          </div>
        )}
      </section>
    </main>
  );
}

// Allows other files, such as App.tsx, to use this page
export default Explore;