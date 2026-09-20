import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {useSearchParams} from "react-router-dom";
import "../styles/Sponsors.css";
import type { Industry, Sponsor } from "../types";


/* =========================================================
   SPONSOR DATA
   ========================================================= */

const demoSponsors: Sponsor[] = [

  {
    id: 1,

    name: "NVIDIA",
    shortName: "NV",

    industry:
      "Technology",

    description:
      "NVIDIA develops accelerated computing technologies used in AI, graphics, robotics, autonomous systems, and high-performance computing.",

    location:
      "Santa Clara, California",

    featured: true,

    tags: [
      "Computer Engineering",
      "Hardware",
      "AI",
      "Software",
      "Robotics",
    ],

    website:
      "https://www.nvidia.com/",

    github:
      "https://github.com/NVIDIA",

    careersUrl:
      "https://www.nvidia.com/en-us/about-nvidia/careers/",

    opportunities: [
      {
        title:
          "Hardware Engineering",
        type:
          "Internship",
        location:
          "Multiple Locations",
      },

      {
        title:
          "Software Engineering",
        type:
          "Internship",
        location:
          "Multiple Locations",
      },

      {
        title:
          "University Recruiting",
        type:
          "Students",
        location:
          "Multiple Locations",
      },
    ],
  },


  {
    id: 2,

    name:
      "Lockheed Martin",

    shortName:
      "LM",

    industry:
      "Defense",

    description:
      "Lockheed Martin is an aerospace and defense company working across aeronautics, space, rotary and mission systems, and advanced technologies.",

    location:
      "Bethesda, Maryland",

    featured: true,

    tags: [
      "Aerospace",
      "Electrical Engineering",
      "Computer Engineering",
      "Cybersecurity",
      "Software",
    ],

    website:
      "https://www.lockheedmartin.com/",

    github:
      "https://github.com/lmco",

    careersUrl:
      "https://www.lockheedmartin.com/en-us/careers.html",

    opportunities: [
      {
        title:
          "Engineering",
        type:
          "Internship",
        location:
          "Multiple Locations",
      },

      {
        title:
          "Software & Cyber",
        type:
          "Early Career",
        location:
          "Multiple Locations",
      },

      {
        title:
          "Students & Early Careers",
        type:
          "Students",
        location:
          "United States",
      },
    ],
  },


  {
    id: 3,

    name:
      "AMD",

    shortName:
      "AMD",

    industry:
      "Technology",

    description:
      "AMD designs high-performance processors and computing technologies used in PCs, data centers, gaming, embedded systems, and AI.",

    location:
      "Santa Clara, California",

    featured: true,

    tags: [
      "Semiconductors",
      "Hardware",
      "Computer Engineering",
      "Software",
      "AI",
    ],

    website:
      "https://www.amd.com/",

    github:
      "https://github.com/amd",

    careersUrl:
      "https://careers.amd.com/",

    opportunities: [
      {
        title:
          "Hardware Engineering",
        type:
          "Internship",
        location:
          "Multiple Locations",
      },

      {
        title:
          "Software Engineering",
        type:
          "Internship",
        location:
          "Multiple Locations",
      },

      {
        title:
          "Student Programs",
        type:
          "Students",
        location:
          "Global",
      },
    ],
  },


  {
    id: 4,

    name:
      "JPMorganChase",

    shortName:
      "JPMC",

    industry:
      "Finance",

    description:
      "JPMorganChase combines financial services with large-scale technology, software engineering, cybersecurity, data, and analytics.",

    location:
      "New York, New York",

    featured: false,

    tags: [
      "Software",
      "Data",
      "Cybersecurity",
      "Finance",
      "Technology",
    ],

    website:
      "https://www.jpmorganchase.com/",

    github:
      "https://github.com/jpmorganchase",

    careersUrl:
      "https://www.jpmorganchase.com/careers",

    opportunities: [
      {
        title:
          "Software Engineering",
        type:
          "Internship",
        location:
          "Multiple Locations",
      },

      {
        title:
          "Data & Analytics",
        type:
          "Internship",
        location:
          "Multiple Locations",
      },

      {
        title:
          "Student Programs",
        type:
          "Students",
        location:
          "Multiple Locations",
      },
    ],
  },


  {
    id: 5,

    name:
      "Siemens",

    shortName:
      "S",

    industry:
      "Engineering",

    description:
      "Siemens develops technologies across industrial automation, infrastructure, transportation, electrification, and digital engineering.",

    location:
      "Global",

    featured: false,

    tags: [
      "Engineering",
      "Automation",
      "Electrical Engineering",
      "Software",
      "Manufacturing",
    ],

    website:
      "https://www.siemens.com/",

    github:
      "https://github.com/siemens",

    careersUrl:
      "https://jobs.siemens.com/",

    opportunities: [
      {
        title:
          "Engineering",
        type:
          "Early Career",
        location:
          "Multiple Locations",
      },

      {
        title:
          "Engineering Development",
        type:
          "Students",
        location:
          "United States",
      },

      {
        title:
          "Technology",
        type:
          "Full-Time",
        location:
          "Global",
      },
    ],
  },

];


