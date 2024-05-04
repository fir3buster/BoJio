
<div style="display: flex; justify-content: center; align-items: center; margin: -30px 0;">
    <img src="./assets/td.png" alt="logo" width="500">
</div>

## Background

`Bojio`, the sports app designed to help you connect with others who share your passion for sports and staying active. With `Bojio`, you can easily join or organize games online, set up teams, choose locations, and communicate with other players. It's the perfect platform for building a community of like-minded athletes and discovering new sports activities in your area. Whether you're a seasoned player or just starting out, `Bojio` makes it easy to find your next game and meet new friends.

## ScreenShot
<div>
    <h3>Landing Page </h3>
    <div style="display: flex; align-items: center;">
        <div style="margin-right: 20px; text-align: center;">
            <img src="./assets/login.png" alt="login" width="450" height="300">
            <p>Login Page</p>
        </div>
        <div style="text-align: center;">
            <img src="./assets/register.png" alt="registration" width="450" height="300">
            <p>Registration Page</p>
        </div>
    </div>
    <h3>Home Page </h3>
    <div style="display: flex; align-items: center;">
        <div style="margin-right: 20px; text-align: center;">
            <img src="./assets/home.png" alt="homepage" width="450" height= "300"> 
            <p>home page</p>
        </div>
        <div style="text-align: center;">
            <img src="./assets/gameview.png" alt="viewing a public game" width="450" height= "300">
            <p>public game view</p>
        </div>
    </div>
    <div style="display: flex; align-items: center;">
        <div style="margin-right: 20px; text-align: center;">
            <img src="./assets/gameviewleave.png" alt="leave a game" width="450" height= "300">
            <p>leaving a game view</p>
        </div>
        <div style="text-align: center;">
            <img src="./assets/profileview.png" alt="viewing a public profile" width="450" height= "300">
            <p>public profile view</p>
        </div>
    </div>
    <h3>Schedule </h3>
    <div style="display: flex; align-items: center;">
        <div style="margin-right: 20px; text-align: center;">
            <img src="./assets/scheduleupcoming.png" alt="viewing upcoming activities" width="450" height= "300"> 
            <p>viewing upcoming activities of the user tab</p>
        </div>
        <div style="text-align: center;">
            <img src="./assets/schedulehistory.png" alt="viewing past activities" width="450" height= "300">
            <p>viewing past activities of the user tab</p>
        </div>
    </div>
    <div style="display: flex; align-items: center;">
        <div style="margin-right: 20px; text-align: center;">
            <img src="./assets/organisegame.png" alt="organise a game" width="450" height= "300">
            <p>organise a game view</p>
        </div>
        <div style="margin-right: 20px; text-align: center;">
            <img src="./assets/hostgame.png" alt="game view as a host" width="450" height= "300"> 
            <p>game view as a host</p>
        </div>
    </div>
    <div style="display: flex; align-items: center;">
        <div style="text-align: center;">
            <img src="./assets/updategame.png" alt="updating a game" width="450" height= "300">
            <p>update game view</p>
        </div>
        <div style="text-align: center;">
        </div>
    </div>
    <h3>Profile</h3>
    <div style="display: flex; align-items: center;">
        <div style="margin-right: 20px; text-align: center;">
            <img src="./assets/userprofile.png" alt="profile page" width="450" height= "300">
            <p>profile page</p>
        </div>
        <div style="text-align: center;">
            <img src="./assets/updateprofile.png" alt="updating user profile" width="450" height= "300">
            <p>user update profile view</p>
        </div>
    </div>
    <h3>Admin Control</h3>
    <div style="display: flex; align-items: center;">
        <div style="margin-right: 20px; text-align: center;">
            <img src="./assets/control.png" alt="admin page" width="450" height= "300">
            <p>admin control page</p>
        </div>
        <div style="text-align: center;">
            <img src="./assets/adminupdate.png" alt="updating user profile" width="450" height= "300">
            <p>update user profile by admin view</p>
        </div>
    </div>
</div>

## Technologies Used

<div>
    <img src="./assets/javascript.png" alt="JavaScript">
    <img src="./assets/react.png" alt="React" width="50" height="50">
    <img src="./assets/css.png" alt="CSS">
    <img src="./assets/html.png" alt="HTML">
    <img src="./assets/postgressql.png" alt="postgressql" width="50" height="50">
</div>

## Getting Started

