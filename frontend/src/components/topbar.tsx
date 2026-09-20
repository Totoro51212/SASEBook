import '../styles/topbar.css'
import { Link } from 'react-router-dom'
import { type FormEvent } from 'react'

interface TopbarProps {
  sidebarOpen?: boolean
  onMenuClick?: () => void
  onSearch?: (query: string) => void
  onNotificationsClick?: () => void
  onProfileClick?: () => void
}

export default function Topbar({
  sidebarOpen = false,
  onMenuClick,
  onSearch,
  onNotificationsClick,
  onProfileClick,
}: TopbarProps) {
  function handleMenuClick() {
    if (onMenuClick) {
      onMenuClick()
    } else {
      console.log('[Topbar] Menu clicked – no handler attached')
    }
  }
  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.elements.namedItem('search') as HTMLInputElement
    const query = input.value.trim()
    if (query) {
      if (onSearch) {
        onSearch(query)
      } else {
        console.log('[Topbar] Search submitted:', query)
      }
    }
  }

  function handleNotificationsClick() {
    if (onNotificationsClick) {
      onNotificationsClick()
    } else {
      console.log('[Topbar] Notifications clicked – no handler attached')
    }
  }

  function handleProfileClick() {
    if (onProfileClick) {
      onProfileClick()
    } else {
      console.log('[Topbar] Profile clicked – no handler attached')
    }
  }

  return (
    <header className="topbar">
      {/* ── Left cluster ────────────────────────────────── */}
      <div className="topbar__left">
        {/* Hamburger */}
        <button
          className={`topbar__hamburger ${sidebarOpen ? 'topbar__hamburger--active' : ''}`}
          onClick={handleMenuClick}
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={sidebarOpen}
          type="button"
        >
          <img
            src="/topbar/hamburger.png"
            alt=""
            className="topbar__hamburger-img"
          />
        </button>

        {/* Logo: icon + wordmark → home link */}
        <Link to="/" className="topbar__logo-link">
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

      {/* ── Search bar ──────────────────────────────────── */}
      <div className="topbar__search">
        <form
          role="search"
          className="topbar__search-form"
          onSubmit={handleSearchSubmit}
        >
          <img
            className="topbar__search-icon"
            src="/topbar/search-icon.png"
            alt=""
          />
          <input
            className="topbar__search-input"
            type="search"
            name="search"
            placeholder="Search SASEBook"
            autoComplete="off"
          />
        </form>
      </div>

      {/* ── Right cluster ───────────────────────────────── */}
      <div className="topbar__right">
        {/* Bell */}
        <button
          className="topbar__icon-btn"
          onClick={handleNotificationsClick}
          aria-label="Notifications"
          type="button"
        >
          <img
            className="topbar__bell-icon"
            src="/topbar/bell.png"
            alt=""
          />
        </button>

        {/* Profile */}
        <Link
          to="/myprofile"
          className="topbar__icon-btn"
          onClick={handleProfileClick}
          aria-label="Profile"
        >
          <img
            className="topbar__profile-icon"
            src="/topbar/profile.png"
            alt=""
          />
        </Link>
      </div>
    </header>
  )
}
