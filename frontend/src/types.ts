
// ============================================

// Shared / Frontend Types

// ============================================



export type MemberType = "Student" | "Alumni";




export type ChapterVisibility =

  | "officers"

  | "members"

  | "everyone";



// ============================================================

// PROFILE

// ============================================================



export type Profile<Interests = string> = {

  graduation_year?: number | null;

  chapter_id?: number | null;

  created_at?: string;

  fullName?: string;

  firstName?: string;

  lastName?: string;

  username?: string;

  password?: string;



  major: string;

  bio: string;



  interests: Interests;

  skills: string[];



  affiliation?: string;

  position?: string;

  saseChapter?: string;



  id?: number;

  name?: string;

  initials?: string;



  type?: MemberType;



  chapter?: string;

  chapterShort?: string;



  year?: string;

  location?: string;




  chapterVisibility?: ChapterVisibility;

};





// ============================================

// Supabase Database Types

// ============================================




export type DatabaseProfile = {

  id: number;

  name: string;

  email: string;



  major: string | null;

  graduation_year: number | null;

  interests: string | null;



  chapter_id: number | null;




  created_at: string | null;



  role: string | null;

  chapter_visibility: string | null;

  bio: string | null;

  profile_image_url: string | null;

  linkedin_url: string | null;

  officer_position: string | null;

};



export type DatabaseChapter = {

  id: number;

  name: string;



  university: string | null;

  city: string | null;

  state: string | null;

  region: string | null;



  description: string | null;

  logo_url: string | null;

  website_url: string | null;

  instagram_url: string | null;

  discord_url: string | null;

};



export type DatabaseEvent = {

  id: number;

  chapter_id: number;

  name: string;



  description: string | null;

  event_type: string | null;



  // Supabase timestamptz comes back as an ISO string

  event_date: string;



  location: string | null;

  rsvp_count: number | null;

  attendance: number | null;



  created_at: string | null;



  image_url: string | null;

  registration_url: string | null;

  is_virtual: boolean | null;

};



export type DatabasePost = {

  id: number;

  profile_id: number;

  content: string;



  created_at: string | null;



  chapter_id: number | null;

  image_url: string | null;

  post_type: string | null;

};



export type DatabaseEventRSVP = {

  profile_id: number;

  event_id: number;



  created_at: string | null;

  attended: boolean | null;

};



export type DatabaseNotification = {

  id: number;

  created_at: string;



  profile_id: number | null;



  title: string | null;

  message: string | null;

  notification_type: string | null;

  is_read: boolean | null;

};



export type DatabaseSponsor = {

  id: number;

  name: string;



  industry: string | null;

  city: string | null;

  state: string | null;



  website_url: string | null;

  created_at: string | null;



  description: string | null;

  logo_url: string | null;

  careers_url: string | null;

  sponsor_level: string | null;

};





// ============================================

// Feed

// ============================================




export type FeedPost = {

  id: number;

  author: string;

  chapter: string;

  content: string;

  createdAt: string;

  isOfficerPost: boolean;



  imageUrl?: string;

  canDelete?: boolean;

};






// ============================================

// Chapters / Events

// ============================================




export type ChapterTab =

  | "Overview"

  | "Events"

  | "Members"

  | "Officers";



export type EventType =

  | "Professional"

  | "Social"

  | "General Body Meeting"

  | "Workshop"

  | "Community";




export type MemberVisibility = ChapterVisibility;




export type ChapterEvent = {

  id: number;

  chapterId: number;



  title: string;



  date: string;

  time: string;



  location: string;



  type: EventType;



  description: string;

};



export type ChapterMember = {

  id: number;

  name: string;



  major: string;

  year: string;



  visibility: MemberVisibility;

};



export type Officer = {

  id: number;

  name: string;



  position: string;

  major: string;

};



// Frontend chapter model.

//

// useGeneralData() converts the raw Supabase chapter

// rows into this shape.

export type Chapter = {

  id: number;



  slug: string;

  shortName: string;



  university: string;

  chapterName: string;



  location: string;



  // Used directly by the Explore Leaflet map.

  latitude?: number | null;

  longitude?: number | null;



  region: string;



  description: string;



  memberCount: number;



  founded: string;



  members: ChapterMember[];



  officers: Officer[];

};






// ============================================

// Directory

// ============================================




export type DirectoryProfile =

  Profile<string[]> &

    Required<

      Pick<

        Profile<string[]>,

        | "id"

        | "name"

        | "initials"

        | "type"

        | "chapter"

        | "chapterShort"

        | "year"

        | "location"

        | "chapterVisibility"

      >

    >;






// ============================================

// Sponsors

// ============================================




export type Industry =

  | "All"

  | "Technology"

  | "Engineering"

  | "Defense"

  | "Finance";



// Frontend sponsor model.

//

// useGeneralData() converts the raw Supabase sponsor

// rows into this shape.

export type Sponsor = {

  id: number;



  name: string;

  shortName: string;




  industry: Exclude<Industry, "All">;




  description: string;



  location: string;



  // Used directly by the Explore Leaflet map.

  latitude?: number | null;

  longitude?: number | null;



  featured: boolean;



  tags: string[];



  website: string;

  github: string;

  careersUrl: string;



  opportunities: {

    title: string;

    type: string;

    location: string;

  }[];

};






// ============================================

// Explore

// ============================================




export type ExploreFilter =

  | "All"

  | "People"

  | "Chapters"

  | "Events"

  | "Sponsors";




export type ViewMode = "Map" | "Cards";



export type ExploreItem = {

  id: number;

  type: Exclude<ExploreFilter, "All">;




  title: string;



  subtitle: string;



  description: string;



  chapterId?: number;

};






// ============================================

// Map

// ============================================




export type ChapterLocation = {

  id: number;



  name: string;

  school: string;



  lat: number;

  lng: number;

};



export type SponsorLocation = {

  id: number;



  sponsorName: string;



  locationName: string;




  locationType: "Headquarters" | "Florida Office";




  lat: number;

  lng: number;



  description: string;

};
