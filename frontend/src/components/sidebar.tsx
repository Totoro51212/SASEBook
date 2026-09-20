import { useEffect, useState } from 'react'
import '../styles/sidebar.css'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { to: '/',         label: 'Home',     icon: '/topbar/home-icon.png'     },
  { to: '/people',   label: 'People',   icon: '/topbar/people-icon.png'   },
  { to: '/chapters', label: 'Chapters', icon: '/topbar/chapters-icon.png' },
  { to: '/sponsors', label: 'Sponsors', icon: '/topbar/sponsors-icon.png' },
  { to: '/explore',  label: 'Explore',  icon: '/topbar/explore-icon.png'  },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
  const [scrolled, setScrolled] = useState(false)

  // Track window scroll position to shift sidebar up when scrolled
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <>
      {/* Backdrop overlay — closes sidebar on click */}
      <div
        className={`sidebar-backdrop ${open ? 'sidebar-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <nav
        className={`sidebar ${open ? 'sidebar--open' : 'sidebar--collapsed'} ${scrolled ? 'sidebar--scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <ul className="sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <li key={item.to} className="sidebar__item">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                }
                onClick={() => {
                  window.scrollTo(0, 0)
                  if (open) onClose()
                }}
                tabIndex={0}
                title={item.label}
              >
                <div className="sidebar__icon-container">
                  <img
                    className="sidebar__icon"
                    src={item.icon}
                    alt={item.label}
                  />
                </div>
                <span className="sidebar__label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar__footer">
          <a
            href="#tos"
            className="sidebar__tos"
            tabIndex={open ? 0 : -1}
            onClick={(e) => {
              e.preventDefault()
              console.log('[Sidebar] Terms of Service clicked')
            }}
          >
            Terms of Service
          </a>
        </div>
      </nav>
    </>
  )
}
