.PHONY: all install dev build start lint clean help

# Default target
all: install build

# Help target
help:
	@echo "HintLoop Makefile commands:"
	@echo "  make install - Install npm dependencies"
	@echo "  make dev     - Run development server"
	@echo "  make build   - Build Next.js production bundle"
	@echo "  make start   - Start Next.js production server"
	@echo "  make lint    - Run ESLint checks"
	@echo "  make clean   - Remove build artifacts (.next)"

# Install dependencies
install:
	npm install

# Run development server
dev:
	npm run dev

# Build production application
build:
	npm run build

# Start production server
start:
	npm run start

# Run linter
lint:
	npm run lint

# Clean build directory
clean:
	rm -rf .next
