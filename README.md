# Sierra Soul - Authentic African Experiences

A modern Progressive Web Application (PWA) built with Next.js and Tailwind CSS, focused on authentic African tourism, culture, and experiences.

## 🌟 Features

### Core Functionality
- **Feed Page**: Infinite scroll social feed with posts, stories, likes, comments, and shares
- **Marketplace**: Product listings with filters, seller dashboard UI, and product details
- **Hotels**: Hotel listings with search, filters, and booking forms
- **Tours**: Tour listings with detailed information and booking requests
- **Art Section**: Gallery view for art pieces and artist profiles
- **Authentication**: Login/signup pages with social login options
- **Messaging**: Real-time chat UI with conversation management
- **Notifications**: Notification system with read/unread states
- **Profile**: User profiles with editable details and settings

### PWA Features
- ✅ Offline support with service worker
- ✅ Add to home screen functionality
- ✅ App-like experience with standalone display
- ✅ Responsive design optimized for mobile
- ✅ Fast loading with caching strategies

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd sierra-soul
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
sierra-soul/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication pages
│   ├── art/                      # Art section pages
│   ├── hotels/                   # Hotel booking pages
│   ├── marketplace/              # Marketplace pages
│   ├── messages/                 # Messaging pages
│   ├── profile/                  # User profile pages
│   ├── tours/                    # Tours pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable React components
│   ├── art/                      # Art-related components
│   ├── auth/                     # Authentication components
│   ├── feed/                     # Social feed components
│   ├── hotels/                   # Hotel components
│   ├── layout/                   # Layout components
│   ├── marketplace/              # Marketplace components
│   ├── messages/                 # Messaging components
│   ├── notifications/            # Notification components
│   ├── profile/                  # Profile components
│   ├── tours/                    # Tour components
│   └── ui/                       # Generic UI components
├── contexts/                     # React Context providers
│   ├── AuthContext.tsx           # Authentication state
│   └── NotificationContext.tsx   # Notification state
├── lib/                          # Utility functions and data
│   └── mockData.ts               # Mock data for development
├── public/                       # Static assets
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service worker
└── README.md                     # This file
\`\`\`

## 🔧 Backend Integration Guide

### API Endpoints Structure

The frontend is designed to easily integrate with the following backend API structure:

#### Authentication
\`\`\`javascript
// Login
POST /api/auth/login
Body: { email, password }
Response: { user, token }

// Register
POST /api/auth/register
Body: { name, email, password }
Response: { user, token }

// Get current user
GET /api/auth/me
Headers: { Authorization: "Bearer <token>" }
Response: { user }
\`\`\`

#### Posts/Feed
\`\`\`javascript
// Get feed posts
GET /api/posts?page=1&limit=10
Response: { posts: [], hasMore: boolean }

// Create post
POST /api/posts
Body: { content, images?, location? }
Response: { post }

// Like/Unlike post
POST /api/posts/:id/like
Response: { liked: boolean, likesCount: number }
\`\`\`

#### Marketplace
\`\`\`javascript
// Get products
GET /api/products?category=&minPrice=&maxPrice=&location=
Response: { products: [] }

// Get product details
GET /api/products/:id
Response: { product }

// Create product listing
POST /api/products
Body: { name, price, description, images, category }
Response: { product }
\`\`\`

#### Hotels
\`\`\`javascript
// Search hotels
GET /api/hotels?location=&checkIn=&checkOut=&guests=
Response: { hotels: [] }

// Book hotel
POST /api/hotels/:id/book
Body: { checkIn, checkOut, guests, contactInfo }
Response: { booking }
\`\`\`

#### Tours
\`\`\`javascript
// Get tours
GET /api/tours?type=&duration=&location=
Response: { tours: [] }

// Book tour
POST /api/tours/:id/book
Body: { date, participants, contactInfo }
Response: { booking }
\`\`\`

### MongoDB Schema Examples

#### User Schema
\`\`\`javascript
const userSchema = {
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // hashed
  avatar: String,
  username: String,
  bio: String,
  followers: [ObjectId],
  following: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

#### Post Schema
\`\`\`javascript
const postSchema = {
  _id: ObjectId,
  userId: ObjectId,
  content: String,
  images: [String],
  location: String,
  likes: [ObjectId],
  comments: [{
    userId: ObjectId,
    content: String,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

#### Product Schema
\`\`\`javascript
const productSchema = {
  _id: ObjectId,
  sellerId: ObjectId,
  name: String,
  description: String,
  price: Number,
  images: [String],
  category: String,
  location: String,
  inStock: Boolean,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

#### Hotel Schema
\`\`\`javascript
const hotelSchema = {
  _id: ObjectId,
  name: String,
  description: String,
  location: String,
  images: [String],
  amenities: [String],
  rooms: [{
    type: String,
    price: Number,
    available: Boolean
  }],
  rating: Number,
  reviews: [{
    userId: ObjectId,
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  createdAt: Date
}
\`\`\`

### State Management Integration

The frontend uses React Context for state management. Here's how to connect with your backend:

#### AuthContext Integration
\`\`\`javascript
// In contexts/AuthContext.tsx
const login = async (credentials) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    const data = await response.json()
    
    if (response.ok) {
      setUser(data.user)
      localStorage.setItem('token', data.token)
      return data
    }
    throw new Error(data.message)
  } catch (error) {
    throw error
  }
}
\`\`\`

#### API Service Layer
Create an API service layer for consistent backend communication:

\`\`\`javascript
// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

class ApiService {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    
    return response.json()
  }

  // Auth methods
  login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  // Posts methods
  getFeedPosts(page = 1) {
    return this.request(`/posts?page=${page}&limit=10`)
  }

  createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    })
  }

  // Marketplace methods
  getProducts(filters = {}) {
    const params = new URLSearchParams(filters)
    return this.request(`/products?${params}`)
  }

  // Hotels methods
  searchHotels(searchParams) {
    const params = new URLSearchParams(searchParams)
    return this.request(`/hotels?${params}`)
  }
}

export const apiService = new ApiService()
\`\`\`

## 🎨 Customization

### Theming
The app uses Tailwind CSS with a custom color scheme focused on amber/orange tones representing African warmth. You can customize colors in:

- `tailwind.config.js` - Main color configuration
- `app/globals.css` - CSS custom properties
- Individual components - Component-specific styling

### Adding New Features
1. Create new page in `app/` directory
2. Add corresponding components in `components/`
3. Update navigation in `components/layout/BottomNavigation.tsx`
4. Add mock data in `lib/mockData.ts`
5. Create API integration points

## 📱 PWA Configuration

### Manifest Configuration
The PWA manifest is located at `public/manifest.json`. Key configurations:

\`\`\`json
{
  "name": "Sierra Soul - Authentic African Experiences",
  "short_name": "Sierra Soul",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#D97706",
  "background_color": "#ffffff"
}
\`\`\`

### Service Worker
The service worker (`public/sw.js`) handles:
- Offline caching of key pages
- Background sync (ready for implementation)
- Push notifications (ready for implementation)

### Installation Prompt
The app includes a custom install prompt (`components/PWAInstaller.tsx`) that appears when the PWA installation criteria are met.

## 🔒 Security Considerations

### Frontend Security
- Input validation on all forms
- XSS protection through React's built-in escaping
- CSRF protection ready for backend integration
- Secure token storage recommendations

### Backend Integration Security
When connecting to your backend:

1. **Authentication**: Use JWT tokens with proper expiration
2. **API Security**: Implement rate limiting and input validation
3. **File Uploads**: Validate file types and sizes
4. **CORS**: Configure proper CORS policies
5. **HTTPS**: Always use HTTPS in production

## 🚀 Deployment

### Vercel Deployment (Recommended)
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Manual Deployment
1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Deploy the `out/` directory to your hosting provider

### Environment Variables
Create a `.env.local` file for local development:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## 🧪 Testing

### Running Tests
\`\`\`bash
npm run test
\`\`\`

### Testing Strategy
- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for user flows
- PWA functionality testing

## 📈 Performance Optimization

### Built-in Optimizations
- Next.js automatic code splitting
- Image optimization with Next.js Image component
- Lazy loading of components
- Service worker caching

### Monitoring
- Web Vitals tracking ready for implementation
- Error boundary components included
- Performance monitoring hooks available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or support:
- Check the documentation above
- Review the code comments
- Create an issue in the repository

---

**Note**: This is a frontend-only implementation with mock data. All API calls are commented with examples of how to integrate with your MongoDB/Node.js backend. The application is fully functional as a PWA and ready for backend integration.
