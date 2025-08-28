# KTBD 2011

A modern React-based web application for reading the Vietnamese Bible translation "Kinh Thánh Bản Dịch 2011" (KTBD 2011).

Live site: [https://ktbd2011.com/](https://ktbd2011.com/)

## Features

- 📖 Complete Old and New Testament with all 66 books
- 📱 Mobile-responsive design optimized for all screen sizes
- 🔄 Tab-based navigation (Read & About sections)
- 📚 Accordion-style book and chapter navigation
- ⚡ Fast loading with Vite bundling
- � Smart local storage caching with 5-minute refresh intervals
- 🌐 Offline support with fallback to cached content
- 🚀 Optimized performance with TanStack Query (React Query v5)
- 🎨 Bootstrap 5 UI components with custom styling
- 📡 Real-time online/offline status monitoring

## Technology Stack

### Frontend

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite 4** - Lightning-fast build tool and dev server
- **React Bootstrap 2.10** - UI component library
- **React Router v6** - Client-side routing with modern API

### State Management & Data Fetching

- **TanStack Query v5** (React Query) - Server state management
- **Axios** - HTTP client for API requests
- **Local Storage API** - Client-side caching and offline support

### Deployment & Hosting

- **Firebase Hosting** - Fast, secure web hosting
- **Firebase Tools** - Deployment automation

### Development Tools

- **TypeScript 5** - Static type checking
- **Vite** - Module bundler and development server
- **Bootstrap 5** - CSS framework

## Architecture

### Data Management

The application implements a sophisticated caching and offline strategy:

#### Local Storage Caching

- **5-minute cache expiry** - Fresh content while maintaining performance
- **Offline-first approach** - Always check local storage before network requests
- **Graceful degradation** - Falls back to cached content when offline
- **Intelligent cache invalidation** - Automatic refresh cycles

#### Network Strategy

- **Online detection** - Monitors network connectivity status
- **Timeout handling** - 5-second request timeout with fallback
- **Error resilience** - Uses cached data when network requests fail
- **Background updates** - Refreshes data while showing stale content

#### React Query Implementation

- **Stale-while-revalidate** - Shows cached data instantly, updates in background
- **Infinite cache retention** - `gcTime: Infinity` for offline support
- **Smart refetching** - On window focus, network reconnect, and intervals
- **Type-safe queries** - Full TypeScript integration

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/quangnguyen17/ktbd2011.git
cd ktbd2011
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Run TypeScript type checking
- `npm run deploy` - Build and deploy to Firebase

### Building for Production

```bash
npm run build
```

### Deployment

Deploy to Firebase Hosting:

```bash
npm run deploy
```

## Project Structure

```
ktbd2011/
├── public/              # Static assets
│   └── app-icon.png     # Application icon
├── src/
│   ├── About.tsx        # About page component with app information
│   ├── Read.tsx         # Main Bible reading component with accordion UI
│   ├── index.tsx        # Application entry point with routing and providers
│   ├── hooks.ts         # TanStack Query hooks for data fetching
│   ├── dataSource.ts    # Bible books metadata and structure
│   ├── storage.ts       # Local storage utilities and caching logic
│   ├── index.css        # Global styles and custom CSS
│   └── react-app-env.d.ts # TypeScript environment declarations
├── firebase.json        # Firebase hosting configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # TypeScript config for Node.js tools
├── vite.config.ts       # Vite build configuration
└── index.html          # HTML entry point
```

## Component Architecture

### Core Components

#### `index.tsx` - Application Root

- Sets up React Query provider with optimized configuration
- Implements React Router with tab-based navigation
- Defines main layout with `TabBar` component
- Handles route management and navigation state

#### `Read.tsx` - Bible Reading Interface

- Renders complete Old and New Testament books
- Implements nested accordion UI for books and chapters
- Handles dynamic content loading with React Query hooks
- Provides intuitive chapter-by-chapter reading experience

#### `About.tsx` - Application Information

- Displays app information and author details
- Provides links to iOS and Android native apps
- Contains contact information and acknowledgments

#### `TabBar` - Navigation Component

- Bottom navigation bar with active state highlighting
- Responsive design for mobile-first experience
- Clean, accessible tab switching interface

### Data Layer

#### `hooks.ts` - Data Fetching Logic

```typescript
// Core hooks available:
useBook(testamentId: string, filename: string)    // Fetch individual book content
useOldTestament()                                  // Get Old Testament metadata
useNewTestament()                                  // Get New Testament metadata
useOnlineStatus()                                  // Monitor connectivity
```

#### `storage.ts` - Local Storage Management

- **`LocalStorage.getBook()`** - Retrieve cached book content
- **`LocalStorage.setBook()`** - Store book content with timestamp
- **`LocalStorage.isCacheValid()`** - Check cache expiry status
- **5-minute cache TTL** with timestamp-based validation

#### `dataSource.ts` - Bible Structure

- Complete metadata for all 66 Bible books (39 Old Testament, 27 New Testament)
- Vietnamese book names and corresponding JSON filenames
- Testament organization and book ordering

## Data Flow

### Caching Strategy

1. **Initial Load**: Check local storage for cached content
2. **Online Check**: Verify network connectivity status
3. **Network Request**: Fetch fresh data from Google Cloud Storage
4. **Cache Update**: Store new content in local storage with timestamp
5. **Fallback**: Use cached data if network request fails
6. **Background Refresh**: Update data every 5 minutes while showing stale content

### Error Handling

- **Network timeouts**: 5-second timeout with graceful fallback
- **Offline mode**: Automatic fallback to cached content
- **Missing cache**: Clear error messaging when no offline data available
- **Retry logic**: 2 automatic retries for failed requests

## Configuration

### Vite Configuration

- React plugin enabled
- Development server on port 3000
- Optimized build output for production

### Firebase Configuration

- Static hosting from `dist` directory
- SPA routing with catch-all rewrites
- Optimized for single-page application behavior

### TypeScript Configuration

- Strict type checking enabled
- Modern ES modules support
- React JSX transformation

## Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: Optimized production bundles
- **Caching Headers**: Browser and CDN optimization
- **Local Storage**: Reduced network requests
- **Background Updates**: Non-blocking data refresh

## Contributing

We welcome contributions to improve the KTBD 2011 application! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the existing code style
4. Test your changes thoroughly
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Areas for Contribution

- UI/UX improvements
- Performance optimizations
- Accessibility enhancements
- Mobile experience improvements
- Additional language support
- Testing coverage

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Web App**: Installable on mobile devices
- **Offline Support**: Full functionality without internet connection

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

### Bible Text

- **KTBD 2011** Vietnamese Bible translation
- **MS Đặng Ngọc Báu** - Lead translator and project maintainer
- Email: [kinhthanhbd2011@gmail.com](mailto:kinhthanhbd2011@gmail.com)
- Facebook: [MS Đặng Ngọc Báu](https://www.facebook.com/bau.dang)

### Technical Stack

- **React Team** - React framework and ecosystem
- **TanStack** - Query library for data synchronization
- **Vite Team** - Build tool and development experience
- **React Bootstrap** - UI component library
- **Firebase** - Hosting and infrastructure
- **TypeScript** - Type safety and developer experience

### Mobile Applications

- **iOS App**: [Kinh Thánh BD2011](https://apps.apple.com/us/app/kinh-th%C3%A1nh-bd2011/id1405782410) on App Store
- **Android App**: [Kinh Thánh BD2011](https://play.google.com/store/apps/details?id=org.kinhthanhbd2011) on Google Play Store

## Contact

For questions, suggestions, or technical support:

- **Project Repository**: [https://github.com/quangnguyen17/ktbd2011](https://github.com/quangnguyen17/ktbd2011)
- **Bible Translation Contact**: [kinhthanhbd2011@gmail.com](mailto:kinhthanhbd2011@gmail.com)
- **Live Application**: [https://ktbd2011.com/](https://ktbd2011.com/)

---

_"Cầu xin Chúa dùng Bản Dịch Kinh Thánh này làm vui thỏa tâm linh các bạn với Lời hằng sống của Đức Chúa Trời."_

_"May the Lord use this Bible translation to satisfy your soul with the living Word of God."_