The public board can be accessed [_here_](https://junxiulow.atlassian.net/jira/software/projects/BOJ/boards/6)

Below is the screenshots of the public board.

<div>
    <img src="./assets/kanban.png" alt="pb1">
    <p>public board page</p>
</div>

Wireframe design can be accessed [_here_](https://www.figma.com/file/syEc8c513J9uS0Ya5aaBvL/BoJio?type=design&node-id=0%3A1&mode=design&t=VjmfMfFrmafBNjhS-1)

<div>
    <img src="./assets/figma.png" alt="pb1">
    <p>wireframe</p>
</div>

ERD can be accessed [_here_](https://lucid.app/lucidchart/91923a2b-0300-45e3-9343-b6acb565333b/edit?viewport_loc=-3987%2C-898%2C6310%2C2932%2C0_0&invitationId=inv_b9127aef-2f1a-4c43-94f7-3c822d5274bd)

<div>
    <img src="./assets/ERD.png" alt="pb1">
    <p>ERD</p>
</div>

SQL schema scripts (https://github.com/fir3buster/BoJio/blob/develop/BackEnd/src/scripts/pgAdmin.sql)

## Application Design

### FrontEnd

The `Home` component is a central hub that displays two carousels: one for sports activities and one for active users, using the "react-slick" library for sliding functionality. The component fetches data on public activities and active users through asynchronous functions that use a custom useFetch hook, passing along a user context token for authorization. Upon mounting, the component fetches and sets the data for activities and users, which are then mapped to respective cards (`ActivitiesActionAreaCard` and `UsersActionAreaCard`). These cards contain various properties, like title, date, location, and user profile information. When a card is clicked, it triggers navigation to detailed pages.

The `Schedule` component is designed to manage and display a user's sports activities with tabs to toggle between upcoming and past activities. The component fetches data on upcoming and past activities, displaying them in card format using `ActivitiesActionAreaCard`. Users can create new activities and edit existing activities via a modal form, specifying details like date, time, location, title, and more.

The `Profile` component is designed to display and update a user's personal information and sport-related data. The component starts by displaying the user's profile, including their name, location, gender, bio, email, and avatar, along with a sport card that shows their skill rate in sports like tennis. If the user chooses to update their profile, a form appears, allowing them to modify personal details and sport card information. 

The `Control` component displays a list of users and provides administrative controls for updating and deleting users from a system. Upon fetching the list of users, it displays their email, first name, and last name in a styled list. Each user entry includes buttons for updating and deleting, which, when clicked, trigger the respective modal. The `DeleteUserModal` and `UpdateUserModal` components are used to handle user updates and deletions, with a callback to refresh the user list upon success.

### BackEnd
The `authentication` system manages user authentication and authorization for a web application. It uses bcrypt to hash passwords and jwt to generate JSON Web Tokens. The system provides endpoints for user registration, login, token refresh, and retrieving user data. The register endpoint checks for duplicate emails and creates new user profiles, while the login endpoint validates users, generating access and refresh tokens upon successful login. The refresh endpoint issues new access tokens to maintain authentication, and getAllUsers allows administrators to fetch all active users. Overall, this system securely handles user registration, authentication, and token-based authorization.

The `userProfile` system manages user profiles, followers, sports cards, and admin tasks . It includes methods to retrieve and update user profiles, manage followers, and manipulate sports cards. The `getAllActiveUsers` function retrieves all active users, while `getUserById` fetches a user profile by ID. The `updateUserProfile` method allows updating user information based on provided fields. Sports cards can be retrieved, created, and updated with corresponding functions. The `manageUserAccountById` function manages user account activation or deactivation. The codebase uses transaction-based operations and comprehensive error handling for data reliability and consistency.

The `activity` system manages sports activities and player participation. The key functions include `getAllPublicActivities`, which retrieves public activities not yet joined by the active user, and `getUpcomingActivitiesByUserId` and `getPastActivitiesByUserId`, which fetch upcoming and past activities for a specific user. The `getActivityById` function returns detailed information about an activity, including participating players, while `addActivity` creates a new activity with user-provided details. Functions like `updateActivityById` and `deleteActivityById` allow for modifying and deleting activities, respectively. For player management, `addPlayer` adds a player to an activity, `updatePlayerStatusById` updates their status (e.g., joining or leaving), and `deletePlayerById` removes a player from an activity. 

## Takeaways

### 1. using SQL query over ORM on backend controller:

-   Fine-Grained Control: Direct SQL allows for more precise control over database operations, enabling performance optimization and customized query structuring.
-   Complex Queries: Writing complex SQL queries with multiple joins or nested subqueries is generally more straightforward with direct SQL than with ORM frameworks.
-   Database Understanding: Direct SQL requires deeper knowledge of the specific database, facilitating a clearer understanding of database structure and relationships.
-   Performance Optimization: Direct SQL can be optimized for resource efficiency and speed, which may be challenging with ORMs due to abstraction overhead.

### 2. Using Material-UI(MUI) over Plain CSS

-   Component-Based Design: MUI provides pre-built components, streamlining development and ensuring consistent Material Design patterns.

-   Theming and Customization: MUI offers a robust theming system, allowing easy customization of colors, typography, and other design elements, promoting a cohesive look across the application.

- Cross-Browser Consistency: MUI components are designed for cross-browser compatibility, reducing styling issues and eliminating the need for browser-specific CSS adjustments.


## Next Steps

### Icebox items:

-   `Feed` - A feed feature could be added to the sports-related application, allowing users to interact by posting about their activities, sharing updates, and discussing sports-related topics. This feed would serve as a social hub where users can share their sports achievements, upcoming events, and training routines. It would enable other users to like, comment, and share posts, creating a sense of community and fostering engagement. This feature could strengthen user connections and encourage collaboration, making the platform more interactive and socially engaging.

-   `real-time geolocation` - Getting real-time geolocation from a third-party API would involve integrating live location tracking into an application to show current user locations or other points of interest on a map. This feature could be used to enhance enhance user interaction and provide valuable location-based functionality in the application.

## Reference
1) Material-UI documentation [https://mui.com/material-ui/getting-started/]
2) PostgreSQL documentation [https://www.postgresql.org/docs/16/index.html]