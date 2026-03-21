# Stellix Experience Center

## Prerequisites

Before you begin, ensure you have the following installed:

- [Volta](https://volta.sh/) - A hassle-free tool manager for JavaScript.
- [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime.

This project uses Volta to manage tool versions. Once Volta is installed, it will automatically use the correct versions
of Node and Bun as specified in `package.json`.

## Setup Instructions

1. **Install dependencies:**
   We use `bun` as the package manager.
    ```bash
    bun install
    ```

## Development

To run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `bun dev`: Runs the development server.
- `bun build`: Builds the application for production.
- `bun start`: Starts the production server.
- `bun test`: Runs the test suite.
