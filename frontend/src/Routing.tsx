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
  const { profiles, chapters, sponsors } = useGeneralData()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [posts, setPosts] = useState<FeedPost[]>(starterPosts)
  const [dismissedNotificationIds, setDismissedNotificationIds] =
    useState<number[]>([])
  const [unreadNotificationIds, setUnreadNotificationIds] =
    useState<number[]>(starterPosts.map((post) => post.id))

  const { pathname } = useLocation()
  const isOfficer = true

  const notifications = posts.filter(
    (post) => !dismissedNotificationIds.includes(post.id)
  )

  const unreadCount = unreadNotificationIds.filter((id) =>
    notifications.some((notification) => notification.id === id)
  ).length

  useEffect(() => {
    window.scrollTo(0, 0)
    setNotificationsOpen(false)
  }, [pathname])

  function handleCreatePost(content: string, imageUrl?: string) {
    const newPost: FeedPost = {
      id: Date.now(),
      author: 'Florida Poly SASE',
      chapter: 'FPU SASE',
      content,
      createdAt: 'Just now',
      isOfficerPost: true,
      imageUrl,
      canDelete: true,
    }

    setPosts((currentPosts) => [newPost, ...currentPosts])
    setUnreadNotificationIds((currentIds) => [newPost.id, ...currentIds])
    setDismissedNotificationIds((currentIds) =>
      currentIds.filter((id) => id !== newPost.id)
    )
  }

  function handleDeletePost(postId: number) {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId)
    )
    setUnreadNotificationIds((currentIds) =>
      currentIds.filter((id) => id !== postId)
    )
    setDismissedNotificationIds((currentIds) =>
      currentIds.filter((id) => id !== postId)
    )
  }

  function handleDeleteNotification(notificationId: number) {
    setDismissedNotificationIds((currentIds) => [
      ...currentIds,
      notificationId,
    ])
    setUnreadNotificationIds((currentIds) =>
      currentIds.filter((id) => id !== notificationId)
    )
  }

  function handleClearNotifications() {
    const visibleNotificationIds = notifications.map(
      (notification) => notification.id
    )
    setDismissedNotificationIds((currentIds) => [
      ...new Set([...currentIds, ...visibleNotificationIds]),
    ])
    setUnreadNotificationIds([])
  }

  function handleNotificationsClick() {
    setNotificationsOpen((current) => {
      const nextState = !current
      if (nextState) {
        setUnreadNotificationIds([])
      }
      return nextState
    })
  }

  return (
    <>
      <Topbar
        sidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen((previous) => !previous)}
        notifications={notifications}
        profiles={profiles}
        chapters={chapters}
        sponsors={sponsors}
        notificationsOpen={notificationsOpen}
        unreadCount={unreadCount}
        onNotificationsClick={handleNotificationsClick}
        onDeleteNotification={handleDeleteNotification}
        onClearNotifications={handleClearNotifications}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <div key={pathname} className="page-transition">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  posts={posts}
                  isOfficer={isOfficer}
                  onCreatePost={handleCreatePost}
                  onDeletePost={handleDeletePost}
                />
              }
            />

            <Route
              path="/people"
              element={<People profileData={profiles} />}
            />
            <Route
              path="/people/:profileId"
              element={<People profileData={profiles} />}
            />

            <Route
              path="/chapters"
              element={
                <Chapters
                  chapterData={chapters}
                  posts={posts}
                  onDeletePost={handleDeletePost}
                />
              }
            />
            <Route
              path="/chapters/:slug"
              element={
                <Chapters
                  chapterData={chapters}
                  posts={posts}
                  onDeletePost={handleDeletePost}
                />
              }
            />

            <Route
              path="/explore"
              element={
                <Explore
                  profiles={profiles}
                  chapters={chapters}
                  sponsors={sponsors}
                />
              }
            />

            <Route
              path="/myprofile"
              element={<Myprofile profileData={profiles} />}
            />

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
