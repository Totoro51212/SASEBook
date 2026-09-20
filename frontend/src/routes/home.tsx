import { useRef, useState, type ChangeEvent } from 'react'
import '../styles/home.css'
import type { FeedPost, Profile } from '../types'

export type { FeedPost } from '../types'

interface HomeProps {
  posts: FeedPost[]
  isOfficer: boolean
  onCreatePost: (content: string, imageUrl?: string) => void
  onDeletePost: (postId: number) => void
}

export default function Home({
  posts,
  isOfficer,
  onCreatePost,
  onDeletePost,
}: HomeProps) {
  const [postContent, setPostContent] = useState('')
  const [composerOpen, setComposerOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | undefined>()
  const [firstName] = useState(() => {
    try {
      const savedProfile = localStorage.getItem('sasebook-profile')

      if (!savedProfile) {
        return ''
      }

      const profile = JSON.parse(savedProfile) as Profile<string>
      return profile.firstName?.trim() || profile.name?.trim().split(/\s+/)[0] || ''
    } catch {
      return ''
    }
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    const imageUrl = URL.createObjectURL(file)

    setSelectedImage(imageUrl)
  }

  function removeSelectedImage() {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage)
    }

    setSelectedImage(undefined)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function closeComposer() {
    setComposerOpen(false)
    setPostContent('')
    removeSelectedImage()
  }

  function handleCreatePost() {
    const cleanPost = postContent.trim()

    if (!cleanPost && !selectedImage) {
      return
    }

    onCreatePost(cleanPost, selectedImage)

    setPostContent('')
    setSelectedImage(undefined)
    setComposerOpen(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="home-page">
      <div className="home-container">

        {/* HEADER */}
        <section className="home-welcome">
          <p className="home-eyebrow">
            SASEBOOK COMMUNITY
          </p>

          <h1>
            {firstName ? `Welcome Back, ${firstName}` : 'Welcome Back'}
          </h1>

          <p className="home-welcome-text">
            Stay connected with your chapter and see what's
            happening across the SASE community.
          </p>
        </section>


        {/* OFFICER TOOLS */}
        {isOfficer && (
          <section className="home-officer-panel">

            <div className="home-officer-info">

              <div className="home-officer-icon">
                FP
              </div>

              <div>
                <div className="home-officer-title-row">
                  <h2>
                    Share an announcement
                  </h2>

                  <span className="home-officer-badge">
                    OFFICER
                  </span>
                </div>

                <p>
                  Post an update for the SASE community.
                </p>
              </div>

            </div>


            {!composerOpen && (
              <button
                className="home-create-button"
                onClick={() => setComposerOpen(true)}
                type="button"
              >
                + Create Post
              </button>
            )}


            {composerOpen && (
              <div className="home-composer">

                <div className="home-composer-author">

                  <div className="home-avatar">
                    FP
                  </div>

                  <div>
                    <strong>
                      Florida Poly SASE
                    </strong>

                    <span>
                      Posting as an officer
                    </span>
                  </div>

                </div>


                <textarea
                  value={postContent}
                  onChange={(event) =>
                    setPostContent(event.target.value)
                  }
                  placeholder="What's happening with your chapter?"
                  maxLength={500}
                  autoFocus
                />


                {selectedImage && (
                  <div className="home-image-preview">

                    <img
                      src={selectedImage}
                      alt="Post preview"
                    />

                    <button
                      className="home-remove-image"
                      type="button"
                      onClick={removeSelectedImage}
                    >
                      × Remove
                    </button>

                  </div>
                )}


                <div className="home-composer-bottom">

                  <div className="home-composer-tools">

                    <input
                      ref={fileInputRef}
                      className="home-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    <button
                      className="home-image-button"
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                    >
                      🖼 Add Image
                    </button>

                    <span className="home-character-count">
                      {postContent.length}/500
                    </span>

                  </div>


                  <div className="home-composer-actions">

                    <button
                      className="home-cancel-button"
                      onClick={closeComposer}
                      type="button"
                    >
                      Cancel
                    </button>

                    <button
                      className="home-post-button"
                      onClick={handleCreatePost}
                      disabled={
                        !postContent.trim() &&
                        !selectedImage
                      }
                      type="button"
                    >
                      Post
                    </button>

                  </div>

                </div>

              </div>
            )}

          </section>
        )}


        {/* FEED */}
        <section className="home-feed-section">

          <div className="home-feed-heading">

            <div>
              <p className="home-eyebrow">
                COMMUNITY FEED
              </p>

              <h2>
                Latest from SASE
              </h2>
            </div>

            <span className="home-post-count">
              {posts.length}{' '}
              {posts.length === 1
                ? 'post'
                : 'posts'}
            </span>

          </div>


          <div className="home-feed">

            {posts.length === 0 ? (

              <div className="home-empty-feed">

                <div className="home-empty-icon">
                  📣
                </div>

                <h3>
                  No announcements yet
                </h3>

                <p>
                  New posts from SASE officers will
                  appear here.
                </p>

              </div>

            ) : (

              posts.map((post) => (

                <article
                  className="home-post-card"
                  key={post.id}
                >

                  <div className="home-post-header">

                    <div className="home-avatar">
                      {post.chapter
                        .split(' ')
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join('')}
                    </div>


                    <div className="home-post-author">

                      <div className="home-post-name-row">

                        <strong>
                          {post.author}
                        </strong>

                        {post.isOfficerPost && (
                          <span className="home-officer-tag">
                            OFFICER
                          </span>
                        )}

                      </div>

                      <span className="home-post-meta">
                        {post.chapter}
                        <span>•</span>
                        {post.createdAt}
                      </span>

                    </div>


                    {post.canDelete && (
                      <button
                        className="home-delete-post"
                        type="button"
                        onClick={() => {
                          const confirmed =
                            window.confirm(
                              'Delete this post?'
                            )

                          if (confirmed) {
                            onDeletePost(post.id)
                          }
                        }}
                      >
                        Delete
                      </button>
                    )}

                  </div>


                  <div className="home-post-body">

                    {post.content && (
                      <p className="home-post-content">
                        {post.content}
                      </p>
                    )}


                    {post.imageUrl && (
                      <div className="home-post-image">

                        <img
                          src={post.imageUrl}
                          alt="Post attachment"
                        />

                      </div>
                    )}

                  </div>

                </article>

              ))

            )}

          </div>

        </section>

      </div>
    </div>
  )
}