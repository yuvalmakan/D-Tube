# Explaination of my D-Tube project
## Overall System Architechture

### 1. High Level Tech Stack

+ **Frontend:** Used React for core components and Next.js for page routing.
+ **Backend:** Used Node.js with express to handle API requests
+ **Database:** MongoDB for storing video data, user data, comments and likes

### 2. Communication of Componenets

**REST API:** The frontend communicates with the backend using RESTful APIs

### 3. Media Storage

The videos are currently being stored in the server's local file system itself

## Database Schema 

### 1. Tables

- **Users:** I use this to store the username, email, password, profilePicture (not required), list of subscribers, list of roles (user or admin), then the password reset token as well as the expiration token
- **Videos:** Here i store the title, description, uploaderId, videoUrl, views, thumbnailUrl, like count
- **Comments:** videoId, userId, text
- **Likes:** userId and videoId

### 2. Attributes and Data Types

* **Users:** username, email, password, profilePicture, and passwordResetToken are just strings. subscribers and roles are arrays of strings. passwordResetTokenExpiration is set as a date.
* **Videos:** title, description, videoUrl, and thumbnailUrl are strings. uploaderId is an objectId. views and likeCount are just numbers.
* **Comments:** videoId and userId are objectIds, and the text field is a string.
* **Likes:** userId and videoId are both objectIds.
* **Note:** I also enabled timestamps for all of them so they automatically track when things are created or updated.

### 3. Relationships

- **Users:** the subscribers array refers to other User accounts.
- **Videos:** uploaderId links the video to a specific User.
- **Comments:** videoId ties the comment to a Video, and userId ties it back to the User.  
- **Likes:** userId points to a User, and videoId points to the Video they liked.

## Authentication Flow

- **Sign up:** The frontend checks if the passwords match, then sends the data to the backend. I use bcrypt to hash the password and just save the user in the database.
- **Login:** The frontend sends the email and password. The backend finds the account by email and checks if the password matches the hash.
- **Tokens:** If everything matches, I create a JWT token on the backend and send it back.
- **Staying logged in:** The frontend saves the token in local storage as "dtube_token". When the user tries to do something restricted (like deleting a channel), it sends the token in the auth header. My backend middleware checks if the token is valid before letting it through.
- **Password Reset:** If they forget their password, I make a random token, save a hashed version of it that expires in 15 minutes, and email them a reset link. Once they type a new password, I verify the token and update the database.

## Local Setup Instructions

1. **Clone the repository:** `git clone <your-repo-url-here>`

2. **Install dependencies:** You will need to do this for both the frontend and backend. Open a terminal in each folder and run: `npm install`

3. **Environment Variables:** Create a `.env` file in the backend folder. You can look at the `.env.example` file to see what's needed. Make sure to add your MongoDB connection string and set the JWT secret to `KEY`.

4. **Start the backend server:** In your backend terminal, run: `node index.js`

5. **Start the frontend server:** In your frontend terminal, run: `npm run dev`
