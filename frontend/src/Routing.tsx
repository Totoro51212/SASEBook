import { useEffect, useState } from 'react'
import Chapters from './routes/chapters'
import Explore from './routes/explore'
import Home, { type FeedPost } from './routes/home'
import People from './routes/people'
import Myprofile from './routes/profile/myprofile'
import Topbar from './components/topbar'
import Sidebar from './components/sidebar'
import Sponsors from './routes/sponsors'

import { useGeneralData } from './hooks/useData'

import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'

const starterPosts: FeedPost[] = [
  {
    id: 1,
    author: 'Florida Poly SASE',
    chapter: 'FPU SASE',
    content:
      'Resume Workshop this Thursday at 6 PM! Bring your resume and get ready for the career fair.',
    createdAt: '2h ago',
    isOfficerPost: true,
    canDelete: false,
  },
  {
    id: 2,
    author: 'UCF SASE',
    chapter: 'UCF SASE',
    content:
      'Registration for Industry Networking Night is now open. We hope to see you there!',
    createdAt: '5h ago',
    isOfficerPost: true,
    canDelete: false,
  },
  {
    id: 3,
    author: 'Florida Poly SASE',
    chapter: 'FPU SASE',
    content:
      'Our next General Body Meeting is coming up soon. Stop by to meet the chapter and hear about upcoming events.',
    createdAt: '1d ago',
    isOfficerPost: true,
    canDelete: false,
  },
]

