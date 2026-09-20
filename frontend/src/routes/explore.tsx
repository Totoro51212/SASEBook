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

  Chapter,

  Profile,

  ExploreFilter,

  ExploreItem,

  Sponsor,

  ViewMode,

} from "../types";



type ExploreProps = {

  profiles: Profile[];

  chapters: Chapter[];

  sponsors: Sponsor[];

};



const chapterIcon = L.divIcon({

  className: "",

  html: `

    <div style="

      width:34px;

      height:34px;

      border-radius:50%;

      background:#4f6fe8;

      border:3px solid white;

      box-shadow:0 2px 8px rgba(0,0,0,.30);

      display:flex;

      align-items:center;

      justify-content:center;

      color:white;

      font-size:16px;

      font-weight:700;

    ">S</div>

  `,

  iconSize: [34, 34],

  iconAnchor: [17, 17],

  popupAnchor: [0, -18],

});



const sponsorIcon = L.divIcon({

  className: "",

  html: `

    <div style="

      width:34px;

      height:34px;

      border-radius:50%;

      background:#7548e8;

      border:3px solid white;

      box-shadow:0 2px 8px rgba(0,0,0,.30);

      display:flex;

      align-items:center;

      justify-content:center;

      color:white;

      font-size:15px;

      font-weight:700;

    ">★</div>

  `,

  iconSize: [34, 34],

  iconAnchor: [17, 17],

  popupAnchor: [0, -18],

});



const filters: ExploreFilter[] = [

  "All",

  "People",

  "Chapters",

  "Events",

  "Sponsors",

];



