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

**Endpoint**: `/register`
**Method**: `POST`
**Purpose**: Register a new user

**Request Body**:

| Field       | Type   | Description               | Required |
|-------------|--------|---------------------------|----------|
| first_name  | String | User's first name         | Yes      |
| last_name   | String | User's last name          | Yes      |
| email       | String | User's email address      | Yes      |
| password    | String | User's password           | Yes      |

**Response**:

- **Status Code**: `201`
  - **Description**: Registration successful
  - **Content**:
    ```
    {
      "message": "Registration successful"
    }
    ```

- **Status Code**: `400`
  - **Description**: Email already exists or registration failed
  - **Content**:
    ```
    {
      "message": "Email already exists" OR "Registration fail!"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```

### Login
- Endpoint: `POST /login`
- Description: Authenticates a user with their email and password.

**Request Body**:

| Field    | Type   | Description        | Required |
|----------|--------|--------------------|----------|
| email    | String | User's email       | Yes      |
| password | String | User's password    | Yes      |

**Response**:

- **Status Code**: `200`
  - **Description**: Login successful
  - **Content**:
    ```
    {
      "token": "JWT token"
    }
    ```

- **Status Code**: `400`
  - **Description**: Invalid email or password or email not verified
  - **Content**:
    ```
    {
      "message": "Invalid email or password" OR "Please verify your email first!"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```
## Authenticate routes

### Create Paper
- Endpoint: `POST /paper`
- Description: Creates a new paper with the provided information.

**Request Body**:

| Field         | Type   | Description             | Required |
|---------------|--------|-------------------------|----------|
| title         | String | Paper title             | Yes      |
| prefix        | String | Paper prefix            | Yes      |
| notes         | String | Paper notes             | Yes      |
| author_name   | String | Author name             | Yes      |
| institution   | String | Author's institution    | Yes      |
| country       | String | Author's country        | Yes      |
| author_email  | String | Author's email          | Yes      |
| phone         | String | Author's phone number   | Yes      |
| abstract      | String | Paper abstract          | Yes      |
| keywords      | String | Paper keywords          | Yes      |

**Response**:

- **Status Code**: `201`
  - **Description**: Paper created successfully
  - **Content**:
    ```
    {
      "paper": {
        "id": "paper_id",
        "title": "title",
        "prefix": "prefix",
        "notes": "notes",
        "author_name": "author_name",
        "institution": "institution",
        "country": "country",
        "author_email": "author_email",
        "phone": "phone",
        "abstract": "abstract",
        "keywords": "keywords",
        "path": "path",
        "user_id": "user_id"
      }
    }
    ```

- **Status Code**: `400`
  - **Description**: Missing required information or maximum number of papers reached
  - **Content**:
    ```
    {
      "message": "Please provide all required information" OR "You have reached the maximum number of papers allowed"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```

### Upload File (require pair with Create Paper to make sync paper path name)
- Endpoint: `POST /upload/:path`
- Description: Upload a paper file in .docx or .pdf format.

**Request Body**:

| Field       | Type   | Description               | Required |
|-------------|--------|---------------------------|----------|
| paper       | File   | Paper file in .docx or .pdf format | Yes      |

**Response**:

- **Status Code**: `201`
  - **Description**: File upload successful
  - **Content**:
    ```
    {
      "paper": "Updated paper object"
    }
    ```

- **Status Code**: `400`
  - **Description**: No file uploaded or incorrect file format
  - **Content**:
    ```
    {
      "message": "No file upload found!" OR "Error: Only .docx or .pdf files are allowed"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```

### Download Paper
- Endpoint: `GET /download/:path`
- Description: Downloads a paper file using the provided path.

**Endpoint**: `/download/:path`
**Method**: `GET`
**Purpose**: Download a paper file

**Path Parameters**:

| Parameter | Type   | Description               | Required |
|-----------|--------|---------------------------|----------|
| path      | String | Path of the paper file    | Yes      |

**Response**:

- **Status Code**: `200`
  - **Description**: Paper file downloaded successfully
  - **Content**: The paper file

- **Status Code**: `400`
  - **Description**: No paper found
  - **Content**:
    ```
    {
      "message": "No paper found!"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```

### Update Paper
- Endpoint: `POST /updatepaper/:id`
- Description: Updates a paper using the provided ID and request body.

**Endpoint**: `/updatepaper/:id`
**Method**: `POST`
**Purpose**: Update a paper

**Path Parameters**:

| Parameter | Type   | Description               | Required |
|-----------|--------|---------------------------|----------|
| id        | String | ID of the paper           | Yes      |

**Request Body**:

| Field         | Type   | Description                       | Required |
|---------------|--------|-----------------------------------|----------|
| title         | String | Paper's title                     | Yes      |
| prefix        | String | Paper's prefix                    | Yes      |
| notes         | String | Paper's notes                     | Yes      |
| author_name   | String | Paper's author name               | Yes      |
| institution   | String | Author's institution              | Yes      |
| country       | String | Author's country                  | Yes      |
| author_email  | String | Author's email                    | Yes      |
| phone         | String | Author's phone                    | Yes      |
| abstract      | String | Paper's abstract                  | Yes      |
| keywords      | String | Paper's keywords                  | Yes      |

**Response**:

- **Status Code**: `200`
  - **Description**: Paper updated successfully
  - **Content**:
    ```
    {
      "message": "Paper updated successfully"
    }
    ```

- **Status Code**: `404`
  - **Description**: Paper not found
  - **Content**:
    ```
    {
      "message": "Paper not found"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```




### Delete Paper
- Endpoint: `DELETE /papers/:id`
- Description: Deletes a paper by its ID.

## Admin Routes (Requires Admin Authentication)

