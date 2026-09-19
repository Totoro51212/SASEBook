import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./Explore.css";


// =============================
// LEAFLET MARKER ICON
// =============================

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


// =============================
// TYPES
// =============================

type Category =
  | "All"
  | "People"
  | "Chapters"
  | "Events"
  | "Sponsors";

type ViewMode = "Cards" | "Map";

type ExploreItem = {
  id: number;

  type: Exclude<Category, "All">;

  title: string;
  subtitle: string;
  description: string;

  tags: string[];

  chapter?: string;
  chapterId?: number;

  location?: string;
  date?: string;
  members?: number;
  industry?: string;
};

type ChapterLocation = {
  id: number;
  name: string;
  shortName: string;
  location: string;

  latitude: number;
  longitude: number;
};


// =============================
// CHAPTER LOCATIONS
// =============================

const chapterLocations: ChapterLocation[] = [
  {
    id: 1,
    name: "Florida Polytechnic University SASE",
    shortName: "Florida Poly",
    location: "Lakeland, Florida",

    latitude: 28.1489,
    longitude: -81.8484,
  },

  {
    id: 2,
    name: "University of Central Florida SASE",
    shortName: "UCF",
    location: "Orlando, Florida",

    latitude: 28.6024,
    longitude: -81.2001,
  },
];


// =============================
// TEMPORARY EXPLORE DATA
// Later this comes from PostgreSQL
// =============================

const exploreItems: ExploreItem[] = [
  {
    id: 1,
    type: "People",

    title: "Alex Chen",
    subtitle: "Computer Engineering",

    description:
      "Interested in embedded systems, robotics, and hardware.",

    tags: [
      "Hardware",
      "Robotics",
      "Embedded Systems",
    ],

    chapter:
      "Florida Polytechnic University SASE",

    chapterId: 1,

    location:
      "Lakeland, Florida",
  },

  {
    id: 2,
    type: "People",

    title: "JJ Nguyen",
    subtitle: "Data Science",

    description:
      "Interested in machine learning and data analytics.",

    tags: [
      "AI",
      "Data",
      "Machine Learning",
    ],

    chapter:
      "Florida Polytechnic University SASE",

    chapterId: 1,

    location:
      "Lakeland, Florida",
  },

  {
    id: 3,
    type: "Chapters",

    title:
      "Florida Polytechnic University SASE",

    subtitle:
      "Lakeland, Florida",

    description:
      "Connect with SASE members at Florida Poly.",

    tags: [
      "Chapter",
      "Florida",
    ],

    chapterId: 1,

    location:
      "Lakeland, Florida",

    members: 42,
  },

  {
    id: 4,
    type: "Chapters",

    title:
      "University of Central Florida SASE",

    subtitle:
      "Orlando, Florida",

    description:
      "Explore the UCF SASE community and upcoming events.",

    tags: [
      "Chapter",
      "Florida",
    ],

    chapterId: 2,

    location:
      "Orlando, Florida",

    members: 85,
  },

  {
    id: 5,
    type: "Events",

    title:
      "Resume Workshop",

    subtitle:
      "September 25 • 6:00 PM",

    description:
      "Build and improve your resume with other SASE members.",

    tags: [
      "Professional",
      "Workshop",
    ],

    chapter:
      "Florida Polytechnic University SASE",

    chapterId: 1,

    location:
      "Innovation Science & Technology Building",

    date:
      "September 25, 2026 • 6:00 PM",
  },

  {
    id: 6,
    type: "Events",

    title:
      "SASE Networking Night",

    subtitle:
      "October 2 • 7:00 PM",

    description:
      "Meet students, professionals, and other SASE members.",

    tags: [
      "Networking",
      "Career",
    ],

    chapter:
      "Florida Polytechnic University SASE",

    chapterId: 1,

    location:
      "Student Development Center",

    date:
      "October 2, 2026 • 7:00 PM",
  },

  {
    id: 7,
    type: "Sponsors",

    title:
      "Example Sponsor",

    subtitle:
      "Engineering & Technology",

    description:
      "Discover career opportunities with a SASE partner.",

    tags: [
      "Sponsor",
      "Careers",
    ],

    industry:
      "Engineering & Technology",

    location:
      "Orlando, Florida",

    chapterId: 2,
  },
];