export default function Explore({

  profiles,

  chapters,

  sponsors,

}: ExploreProps) {

  const navigate = useNavigate();



  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<ExploreFilter>("All");

  const [viewMode, setViewMode] = useState<ViewMode>("Map");

  const [selectedChapterId, setSelectedChapterId] =

    useState<number | null>(null);

  const [selectedItem, setSelectedItem] =

    useState<ExploreItem | null>(null);



  const exploreItems = useMemo<ExploreItem[]>(() => {

    const peopleItems: ExploreItem[] = profiles
      .filter(
        (profile): profile is Profile & { id: number; name: string } =>
          profile.id !== undefined && profile.name !== undefined
      )
      .map((profile) => ({
        id: profile.id,
        type: "People",
        title: profile.name,
        subtitle: [
          profile.major,
          profile.graduation_year
            ? `Class of ${profile.graduation_year}`
            : null,
        ]
          .filter(Boolean)
          .join(" • "),
        description: profile.bio ?? profile.interests ?? "SASE member",
        chapterId: profile.chapter_id ?? undefined,
      }));

    const chapterItems: ExploreItem[] = chapters.map((chapter) => ({

      id: chapter.id,

      type: "Chapters",

      title: chapter.chapterName,

      subtitle: `${chapter.university} • ${chapter.location}`,

      description:

        chapter.description || `${chapter.chapterName} chapter`,

      chapterId: chapter.id,

    }));



    const sponsorItems: ExploreItem[] = sponsors.map((sponsor) => ({

      id: sponsor.id,

      type: "Sponsors",

      title: sponsor.name,

      subtitle: `${sponsor.industry} • ${sponsor.location}`,

      description:

        sponsor.description || `${sponsor.name} is a SASE sponsor.`,

    }));



    return [...peopleItems, ...chapterItems, ...sponsorItems];

  }, [profiles, chapters, sponsors]);



  const filteredItems = useMemo(() => {

    const query = search.trim().toLowerCase();



    return exploreItems.filter((item) => {

      const matchesFilter =

        filter === "All" || item.type === filter;



      const matchesSearch =

        query === "" ||

        item.title.toLowerCase().includes(query) ||

        item.subtitle.toLowerCase().includes(query) ||

        item.description.toLowerCase().includes(query);



      return matchesFilter && matchesSearch;

    });

  }, [exploreItems, search, filter]);



  const visibleChapters = useMemo(() => {

    if (

      filter !== "All" &&

      filter !== "Chapters"

    ) {

      return [];

    }



    const query = search.trim().toLowerCase();



    return chapters.filter((chapter) => {

      const hasCoordinates =

        typeof chapter.latitude === "number" &&

        typeof chapter.longitude === "number";



      if (!hasCoordinates) return false;

      if (!query) return true;



      return [

        chapter.chapterName,

        chapter.university,

        chapter.shortName,

        chapter.location,

        chapter.region,

        chapter.description,

      ].some((value) =>

        value?.toLowerCase().includes(query)

      );

    });

  }, [chapters, search, filter]);



  const visibleSponsors = useMemo(() => {

    if (

      filter !== "All" &&

      filter !== "Sponsors"

    ) {

      return [];

    }



    const query = search.trim().toLowerCase();



    return sponsors.filter((sponsor) => {

      const hasCoordinates =

        typeof sponsor.latitude === "number" &&

        typeof sponsor.longitude === "number";



      if (!hasCoordinates) return false;

      if (!query) return true;



      return [

        sponsor.name,

        sponsor.industry,

        sponsor.location,

        sponsor.description,

      ].some((value) =>

        value?.toLowerCase().includes(query)

      );

    });

  }, [sponsors, search, filter]);



  const selectedChapter =

    selectedChapterId === null

      ? null

      : chapters.find(

          (chapter) =>

            chapter.id === selectedChapterId

        ) ?? null;



  const selectedChapterPeople =

    selectedChapterId === null

      ? []

      : profiles.filter(

          (profile) =>

            profile.chapter_id === selectedChapterId

        );



  function openChapterPage(chapter: Chapter) {

    /*

     * Chapters currently lives at /chapters.

     * We also include the chapter slug in the URL so the

     * destination can use it later for direct chapter opening.

     */

    navigate(

      `/chapters?chapter=${encodeURIComponent(

        chapter.slug

      )}`

    );

  }



  function openSponsorPage(sponsor: Sponsor) {

    navigate(

      `/sponsors?company=${encodeURIComponent(

        sponsor.name

      )}`

    );

  }



  return (

    <main className="explore-page">

      {/* HEADER */}

      <section className="explore-header">

        <div>

          <span className="explore-eyebrow">

            SASE NETWORK

          </span>



          <h1>Explore</h1>



          <p>

            Discover SASE members, chapters, events,

            sponsors, and opportunities across the network.

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

              setSearch(event.target.value)

            }

          />

        </div>



        <div className="explore-filter-row">

          <div className="explore-filters">

            {filters.map((filterOption) => (

              <button

                key={filterOption}

                className={

                  filter === filterOption

                    ? "explore-filter active"

                    : "explore-filter"

                }

                onClick={() => {

                  setFilter(filterOption);

                  setSelectedChapterId(null);

                }}

              >

                {filterOption}

              </button>

            ))}

          </div>



          <div className="explore-view-toggle">

            {(["Map", "Cards"] as ViewMode[]).map(

              (mode) => (

                <button

                  key={mode}

                  className={

                    viewMode === mode

                      ? "active"

                      : ""

                  }

                  onClick={() =>

                    setViewMode(mode)

                  }

                >

                  {mode}

                </button>

              )

            )}

          </div>

        </div>

      </section>



      {/* MAP VIEW */}

      {viewMode === "Map" && (

        <section className="explore-map-section">

          <div className="explore-map-wrapper">

            <MapContainer

              center={[32.1, -81.7]}

              zoom={5}

              scrollWheelZoom={true}

              className="explore-map"

            >

              <TileLayer

                attribution='&copy; OpenStreetMap contributors'

                url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"

                maxZoom={18}

              />



              {/* CHAPTER MARKERS */}

              {visibleChapters.map((chapter) => (

                <Marker

                  key={`chapter-${chapter.id}`}

                  position={[

                    chapter.latitude!,

                    chapter.longitude!,

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

                    <div style={{ minWidth: 200 }}>

                      <strong>

                        {chapter.chapterName}

                      </strong>



                      <br />



                      <span>SASE Chapter</span>



                      <br />



                      <span>

                        {chapter.university}

                      </span>



                      <br />



                      <button

                        style={{

                          marginTop: 10,

                          cursor: "pointer",

                        }}

                        onClick={() =>

                          openChapterPage(chapter)

                        }

                      >

                        View Chapter

                      </button>

                    </div>

                  </Popup>

                </Marker>

              ))}



              {/* SPONSOR MARKERS */}

              {visibleSponsors.map((sponsor) => (

                <Marker

                  key={`sponsor-${sponsor.id}`}

                  position={[

                    sponsor.latitude!,

                    sponsor.longitude!,

                  ]}

                  icon={sponsorIcon}

                >

                  <Popup>

                    <div style={{ minWidth: 190 }}>

                      <strong>{sponsor.name}</strong>



                      <br />



                      <span>{sponsor.industry}</span>



                      <br />



                      <span>{sponsor.location}</span>



                      <p style={{ margin: "8px 0" }}>

                        {sponsor.description}

                      </p>



                      <button

                        onClick={() =>

                          openSponsorPage(sponsor)

                        }

                      >

                        View Sponsor

                      </button>

                    </div>

                  </Popup>

                </Marker>

              ))}

            </MapContainer>



            {/* MAP LEGEND - matches the actual marker icons */}

            <div

              style={{

                position: "absolute",

                bottom: "18px",

                left: "18px",

                zIndex: 500,

                padding: "14px 16px",

                borderRadius: "12px",

                background: "rgba(18, 18, 23, 0.92)",

                color: "white",

                boxShadow: "0 5px 18px rgba(0,0,0,.25)",

              }}

            >

              <div

                style={{

                  display: "flex",

                  alignItems: "center",

                  gap: "10px",

                  marginBottom: "10px",

                }}

              >

                <div

                  style={{

                    width: "26px",

                    height: "26px",

                    borderRadius: "50%",

                    background: "#4f6fe8",

                    border: "2px solid white",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    color: "white",

                    fontSize: "12px",

                    fontWeight: 700,

                    boxSizing: "border-box",

                  }}

                >

                  S

                </div>

                <span>SASE Chapter</span>

              </div>



              <div

                style={{

                  display: "flex",

                  alignItems: "center",

                  gap: "10px",

                }}

              >

                <div

                  style={{

                    width: "26px",

                    height: "26px",

                    borderRadius: "50%",

                    background: "#7548e8",

                    border: "2px solid white",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    color: "white",

                    fontSize: "12px",

                    fontWeight: 700,

                    boxSizing: "border-box",

                  }}

                >

                  ★

                </div>

                <span>Sponsor Location</span>

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

                  {selectedChapter.chapterName}

                </h2>



                <p>

                  {selectedChapter.university}

                </p>



                <div className="explore-panel-item">

                  <strong>Location</strong>

                  <span>

                    {selectedChapter.location}

                  </span>

                </div>



                {selectedChapter.region && (

                  <div className="explore-panel-item">

                    <strong>Region</strong>

                    <span>

                      {selectedChapter.region}

                    </span>

                  </div>

                )}



                <div className="explore-panel-item">

                  <strong>About</strong>

                  <span>

                    {selectedChapter.description ||

                      "No chapter description available."}

                  </span>

                </div>



                <div className="explore-panel-summary">

                  <div>

                    <strong>

                      {selectedChapter.memberCount}

                    </strong>

                    <span>Members</span>

                  </div>



                  <div>

                    <strong>

                      {selectedChapterPeople.length}

                    </strong>

                    <span>Profiles</span>

                  </div>

                </div>



                {selectedChapter.founded && (

                  <div className="explore-panel-item">

                    <strong>Founded</strong>

                    <span>

                      {selectedChapter.founded}

                    </span>

                  </div>

                )}



                <h3>Members</h3>



                {selectedChapterPeople.length > 0 ? (

                  selectedChapterPeople

                    .filter(
                      (person): person is Profile & { id: number; name: string } =>
                        person.id !== undefined && person.name !== undefined
                    )
                    .slice(0, 5)

                    .map((person) => (

                      <button

                        className="explore-panel-card"

                        key={person.id}

                        onClick={() =>

                          setSelectedItem({

                            id: person.id,

                            type: "People",

                            title: person.name,

                            subtitle: [

                              person.major,

                              person.graduation_year

                                ? `Class of ${person.graduation_year}`

                                : null,

                            ]

                              .filter(Boolean)

                              .join(" • "),

                            description:

                              person.bio ??

                              person.interests ??

                              "SASE member",

                            chapterId:

                              person.chapter_id ??

                              undefined,

                          })

                        }

                      >

                        <strong>

                          {person.name}

                        </strong>



                        <span>

                          {[

                            person.major,

                            person.graduation_year

                              ? `Class of ${person.graduation_year}`

                              : null,

                          ]

                            .filter(Boolean)

                            .join(" • ")}

                        </span>

                      </button>

                    ))

                ) : (

                  <p className="explore-muted">

                    No members listed.

                  </p>

                )}



                <button

                  className="explore-modal-action"

                  style={{

                    width: "100%",

                    marginTop: 18,

                  }}

                  onClick={() =>

                    openChapterPage(

                      selectedChapter

                    )

                  }

                >

                  View Chapter

                </button>

              </>

            ) : (

              <>

                <span className="explore-panel-label">

                  EXPLORE THE NETWORK

                </span>



                <h2>Select a location</h2>



                <p>

                  Click a SASE chapter marker to see

                  chapter details, members, and a link

                  to the chapter page.

                </p>



                <div className="explore-panel-summary">

                  <div>

                    <strong>

                      {visibleChapters.length}

                    </strong>

                    <span>Chapters</span>

                  </div>



                  <div>

                    <strong>

                      {visibleSponsors.length}

                    </strong>

                    <span>

                      Sponsor Locations

                    </span>

                  </div>

                </div>



                <div style={{ marginTop: "24px" }}>

                  <h3>Chapter Locations</h3>



                  {visibleChapters

                    .slice(0, 6)

                    .map((chapter) => (

                      <button

                        className="explore-panel-card"

                        key={chapter.id}

                        onClick={() =>

                          setSelectedChapterId(

                            chapter.id

                          )

                        }

                      >

                        <strong>

                          {chapter.chapterName}

                        </strong>



                        <span>

                          {chapter.location}

                        </span>

                      </button>

                    ))}

                </div>

              </>

            )}

          </aside>

        </section>

      )}



      {/* CARDS VIEW */}

      {viewMode === "Cards" && (

        <section className="explore-results">

          <div className="explore-results-heading">

            <div>

              <span className="explore-eyebrow">

                DIRECTORY

              </span>



              <h2>Explore the SASE Network</h2>

            </div>



            <span>

              {filteredItems.length} result

              {filteredItems.length === 1

                ? ""

                : "s"}

            </span>

          </div>



          <div className="explore-grid">

            {filteredItems.map((item) => (

              <article

                className="explore-card"

                key={`${item.type}-${item.id}`}

              >

                <span className="explore-card-type">

                  {item.type}

                </span>



                <h3>{item.title}</h3>



                <p className="explore-card-subtitle">

                  {item.subtitle}

                </p>



                <p>{item.description}</p>



                {item.type === "Chapters" ? (

                  <button

                    onClick={() => {

                      const chapter =

                        chapters.find(

                          (entry) =>

                            entry.id === item.id

                        );



                      if (chapter) {

                        openChapterPage(chapter);

                      }

                    }}

                  >

                    View Chapter

                  </button>

                ) : item.type === "Sponsors" ? (

                  <button

                    onClick={() => {

                      const sponsor =

                        sponsors.find(

                          (entry) =>

                            entry.id === item.id

                        );



                      if (sponsor) {

                        openSponsorPage(sponsor);

                      }

                    }}

                  >

                    View Sponsor

                  </button>

                ) : (

                  <button

                    onClick={() =>

                      setSelectedItem(item)

                    }

                  >

                    View Details

                  </button>

                )}

              </article>

            ))}

          </div>



          {filteredItems.length === 0 && (

            <div className="explore-empty">

              No results found.

            </div>

          )}

        </section>

      )}



      {/* DETAIL MODAL */}

      {selectedItem && (

        <div

          className="explore-modal-backdrop"

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



            <span className="explore-panel-label">

              {selectedItem.type}

            </span>



            <h2>{selectedItem.title}</h2>



            <p>{selectedItem.subtitle}</p>



            <div className="explore-panel-item">

              <span>

                {selectedItem.description}

              </span>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}
