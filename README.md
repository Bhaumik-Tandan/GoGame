# The Go Game: Full Stack Test Assignment

## Project Overview

This project is a to-do application built with React Native and Expo. It demonstrates best practices in web development using Expo for browser compatibility, state management, and API integration. This project is designed to showcase cross-platform capabilities while focusing primarily on web deployment.

## Features

- Create, edit, and delete to-do items
- Mark to-do items as complete or incomplete
- View all to-do items in a clean and responsive UI
- Simple authentication using local storage
- Support for multiple users with concurrent sessions
- Browser compatibility via Expo for Web

## Technical Stack

- **Frontend**: React Native with TypeScript and Expo
- **State Management**: Zustand
- **Navigation**: React Navigation
- **API Requests**: Axios
- **Storage**: AsyncStorage for web data persistence
- **Environment Variables**: `.env` file for API configuration

## Setup Instructions

### Prerequisites

- **Node.js**: Version 14 or later  
- **Yarn**: Version 1.22 or later  
- **Expo CLI**: Installed globally using `npm install -g expo-cli`

### Environment Variables

The project uses an `.env` file to manage environment-specific configurations. The file should include the following variable:  

```plaintext
API_URL=https://go-game-backend.vercel.app/
```

Ensure this file is located at the root of your project directory.

### Setting up the Development Environment

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Bhaumik-Tandan/GoGame
   cd GoGame
   ```

2. **Install Dependencies**  
   Install project dependencies using Yarn:  
   ```bash
   yarn
   ```

3. **Start the Development Server**  
   Start the server:
   ```bash
   yarn start
   ```
   - To start in the web browser, press `w` in the terminal.
   - To load on a mobile device, scan the QR code displayed in the terminal using the **Expo Go** app (available on the App Store and Google Play).

## Development Notes

- **Cross-Platform Testing**: Although the app is optimized for web, you can also test it on mobile devices (iOS and Android) by using the QR code provided by Expo. Ensure that the Expo Go app is installed on your device.
- **Zustand for State Management**: This lightweight state management library simplifies handling the application state. Review the `/store` directory for details on implementation.
- **AsyncStorage for Web**: For browser compatibility, AsyncStorage uses IndexedDB under the hood to persist data.