import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "../styles/explore.css";
import type {
  ChapterLocation,
  ExploreFilter,
  ExploreItem,
  SponsorLocation,
  ViewMode,
} from "../types";


/* =========================================================
   TYPES
   ========================================================= */

type FilterType = ExploreFilter;


/* =========================================================
   EXPLORE DATA
   ========================================================= */

const demoExploreItems: ExploreItem[] = [
  {
    id: 1,
    type: "People",
    title: "Alex Chen",
    subtitle:
      "Computer Engineering • Florida Polytechnic University",
    description:
      "Interested in embedded systems, robotics, and hardware engineering.",
    chapterId: 1,
  },

  {
    id: 2,
    type: "People",
    title: "JJ Nguyen",
    subtitle:
      "Data Science • Florida Polytechnic University",
    description:
      "Interested in data science, computer engineering, and technology.",
    chapterId: 1,
  },

  {
    id: 3,
    type: "Chapters",
    title:
      "Florida Polytechnic University SASE",
    subtitle:
      "Lakeland, Florida",
    description:
      "SASE chapter at Florida Polytechnic University.",
    chapterId: 1,
  },

  {
    id: 4,
    type: "Chapters",
    title:
      "University of Central Florida SASE",
    subtitle:
      "Orlando, Florida",
    description:
      "SASE chapter at the University of Central Florida.",
    chapterId: 2,
  },

  {
    id: 5,
    type: "Events",
    title: "Resume Workshop",
    subtitle:
      "Florida Polytechnic University",
    description:
      "Resume preparation workshop for students preparing for career fairs and internships.",
    chapterId: 1,
  },

  {
    id: 6,
    type: "Events",
    title:
      "SASE Networking Night",
    subtitle:
      "Florida Polytechnic University",
    description:
      "Meet other SASE members and build professional connections.",
    chapterId: 1,
  },

  {
    id: 7,
    type: "Sponsors",
    title: "NVIDIA",
    subtitle:
      "Technology • Santa Clara, California",
    description:
      "Accelerated computing, AI, graphics, robotics, and hardware engineering.",
  },

  {
    id: 8,
    type: "Sponsors",
    title: "AMD",
    subtitle:
      "Technology • Santa Clara, California",
    description:
      "Semiconductors, processors, graphics, AI, and high-performance computing.",
  },

  {
    id: 9,
    type: "Sponsors",
    title: "Lockheed Martin",
    subtitle:
      "Defense & Aerospace",
    description:
      "Aerospace, defense, software, electrical engineering, and advanced systems.",
  },

  {
    id: 10,
    type: "Sponsors",
    title: "JPMorganChase",
    subtitle:
      "Finance & Technology",
    description:
      "Financial services, software engineering, cybersecurity, data, and analytics.",
  },

  {
    id: 11,
    type: "Sponsors",
    title: "Siemens",
    subtitle:
      "Engineering & Technology",
    description:
      "Automation, infrastructure, electrification, manufacturing, and digital engineering.",
  },
];


/* =========================================================
   SASE CHAPTER LOCATIONS
   ========================================================= */

const chapterLocations: ChapterLocation[] = [
  {
    id: 1,
    name:
      "Florida Polytechnic University SASE",
    school:
      "Florida Polytechnic University",
    lat: 28.1489,
    lng: -81.8484,
  },

  {
    id: 2,
    name:
      "University of Central Florida SASE",
    school:
      "University of Central Florida",
    lat: 28.6024,
    lng: -81.2001,
  },
];


/* =========================================================
   SPONSOR LOCATIONS
   ========================================================= */

