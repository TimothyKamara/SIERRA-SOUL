// Mock data for development and testing

export const mockPosts = [
  {
    id: "1",
    user: {
      name: "Amara Okafor",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "amara_explorer",
    },
    content:
      "Just witnessed the most incredible sunset over the Sahara Desert! 🌅 The colors were absolutely breathtaking. This is why I love exploring our beautiful continent. #SaharaDesert #AfricanSunset #TravelAfrica",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: "2 hours ago",
    location: "Sahara Desert, Morocco",
  },
  {
    id: "2",
    user: {
      name: "Kwame Asante",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "kwame_arts",
    },
    content:
      "Finished my latest sculpture inspired by traditional Akan symbols. Each piece tells a story of our ancestors and their wisdom. Art is the bridge between past and present. 🎨✨",
    images: ["/placeholder.svg?height=400&width=600"],
    likes: 189,
    comments: 32,
    shares: 8,
    timestamp: "5 hours ago",
    location: "Kumasi, Ghana",
  },
]

export const mockStories = [
  {
    id: "1",
    user: {
      name: "Zara",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    viewed: false,
  },
  {
    id: "2",
    user: {
      name: "Kofi",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    viewed: true,
  },
  {
    id: "3",
    user: {
      name: "Asha",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    viewed: false,
  },
]

export const mockProducts = [
  {
    id: "1",
    name: "Handwoven Kente Cloth",
    price: 150,
    image: "/placeholder.svg?height=200&width=200",
    seller: {
      name: "Akosua Textiles",
      rating: 4.8,
    },
    location: "Accra, Ghana",
    category: "Clothing & Fashion",
    inStock: true,
  },
  {
    id: "2",
    name: "Maasai Beaded Jewelry Set",
    price: 75,
    image: "/placeholder.svg?height=200&width=200",
    seller: {
      name: "Nairobi Crafts",
      rating: 4.9,
    },
    location: "Nairobi, Kenya",
    category: "Jewelry & Accessories",
    inStock: true,
  },
  {
    id: "3",
    name: "Ethiopian Coffee Beans",
    price: 25,
    image: "/placeholder.svg?height=200&width=200",
    seller: {
      name: "Addis Coffee Co.",
      rating: 4.7,
    },
    location: "Addis Ababa, Ethiopia",
    category: "Food & Beverages",
    inStock: false,
  },
]

export const mockHotels = [
  {
    id: "1",
    name: "Serengeti Safari Lodge",
    image: "/placeholder.svg?height=300&width=400",
    location: "Serengeti National Park, Tanzania",
    rating: 4.9,
    price: 280,
    amenities: ["WiFi", "Pool", "Safari Tours", "Restaurant"],
    description: "Experience the wild beauty of Serengeti with luxury accommodations and guided safari tours.",
  },
  {
    id: "2",
    name: "Stone Town Heritage Hotel",
    image: "/placeholder.svg?height=300&width=400",
    location: "Stone Town, Zanzibar",
    rating: 4.6,
    price: 120,
    amenities: ["WiFi", "AC", "Rooftop Terrace", "Cultural Tours"],
    description: "Historic hotel in the heart of Stone Town with traditional Swahili architecture.",
  },
]

export const mockTours = [
  {
    id: "1",
    name: "Victoria Falls Adventure",
    image: "/placeholder.svg?height=300&width=400",
    location: "Livingstone, Zambia",
    duration: "3 days",
    price: 450,
    type: "Adventure",
    rating: 4.8,
    description:
      "Experience the thundering Victoria Falls with white-water rafting, bungee jumping, and helicopter tours.",
    includes: ["Accommodation", "Meals", "Activities", "Transport"],
  },
  {
    id: "2",
    name: "Kilimanjaro Trek",
    image: "/placeholder.svg?height=300&width=400",
    location: "Moshi, Tanzania",
    duration: "7 days",
    price: 1200,
    type: "Trekking",
    rating: 4.9,
    description: "Conquer Africa's highest peak with experienced guides and stunning views.",
    includes: ["Guide", "Equipment", "Permits", "Meals"],
  },
]

export const mockArtPieces = [
  {
    id: "1",
    title: "Ubuntu Spirit",
    artist: "Thandiwe Mthembu",
    image: "/placeholder.svg?height=300&width=300",
    price: 850,
    medium: "Acrylic on Canvas",
    dimensions: "60x80 cm",
    available: true,
  },
  {
    id: "2",
    title: "Ancestral Wisdom",
    artist: "Kofi Mensah",
    image: "/placeholder.svg?height=300&width=300",
    price: 650,
    medium: "Wood Carving",
    dimensions: "45x30x20 cm",
    available: true,
  },
]

export const mockArtists = [
  {
    id: "1",
    name: "Thandiwe Mthembu",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Cape Town, South Africa",
    specialty: "Abstract Painting",
    followers: 2340,
    artworks: 45,
    bio: "Contemporary artist exploring themes of identity and heritage through vibrant abstract compositions.",
  },
  {
    id: "2",
    name: "Kofi Mensah",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Kumasi, Ghana",
    specialty: "Wood Sculpture",
    followers: 1890,
    artworks: 32,
    bio: "Traditional sculptor preserving Akan cultural symbols through contemporary interpretations.",
  },
]

export const mockConversations = [
  {
    id: "1",
    participant: {
      name: "Amara Okafor",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
    lastMessage: "Thanks for the recommendation! The safari was amazing 🦁",
    timestamp: "2 min ago",
    unread: 2,
  },
  {
    id: "2",
    participant: {
      name: "Safari Guide Tours",
      avatar: "/placeholder.svg?height=40&width=40",
      online: false,
    },
    lastMessage: "Your booking for tomorrow is confirmed. Meet at 6 AM.",
    timestamp: "1 hour ago",
    unread: 0,
  },
]

export const mockMessages = [
  {
    id: "1",
    senderId: "other",
    content: "Hi! I saw your post about the Serengeti safari. Could you share more details about the tour operator?",
    timestamp: "10:30 AM",
    type: "text",
  },
  {
    id: "2",
    senderId: "me",
    content:
      "Of course! I used Serengeti Safari Lodge. They were fantastic - very professional guides and great wildlife spotting.",
    timestamp: "10:32 AM",
    type: "text",
  },
  {
    id: "3",
    senderId: "other",
    content: "Thanks for the recommendation! The safari was amazing 🦁",
    timestamp: "2 min ago",
    type: "text",
  },
]
