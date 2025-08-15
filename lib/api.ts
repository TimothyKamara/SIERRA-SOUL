const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Mock data for development when backend is not ready
const mockData = {
  feed: [
    {
      id: "1",
      user: {
        id: "1",
        name: "Amara Okafor",
        username: "amara_art",
        avatar: "/placeholder-user.jpg",
        verified: true,
      },
      content:
        "Just finished this beautiful Adinkra-inspired piece! The symbols tell stories of wisdom and strength. 🎨✨ #AfricanArt #Culture",
      images: ["/placeholder.jpg"],
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: "2024-01-15T10:30:00Z",
      liked: false,
      saved: false,
    },
    {
      id: "2",
      user: {
        id: "2",
        name: "Kwame Asante",
        username: "kwame_explorer",
        avatar: "/placeholder-user.jpg",
        verified: false,
      },
      content:
        "Exploring the ancient ruins of Great Zimbabwe. The history here is absolutely breathtaking! 🏛️ #History #Zimbabwe #Culture",
      images: ["/placeholder.jpg"],
      likes: 189,
      comments: 32,
      shares: 8,
      timestamp: "2024-01-15T08:15:00Z",
      liked: true,
      saved: false,
    },
  ],
  stories: [
    {
      id: "1",
      user: {
        id: "1",
        name: "Amara",
        avatar: "/placeholder-user.jpg",
      },
      preview: "/placeholder.jpg",
      viewed: false,
    },
    {
      id: "2",
      user: {
        id: "2",
        name: "Kwame",
        avatar: "/placeholder-user.jpg",
      },
      preview: "/placeholder.jpg",
      viewed: true,
    },
  ],
  products: [
    {
      id: "1",
      name: "Handwoven Kente Cloth",
      price: 150,
      currency: "USD",
      images: ["/placeholder.jpg"],
      seller: {
        name: "Kwame Textiles",
        rating: 4.8,
        location: "Kumasi, Ghana",
      },
      category: "Textiles",
      inStock: true,
      featured: true,
    },
    {
      id: "2",
      name: "Wooden Mask Collection",
      price: 85,
      currency: "USD",
      images: ["/placeholder.jpg"],
      seller: {
        name: "Ancestral Arts",
        rating: 4.9,
        location: "Lagos, Nigeria",
      },
      category: "Art",
      inStock: true,
      featured: false,
    },
  ],
  hotels: [
    {
      id: "1",
      name: "Baobab Lodge",
      location: "Serengeti, Tanzania",
      rating: 4.8,
      price: 280,
      currency: "USD",
      images: ["/placeholder.jpg"],
      amenities: ["WiFi", "Pool", "Restaurant", "Spa"],
      availability: true,
    },
    {
      id: "2",
      name: "Desert Rose Resort",
      location: "Marrakech, Morocco",
      rating: 4.6,
      price: 195,
      currency: "USD",
      images: ["/placeholder.jpg"],
      amenities: ["WiFi", "Pool", "Restaurant"],
      availability: true,
    },
  ],
  tours: [
    {
      id: "1",
      title: "Victoria Falls Adventure",
      location: "Zambia/Zimbabwe",
      duration: "3 days",
      price: 450,
      currency: "USD",
      rating: 4.9,
      images: ["/placeholder.jpg"],
      highlights: ["Helicopter ride", "White water rafting", "Sunset cruise"],
      difficulty: "Moderate",
    },
    {
      id: "2",
      title: "Sahara Desert Trek",
      location: "Morocco",
      duration: "5 days",
      price: 680,
      currency: "USD",
      rating: 4.7,
      images: ["/placeholder.jpg"],
      highlights: ["Camel trekking", "Desert camping", "Berber culture"],
      difficulty: "Challenging",
    },
  ],
  artPieces: [
    {
      id: "1",
      title: "Ubuntu Spirit",
      artist: {
        name: "Thandiwe Mthembu",
        id: "1",
      },
      price: 800,
      currency: "USD",
      medium: "Acrylic on Canvas",
      dimensions: "60x80 cm",
      images: ["/placeholder.jpg"],
      available: true,
    },
    {
      id: "2",
      title: "Ancestral Dreams",
      artist: {
        name: "Kofi Mensah",
        id: "2",
      },
      price: 650,
      currency: "USD",
      medium: "Oil on Canvas",
      dimensions: "50x70 cm",
      images: ["/placeholder.jpg"],
      available: true,
    },
  ],
  artists: [
    {
      id: "1",
      name: "Thandiwe Mthembu",
      bio: "Contemporary African artist specializing in abstract expressionism",
      location: "Cape Town, South Africa",
      avatar: "/placeholder-user.jpg",
      artworks: 24,
      followers: 1200,
    },
    {
      id: "2",
      name: "Kofi Mensah",
      bio: "Traditional and modern fusion artist from Ghana",
      location: "Accra, Ghana",
      avatar: "/placeholder-user.jpg",
      artworks: 18,
      followers: 890,
    },
  ],
  conversations: [
    {
      id: "1",
      participant: {
        name: "Kwame Asante",
        avatar: "/placeholder-user.jpg",
        online: true,
      },
      lastMessage: {
        content: "Thanks for the beautiful artwork!",
        timestamp: "2024-01-15T14:30:00Z",
        read: false,
      },
      unreadCount: 2,
    },
    {
      id: "2",
      participant: {
        name: "Amara Okafor",
        avatar: "/placeholder-user.jpg",
        online: false,
      },
      lastMessage: {
        content: "When is the next art exhibition?",
        timestamp: "2024-01-15T12:15:00Z",
        read: true,
      },
      unreadCount: 0,
    },
  ],
  notifications: [
    {
      id: "1",
      type: "like",
      message: "Amara liked your post",
      timestamp: "2024-01-15T12:00:00Z",
      read: false,
    },
    {
      id: "2",
      type: "comment",
      message: "Kwame commented on your artwork",
      timestamp: "2024-01-15T11:30:00Z",
      read: false,
    },
  ],
}

