# React Native Development Style Guide

## Overview

This document outlines the coding standards, best practices, and guidelines for our React Native project. Adhering to these principles ensures code quality, consistency, and maintainability.

## 1. Image Usage

- Use `png@4x` resolution images for all assets
- Compress images using tools like [TinyPNG](https://tinypng.com/), or similar tools to reduce file size while maintaining quality.

## 2. Naming Conventions

### React Components

- **Use Upper Camel Case (PascalCase)**
  - ✅ `HomeScreen.js`, `ProfileScreen.js`
  - ❌ `home_screen.js`, `profile-screen.js`

### Other Files

- **Use Lower Camel Case**
  - ✅ `userProfileHook.js`, `authService.js`
  - ❌ `UserProfileHook.js`, `Auth_Service.js`

## 3. Code Organization

- Sort functions, constants, methods, and variables **alphabetically**
- Improves readability and makes code easier to navigate

**Good Example:**

```javascript
const getData = () => {
  /* ... */
};
const handleInputChange = () => {
  /* ... */
};
const logOut = () => {
  /* ... */
};
```

## 4. Component Structure

### Functional Components

- Always use functional components
- Prefer arrow function syntax

```javascript
const WelcomeScreen = () => {
  return (
    <View>
      <Text>Welcome!</Text>
    </View>
  );
};
```

### Hook Placement

- Place `useEffect` just before the `return` statement for better readability and separation of concerns.

## 5. Component Library

- **Primary Library:** [React Native Paper](https://reactnativepaper.com/)
- Customize components to align with project design guidelines
- **Avoid creating custom components** unless absolutely necessary to maintain consistency and reduce development effort.

## 6. Project Structure

```
src/
├── assets/
│   ├── icons/
├── components/
│   ├── Button.js
│   ├── Header.js
├── screens/
│   ├── HomeScreen.js
│   ├── LoginScreen.js
├── hooks/
│   ├── useAuth.js
├── styles/
│   ├── theme.js
├── utils/
│   ├── constants.js
├── Router.js
```

## 7. Styling

- Use `StyleSheet.create()` for defining styles
- Use meaningful style names

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
```

## 8. Best Practices

- Avoid inline styles
- Use Prettier and ESLint for consistent formatting
- Create reusable components
- Define constants for repeated values

### Constant Example

```javascript
const SPACING = 16;

const styles = StyleSheet.create({
  container: {
    margin: SPACING,
  },
});
```

## Expo-Specific Guidelines

- Use Expo modules wherever applicable
- Test on both iOS and Android simulators/devices
- Keep Expo dependencies up-to-date

## Tools and Recommendations

- **Code Formatting:** [Prettier](https://prettier.io/)
- **Linting:** [ESLint](https://eslint.org/)
- **Component Library:** [React Native Paper](https://reactnativepaper.com/)
- **Image Compression:** [TinyPNG](https://tinypng.com/)

## Contributing

Please follow these guidelines when contributing to the project. Any pull requests should adhere to the standards outlined in this document.

## Questions

If you have any questions about these guidelines, please reach out to the project lead.