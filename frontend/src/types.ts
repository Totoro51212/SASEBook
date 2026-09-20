export type MemberType = "Student" | "Alumni";

export type ChapterVisibility = "officers" | "members" | "everyone";

export type Profile<Interests = string> = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  major: string;
  bio: string;
  affiliation?: string;
  interests: Interests;
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
  skills: string[];
  chapterVisibility?: ChapterVisibility;
};

export type DatabaseProfile = {
  id: number;
  name: string;
  email: string;
  major: string | null;
  graduation_year: number | null;
  interests: string | null;
  chapter_id: number | null;
  created_at: string;
};

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

export type ChapterTab = "Overview" | "Events" | "Members" | "Officers";
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
};

export type DirectoryProfile = Profile<string[]> & Required<Pick<Profile<string[]>,
  "id" | "name" | "initials" | "type" | "chapter" | "chapterShort" |
  "year" | "location" | "chapterVisibility"
>>;

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
};

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