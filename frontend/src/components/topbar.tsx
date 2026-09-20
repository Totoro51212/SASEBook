import '../styles/topbar.css'
import { Link } from 'react-router-dom'
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { FeedPost } from '../routes/home'
import { useNavigate } from 'react-router-dom'
import type { Chapter, ExploreItem, Profile, Sponsor } from '../types'
import { createExploreItems, searchExploreItems } from '../lib/explore-search'

interface TopbarProps {
  sidebarOpen?: boolean
  onMenuClick?: () => void
  onSearch?: (query: string) => void
  profiles?: Profile[]
  chapters?: Chapter[]
  sponsors?: Sponsor[]
  onNotificationsClick?: () => void
  onProfileClick?: () => void

  notifications?: FeedPost[]
  notificationsOpen?: boolean
  unreadCount?: number

  onDeleteNotification?: (
    notificationId: number
  ) => void

  onClearNotifications?: () => void
}

export default function Topbar({
  sidebarOpen = false,
  onMenuClick,
  onSearch,
  profiles = [],
  chapters = [],
  sponsors = [],
  onNotificationsClick,
  onProfileClick,
  notifications = [],
  notificationsOpen = false,
  unreadCount = 0,
  onDeleteNotification,
  onClearNotifications,
}: TopbarProps) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [bellRinging, setBellRinging] =
    useState(false)

  const previousUnreadCount =
    useRef(unreadCount)

  const ringTimeout =
    useRef<number | null>(null)

  const bellButtonRef =
    useRef<HTMLButtonElement | null>(null)

  const notificationMenuRef =
    useRef<HTMLDivElement | null>(null)

  const searchMenuRef = useRef<HTMLDivElement | null>(null)

  const searchResults = searchExploreItems(
    createExploreItems(profiles, chapters, sponsors),
    search,
    5,
  )

  /*
   * Plays the bell animation.
   *
   * We briefly remove the animation first so
   * repeated clicks can restart it.
   */
  function ringBell() {
    if (ringTimeout.current !== null) {
      window.clearTimeout(
        ringTimeout.current
      )
    }

    setBellRinging(false)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBellRinging(true)

        ringTimeout.current =
          window.setTimeout(() => {
            setBellRinging(false)
          }, 850)
      })
    })
  }

  /*
   * Ring automatically whenever the unread
   * notification count increases.
   */
  useEffect(() => {
    if (
      unreadCount >
      previousUnreadCount.current
    ) {
      ringBell()
    }

    previousUnreadCount.current =
      unreadCount
  }, [unreadCount])

  /*
   * Clean up the timeout if Topbar unmounts.
   */
  useEffect(() => {
    return () => {
      if (ringTimeout.current !== null) {
        window.clearTimeout(
          ringTimeout.current
        )
      }
    }
  }, [])

  useEffect(() => {
    if (!notificationsOpen) {
      return
    }

    function handlePointerDown(
      event: MouseEvent
    ) {
      const target = event.target

      if (
        !(target instanceof Node)
      ) {
        return
      }

      const clickedBell =
        bellButtonRef.current?.contains(
          target
        )

      const clickedMenu =
        notificationMenuRef.current?.contains(
          target
        )

      if (!clickedBell && !clickedMenu) {
        onNotificationsClick?.()
      }
    }

    document.addEventListener(
      'mousedown',
      handlePointerDown
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handlePointerDown
      )
    }
  }, [notificationsOpen, onNotificationsClick])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !searchMenuRef.current?.contains(event.target)
      ) {
        setSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  function handleMenuClick() {
    if (onMenuClick) {
      onMenuClick()
    }
  }

  function handleSearchSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const form = event.currentTarget

    const input =
      form.elements.namedItem(
        'search'
      ) as HTMLInputElement

    const query = input.value.trim()

    if (!query) {
      return
    }

    if (onSearch) {
      onSearch(query)
    } else {
      navigate(`/explore?search=${encodeURIComponent(query)}`)
    }

    setSearchFocused(false)
  }

  function handleSearchResultClick(item: ExploreItem) {
    setSearch(item.title)
    setSearchFocused(false)

    if (item.type === 'People') {
      navigate(`/people/${item.id}`)
    } else if (item.type === 'Chapters') {
      navigate(item.route ?? '/chapters')
    } else {
      navigate(`/sponsors?company=${encodeURIComponent(item.title)}`)
    }
  }

  function handleNotificationsClick() {
    /*
     * Ring every time the user presses
     * the notification bell.
     */
    ringBell()

    if (onNotificationsClick) {
      onNotificationsClick()
    }
  }

  function handleProfileClick() {
    if (onProfileClick) {
      onProfileClick()
    }
  }

  return (
    <header className="topbar">

      {/* LEFT SIDE */}
      <div className="topbar__left">

        <button
          className={`topbar__hamburger ${
            sidebarOpen
              ? 'topbar__hamburger--active'
              : ''
          }`}
          onClick={handleMenuClick}
          aria-label={
            sidebarOpen
              ? 'Close menu'
              : 'Open menu'
          }
          aria-expanded={sidebarOpen}
          type="button"
        >
          <img
            src="/topbar/hamburger.svg"
            alt=""
            className="topbar__hamburger-img"
          />
        </button>

        <Link
          to="/"
          className="topbar__logo-link"
        >
          <img
            className="topbar__logo-icon"
            src="/topbar/logo-icon.png"
            alt="SASEBook icon"
          />

          <img
            className="topbar__logo-wordmark"
            src="/topbar/logo-wordmark.png"
            alt="SASEBook"
          />
        </Link>

      </div>


      {/* SEARCH */}
      <div className="topbar__search" ref={searchMenuRef}>

        <form
          role="search"
          className="topbar__search-form"
          onSubmit={handleSearchSubmit}
        >
          <img
            className="topbar__search-icon"
            src="/topbar/search-icon.svg"
            alt=""
          />

          <input
            className="topbar__search-input"
            type="search"
            name="search"
            placeholder="Search SASEBook"
            autoComplete="off"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onFocus={() => setSearchFocused(true)}
          />
        </form>

        {searchFocused && search.trim() && (
          <div className="topbar__search-results" role="listbox">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <button
                  className="topbar__search-result"
                  key={`${item.type}-${item.id}`}
                  type="button"
                  onClick={() => handleSearchResultClick(item)}
                >
                  <span className="topbar__search-result-type">
                    {item.type}
                  </span>
                  <strong>{item.title}</strong>
                  <span>{item.subtitle || item.description}</span>
                </button>
              ))
            ) : (
              <div className="topbar__search-empty">No matching results</div>
            )}
          </div>
        )}

      </div>


      {/* RIGHT SIDE */}
      <div className="topbar__right">

        <div className="topbar__notifications">

          {/* BELL */}
          <button
            ref={bellButtonRef}
            className={`topbar__icon-btn topbar__bell-button ${
              bellRinging
                ? 'topbar__bell-button--ringing'
                : ''
            }`}
            onClick={
              handleNotificationsClick
            }
            aria-label="Notifications"
            aria-expanded={
              notificationsOpen
            }
            type="button"
          >

            <span className="topbar__bell-glow" />

            <img
              className="topbar__bell-icon"
              src="/topbar/bell.svg"
              alt=""
            />

            {unreadCount > 0 && (
              <span className="topbar__notification-badge">
                {unreadCount > 9
                  ? '9+'
                  : unreadCount}
              </span>
            )}

          </button>


          {/* DROPDOWN */}
          {notificationsOpen && (
            <div
              ref={notificationMenuRef}
              className="topbar__notification-menu"
            >

              {/* HEADER */}
              <div className="topbar__notification-header">

                <div>
                  <span>
                    NOTIFICATIONS
                  </span>

                  <h3>
                    Recent announcements
                  </h3>
                </div>

                <div className="topbar__notification-header-actions">

                  <span className="topbar__notification-count">
                    {notifications.length}
                  </span>

                  {notifications.length > 0 && (
                    <button
                      className="topbar__clear-notifications"
                      type="button"
                      onClick={
                        onClearNotifications
                      }
                    >
                      Clear all
                    </button>
                  )}

                </div>

              </div>


              {/* LIST */}
              <div className="topbar__notification-list">

                {notifications.length === 0 ? (

                  <div className="topbar__notification-empty">

                    <div className="topbar__notification-empty-icon">
                      ✓
                    </div>

                    <strong>
                      You're all caught up
                    </strong>

                    <span>
                      No notifications to show.
                    </span>

                  </div>

                ) : (

                  notifications
                    .slice(0, 10)
                    .map((post) => (

                      <div
                        className="topbar__notification-item"
                        key={post.id}
                      >

                        <div className="topbar__notification-avatar">
                          {post.chapter
                            .split(' ')
                            .map(
                              (word) =>
                                word[0]
                            )
                            .slice(0, 2)
                            .join('')}
                        </div>


                        <div className="topbar__notification-content">

                          <div className="topbar__notification-title">

                            <strong>
                              {post.author}
                            </strong>

                            {post.isOfficerPost && (
                              <span>
                                OFFICER
                              </span>
                            )}

                          </div>


                          {post.content && (
                            <p>
                              {post.content}
                            </p>
                          )}


                          {post.imageUrl && (
                            <div className="topbar__notification-image-label">
                              🖼 Image attached
                            </div>
                          )}


                          <small>
                            {post.chapter}
                            {' • '}
                            {post.createdAt}
                          </small>

                        </div>


                        <button
                          className="topbar__delete-notification"
                          type="button"
                          aria-label="Delete notification"
                          title="Delete notification"
                          onClick={() =>
                            onDeleteNotification?.(
                              post.id
                            )
                          }
                        >
                          ×
                        </button>

                      </div>

                    ))

                )}

              </div>

            </div>
          )}

        </div>


        {/* PROFILE */}
        <Link
          to="/myprofile"
          className="topbar__icon-btn"
          onClick={handleProfileClick}
          aria-label="Profile"
        >
          <img
            className="topbar__profile-icon"
            src="/topbar/profile.svg"
            alt=""
          />
        </Link>

      </div>

    </header>
  )
}