### Create User
- Endpoint: `/newuser`
- Method: `POST`
- Description: Create a new user.

**Request Body**:

| Field        | Type    | Description                                | Required |
|--------------|---------|--------------------------------------------|----------|
| first_name   | String  | User's first name                          | Yes      |
| last_name    | String  | User's last name                           | Yes      |
| email        | String  | User's email address                       | Yes      |
| password     | String  | User's password                            | Yes      |
| is_admin     | Boolean | Whether the user is an admin or not        | No       |
| is_organizer | Boolean | Whether the user is an organizer or not    | No       |
| country      | String  | Country                                    | Yes      |
| address      | String  | Address                                    | Yes      |
| phone        | String  | Phone                                      | Yes      |

**Response**:

- **Status Code**: `201`
  - **Description**: User created successfully
  - **Content**:
    ```
    {
      "message": "User created successfully",
      "user": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "is_admin": false,
        "is_organizer": true,
        ...,
        "createdAt": "2023-03-27T00:00:00.000Z",
        "updatedAt": "2023-03-27T00:00:00.000Z"
      }
    }
    ```

- **Status Code**: `400`
  - **Description**: Email already exists
  - **Content**:
    ```
    {
      "message": "Email already exists"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```

### Update User Profile
- Endpoint: `/profile/`
- Method: `POST`
- Description: Update the profile of the authenticated user.

**Request Body**:

| Field       | Type   | Description                     | Required |
|-------------|--------|---------------------------------|----------|
| first_name  | String | User's first name               | No       |
| last_name   | String | User's last name                | No       |
| email       | String | User's email address            | No       |
| password    | String | User's password                 | No       |

**Response**:

- **Status Code**: `200`
  - **Description**: Profile updated successfully
  - **Content**:
    ```
    {
      "message": "Profile updated successfully"
    }
    ```

- **Status Code**: `401`
  - **Description**: Unauthorized access
  - **Content**:
    ```
    {
      "message": "Unauthorized access"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```





### Set Admin Authentication
- Endpoint: `PUT /admin/:id`
- Description: Grants admin permission to a user with the specified ID.

**Response**:
- **Status Code**: `200`
- **Description**: Admin permission granted successfully
- **Content**:
```
{
  "message": "Admin permission granted successfully"
}
```
- **Status Code**: `404`
- **Description**: User not found
- **Content**:
```
{
  "message": "User not found"
}
```
- **Status Code**: `500`
- **Description**: Internal server error
- **Content**:
```
{
  "message": "Internal server error"
}
```

### Remove Admin Authentication
- Endpoint: `PUT /admin/remove/:id`
- Description: Removes admin permission from a user with the specified ID.

**Response**:
- **Status Code**: `200`
- **Description**: Admin permission removed successfully
- **Content**:
```
{
  "message": "Admin permission removed successfully"
}
```
- **Status Code**: `404`
- **Description**: User not found
- **Content**:
```
{
  "message": "User not found"
}
```
- **Status Code**: `500`
- **Description**: Internal server error
- **Content**:
```
{
  "message": "Internal server error"
}
```
### Get All Papers
- Endpoint: `GET /allpaper`
- Description: Retrieve all papers for a user.

**Endpoint**: `/allpaper`
**Method**: `GET`
**Purpose**: Get all papers for a user

**Response**:

- **Status Code**: `200`
  - **Description**: Papers found
  - **Content**:
    ```
    {
      "papers": [Array of Paper objects]
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```
    ### Get Paper
- Endpoint: `GET /paper/:id`
- Description: Retrieves a paper using the provided ID.

**Endpoint**: `/paper/:id`
**Method**: `GET`
**Purpose**: Get a paper

**Path Parameters**:

| Parameter | Type   | Description               | Required |
|-----------|--------|---------------------------|----------|
| id        | String | ID of the paper           | Yes      |

**Response**:

- **Status Code**: `200`
  - **Description**: Paper retrieved successfully
  - **Content**:
    ```
    {
      "paper": { ...paperObject }
    }
    ```

- **Status Code**: `404`
  - **Description**: Paper not found
  - **Content**:
    ```
    {
      "message": "Paper not found"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```



### Delete Paper
- Endpoint: `DELETE /paper/:id`
- Description: Delete a paper by its ID.

**Endpoint**: `/paper/:id`
**Method**: `DELETE`
**Purpose**: Delete a paper by ID

**Response**:

- **Status Code**: `200`
  - **Description**: Paper deleted successfully
  - **Content**:
    ```
    {
      "message": "Paper deleted successfully"
    }
    ```

- **Status Code**: `404`
  - **Description**: Paper not found
  - **Content**:
    ```
    {
      "message": "Paper not found"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```
    ### Delete User Account
- Endpoint: `/users/:id`
- Method: `DELETE`
- Description: Deletes the account of the specified user.

**Path Parameters**:

| Parameter | Type   | Description                          | Required |
|-----------|--------|--------------------------------------|----------|
| user_id   | Number | ID of the user to be deleted          | Yes      |

**Response**:

- **Status Code**: `200`
  - **Description**: Account deleted successfully
  - **Content**:
    ```
    {
      "message": "Account deleted successfully"
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```
### Get All Users
- Endpoint: `/users`
- Method: `GET`
- Description: Get all registered users.

**Response**:

- **Status Code**: `200`
  - **Description**: All users retrieved successfully.
  - **Content**:
    ```
    {
      "users": [ { "first_name": "John", "last_name": "Doe", "email": "johndoe@example.com" }, { "first_name": "Jane", "last_name": "Doe", "email": "janedoe@example.com" } ]
    }
    ```

- **Status Code**: `500`
  - **Description**: Internal server error
  - **Content**:
    ```
    {
      "message": "Internal server error"
    }
    ```

```