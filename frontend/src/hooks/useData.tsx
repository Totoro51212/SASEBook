import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase-client'
import type { Chapter, Profile, Sponsor } from '../types'

export function useGeneralData() {
  const { pathname } = useLocation()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)

    const [profilesResult, chaptersResult, sponsorsResult] =
      await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('chapters').select('*'),
        supabase.from('sponsors').select('*'),
      ])

    const firstError =
      profilesResult.error ??
      chaptersResult.error ??
      sponsorsResult.error

    if (firstError) {
      console.error('Error loading general data:', firstError)
      setError(firstError)
      setLoading(false)
      return
    }

    setProfiles((profilesResult.data ?? []) as Profile[])

    setChapters(
      (chaptersResult.data ?? []).map((chapter) => ({
        id: chapter.id,
        slug: chapter.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
        shortName: chapter.name.replace(' SASE', ''),
        university: chapter.university ?? chapter.name,
        chapterName: chapter.name,
        location:
          [chapter.city, chapter.state].filter(Boolean).join(', ') ||
          'Location unavailable',
        region: chapter.region ?? '',
        description: chapter.description ?? `${chapter.name} chapter`,
        memberCount: 0,
        founded: '',
        members: [],
        officers: [],
        latitude: chapter.latitude ?? null,
        longitude: chapter.longitude ?? null,
      }))
    )

    setSponsors(
      (sponsorsResult.data ?? []).map((sponsor) => ({
        id: sponsor.id,
        name: sponsor.name,
        shortName: sponsor.name.slice(0, 3).toUpperCase(),
        industry:
          sponsor.industry === 'Engineering' ||
          sponsor.industry === 'Defense' ||
          sponsor.industry === 'Finance'
            ? sponsor.industry
            : 'Technology',
        description:
          sponsor.description ??
          `${sponsor.name} supports opportunities in the SASE community.`,
        location:
          [sponsor.city, sponsor.state].filter(Boolean).join(', ') ||
          'Location unavailable',
        featured: false,
        tags: sponsor.industry ? [sponsor.industry] : [],
        website: sponsor.website_url ?? sponsor.website ?? '#',
        github: '#',
        careersUrl:
          sponsor.careers_url ??
          sponsor.website_url ??
          sponsor.website ??
          '#',
        opportunities: [],
        latitude: sponsor.latitude ?? null,
        longitude: sponsor.longitude ?? null,
      }))
    )

    setLoading(false)
  }, [])

  // Refresh when navigating between routes.
  useEffect(() => {
    loadData()
  }, [loadData, pathname])

  // Keep shared route data current when another client changes Supabase.
  useEffect(() => {
    const channel = supabase
      .channel('general-data-refresh')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        loadData
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chapters' },
        loadData
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sponsors' },
        loadData
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [loadData])

  return {
    profiles,
    chapters,
    sponsors,
    loading,
    error,
  }
}