const sponsorLocations: SponsorLocation[] = [

  /* Lockheed Martin */

  {
    id: 101,
    sponsorName:
      "Lockheed Martin",
    locationName:
      "Orlando, Florida",
    locationType:
      "Florida Office",
    lat: 28.4507,
    lng: -81.4438,
    description:
      "Lockheed Martin has major engineering operations in the Orlando area.",
  },

  {
    id: 102,
    sponsorName:
      "Lockheed Martin",
    locationName:
      "Bethesda, Maryland",
    locationType:
      "Headquarters",
    lat: 39.0228,
    lng: -77.138,
    description:
      "Corporate headquarters of Lockheed Martin.",
  },


  /* JPMorganChase */

  {
    id: 103,
    sponsorName:
      "JPMorganChase",
    locationName:
      "Tampa, Florida",
    locationType:
      "Florida Office",
    lat: 28.0499,
    lng: -82.3743,
    description:
      "JPMorganChase has a major employee and technology presence in Tampa.",
  },

  {
    id: 104,
    sponsorName:
      "JPMorganChase",
    locationName:
      "New York, New York",
    locationType:
      "Headquarters",
    lat: 40.7568,
    lng: -73.9753,
    description:
      "Global headquarters of JPMorganChase.",
  },


  /* Siemens */

  {
    id: 105,
    sponsorName:
      "Siemens",
    locationName:
      "Orlando, Florida",
    locationType:
      "Florida Office",
    lat: 28.5383,
    lng: -81.3792,
    description:
      "Siemens has an established presence in the Orlando area.",
  },

  {
    id: 106,
    sponsorName:
      "Siemens",
    locationName:
      "Munich, Germany",
    locationType:
      "Headquarters",
    lat: 48.1351,
    lng: 11.582,
    description:
      "Corporate headquarters of Siemens.",
  },


  /* NVIDIA */

  {
    id: 107,
    sponsorName:
      "NVIDIA",
    locationName:
      "Santa Clara, California",
    locationType:
      "Headquarters",
    lat: 37.3708,
    lng: -121.9675,
    description:
      "Corporate headquarters of NVIDIA.",
  },


  /* AMD */

  {
    id: 108,
    sponsorName:
      "AMD",
    locationName:
      "Santa Clara, California",
    locationType:
      "Headquarters",
    lat: 37.3825,
    lng: -121.9777,
    description:
      "Corporate headquarters of AMD.",
  },
];


/* =========================================================
   MAP ICONS
   ========================================================= */

const chapterIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


const sponsorIcon =
  L.divIcon({
    className:
      "sponsor-map-marker-wrapper",

    html: `
      <div
        style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #7c3aed;
          border: 3px solid white;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
          box-shadow: 0 3px 10px rgba(0,0,0,.35);
        "
      >
        S
      </div>
    `,

    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });


/* =========================================================
   MAIN COMPONENT
   ========================================================= */

type ExploreProps = {
  exploreData: ExploreItem[];
};

