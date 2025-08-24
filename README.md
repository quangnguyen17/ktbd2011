# KTBD 2011

A modern web application for reading the Vietnamese Bible translation "Kinh Thánh Bản Dịch 2011" (KTBD 2011).

Live site: [https://ktbd2011.com/](https://ktbd2011.com/)

## Features

- 📖 Complete Old and New Testament navigation
- 📱 Mobile-responsive design
- 🔍 Chapter and verse navigation
- 📚 Bootstrap-based UI components
- ⚡ Fast and efficient loading with Vite

## Technology Stack

- React 18
- TypeScript
- Vite
- React Bootstrap
- React Router
- Firebase (hosting)
- Axios for data fetching

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
│   ├── hooks.ts         # Custom React hooks
│   └── index.tsx        # Application entry point
└── index.html      # HTML entry point
```

## Contributing

Feel free to open issues and pull requests for any improvements you'd like to contribute.

## License

This project is licensed under the MIT License.

## Acknowledgments

- KTBD 2011 Bible text source
- React Bootstrap for UI components
- Firebase for hosting
