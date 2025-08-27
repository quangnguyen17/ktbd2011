# KTBD 2011

A modern web application for reading the Vietnamese Bible translation "Kinh Thánh Bản Dịch 2011" (KTBD 2011).

Live site: [https://ktbd2011.com/](https://ktbd2011.com/)

## Features

- 📖 Complete Old and New Testament navigation
- 📱 Mobile-responsive design
- 🔍 Chapter and verse navigation
- 📚 Bootstrap-based UI components
- ⚡ Fast and efficient loading with Vite
- 🔄 Smart data caching and background updates
- 🚀 Optimized performance with React Query
- 📥 Prefetching support for faster navigation

## Technology Stack

- React 18
- TypeScript
- Vite
- React Bootstrap
- React Router v6
- TanStack Query (React Query)
- Firebase (hosting)
- Axios for data fetching

## Data Management

### Caching Strategy

- Implements a 5-minute cache refresh cycle
- Background data updates while showing stale content
- Smart prefetching for improved navigation
- HTTP Cache-Control headers optimization

### React Query Implementation

- Automatic background updates
- Type-safe query keys
- Optimized data fetching
- Built-in error handling
- Loading state management

## Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/quangnguyen17/ktbd2011.git
cd ktbd2011
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
yarn build
```

To preview the production build locally:

```bash
yarn preview
```

### Deployment

Deploy to Firebase:

```bash
yarn deploy
```

## Project Structure

```
ktbd2011/
├── public/          # Static assets
├── src/
│   ├── Home.tsx         # Main Bible component
│   ├── Books.tsx        # Bible books component
│   ├── NewTestament.tsx # New Testament view
│   ├── OldTestament.tsx # Old Testament view
│   ├── TabBar.tsx       # Navigation component
│   ├── dataSource.ts    # Bible data source
│   ├── hooks.ts         # React Query hooks and data fetching
│   └── index.tsx        # Application entry point with Query Provider
└── index.html      # HTML entry point
```

## Data Fetching Hooks

### Available Hooks

- `useBook(filePath)` - Fetch individual book data
- `useNewTestament()` - Fetch all New Testament books
- `useOldTestament()` - Fetch all Old Testament books
- `usePrefetch()` - Utilities for data prefetching

### Usage Example

```typescript
function BookView({ filePath }: { filePath: string }) {
  const { data, isLoading } = useBook(filePath)
  if (isLoading) return <div>Loading...</div>
  return <div>{data.title}</div>
}
```

### Prefetching Example

```typescript
function Navigation() {
  const { prefetchTestament } = usePrefetch()
  return (
    <Link onMouseEnter={() => prefetchTestament('new-testament')} to="/new-testament">
      New Testament
    </Link>
  )
}
```

## Contributing

Feel free to open issues and pull requests for any improvements you'd like to contribute.

## License

This project is licensed under the MIT License.

## Acknowledgments

- KTBD 2011 Bible text source
- React Bootstrap for UI components
- Firebase for hosting