export default function Routing() {
  const {
    profiles,
    chapters,
    sponsors,
  } = useGeneralData();

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false)

  const [posts, setPosts] =
    useState<FeedPost[]>(starterPosts)

  /*
   * Notifications that the user manually
   * removed from the notification menu.
   *
   * Removing a notification does NOT
   * remove the actual post.
   */
  const [
    dismissedNotificationIds,
    setDismissedNotificationIds,
  ] = useState<number[]>([])

  /*
   * Notifications that have not been
   * opened/read yet.
   */
  const [
    unreadNotificationIds,
    setUnreadNotificationIds,
  ] = useState<number[]>(
    starterPosts.map((post) => post.id)
  )

  const { pathname } = useLocation()

  /*
   * Temporary demo permission.
   *
   * Later this will come from the
   * logged-in Supabase profile.
   */
  const isOfficer = true

  /*
   * Only show notifications that have
   * not been manually dismissed.
   */
  const notifications = posts.filter(
    (post) =>
      !dismissedNotificationIds.includes(
        post.id
      )
  )

  /*
   * Count unread notifications that
   * still exist.
   */
  const unreadCount =
    unreadNotificationIds.filter((id) =>
      notifications.some(
        (notification) =>
          notification.id === id
      )
    ).length

  /*
   * Scroll to the top whenever the user
   * changes pages.
   */
  useEffect(() => {
    window.scrollTo(0, 0)
    setNotificationsOpen(false)
  }, [pathname])

  /*
   * Create a new chapter post.
   *
   * For now the logged-in demo officer
   * belongs to Florida Poly.
   *
   * This SAME post is used by:
   * - Home
   * - Notifications
   * - Florida Poly chapter page
   */
  function handleCreatePost(
    content: string,
    imageUrl?: string
  ) {
    const newPost: FeedPost = {
      id: Date.now(),

      author: 'Florida Poly SASE',

      /*
       * Chapters uses this value to decide
       * which chapter carousel gets the post.
       */
      chapter: 'FPU SASE',

      content,

      createdAt: 'Just now',

      isOfficerPost: true,

      imageUrl,

      canDelete: true,
    }

    /*
     * Put newest post at the top of
     * the Home feed.
     */
    setPosts((currentPosts) => [
      newPost,
      ...currentPosts,
    ])

    /*
     * New post also becomes an unread
     * notification.
     */
    setUnreadNotificationIds(
      (currentIds) => [
        newPost.id,
        ...currentIds,
      ]
    )

    /*
     * If this notification had somehow
     * been dismissed previously, make
     * sure it becomes visible.
     */
    setDismissedNotificationIds(
      (currentIds) =>
        currentIds.filter(
          (id) => id !== newPost.id
        )
    )
  }

  /*
   * Delete the actual post.
   *
   * Because Home and Chapters share the
   * same posts array, deleting it here
   * removes it everywhere.
   */
  function handleDeletePost(
    postId: number
  ) {
    setPosts((currentPosts) =>
      currentPosts.filter(
        (post) => post.id !== postId
      )
    )

    /*
     * Also remove it from unread
     * notifications.
     */
    setUnreadNotificationIds(
      (currentIds) =>
        currentIds.filter(
          (id) => id !== postId
        )
    )

    /*
     * Clean up the dismissed list too.
     */
    setDismissedNotificationIds(
      (currentIds) =>
        currentIds.filter(
          (id) => id !== postId
        )
    )
  }

  /*
   * Remove ONLY the notification.
   *
   * The post remains on Home and on
   * its chapter page.
   */
  function handleDeleteNotification(
    notificationId: number
  ) {
    setDismissedNotificationIds(
      (currentIds) => [
        ...currentIds,
        notificationId,
      ]
    )

    setUnreadNotificationIds(
      (currentIds) =>
        currentIds.filter(
          (id) =>
            id !== notificationId
        )
    )
  }

  /*
   * Remove all visible notifications
   * without deleting their posts.
   */
  function handleClearNotifications() {
    const visibleNotificationIds =
      notifications.map(
        (notification) =>
          notification.id
      )

    setDismissedNotificationIds(
      (currentIds) => [
        ...new Set([
          ...currentIds,
          ...visibleNotificationIds,
        ]),
      ]
    )

    setUnreadNotificationIds([])
  }

  /*
   * Open/close notification dropdown.
   *
   * Opening it marks the notifications
   * as read.
   */
  function handleNotificationsClick() {
    setNotificationsOpen(
      (current) => {
        const nextState = !current

        if (nextState) {
          setUnreadNotificationIds([])
        }

        return nextState
      }
    )
  }

  return (
    <>
      {/* TOP NAVIGATION */}
      <Topbar
        sidebarOpen={sidebarOpen}
        onMenuClick={() =>
          setSidebarOpen(
            (previous) => !previous
          )
        }
        notifications={notifications}
        notificationsOpen={
          notificationsOpen
        }
        unreadCount={unreadCount}
        onNotificationsClick={
          handleNotificationsClick
        }
        onDeleteNotification={
          handleDeleteNotification
        }
        onClearNotifications={
          handleClearNotifications
        }
      />

      {/* SIDE NAVIGATION */}
      <Sidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* PAGE CONTENT */}
      <main className="main-content">
        <div key={pathname} className="page-transition">
          <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
                <Home
                posts={posts}
                isOfficer={isOfficer}
                onCreatePost={
                  handleCreatePost
                }
                onDeletePost={
                  handleDeletePost
                }
              />
            }
          />

          {/* PEOPLE */}
          <Route
            path="/people"
            element={<People profileData={profiles} />}
          />
          <Route
            path="/people/:profileId"
            element={<People profileData={profiles} />}
          />

          {/* CHAPTERS */}
          <Route
            path="/chapters"
            element={
              <Chapters
                chapterData={chapters}
                posts={posts}
                onDeletePost={
                  handleDeletePost
                }
              />
            }
          />

          {/* EXPLORE */}
          <Route
            path="/explore"
            element={<Explore exploreData={[]} />}
          />

          {/* PROFILE */}
          <Route
            path="/myprofile"
            element={<Myprofile profileData={profiles} />}
          />

          {/* SPONSORS */}
          <Route
            path="/sponsors"
            element={<Sponsors sponsorData={sponsors} />}
          />

          </Routes>
        </div>
      </main>
    </>
  )
}