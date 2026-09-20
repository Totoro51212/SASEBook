// ============================================
// Shared / Frontend Types
// ============================================

export type MemberType = "Student" | "Alumni";

export type ChapterVisibility = "officers" | "members" | "everyone";

export type Profile<Interests = string> = {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  email?: string;
  graduation_year?: number | null;
  created_at?: string | null;
  role?: string | null;
  chapter_visibility?: string | null;
  profile_image_url?: string | null;
  linkedin_url?: string | null;
  
  major: string;
  bio: string;
  interests: Interests;
  skills: string[];
  
  affiliation?: string;
  chapter_id?: number | null;
  saseChapter?: string;
  position?: string | null;
  
  id: number;
  name: string;
  initials: string;
  type: MemberType;
  chapter: string;
  chapterShort: string;
  year: string;
  location: string;
  chapterVisibility: ChapterVisibility;
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
  profile_id?: number;
  created_at?: string | null;
  chapter_id?: number | null;
  image_url?: string | null;
  post_type?: string | null;
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
  chapter_id?: number;
  name?: string;
  event_type?: string | null;
  event_date?: string;
  rsvp_count?: number | null;
  attendance?: number | null;
  created_at?: string | null;
  image_url?: string | null;
  registration_url?: string | null;
  is_virtual?: boolean | null;
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

export type Chapter = {
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
  name?: string;
  city?: string | null;
  state?: string | null;
  logo_url?: string | null;
  website_url?: string | null;
  instagram_url?: string | null;
  discord_url?: string | null;
  created_at?: string | null;
};


// ============================================
// Sponsors
// ============================================

export type Industry =
  | "All"
  | "Technology"
  | "Engineering"
  | "Defense"
  | "Finance";

export type Sponsor = {
  id: number;
  name: string;
  shortName: string;

  industry: Exclude<Industry, "All">;

  description: string;
  location: string;
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
  city?: string | null;
  state?: string | null;
  website_url?: string | null;
  created_at?: string | null;
  logo_url?: string | null;
  careers_url?: string | null;
  sponsor_level?: string | null;
};

export type EventRSVP = {
  profile_id: number;
  event_id: number;
  created_at: string | null;
  attended: boolean | null;
};

export type Notification = {
  id: number;
  created_at: string;
  profile_id: number | null;
  title: string | null;
  message: string | null;
  notification_type: string | null;
  is_read: boolean | null;
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