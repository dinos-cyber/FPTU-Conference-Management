## Authentication

If the API requires authentication, your colleague should include the JWT token in the Authorization header of the request. The token can be obtained by logging in using the /login endpoint. Once the user is authenticated, the server will return a JWT token that can be used to access protected endpoints.

For example, to retrieve a list of users, your colleague can send a GET request to the /users endpoint. If the API requires authentication, your colleague should include the JWT token in the Authorization header of the request as follows:

```
fetch('/users', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```
store token in localstorage:

localStorage is a global variable. You can use it in your react code just like
```
localStorage.setItem('itemName', value)
localStorage.getItem('itemName')
```

```
# API Documentation

## Public Routes

### Activate Account
- Endpoint: `GET /activate/:token`
- Description: Activates a user account using the provided token.

### Register
- Endpoint: `POST /register`
- Description: Registers a new user account.

### Login
- Endpoint: `POST /login`
- Description: Authenticates a user and returns an access token.

## User Routes (Requires Authentication)

### Create Paper
- Endpoint: `POST /paper`
- Description: Creates a new paper.

### Upload File
- Endpoint: `POST /upload/:path`
- Description: Uploads a file to the specified path.

### Download File
- Endpoint: `GET /download/:path`
- Description: Downloads a file from the specified path.

### Get Paper
- Endpoint: `GET /papers/:id`
- Description: Retrieves a paper by its ID.

### Update Paper
- Endpoint: `PUT /papers/:id`
- Description: Updates a paper by its ID.

### Get All User Papers
- Endpoint: `GET /allpaper`
- Description: Retrieves all papers for the authenticated user.

### Delete Paper
- Endpoint: `DELETE /papers/:id`
- Description: Deletes a paper by its ID.

### Get User Profile
- Endpoint: `GET /profile`
- Description: Retrieves the authenticated user's profile.

### Update User Profile
- Endpoint: `POST /profile`
- Description: Updates the authenticated user's profile.

### Delete User Account
- Endpoint: `DELETE /account`
- Description: Deletes the authenticated user's account.

## Admin Routes (Requires Admin Authentication)

### Get All Users
- Endpoint: `GET /users`
- Description: Retrieves all users.

### Create User
- Endpoint: `POST /users`
- Description: Creates a new user.

### Update User Profile
- Endpoint: `PUT /users/:id`
- Description: Updates a user's profile by their ID.

### Delete User Account
- Endpoint: `DELETE /users/:id`
- Description: Deletes a user's account by their ID.

### Get All Papers
- Endpoint: `GET /papers`
- Description: Retrieves all papers.

### Set Admin
- Endpoint: `PUT /users/:id/admin`
- Description: Grants admin privileges to a user by their ID.

### Remove Admin
- Endpoint: `DELETE /users/:id/admin`
- Description: Revokes admin privileges from a user by their ID.
```