// Generic API request function with fallback
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  // Add auth token if available and we're in browser
  if (isBrowser) {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.warn(`API Request failed for ${endpoint}, using fallback data:`, error)
    throw error
  }
}

// Authentication API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      return await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      })
    } catch (error) {
      // Mock successful login for development
      console.warn("Using mock login response")
      return {
        user: {
          id: "1",
          name: "Test User",
          email: credentials.email,
          username: "testuser",
          avatar: "/placeholder-user.jpg",
        },
        token: "mock-jwt-token",
      }
    }
  },

  register: async (userData: { name: string; email: string; password: string; username: string }) => {
    try {
      return await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      })
    } catch (error) {
      console.warn("Using mock register response")
      return {
        user: {
          id: "1",
          name: userData.name,
          email: userData.email,
          username: userData.username,
          avatar: "/placeholder-user.jpg",
        },
        token: "mock-jwt-token",
      }
    }
  },

  logout: async () => {
    try {
      return await apiRequest("/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.warn("Using mock logout response")
      return { success: true }
    }
  },

  getProfile: async () => {
    try {
      return await apiRequest("/auth/me")
    } catch (error) {
      console.warn("Using mock profile response")
      return {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        username: "testuser",
        avatar: "/placeholder-user.jpg",
        bio: "Explorer of African culture and art",
        location: "Nairobi, Kenya",
        followers: 245,
        following: 189,
      }
    }
  },

  updateProfile: async (updates: any) => {
    try {
      return await apiRequest("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.warn("Using mock profile update response")
      return { ...updates, id: "1" }
    }
  },
}

// Posts API
export const postsAPI = {
  getFeed: async (page = 1, limit = 10) => {
    try {
      return await apiRequest(`/posts/feed?page=${page}&limit=${limit}`)
    } catch (error) {
      console.warn("Using mock feed data")
      return mockData.feed
    }
  },

  getPost: async (id: string) => {
    try {
      return await apiRequest(`/posts/${id}`)
    } catch (error) {
      console.warn("Using mock post data")
      return mockData.feed.find((post) => post.id === id) || mockData.feed[0]
    }
  },

  createPost: async (postData: any) => {
    try {
      return await apiRequest("/posts", {
        method: "POST",
        body: JSON.stringify(postData),
      })
    } catch (error) {
      console.warn("Using mock post creation")
      return {
        id: Date.now().toString(),
        ...postData,
        user: {
          id: "1",
          name: "Test User",
          username: "testuser",
          avatar: "/placeholder-user.jpg",
        },
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: new Date().toISOString(),
        liked: false,
        saved: false,
      }
    }
  },

  likePost: async (id: string) => {
    try {
      return await apiRequest(`/posts/${id}/like`, {
        method: "POST",
      })
    } catch (error) {
      console.warn("Using mock like response")
      return { liked: true, likes: Math.floor(Math.random() * 100) + 50 }
    }
  },

  unlikePost: async (id: string) => {
    try {
      return await apiRequest(`/posts/${id}/like`, {
        method: "DELETE",
      })
    } catch (error) {
      console.warn("Using mock unlike response")
      return { liked: false, likes: Math.floor(Math.random() * 100) + 50 }
    }
  },

  savePost: async (id: string) => {
    try {
      return await apiRequest(`/posts/${id}/save`, {
        method: "POST",
      })
    } catch (error) {
      console.warn("Using mock save response")
      return { saved: true }
    }
  },

  unsavePost: async (id: string) => {
    try {
      return await apiRequest(`/posts/${id}/save`, {
        method: "DELETE",
      })
    } catch (error) {
      console.warn("Using mock unsave response")
      return { saved: false }
    }
  },
}

// Products API
export const productsAPI = {
  getProducts: async (filters: any = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      return await apiRequest(`/products?${params}`)
    } catch (error) {
      console.warn("Using mock products data")
      return mockData.products
    }
  },

  getProduct: async (id: string) => {
    try {
      return await apiRequest(`/products/${id}`)
    } catch (error) {
      console.warn("Using mock product data")
      return mockData.products.find((product) => product.id === id) || mockData.products[0]
    }
  },

  favoriteProduct: async (id: string) => {
    try {
      return await apiRequest(`/products/${id}/favorite`, {
        method: "POST",
      })
    } catch (error) {
      console.warn("Using mock favorite response")
      return { favorited: true }
    }
  },

  unfavoriteProduct: async (id: string) => {
    try {
      return await apiRequest(`/products/${id}/favorite`, {
        method: "DELETE",
      })
    } catch (error) {
      console.warn("Using mock unfavorite response")
      return { favorited: false }
    }
  },
}