const industries: Industry[] = [
  "All",
  "Technology",
  "Engineering",
  "Defense",
  "Finance",
];


/* =========================================================
   MAIN COMPONENT
   ========================================================= */

type SponsorsProps = {
  sponsorData: Sponsor[];
};

export default function Sponsors({ sponsorData }: SponsorsProps) {
  const sponsors = sponsorData.length > 0 ? sponsorData : demoSponsors;

  /*
    Read URL values such as:

    /sponsors?company=AMD

    This is what lets the Explore map open the correct
    company automatically.
  */

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();


  const [search, setSearch] =
    useState("");


  const [
    industry,
    setIndustry,
  ] =
    useState<Industry>("All");


  const [
    selectedSponsor,
    setSelectedSponsor,
  ] =
    useState<Sponsor | null>(
      null
    );


  /* =======================================================
     OPEN SPONSOR FROM URL
     ======================================================= */

  useEffect(() => {

    const companyFromUrl =
      searchParams.get(
        "company"
      );

    if (!companyFromUrl) {
      return;
    }


    const sponsor =
      sponsors.find(
        (currentSponsor) =>
          currentSponsor.name
            .toLowerCase() ===
          companyFromUrl
            .toLowerCase()
      );


    if (sponsor) {
      setSelectedSponsor(
        sponsor
      );
    }

  }, [searchParams]);


  /* =======================================================
     FILTER SPONSORS
     ======================================================= */

  const filteredSponsors =
    useMemo(() => {

      const searchValue =
        search
          .trim()
          .toLowerCase();


      return sponsors.filter(
        (sponsor) => {

          const matchesIndustry =
            industry === "All" ||
            sponsor.industry ===
              industry;


          const matchesSearch =
            searchValue === "" ||

            sponsor.name
              .toLowerCase()
              .includes(
                searchValue
              ) ||

            sponsor.industry
              .toLowerCase()
              .includes(
                searchValue
              ) ||

            sponsor.description
              .toLowerCase()
              .includes(
                searchValue
              ) ||

            sponsor.tags.some(
              (tag) =>
                tag
                  .toLowerCase()
                  .includes(
                    searchValue
                  )
            );


          return (
            matchesIndustry &&
            matchesSearch
          );

        }
      );

    }, [
      search,
      industry,
    ]);


  const featuredSponsors =
    filteredSponsors.filter(
      (sponsor) =>
        sponsor.featured
    );


  const otherSponsors =
    filteredSponsors.filter(
      (sponsor) =>
        !sponsor.featured
    );


  /* =======================================================
     OPEN EXTERNAL LINK
     ======================================================= */

  const openLink = (
    url: string
  ) => {

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  };


  /* =======================================================
     OPEN SPONSOR MODAL
     ======================================================= */

  const openSponsor = (
    sponsor: Sponsor
  ) => {

    setSelectedSponsor(
      sponsor
    );


    /*
      Also update the URL.

      Example:

      /sponsors?company=AMD
    */

    setSearchParams({
      company:
        sponsor.name,
    });

  };


  /* =======================================================
     CLOSE SPONSOR MODAL
     ======================================================= */

  const closeSponsor = () => {

    setSelectedSponsor(
      null
    );


    /*
      Remove ?company= from the URL when the modal closes.
    */

    setSearchParams({});

  };


  /* =======================================================
     SPONSOR CARD
     ======================================================= */

  const renderSponsorCard = (
    sponsor: Sponsor
  ) => (

    <article
      className="sponsor-card"
      key={sponsor.id}
    >

      <div className="sponsor-card-top">

        <div className="company-logo">
          {sponsor.shortName}
        </div>


        <div className="sponsor-title-area">

          <span className="industry-badge">
            {sponsor.industry}
          </span>

          <h3>
            {sponsor.name}
          </h3>

          <p className="sponsor-location">
            {sponsor.location}
          </p>

        </div>

      </div>


      <p className="sponsor-description">
        {sponsor.description}
      </p>


      <div className="sponsor-tags">

        {sponsor.tags.map(
          (tag) => (

            <span key={tag}>
              {tag}
            </span>

          )
        )}

      </div>


      <div className="opportunity-preview">

        <span>
          Opportunity Areas
        </span>

        <strong>
          {
            sponsor
              .opportunities
              .length
          }
        </strong>

      </div>


      <button
        className="sponsor-main-button"
        onClick={() =>
          openSponsor(
            sponsor
          )
        }
      >
        View Sponsor
      </button>

    </article>

  );


  /* =========================================================
     PAGE
     ========================================================= */

  return (

    <main className="sponsors-page">


      {/* HEADER */}

      <section className="sponsors-hero">

        <span className="sponsors-eyebrow">
          SASE CAREER NETWORK
        </span>

        <h1>
          Sponsors & Opportunities
        </h1>

        <p>
          Discover companies that
          support the SASE community
          and explore internships,
          careers, engineering
          programs, and open-source
          projects.
        </p>


        <div className="sponsors-search-wrapper">

          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            className="sponsors-search"
            placeholder="Search companies, industries, or skills..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>


        <div className="industry-filters">

          {industries.map(
            (filter) => (

              <button
                key={filter}
                className={
                  industry === filter
                    ? "industry-filter active"
                    : "industry-filter"
                }
                onClick={() =>
                  setIndustry(
                    filter
                  )
                }
              >
                {filter}
              </button>

            )
          )}

        </div>

      </section>


      {/* STATS */}

      <section className="sponsor-stats">

        <div>

          <strong>
            {sponsors.length}
          </strong>

          <span>
            Partner Companies
          </span>

        </div>


        <div>

          <strong>
            {
              sponsors.reduce(
                (
                  total,
                  sponsor
                ) =>
                  total +
                  sponsor
                    .opportunities
                    .length,
                0
              )
            }
          </strong>

          <span>
            Opportunity Areas
          </span>

        </div>


        <div>

          <strong>
            {
              new Set(
                sponsors.map(
                  (sponsor) =>
                    sponsor.industry
                )
              ).size
            }
          </strong>

          <span>
            Industries
          </span>

        </div>

      </section>


      {/* FEATURED */}

      {featuredSponsors.length >
        0 && (

        <section className="sponsor-section">

          <div className="section-heading">

            <div>

              <span className="section-label">
                FEATURED
              </span>

              <h2>
                Featured Sponsors
              </h2>

            </div>


            <span className="result-count">
              {
                featuredSponsors.length
              }{" "}
              companies
            </span>

          </div>


          <div className="sponsor-grid">

            {featuredSponsors.map(
              renderSponsorCard
            )}

          </div>

        </section>

      )}


      {/* MORE SPONSORS */}

      {otherSponsors.length >
        0 && (

        <section className="sponsor-section">

          <div className="section-heading">

            <div>

              <span className="section-label">
                DISCOVER
              </span>

              <h2>
                More Sponsors
              </h2>

            </div>


            <span className="result-count">
              {
                otherSponsors.length
              }{" "}
              companies
            </span>

          </div>


          <div className="sponsor-grid">

            {otherSponsors.map(
              renderSponsorCard
            )}

          </div>

        </section>

      )}


      {/* NO RESULTS */}

      {filteredSponsors.length ===
        0 && (

        <section className="sponsor-empty">

          <h2>
            No sponsors found
          </h2>

          <p>
            Try another company,
            industry, or skill.
          </p>

          <button
            onClick={() => {

              setSearch("");

              setIndustry(
                "All"
              );

            }}
          >
            Clear Filters
          </button>

        </section>

      )}


      {/* ===================================================
          SPONSOR MODAL
          =================================================== */}

      {selectedSponsor && (

        <div
          className="sponsor-modal-overlay"
          onClick={
            closeSponsor
          }
        >

          <div
            className="sponsor-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="sponsor-close"
              onClick={
                closeSponsor
              }
              aria-label="Close"
            >
              ×
            </button>


            {/* COMPANY INFO */}

            <div className="modal-company-header">

              <div className="modal-logo">
                {
                  selectedSponsor
                    .shortName
                }
              </div>


              <div>

                <span className="industry-badge">
                  {
                    selectedSponsor
                      .industry
                  }
                </span>


                <h2>
                  {
                    selectedSponsor
                      .name
                  }
                </h2>


                <p>
                  {
                    selectedSponsor
                      .location
                  }
                </p>

              </div>

            </div>


            <p className="modal-description">
              {
                selectedSponsor
                  .description
              }
            </p>


            <div className="modal-tags">

              {
                selectedSponsor
                  .tags
                  .map(
                    (tag) => (

                      <span key={tag}>
                        {tag}
                      </span>

                    )
                  )
              }

            </div>


            {/* COMPANY RESOURCES */}

            <div className="modal-section">

              <h3>
                Company Resources
              </h3>


              <div className="resource-grid">


                <button
                  onClick={() =>
                    openLink(
                      selectedSponsor
                        .website
                    )
                  }
                >

                  <span>
                    Website
                  </span>

                  <small>
                    Company website ↗
                  </small>

                </button>


                <button
                  onClick={() =>
                    openLink(
                      selectedSponsor
                        .github
                    )
                  }
                >

                  <span>
                    GitHub
                  </span>

                  <small>
                    Open source ↗
                  </small>

                </button>


                <button
                  onClick={() =>
                    openLink(
                      selectedSponsor
                        .careersUrl
                    )
                  }
                >

                  <span>
                    Careers & Internships
                  </span>

                  <small>
                    Explore opportunities ↗
                  </small>

                </button>


              </div>

            </div>


            {/* OPPORTUNITY AREAS */}

            <div className="modal-section">

              <h3>
                Opportunity Areas
              </h3>


              <div className="opportunity-list">

                {
                  selectedSponsor
                    .opportunities
                    .map(
                      (
                        opportunity
                      ) => (

                        <div
                          className="opportunity-row"
                          key={
                            opportunity
                              .title
                          }
                        >

                          <div>

                            <strong>
                              {
                                opportunity
                                  .title
                              }
                            </strong>

                            <span>
                              {
                                opportunity
                                  .location
                              }
                            </span>

                          </div>


                          <span className="opportunity-type">
                            {
                              opportunity
                                .type
                            }
                          </span>

                        </div>

                      )
                    )
                }

              </div>

            </div>


            <button
              className="all-careers-button"
              onClick={() =>
                openLink(
                  selectedSponsor
                    .careersUrl
                )
              }
            >
              Explore Careers &
              Internships ↗
            </button>

          </div>

        </div>

      )}

    </main>

  );
}