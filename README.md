# dashdoc_tech_test

## Overview

This project is a web application to help users check if a delivery routes makes sense. It features a React-based frontend and a python algorithm that has been translated to js to simulate the backend. 

## Folder Structure

- **algo_py**: Contains the core algorithm implemented in Python.
- **api**: Houses the same algorithm translated into JavaScript.
- **src**: Includes all frontend files for the web application.


## Key Features

- **Unittests**: Used Unittest to test the python algorithm and Jest for the javascript version.
- **React Context**: Used to manage and share user input across multiple components seamlessly.
- **Three-Column Layout**:
    - **Column 1**: Register addresses.
    - **Column 2**: Set up deliveries.
    - **Column 3**: Enter the delivery path.
- **Pop-up Output**:
    - Displays errors if the input is invalid.
    - Shows step-by-step delivery cards if the path is correct.


## Getting Started

You can access the project using this link hosted on github pages : https://aa-nassim.github.io/dashdoc_tech_test/ 
Follow these steps to set up and run the project locally:

1. **Clone the repository**:

```bash
git clone https://github.com/AA-Nassim/dashdoc_tech_test
cd dashdoc_tech_test
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