// Hotels API
export const hotelsAPI = {
  getHotels: async (searchParams: any = {}) => {
    try {
      const params = new URLSearchParams(searchParams).toString()
      return await apiRequest(`/hotels?${params}`)
    } catch (error) {
      console.warn("Using mock hotels data")
      return mockData.hotels
    }
  },

  getHotel: async (id: string) => {
    try {
      return await apiRequest(`/hotels/${id}`)
    } catch (error) {
      console.warn("Using mock hotel data")
      return mockData.hotels.find((hotel) => hotel.id === id) || mockData.hotels[0]
    }
  },

  bookHotel: async (id: string, bookingData: any) => {
    try {
      return await apiRequest(`/hotels/${id}/book`, {
        method: "POST",
        body: JSON.stringify(bookingData),
      })
    } catch (error) {
      console.warn("Using mock booking response")
      return {
        bookingId: Date.now().toString(),
        confirmed: true,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
      }
    }
  },
}

// Tours API
export const toursAPI = {
  getTours: async (filters: any = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      return await apiRequest(`/tours?${params}`)
    } catch (error) {
      console.warn("Using mock tours data")
      return mockData.tours
    }
  },

  getTour: async (id: string) => {
    try {
      return await apiRequest(`/tours/${id}`)
    } catch (error) {
      console.warn("Using mock tour data")
      return mockData.tours.find((tour) => tour.id === id) || mockData.tours[0]
    }
  },

  bookTour: async (id: string, bookingData: any) => {
    try {
      return await apiRequest(`/tours/${id}/book`, {
        method: "POST",
        body: JSON.stringify(bookingData),
      })
    } catch (error) {
      console.warn("Using mock tour booking response")
      return {
        bookingId: Date.now().toString(),
        confirmed: true,
        date: bookingData.date,
        participants: bookingData.participants,
      }
    }
  },
}