// =============================
// EXPLORE PAGE
// =============================

export default function Explore() {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState<Category>("All");

  // Map is now the default view
  const [viewMode, setViewMode] =
    useState<ViewMode>("Map");

  const [selectedItem, setSelectedItem] =
    useState<ExploreItem | null>(null);

  const [
    selectedChapter,
    setSelectedChapter,
  ] = useState<ChapterLocation | null>(
    chapterLocations[0]
  );

  const [
    connectedPeople,
    setConnectedPeople,
  ] = useState<number[]>([]);

  const [
    rsvpEvents,
    setRsvpEvents,
  ] = useState<number[]>([]);


  const categories: Category[] = [
    "All",
    "People",
    "Chapters",
    "Events",
    "Sponsors",
  ];


  // =============================
  // SEARCH + FILTER
  // =============================

  const filteredItems =
    exploreItems.filter((item) => {
      const matchesCategory =
        category === "All" ||
        item.type === category;

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(searchText) ||

        item.subtitle
          .toLowerCase()
          .includes(searchText) ||

        item.description
          .toLowerCase()
          .includes(searchText) ||

        item.tags.some((tag) =>
          tag
            .toLowerCase()
            .includes(searchText)
        );

      return (
        matchesCategory &&
        matchesSearch
      );
    });


  // =============================
  // MAP CHAPTER FILTERING
  // =============================

  const visibleChapterLocations =
    chapterLocations.filter(
      (chapter) => {

        return filteredItems.some(
          (item) =>
            item.chapterId ===
            chapter.id
        );

      }
    );


  // =============================
  // SELECTED CHAPTER DATA
  // =============================

  const selectedChapterItems =
    selectedChapter
      ? filteredItems.filter(
          (item) =>
            item.chapterId ===
            selectedChapter.id
        )
      : [];


  const selectedPeople =
    selectedChapterItems.filter(
      (item) =>
        item.type === "People"
    );


  const selectedEvents =
    selectedChapterItems.filter(
      (item) =>
        item.type === "Events"
    );


  const selectedChapters =
    selectedChapterItems.filter(
      (item) =>
        item.type === "Chapters"
    );


  const selectedSponsors =
    selectedChapterItems.filter(
      (item) =>
        item.type === "Sponsors"
    );


  // =============================
  // ACTIONS
  // =============================

  const connectWithPerson =
    (id: number) => {

      if (
        !connectedPeople.includes(id)
      ) {

        setConnectedPeople([
          ...connectedPeople,
          id,
        ]);

      }
    };


  const rsvpToEvent =
    (id: number) => {

      if (
        !rsvpEvents.includes(id)
      ) {

        setRsvpEvents([
          ...rsvpEvents,
          id,
        ]);

      }
    };


  return (
    <main className="explore-page">

      {/* ======================= */}
      {/* HEADER                  */}
      {/* ======================= */}

      <section className="explore-header">

        <h1>
          Explore the SASE Community
        </h1>

        <p className="explore-description">
          Discover members, chapters,
          events, sponsors, and
          opportunities across the
          SASE network.
        </p>


        <input
          className="explore-search"

          type="text"

          placeholder=
            "Search members, chapters, events, interests..."

          value={search}

          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />


        <div className="explore-filters">

          {categories.map((item) => (

            <button
              key={item}

              className={
                category === item
                  ? "filter-button active"
                  : "filter-button"
              }

              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

      </section>


      {/* ======================= */}
      {/* RESULTS                 */}
      {/* ======================= */}

      <section className="explore-results">

        <div className="results-heading">

          <div>

            <h2>
              {category === "All"
                ? "Explore SASE"
                : category}
            </h2>

            <span>
              {filteredItems.length}{" "}

              {filteredItems.length === 1
                ? "result"
                : "results"}
            </span>

          </div>


          {/* Map is now the left/default button */}

          <div className="view-toggle">

            <button
              className={
                viewMode === "Map"
                  ? "view-toggle-button active"
                  : "view-toggle-button"
              }

              onClick={() =>
                setViewMode("Map")
              }
            >
              Map
            </button>


            <button
              className={
                viewMode === "Cards"
                  ? "view-toggle-button active"
                  : "view-toggle-button"
              }

              onClick={() =>
                setViewMode("Cards")
              }
            >
              Cards
            </button>

          </div>

        </div>


        {/* ======================= */}
        {/* CARD VIEW               */}
        {/* ======================= */}

        {viewMode === "Cards" && (

          <div className="explore-grid">

            {filteredItems.map(
              (item) => (

                <article
                  className="explore-card"
                  key={item.id}
                >

                  <span className="card-type">
                    {item.type}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p className="card-subtitle">
                    {item.subtitle}
                  </p>

                  <p>
                    {item.description}
                  </p>


                  <div className="card-tags">

                    {item.tags.map(
                      (tag) => (

                        <span key={tag}>
                          {tag}
                        </span>

                      )
                    )}

                  </div>


                  <button
                    className="view-button"

                    onClick={() =>
                      setSelectedItem(
                        item
                      )
                    }
                  >

                    View{" "}

                    {item.type === "People"
                      ? "Profile"
                      : item.type.slice(
                          0,
                          -1
                        )}

                  </button>

                </article>

              )
            )}

          </div>

        )}


        {/* ======================= */}
        {/* MAP VIEW                */}
        {/* ======================= */}

        {viewMode === "Map" && (

          <div className="map-layout">


            {/* LEFT: MAP */}

            <div className="map-wrapper">

              <MapContainer
                center={[
                  28.1,
                  -81.7,
                ]}

                zoom={7}

                scrollWheelZoom={true}

                className="explore-map"
              >

                <TileLayer
                  attribution=
                    "Tiles &copy; Esri"

                  url=
                    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                />


                {/* Only chapters with matching data */}
                {/* receive a marker. */}

                {visibleChapterLocations.map(
                  (chapter) => (

                    <Marker
                      key={chapter.id}

                      position={[
                        chapter.latitude,
                        chapter.longitude,
                      ]}

                      icon={markerIcon}

                      eventHandlers={{
                        click: () =>
                          setSelectedChapter(
                            chapter
                          ),
                      }}
                    >

                      <Popup>

                        <div className="map-popup">

                          <strong>
                            {chapter.shortName}
                          </strong>

                          <p>
                            {chapter.location}
                          </p>

                          <button
                            onClick={() =>
                              setSelectedChapter(
                                chapter
                              )
                            }
                          >
                            View Chapter
                          </button>

                        </div>

                      </Popup>

                    </Marker>

                  )
                )}

              </MapContainer>

            </div>


            {/* =================== */}
            {/* RIGHT SIDE PANEL    */}
            {/* =================== */}

            <aside className="map-side-panel">

              {selectedChapter &&
              visibleChapterLocations.some(
                (chapter) =>
                  chapter.id ===
                  selectedChapter.id
              ) ? (

                <>

                  <div className="map-panel-header">

                    <span className="map-panel-label">
                      SELECTED CHAPTER
                    </span>

                    <h2>
                      {selectedChapter.shortName}
                    </h2>

                    <p>
                      {selectedChapter.location}
                    </p>

                  </div>


                  {/* PEOPLE */}

                  {(category === "All" ||
                    category === "People") && (

                    <div className="map-panel-section">

                      <h3>
                        People

                        <span>
                          {selectedPeople.length}
                        </span>
                      </h3>


                      {selectedPeople.length > 0 ? (

                        selectedPeople.map(
                          (person) => (

                            <button
                              key={person.id}

                              className=
                                "map-result-item"

                              onClick={() =>
                                setSelectedItem(
                                  person
                                )
                              }
                            >

                              <strong>
                                {person.title}
                              </strong>

                              <span>
                                {person.subtitle}
                              </span>

                            </button>

                          )
                        )

                      ) : (

                        <p className="map-empty">
                          No people found.
                        </p>

                      )}

                    </div>

                  )}


                  {/* EVENTS */}

                  {(category === "All" ||
                    category === "Events") && (

                    <div className="map-panel-section">

                      <h3>
                        Events

                        <span>
                          {selectedEvents.length}
                        </span>
                      </h3>


                      {selectedEvents.length > 0 ? (

                        selectedEvents.map(
                          (event) => (

                            <button
                              key={event.id}

                              className=
                                "map-result-item"

                              onClick={() =>
                                setSelectedItem(
                                  event
                                )
                              }
                            >

                              <strong>
                                {event.title}
                              </strong>

                              <span>
                                {event.subtitle}
                              </span>

                            </button>

                          )
                        )

                      ) : (

                        <p className="map-empty">
                          No events found.
                        </p>

                      )}

                    </div>

                  )}


                  {/* CHAPTER */}

                  {(category === "All" ||
                    category === "Chapters") && (

                    <div className="map-panel-section">

                      <h3>
                        Chapter

                        <span>
                          {selectedChapters.length}
                        </span>
                      </h3>


                      {selectedChapters.length > 0 ? (

                        selectedChapters.map(
                          (chapter) => (

                            <button
                              key={chapter.id}

                              className=
                                "map-result-item"

                              onClick={() =>
                                setSelectedItem(
                                  chapter
                                )
                              }
                            >

                              <strong>
                                {chapter.title}
                              </strong>

                              <span>
                                {chapter.subtitle}
                              </span>

                            </button>

                          )
                        )

                      ) : (

                        <p className="map-empty">
                          No chapter information found.
                        </p>

                      )}

                    </div>

                  )}


                  {/* SPONSORS */}

                  {(category === "All" ||
                    category === "Sponsors") && (

                    <div className="map-panel-section">

                      <h3>
                        Sponsors

                        <span>
                          {selectedSponsors.length}
                        </span>
                      </h3>


                      {selectedSponsors.length > 0 ? (

                        selectedSponsors.map(
                          (sponsor) => (

                            <button
                              key={sponsor.id}

                              className=
                                "map-result-item"

                              onClick={() =>
                                setSelectedItem(
                                  sponsor
                                )
                              }
                            >

                              <strong>
                                {sponsor.title}
                              </strong>

                              <span>
                                {sponsor.subtitle}
                              </span>

                            </button>

                          )
                        )

                      ) : (

                        <p className="map-empty">
                          No sponsors found.
                        </p>

                      )}

                    </div>

                  )}

                </>

              ) : (

                <div className="map-panel-placeholder">

                  <h3>
                    Select a chapter
                  </h3>

                  <p>
                    Click a visible marker
                    to view matching people,
                    events, sponsors, and
                    chapter information.
                  </p>

                </div>

              )}

            </aside>

          </div>

        )}


        {/* ======================= */}
        {/* NO RESULTS              */}
        {/* ======================= */}

        {filteredItems.length === 0 && (

          <div className="no-results">

            <h3>
              No results found
            </h3>

            <p>
              Try searching for
              something else.
            </p>

          </div>

        )}

      </section>


      {/* ======================= */}
      {/* DETAIL POPUP            */}
      {/* ======================= */}

      {selectedItem && (

        <div
          className="detail-overlay"

          onClick={() =>
            setSelectedItem(null)
          }
        >

          <div
            className="detail-card"

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="close-button"

              onClick={() =>
                setSelectedItem(null)
              }

              aria-label="Close"
            >
              ×
            </button>


            <span className="card-type">
              {selectedItem.type}
            </span>


            <h2>
              {selectedItem.title}
            </h2>


            <p className="card-subtitle">
              {selectedItem.subtitle}
            </p>


            <p>
              {selectedItem.description}
            </p>


            {/* PERSON */}

            {selectedItem.type ===
              "People" && (

              <div className="detail-info">

                <p>
                  <strong>
                    Major:
                  </strong>{" "}
                  {selectedItem.subtitle}
                </p>

                <p>
                  <strong>
                    Chapter:
                  </strong>{" "}
                  {selectedItem.chapter}
                </p>

                <p>
                  <strong>
                    Location:
                  </strong>{" "}
                  {selectedItem.location}
                </p>

              </div>

            )}


            {/* CHAPTER */}

            {selectedItem.type ===
              "Chapters" && (

              <div className="detail-info">

                <p>
                  <strong>
                    Location:
                  </strong>{" "}
                  {selectedItem.location}
                </p>

                <p>
                  <strong>
                    Members:
                  </strong>{" "}
                  {selectedItem.members}
                </p>

              </div>

            )}


            {/* EVENT */}

            {selectedItem.type ===
              "Events" && (

              <div className="detail-info">

                <p>
                  <strong>
                    Date:
                  </strong>{" "}
                  {selectedItem.date}
                </p>

                <p>
                  <strong>
                    Hosted by:
                  </strong>{" "}
                  {selectedItem.chapter}
                </p>

                <p>
                  <strong>
                    Location:
                  </strong>{" "}
                  {selectedItem.location}
                </p>

              </div>

            )}


            {/* SPONSOR */}

            {selectedItem.type ===
              "Sponsors" && (

              <div className="detail-info">

                <p>
                  <strong>
                    Industry:
                  </strong>{" "}
                  {selectedItem.industry}
                </p>

                <p>
                  <strong>
                    Location:
                  </strong>{" "}
                  {selectedItem.location}
                </p>

              </div>

            )}


            {/* TAGS */}

            <div className="card-tags">

              {selectedItem.tags.map(
                (tag) => (

                  <span key={tag}>
                    {tag}
                  </span>

                )
              )}

            </div>


            {/* PERSON ACTION */}

            {selectedItem.type ===
              "People" && (

              <button
                className=
                  "detail-action-button"

                onClick={() =>
                  connectWithPerson(
                    selectedItem.id
                  )
                }

                disabled=
                  {connectedPeople.includes(
                    selectedItem.id
                  )}
              >

                {connectedPeople.includes(
                  selectedItem.id
                )
                  ? "Request Sent ✓"
                  : "Connect"}

              </button>

            )}


            {/* EVENT ACTION */}

            {selectedItem.type ===
              "Events" && (

              <button
                className=
                  "detail-action-button"

                onClick={() =>
                  rsvpToEvent(
                    selectedItem.id
                  )
                }

                disabled=
                  {rsvpEvents.includes(
                    selectedItem.id
                  )}
              >

                {rsvpEvents.includes(
                  selectedItem.id
                )
                  ? "RSVP'd ✓"
                  : "RSVP"}

              </button>

            )}


            {/* CHAPTER ACTION */}

            {selectedItem.type ===
              "Chapters" && (

              <button
                className=
                  "detail-action-button"

                onClick={() =>
                  alert(
                    `${selectedItem.title} chapter page coming soon!`
                  )
                }
              >
                View Chapter
              </button>

            )}


            {/* SPONSOR ACTION */}

            {selectedItem.type ===
              "Sponsors" && (

              <button
                className=
                  "detail-action-button"

                onClick={() =>
                  alert(
                    `${selectedItem.title} opportunities coming soon!`
                  )
                }
              >
                View Opportunities
              </button>

            )}

          </div>

        </div>

      )}

    </main>
  );
}