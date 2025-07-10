# dashdoc_tech_test

## Overview

This project is a web application designed to help users manage delivery routes efficiently. It features a modular architecture with both backend algorithms and a modern React-based frontend. The application allows users to register addresses, set up deliveries, and verify delivery paths with instant feedback.

## Folder Structure

- **algo_py**: Contains the core algorithm implemented in Python.
- **api**: Houses the same algorithm translated into JavaScript for backend/API use.
- **src**: Includes all frontend files for the web application.


## Key Features

- **React Context**: Used to manage and share user input across multiple components seamlessly.
- **Three-Column Main Page**:
    - **Column 1**: Register addresses.
    - **Column 2**: Set up deliveries.
    - **Column 3**: Enter the delivery path.
- **Header**: Provides access to run the delivery path checker.
- **Pop-up Output**:
    - Displays errors if the input is invalid.
    - Shows step-by-step delivery cards if the path is correct.


## Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the repository**:

```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the development server**:

```bash
npm run dev
```


## Usage

- Register all necessary addresses in the first column.
- Set up deliveries in the second column.
- Enter the desired delivery path in the third column.
- Use the header button to run the checker.
- Review the pop-up for errors or for step-by-step delivery instructions.