// Art API
export const artAPI = {
  getArtPieces: async (filters: any = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      return await apiRequest(`/art/pieces?${params}`)
    } catch (error) {
      console.warn("Using mock art pieces data")
      return mockData.artPieces
    }
  },

  getArtists: async (filters: any = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      return await apiRequest(`/art/artists?${params}`)
    } catch (error) {
      console.warn("Using mock artists data")
      return mockData.artists
    }
  },

  getArtPiece: async (id: string) => {
    try {
      return await apiRequest(`/art/pieces/${id}`)
    } catch (error) {
      console.warn("Using mock art piece data")
      return mockData.artPieces.find((piece) => piece.id === id) || mockData.artPieces[0]
    }
  },

  getArtist: async (id: string) => {
    try {
      return await apiRequest(`/art/artists/${id}`)
    } catch (error) {
      console.warn("Using mock artist data")
      return mockData.artists.find((artist) => artist.id === id) || mockData.artists[0]
    }
  },
}

// Messages API
export const messagesAPI = {
  getConversations: async () => {
    try {
      return await apiRequest("/messages/conversations")
    } catch (error) {
      console.warn("Using mock conversations data")
      return mockData.conversations
    }
  },

  getConversation: async (id: string) => {
    try {
      return await apiRequest(`/messages/conversations/${id}`)
    } catch (error) {
      console.warn("Using mock conversation data")
      return {
        id,
        participant: mockData.conversations[0].participant,
        messages: [
          {
            id: "1",
            content: "Hello! I'm interested in your artwork.",
            sender: { id: "2", name: "Kwame Asante" },
            timestamp: "2024-01-15T14:00:00Z",
          },
          {
            id: "2",
            content: "Thanks for reaching out! Which piece caught your eye?",
            sender: { id: "1", name: "You" },
            timestamp: "2024-01-15T14:15:00Z",
          },
        ],
      }
    }
  },

  sendMessage: async (conversationId: string, message: string) => {
    try {
      return await apiRequest(`/messages/conversations/${conversationId}`, {
        method: "POST",
        body: JSON.stringify({ message }),
      })
    } catch (error) {
      console.warn("Using mock message send response")
      return {
        id: Date.now().toString(),
        content: message,
        sender: { id: "1", name: "You" },
        timestamp: new Date().toISOString(),
      }
    }
  },

  createConversation: async (userId: string) => {
    try {
      return await apiRequest("/messages/conversations", {
        method: "POST",
        body: JSON.stringify({ userId }),
      })
    } catch (error) {
      console.warn("Using mock conversation creation")
      return {
        id: Date.now().toString(),
        participant: {
          id: userId,
          name: "New Contact",
          avatar: "/placeholder-user.jpg",
          online: false,
        },
        messages: [],
      }
    }
  },
}

// Stories API
export const storiesAPI = {
  getStories: async () => {
    try {
      return await apiRequest("/stories")
    } catch (error) {
      console.warn("Using mock stories data")
      return mockData.stories
    }
  },

  createStory: async (storyData: any) => {
    try {
      return await apiRequest("/stories", {
        method: "POST",
        body: JSON.stringify(storyData),
      })
    } catch (error) {
      console.warn("Using mock story creation")
      return {
        id: Date.now().toString(),
        ...storyData,
        user: {
          id: "1",
          name: "You",
          avatar: "/placeholder-user.jpg",
        },
        viewed: false,
      }
    }
  },

  viewStory: async (id: string) => {
    try {
      return await apiRequest(`/stories/${id}/view`, {
        method: "POST",
      })
    } catch (error) {
      console.warn("Using mock story view response")
      return { viewed: true }
    }
  },
}

// Notifications API
export const notificationsAPI = {
  getNotifications: async () => {
    try {
      return await apiRequest("/notifications")
    } catch (error) {
      console.warn("Using mock notifications data")
      return mockData.notifications
    }
  },

  markAsRead: async (id: string) => {
    try {
      return await apiRequest(`/notifications/${id}/read`, {
        method: "PUT",
      })
    } catch (error) {
      console.warn("Using mock notification read response")
      return { success: true }
    }
  },

  markAllAsRead: async () => {
    try {
      return await apiRequest("/notifications/read-all", {
        method: "PUT",
      })
    } catch (error) {
      console.warn("Using mock notifications read all response")
      return { success: true }
    }
  },
}
