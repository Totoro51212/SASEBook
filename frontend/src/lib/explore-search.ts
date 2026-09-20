import type { Chapter, ExploreItem, Profile, Sponsor } from '../types'

export function createExploreItems(
  profiles: Profile[],
  chapters: Chapter[],
  sponsors: Sponsor[],
): ExploreItem[] {
  const peopleItems: ExploreItem[] = profiles
    .filter(
      (profile): profile is Profile & { id: number; name: string } =>
        profile.id !== undefined && profile.name !== undefined,
    )
    .map((profile) => ({
      id: profile.id,
      type: 'People',
      title: profile.name,
      subtitle: [
        profile.major,
        profile.graduation_year
          ? `Class of ${profile.graduation_year}`
          : null,
      ]
        .filter(Boolean)
        .join(' • '),
      description: profile.bio ?? profile.interests ?? 'SASE member',
      chapterId: profile.chapter_id ?? undefined,
    }))

  const chapterItems: ExploreItem[] = chapters.map((chapter) => ({
    id: chapter.id,
    type: 'Chapters',
    title: chapter.chapterName,
    subtitle: `${chapter.university} • ${chapter.location}`,
    description: chapter.description || `${chapter.chapterName} chapter`,
    chapterId: chapter.id,
    route: `/chapters/${chapter.slug}`,
  }))

  const sponsorItems: ExploreItem[] = sponsors.map((sponsor) => ({
    id: sponsor.id,
    type: 'Sponsors',
    title: sponsor.name,
    subtitle: `${sponsor.industry} • ${sponsor.location}`,
    description: sponsor.description || `${sponsor.name} is a SASE sponsor.`,
  }))

  return [...peopleItems, ...chapterItems, ...sponsorItems]
}

export function searchExploreItems(
  items: ExploreItem[],
  search: string,
  limit?: number,
): ExploreItem[] {
  const query = search.trim().toLowerCase()

  if (!query) {
    return items
  }

  const rankedItems = items
    .map((item) => {
      const title = item.title.toLowerCase()
      const subtitle = item.subtitle.toLowerCase()
      const description = item.description.toLowerCase()
      let score = 0

      if (title === query) score += 100
      if (title.startsWith(query)) score += 60
      if (title.includes(query)) score += 40
      if (subtitle.includes(query)) score += 20
      if (description.includes(query)) score += 10

      return { item, score }
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score
      }

      return left.item.title.localeCompare(right.item.title)
    })

  return limit === undefined
    ? rankedItems.map(({ item }) => item)
    : rankedItems.slice(0, limit).map(({ item }) => item)
}