export default function Explore({ exploreData }: ExploreProps) {
  const exploreItems = exploreData.length > 0 ? exploreData : demoExploreItems;

  /*
    React Router navigation.

    This lets Explore send the user directly to a sponsor
    on the Sponsors page.
  */

  const navigate = useNavigate();


  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState<FilterType>("All");

  const [viewMode, setViewMode] =
    useState<ViewMode>("Map");

  const [
    selectedItem,
    setSelectedItem,
  ] =
    useState<ExploreItem | null>(
      null
    );

  const [
    selectedChapterId,
    setSelectedChapterId,
  ] =
    useState<number | null>(null);


  /* =======================================================
     FILTERING
     ======================================================= */

  const filteredItems =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();

      return exploreItems.filter(
        (item) => {

          const matchesFilter =
            filter === "All" ||
            item.type === filter;

          const matchesSearch =
            query === "" ||
            item.title
              .toLowerCase()
              .includes(query) ||
            item.subtitle
              .toLowerCase()
              .includes(query) ||
            item.description
              .toLowerCase()
              .includes(query);

          return (
            matchesFilter &&
            matchesSearch
          );
        }
      );

    }, [search, filter]);


  const visibleSponsorLocations =
    useMemo(() => {

      if (
        filter !== "All" &&
        filter !== "Sponsors"
      ) {
        return [];
      }

      const query =
        search
          .trim()
          .toLowerCase();

      if (query === "") {
        return sponsorLocations;
      }

      return sponsorLocations.filter(
        (location) =>
          location.sponsorName
            .toLowerCase()
            .includes(query) ||
          location.locationName
            .toLowerCase()
            .includes(query) ||
          location.locationType
            .toLowerCase()
            .includes(query) ||
          location.description
            .toLowerCase()
            .includes(query)
      );

    }, [search, filter]);


  const visibleChapterLocations =
    useMemo(() => {

      if (filter === "Sponsors") {
        return [];
      }

      return chapterLocations.filter(
        (chapter) =>
          filteredItems.some(
            (item) =>
              item.chapterId ===
              chapter.id
          )
      );

    }, [filteredItems, filter]);


  /* =======================================================
     SELECTED CHAPTER DATA
     ======================================================= */

  const selectedChapter =
    chapterLocations.find(
      (chapter) =>
        chapter.id ===
        selectedChapterId
    );


  const selectedChapterItems =
    selectedChapterId === null
      ? []
      : exploreItems.filter(
          (item) =>
            item.chapterId ===
            selectedChapterId
        );


  const selectedChapterPeople =
    selectedChapterItems.filter(
      (item) =>
        item.type === "People"
    );


  const selectedChapterEvents =
    selectedChapterItems.filter(
      (item) =>
        item.type === "Events"
    );


  const selectedChapterInfo =
    selectedChapterItems.filter(
      (item) =>
        item.type === "Chapters"
    );


  /* =======================================================
     HELPERS
     ======================================================= */

  const filters: FilterType[] = [
    "All",
    "People",
    "Chapters",
    "Events",
    "Sponsors",
  ];


  const handleConnect = (
    personName: string
  ) => {

    alert(
      `Connection request sent to ${personName}!`
    );

  };


  const handleRSVP = (
    eventName: string
  ) => {

    alert(
      `You're registered for ${eventName}!`
    );

  };


  /*
    IMPORTANT CHANGE:

    Instead of showing an alert, this sends the user to:

    /sponsors?company=AMD

    or

    /sponsors?company=Lockheed%20Martin

    The Sponsors page will read that company name and open
    the correct sponsor automatically.
  */

  const handleViewSponsor = (
    sponsorName: string
  ) => {

    navigate(
      `/sponsors?company=${encodeURIComponent(
        sponsorName
      )}`
    );

  };


  /* =======================================================
     CARD RENDERER
     ======================================================= */

  const renderCard = (
    item: ExploreItem
  ) => {

    return (
      <article
        className="explore-card"
        key={item.id}
        onClick={() =>
          setSelectedItem(item)
        }
      >

        <div className="explore-card-header">

          <span
            className={`explore-type-badge ${item.type.toLowerCase()}`}
          >
            {item.type}
          </span>

        </div>

        <h3>
          {item.title}
        </h3>

        <p className="explore-card-subtitle">
          {item.subtitle}
        </p>

        <p className="explore-card-description">
          {item.description}
        </p>

        <button
          className="explore-card-button"
          onClick={(event) => {
            event.stopPropagation();

            setSelectedItem(item);
          }}
        >
          View Details
        </button>

      </article>
    );

  };


  /* =========================================================
     PAGE
     ========================================================= */

  return (

    <main className="explore-page">


      {/* HEADER */}

      <section className="explore-header">

        <div>

          <span className="explore-eyebrow">
            SASE NETWORK
          </span>

          <h1>
            Explore
          </h1>

          <p>
            Discover SASE members,
            chapters, events, sponsors,
            and opportunities across
            the network.
          </p>

        </div>

      </section>


      {/* SEARCH + FILTERS */}

      <section className="explore-controls">

        <div className="explore-search-wrapper">

          <span className="explore-search-icon">
            ⌕
          </span>

          <input
            type="text"
            className="explore-search"
            placeholder="Search people, chapters, events, sponsors..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>


        <div className="explore-filter-row">

          <div className="explore-filters">

            {filters.map(
              (filterOption) => (

                <button
                  key={filterOption}
                  className={
                    filter ===
                    filterOption
                      ? "explore-filter active"
                      : "explore-filter"
                  }
                  onClick={() => {

                    setFilter(
                      filterOption
                    );

                    setSelectedChapterId(
                      null
                    );

                  }}
                >
                  {filterOption}
                </button>

              )
            )}

          </div>


          <div className="explore-view-toggle">

            <button
              className={
                viewMode === "Map"
                  ? "active"
                  : ""
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
                  ? "active"
                  : ""
              }
              onClick={() =>
                setViewMode("Cards")
              }
            >
              Cards
            </button>

          </div>

        </div>

      </section>


      {/* ===================================================
          MAP
          =================================================== */}

      {viewMode === "Map" && (

        <section className="explore-map-layout">


          <div className="explore-map-container">

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
                attribution="&copy; Esri"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
              />


              {/* CHAPTER MARKERS */}

              {visibleChapterLocations.map(
                (chapter) => (

                  <Marker
                    key={`chapter-${chapter.id}`}
                    position={[
                      chapter.lat,
                      chapter.lng,
                    ]}
                    icon={chapterIcon}
                    eventHandlers={{
                      click: () =>
                        setSelectedChapterId(
                          chapter.id
                        ),
                    }}
                  >

                    <Popup>

                      <div>

                        <strong>
                          {chapter.name}
                        </strong>

                        <br />

                        <span>
                          SASE Chapter
                        </span>

                        <br />

                        <span>
                          {chapter.school}
                        </span>

                      </div>

                    </Popup>

                  </Marker>

                )
              )}


              {/* SPONSOR MARKERS */}

              {visibleSponsorLocations.map(
                (location) => (

                  <Marker
                    key={`sponsor-${location.id}`}
                    position={[
                      location.lat,
                      location.lng,
                    ]}
                    icon={sponsorIcon}
                  >

                    <Popup>

                      <div
                        style={{
                          minWidth:
                            "190px",
                        }}
                      >

                        <strong>
                          {
                            location.sponsorName
                          }
                        </strong>

                        <br />

                        <span>
                          {
                            location.locationType
                          }
                        </span>

                        <br />

                        <span>
                          {
                            location.locationName
                          }
                        </span>

                        <p
                          style={{
                            margin:
                              "8px 0",
                          }}
                        >
                          {
                            location.description
                          }
                        </p>

                        <button
                          onClick={() =>
                            handleViewSponsor(
                              location.sponsorName
                            )
                          }
                        >
                          View Sponsor
                        </button>

                      </div>

                    </Popup>

                  </Marker>

                )
              )}

            </MapContainer>


            {/* MAP LEGEND */}

            <div
              style={{
                position:
                  "absolute",

                bottom: "18px",
                left: "18px",

                zIndex: 500,

                padding:
                  "10px 13px",

                borderRadius:
                  "10px",

                background:
                  "rgba(18, 18, 23, 0.92)",

                color: "white",

                fontSize:
                  "12px",

                boxShadow:
                  "0 5px 18px rgba(0,0,0,.25)",
              }}
            >

              <div
                style={{
                  marginBottom:
                    "5px",
                }}
              >
                📍 SASE Chapter
              </div>

              <div>
                🟣 Sponsor Location
              </div>

            </div>

          </div>


          {/* MAP SIDE PANEL */}

          <aside className="explore-map-panel">

            {selectedChapter ? (

              <>

                <span className="explore-panel-label">
                  SASE CHAPTER
                </span>

                <h2>
                  {
                    selectedChapter.name
                  }
                </h2>

                <p>
                  {
                    selectedChapter.school
                  }
                </p>


                {selectedChapterInfo.map(
                  (chapterItem) => (

                    <div
                      className="explore-panel-item"
                      key={
                        chapterItem.id
                      }
                    >

                      <strong>
                        Chapter
                      </strong>

                      <span>
                        {
                          chapterItem.description
                        }
                      </span>

                    </div>

                  )
                )}


                <h3>
                  Members
                </h3>

                {selectedChapterPeople.length >
                0 ? (

                  selectedChapterPeople.map(
                    (person) => (

                      <button
                        className="explore-panel-card"
                        key={
                          person.id
                        }
                        onClick={() =>
                          setSelectedItem(
                            person
                          )
                        }
                      >

                        <strong>
                          {
                            person.title
                          }
                        </strong>

                        <span>
                          {
                            person.subtitle
                          }
                        </span>

                      </button>

                    )
                  )

                ) : (

                  <p className="explore-muted">
                    No members listed.
                  </p>

                )}


                <h3>
                  Events
                </h3>

                {selectedChapterEvents.length >
                0 ? (

                  selectedChapterEvents.map(
                    (eventItem) => (

                      <button
                        className="explore-panel-card"
                        key={
                          eventItem.id
                        }
                        onClick={() =>
                          setSelectedItem(
                            eventItem
                          )
                        }
                      >

                        <strong>
                          {
                            eventItem.title
                          }
                        </strong>

                        <span>
                          {
                            eventItem.description
                          }
                        </span>

                      </button>

                    )
                  )

                ) : (

                  <p className="explore-muted">
                    No upcoming events.
                  </p>

                )}

              </>

            ) : (

              <>

                <span className="explore-panel-label">
                  EXPLORE THE NETWORK
                </span>

                <h2>
                  Select a location
                </h2>

                <p>
                  Click a SASE chapter
                  or sponsor marker to
                  explore the network.
                </p>


                <div className="explore-panel-summary">

                  <div>

                    <strong>
                      {
                        visibleChapterLocations.length
                      }
                    </strong>

                    <span>
                      Chapters
                    </span>

                  </div>

                  <div>

                    <strong>
                      {
                        visibleSponsorLocations.length
                      }
                    </strong>

                    <span>
                      Sponsor Locations
                    </span>

                  </div>

                </div>


                <div
                  style={{
                    marginTop:
                      "24px",
                  }}
                >

                  <h3>
                    Florida Sponsor
                    Locations
                  </h3>

                  {visibleSponsorLocations
                    .filter(
                      (location) =>
                        location.locationType ===
                        "Florida Office"
                    )
                    .map(
                      (location) => (

                        <div
                          className="explore-panel-item"
                          key={
                            location.id
                          }
                        >

                          <strong>
                            {
                              location.sponsorName
                            }
                          </strong>

                          <span>
                            {
                              location.locationName
                            }
                          </span>

                        </div>

                      )
                    )}

                </div>

              </>

            )}

          </aside>

        </section>

      )}


      {/* ===================================================
          CARDS
          =================================================== */}

      {viewMode === "Cards" && (

        <section className="explore-results">

          <div className="explore-results-header">

            <h2>
              Discover
            </h2>

            <span>
              {filteredItems.length}{" "}
              results
            </span>

          </div>


          {filteredItems.length >
          0 ? (

            <div className="explore-grid">

              {filteredItems.map(
                renderCard
              )}

            </div>

          ) : (

            <div className="explore-empty">

              <h3>
                No results found
              </h3>

              <p>
                Try another search
                or filter.
              </p>

              <button
                onClick={() => {

                  setSearch("");

                  setFilter(
                    "All"
                  );

                }}
              >
                Clear Filters
              </button>

            </div>

          )}

        </section>

      )}


      {/* ===================================================
          DETAILS MODAL
          =================================================== */}

      {selectedItem && (

        <div
          className="explore-modal-overlay"
          onClick={() =>
            setSelectedItem(null)
          }
        >

          <div
            className="explore-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="explore-modal-close"
              onClick={() =>
                setSelectedItem(null)
              }
            >
              ×
            </button>


            <span
              className={`explore-type-badge ${selectedItem.type.toLowerCase()}`}
            >
              {
                selectedItem.type
              }
            </span>


            <h2>
              {
                selectedItem.title
              }
            </h2>


            <p className="explore-modal-subtitle">
              {
                selectedItem.subtitle
              }
            </p>


            <p className="explore-modal-description">
              {
                selectedItem.description
              }
            </p>


            {selectedItem.type ===
              "People" && (

              <button
                className="explore-modal-action"
                onClick={() =>
                  handleConnect(
                    selectedItem.title
                  )
                }
              >
                Connect
              </button>

            )}


            {selectedItem.type ===
              "Events" && (

              <button
                className="explore-modal-action"
                onClick={() =>
                  handleRSVP(
                    selectedItem.title
                  )
                }
              >
                RSVP
              </button>

            )}


            {selectedItem.type ===
              "Chapters" && (

              <button
                className="explore-modal-action"
                onClick={() => {

                  if (
                    selectedItem.chapterId
                  ) {

                    setSelectedChapterId(
                      selectedItem.chapterId
                    );

                    setViewMode(
                      "Map"
                    );

                    setSelectedItem(
                      null
                    );

                  }

                }}
              >
                View Chapter on Map
              </button>

            )}


            {selectedItem.type ===
              "Sponsors" && (

              <button
                className="explore-modal-action"
                onClick={() =>
                  handleViewSponsor(
                    selectedItem.title
                  )
                }
              >
                View Sponsor
              </button>

            )}

          </div>

        </div>

      )}

    </main>

  );
}