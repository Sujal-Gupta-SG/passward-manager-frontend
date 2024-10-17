# PassOp - Password Manager Frontend

This is the frontend of **PassOp**, a secure password manager application. The frontend is built using **React** and interacts with the backend to manage encrypted passwords, ensuring a smooth and secure user experience.

## Features

- **User-Friendly UI**: A simple and clean interface to manage passwords securely.
- **Password Management**: Allows users to create, retrieve, and delete passwords.
- **Responsive Design**: Fully responsive interface for mobile, tablet, and desktop users.
- **API Integration**: Interacts with the backend for storing and retrieving encrypted passwords.
- **Encryption Awareness**: The frontend works with encrypted data to ensure that sensitive information is protected during transit.

## Technologies Used

- **React.js**: JavaScript library for building the user interface.
- **Axios**: For making HTTP requests to the backend API.
- **React Router**: For handling navigation between different pages.
- **CSS/Styled Components**: For styling the UI components.
- **dotenv**: For managing environment variables.


## Installation and Setup

### Prerequisites

- **Node.js** and **npm** installed.
- The **PassOp backend** should be running on a server or locally.

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Sujal-Gupta-SG/passward-manager-frontend.git
    cd passop-frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**: Create a `.env` file in the root directory with the following variables:
    ```bash
    REACT_APP_API_URL=http://localhost:5000
    ```

4. **Run the frontend**:
    ```bash
    npm start
    ```
    The app will run locally at `http://localhost:3000`.

## Pages and Components

### Home Page

The landing page where users are introduced to PassOp. It provides an overview of the app's features and navigation to the password manager.

### Dashboard

The main interface for managing passwords:
- **Add Password**: Form to add new password entries.
- **View Passwords**: Displays a list of saved passwords with options to view, copy, and delete.
- **Search**: Allows users to search through their saved passwords by site or username.

### Components

- **PasswordForm**: A reusable form for adding or updating passwords.
- **PasswordList**: Displays the list of passwords fetched from the backend.
- **Modal**: Custom modals for confirming actions such as deleting a password.

## API Integration

The frontend interacts with the backend using **Axios** to perform CRUD operations.

### Example API Calls

1. **Fetching Passwords**
    ```javascript
    axios.get(`${process.env.REACT_APP_API_URL}/?s=displayName&e=email`)
        .then(response => {
            // Handle response
        })
        .catch(error => {
            // Handle error
        });
    ```

2. **Adding a Password**
    ```javascript
    axios.post(`${process.env.REACT_APP_API_URL}/save`, {
        form: {
            site: "example.com",
            username: "user",
            password: "password123"
        },
        user: {
            displayName: "User Name",
            email: "user@example.com"
        }
    })
    .then(response => {
        // Handle success
    })
    .catch(error => {
        // Handle error
    });
    ```

3. **Deleting a Password**
    ```javascript
    axios.delete(`${process.env.REACT_APP_API_URL}/delete/${id}`)
    .then(response => {
        // Handle success
    })
    .catch(error => {
        // Handle error
    });
    ```

## Security Considerations

- **HTTPS**: Ensure that the frontend communicates with the backend over HTTPS in production to secure data in transit.
- **CORS**: The backend is configured to allow only specific origins, ensuring that only trusted frontends can access the API.
- **Data Encryption**: The frontend handles encrypted passwords, ensuring sensitive data is never exposed in plain text.

## Future Enhancements

- **User Authentication**: Add login and registration functionality for secure access.
- **Password Generator**: A built-in feature to generate strong, random passwords.
- **Password Strength Indicator**: Show the strength of the password as it's being entered.

## License

This project is licensed under the MIT License. Feel free to use and modify the frontend as needed.

