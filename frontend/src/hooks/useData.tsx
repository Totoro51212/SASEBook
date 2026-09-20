import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase-client'
import type { Chapter, Profile, Sponsor } from '../types'

export function useGeneralData() {
    //set variables
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [chapters, setChapters] = useState<Chapter[]>([])
    const [sponsors, setSponsors] = useState<Sponsor[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    //update data when changes are made
    useEffect(() => {
        async function loadData() {
        setLoading(true)

        const [profilesResult, chaptersResult, sponsorsResult] =
            await Promise.all([
            supabase.from('profiles').select(),
            supabase.from('chapters').select(),
            supabase.from('sponsors').select(),
            ])

        const firstError =
            profilesResult.error ??
            chaptersResult.error ??
            sponsorsResult.error

        if (firstError) {
            setError(firstError)
        } else {
            setProfiles(profilesResult.data ?? [])
            setChapters(chaptersResult.data ?? [])
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
                    description: `${sponsor.name} supports opportunities in the SASE community.`,
                    location: [sponsor.city, sponsor.state].filter(Boolean).join(', ') || 'Location unavailable',
                    featured: false,
                    tags: sponsor.industry ? [sponsor.industry] : [],
                    website: sponsor.website ?? '#',
                    github: '#',
                    careersUrl: sponsor.website ?? '#',
                    opportunities: [],
                }))
            )
        }

        setLoading(false)
        }

        loadData()
    }, [])

    return {
        profiles,
        chapters,
        sponsors,
        loading,
        error,
    }
}