# Project Requirements

## Project Name

Cookbook Connect

## Team Member Names

- Bryan Pikaard
- Tyler Nelson
- John Jones

## Abstract

&nbsp;&nbsp;&nbsp;&nbsp;Cookbook Connect is a website that will allow users to store and look up their handmade recipes. Users will either create an account or use their existing account to log in order to access tools to create and look up their recipes. There is no limit to the amount of recipes users can make.

&nbsp;&nbsp;&nbsp;&nbsp;Users will also have custom ways to store their recipes; either by type of food, or by preferred days of the week. This will allow for personalized organization as well as ensure users have a clear path to what they want to make and have for meals in case they don’t know off the top of their head. They also have the ability to share their recipes as well as look up recipes from other users by searching or looking at a recommended recipe list.


## Tools & Technologies

Location | Dependency | Type | Rationale
-- | -- | -- | --
Infrastructure | DigitalOcean Apps | Deployment | DigitalOcean Apps will watch for changes to the GitHub repository and deploy the updated platform.
Backend | NodeJS | JavaScript Runtime | Common backend language.
Backend | Next.js | Web Framework | Framework for web applications including an api.
Backend | TypeORM | Database ORM | Implement interface between backend and database.
Frontend | React | Web Library | Implement a stateful component-based UI library.
Frontend | Tailwind CSS | CSS Library | CSS library with customizable components.
Frontend | Flowbite | React Component Library | React component library to implement basic elements utilizing Tailwind.

## Requirements List

### 1. User Authentication
- 1.1. Users can log into their account on a login page
    - 1.1.1. A label for an email address
    - 1.1.2. An input box for an email address
        - 1.1.2.1. The input box will have a placeholder of me@cookbook-connect.com
        - 1.1.2.2. The input box will reject invalid email addresses
        - 1.1.2.3. If the email is rejected, a label in red text will appear below the input notifying the user the email address in invalid
    - 1.1.3. A label for a password
    - 1.1.4. An input box for a password
        - 1.1.4.1. The input box will not have a placeholder value
        - 1.1.4.2. The user input in the box will be masked
        - 1.1.4.3. An input is required
        - 1.1.4.4. If the password is modified and then cleared, a label in red text will appear below the input notifying the user that a password is required
    - 1.1.5. A <kbd>Login</kbd> button
        - 1.1.5.1. Clicking the login button will send a request to the backend with the email address and password
        - 1.1.5.2. The email address will be queried in the database to determine if the email address exists
            - 1.1.5.2.1. If the email address does not exist, the request will fail and the login form will have a label in red text informing the user that the email address or password is incorrect
        - 1.1.5.3. The password is compared to the hash in the database using a modern comparison algorithm
            - 1.1.5.3.1. If the password is incorrect, the request will fail and the login form will have a label in red text informing the user that the email address or password is incorrect
        - 1.1.5.4. If the emil address exists and password matches, a jwt will be returned
        - 1.1.5.5. The jwt will be stored in local cookies
        - 1.1.5.6. The user will be redirected to their recipe list
- 1.2. Users can create an account on a registration page
    - 1.2.1. A label for an email address
    - 1.2.2. An input box for an email address
        - 1.2.2.1. The input box will have a placeholder of me@cookbook-connect.com
        - 1.2.2.2. The input box will reject invalid email addresses
        - 1.2.2.3. If the email is rejected, a label in red text will appear below the input notifying the user the email address in invalid
    - 1.2.3. A label for a password
    - 1.2.4. An input box for a password
        - 1.2.4.1. The input box will not have a placeholder value
        - 1.2.4.2. The user input in the box will be masked
        - 1.2.4.3. Passwords must be at least 8 characters long
        - 1.2.4.4. Passwords must contain at least one special character
        - 1.2.4.5. Passwords must contain at least one uppercase letter
        - 1.2.4.6. Passwords must contain at least one lowercase letter
        - 1.2.4.7. Passwords will be validated client-side and server-side
        - 1.2.4.8. If the password is invalid, a label in red text will appear below the input notifying the user the password in invalid and list requirements
    - 1.2.5. A label for password confirmation
    - 1.2.6. An input box for password confirmation
        - 1.2.6.1. The input box will not have a placeholder value
        - 1.2.6.2. The user input in the box will be masked
        - 1.2.6.3. If the input in the confirmation box does not match input in the password box, a label in red text will appear below the input nofying the user that the passwords do not match
    - 1.2.7. A label for a display name
    - 1.2.8. An input box for a display name
        - 1.2.8.1. The display name will be how them and other users identify them on the website
        - 1.2.8.2. The display name cannot contain special characters
        - 1.2.8.3. The display name must be at least 6 characters long
    - 1.2.9. A <kbd>Register</kbd> button
        - 1.2.9.1. Clicking the register button will send a request to the backend with the email address, password, and display name
        - 1.2.9.2. The email address will be queried in the database to determine if the email address exists
            - 1.2.9.2.1. If the email address already exists, the request will fail and the registration form will have a label in red text informing the user that the email address already exists
        - 1.2.9.3. The password will be validated
            - 1.2.9.3.1. If the password is not valid, the request will fail and the registration form will have a label in red text informing the user that the password was invalid
        - 1.2.9.4. The display name will be validated
            - 1.2.9.4.1. If the display name is not valid, the request will fail and the registration form will have a label in red text informing the user that the display name was invalid
        - 1.2.9.5. A user will be created in the database
        - 1.2.9.6. A jwt will be returned
        - 1.2.9.7. The jwt will be stored in local cookies
        - 1.2.9.8. The user will be redirected to their recipe list
- 1.3. Users can request to reset their password
    - 1.3.1. On the Login page, display a <kbd>Forgot Password</kbd> link
        - 1.3.1.1. Clicking this will redirect the user to a forgot password page
            - 1.3.1.1.1. A label saying <kbd>Forgot Password</kbd>
            - 1.3.1.1.2. A label for an email address
            - 1.3.1.1.3. A <kbd>Confirm</kbd> button

### 2. Recipe Management
- 2.1 A button labeled “Add Recipe”
    - 2.1.1 On click, will display add recipe view
        - 2.1.1.1 A textfield for recipe name
        - 2.1.1.2 A choicebox labeled “Categories”
            - 2.1.1.2.1 Type of meal; breakfast, lunch, dinner, dessert, snack
        - 2.1.1.3 Tags
            - 2.1.1.3.1 A choicebox labeled “Difficulty”
                - 2.1.1.3.1.1 Users can choose between easy, medium, or advanced
            - 2.1.1.3.2 A label “Regional Origin”
                - 2.1.1.3.2.1 A textfield for regional origin
            - 2.1.1.3.3 A choicebox labeled “Seasonal”
                - 2.1.1.3.3.1 Users can choose spring, summer, fall, winter, or any.
            - 2.1.1.3.4 A label “Type of Cuisine” 
                - 2.1.1.3.4.1 A textfield to receive user input.	
        - 2.1.1.4 Add ingredients
            - 2.1.1.4.1 A field labeled “Quantity”
            - 2.1.1.4.2 A field labeled “Ingredient”
            - 2.1.1.4.3 A button labeled “Add Ingredient”
                - 2.1.1.4.3.1 On click, will allow the user to enter another ingredient
        - 2.1.1.5 Tools Needed
            - 2.1.1.5.1 A field labeled “Tool”
            - 2.1.1.5.2 A button labeled “Add Tool”
                - 2.1.1.5.2.1 On click, the user can enter another tool
        - 2.1.1.6 Instructions
            - 2.1.1.6.1 A field labeled “Time needed”
            - 2.1.1.6.2 A text area for the user to enter instructions
    - 2.2 Modify recipes
        - 2.2.1 Must be a recipe created by the user
        - 2.2.2 A button labeled “Modify Recipe”
            - 2.2.2.1 On click, will display the add recipe view, but with fields filled in.
                - 2.2.2.1.1 All fields will be editable by the user
            - 2.2.2.2 A button labeled “Save”
                - 2.2.2.2.1 Upon completion, the user will be alerted that their changes have been saved.
                - 2.2.2.2.2 If unable to save changes, the user will be alerted that an error occurred.
            - 2.2.2.3 A button labeled “Cancel”
                - 2.2.2.3.1 After clicking cancel, the view will return to the previous uneditable view.
    - 2.3 Delete recipes
        - 2.3.1 A button labeled “Delete Recipe”
            - 2.3.1.1 A pop-up will appear asking the user to confirm or cancel deleting their recipe
                - 2.3.1.1.1 After clicking confirm, a pop-up will alert the user on the transaction.
                    - 2.3.1.1.1.1 Success: recipe deleted
                    - 2.3.1.1.1.2 Error: unable to delete recipe
                - 2.3.1.1.2 Clicking cancel will close the pop-up
    - 2.4 Share recipes
        - 2.4.1 The user will have 2 options:
            - 2.4.1.1 A button labeled “Make public”
                - 2.4.1.1.1 On click, the recipe will be publicly available to other users
            - 2.4.1.2 A button labeled “Copy Link”
                - 2.4.1.2.1 Recipe will need to be public already
                - 2.4.1.2.2 The link will be copied on the user’s system
    - 2.5 Search recipes
        - 2.5.1 There will be two options to search:
            - 2.5.1.1 A button labeled “Search Saved Recipes”
                - 2.5.1.1.1 This button will allow users to search through previously saved recipes
                - 2.5.1.1.2 On click, the search view will appear
                    - 2.5.1.1.2.1 An empty textfield
                    - 2.5.1.1.2.2 A button labeled “Search”
                    - 2.5.1.1.2.3 A label that says “Category”
                    - 2.5.1.1.2.4 A choice box
                        - 2.5.1.1.2.4.1 Defaults to “Any”
                        - 2.5.1.1.2.4.2 Contains “Breakfast”, “Snack”, etc…
                    - 2.5.1.1.2.5 A Label that says “Difficulty”
                    - 2.5.1.1.2.6 A choice box 
                        - 2.5.1.1.2.6.1 Defaults to “Any”
                        - 2.5.1.1.2.6.2 Contains “Easy”, “Medium”, “Advanced”
                    - 2.5.1.1.2.7 A label that says “Regional Origin”
                    - 2.5.1.1.2.8 A choice box
                        - 2.5.1.1.2.8.1 Defaults to “Any”
                        - 2.5.1.1.2.8.2 Contains “Indian”, “Italian”, etc…
                    - 2.5.1.1.2.9 A label that says “Seasonal”
                    - 2.5.1.1.2.10 A choice box
                        - 2.5.1.1.2.10.1 Defaults to “Any”
                        - 2.5.1.1.2.10.2 Contains all seasons: “Spring”, “Fall”, etc…
                    - 2.5.1.1.2.11 A label that says “Type of Cuisine”
                    - 2.5.1.1.2.12 A choice box
                        - 2.5.1.1.2.12.1 Defaults to “Any”
                        - 2.5.1.1.2.12.2 Contains “Fast Food”, “Delicacy”, “Finger Food”, etc…
            - 2.5.1.2 A button labeled “Search Public Recipes”
                - 2.5.1.2.1 This button will allow users to search through publicly available recipes
                - 2.5.1.2.2 On click, the search view will appear
                    - 2.5.1.2.2.1 An empty textfield
                    - 2.5.1.2.2.2 A button labeled “Search”
                    - 2.5.1.2.2.3 A label that says “Category”
                    - 2.5.1.2.2.4 A choice box 
                        - 2.5.1.2.2.4.1 Defaults to “Any”
                        - 2.5.1.2.2.4.2 Contains all seasons: “Spring”, “Fall”, etc…
                    - 2.5.1.2.2.5 A Label that says “Difficulty”
                    - 2.5.1.2.2.6 A choice box
                        - 2.5.1.2.2.6.1 Defaults to “Any”
                        - 2.5.1.2.2.6.2 Contains “Easy”, “Medium”, “Advanced”
                    - 2.5.1.2.2.7 A label that says “Regional Origin”
                    - 2.5.1.2.2.8 A choice box
                        - 2.5.1.2.2.8.1 Defaults to “Any”
                        - 2.5.1.2.2.8.2 Contains “Indian”, “Italian”, etc…
                    - 2.5.1.2.2.9 A label that says “Seasonal”
                    - 2.5.1.2.2.10 A choice box
                        - 2.5.1.2.2.10.1 Defaults to “Any”
                        - 2.5.1.2.2.10.2 Contains all seasons: “Spring”, “Fall”, etc…
                    - 2.5.1.2.2.11 A label that says “Type of Cuisine”
                    - 2.5.1.2.2.12 A choice box
                        - 2.5.1.2.2.12.1 Defaults to “Any”
                        - 2.5.1.2.2.12.2 Contains “Fast Food”, “Delicacy”, “Finger Food”, etc…
    - 2.6 Save recipes
        - 2.6.1 Users can save user-made recipes as well as public recipes
        - 2.6.2  A button labeled “Save Recipe”
            - 2.6.2.2 On click, the recipe will be added to the user’s saved list, public or user-made.


### 3. Meal Planning
- 3.1. There will be a meal planning page that will allow the user to assign meals to days of the week
    - 3.1.1. A table with 7 columns
        - 3.1.1.1. Header row containing the days of the week, starting with Sunday
        - 3.1.1.2. Row containing recipes assigned to that day
        - 3.1.1.3. Assign Recipe button below recipes for the day
            - 3.1.1.3.1. Clicking Assign Recipe will open a popup of saved and created recipes to select
            - 3.1.1.3.2. Clicking a recipe will add the recipe to that day
            - 3.1.1.3.3. A day can have multiple recipes assigned
    - 3.1.2. An <kbd>Export Shopping List</kbd> button on the top right of the table
        - 3.1.2.1. Exporting the list will create a pdf shopping list of each ingredient and the amount required
    - 3.1.3. An <kbd>Export Week</kbd> button that will export all recipes, ingredients, and instructions to a pdf document
    - 3.1.4. A <kbd>Clear</kbd> button to clear the week's plans

### 4. Recipe Ratings
- 4.1 A public recipe can have multiple ratings
    - 4.1.1 The highest ratings will be featured on a recipe
    - 4.1.2 There will be a <kbd>Ratings</kbd> button next to the highest rating
    - 4.1.3 Users can rate a recipe upon clicking the <kbd>Rate</kbd> button
- 4.2 Star Ratings between zero and five stars, with increments of one star
    - 4.2.1 Clicking on the <kbd>Ratings</kbd> button will reveal the number of ratings on a per star basis
- 4.3 These ratings will include a review
    - 4.3.1 Users will the option to write a review with their rating in a text area.
    - 4.3.2 Under a posted review, users will be able to agree or disagree with a review
        4.3.2.1 A Thumbs Up icon for agree
        4.3.2.2 A Thumbs Down icon for disagree


### 5. Navigation
- 5.1 There will be a navigation bar on the top of the site
    - 5.1.1 There will be a Cookbook Connect label on the left side
    - 5.1.2 There will be a group of buttons on the right side
        - 5.1.2.1 A <kbd>Recipes</kbd> button
            - 5.1.2.2.1 This will redirect the user to a publice recipe page
        - 5.1.2.2 A <kbd>My Recipes</kbd> button
            - 5.1.2.2.1 This will redirect the user to a list of recipes they have created as well as saved
        - 5.1.2.3 A <kbd>Meal Planning</kbd> button
            - 5.1.2.3.1 This will redirect the user to a weekly meal planning page





### Updated Timeline

<table>
    <tr>
        <th>Week</th>
        <th>Responsibilities</th>
    </tr>
    <tr>
        <td align="center">
            Week 1
            <br>
            Jan 15 - Jan 19
        </td>
        <td>
            <i>No Class - Canceled (16th, 18th)</i>
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 2
            <br>
            Jan 22 - Jan 26
        </td>
        <td>
            <b>All Members:</b>
            <br>
            Project proposal
            <br>
            Project requirements
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 3
            <br>
            Jan 29 - Feb 2
        </td>
        <td>
            <b>All Members:</b>
            <br>
            Project requirements &amp; presentation
            <br><br>
            <b>Bryan:</b>
            <br>
            Create repository and invite others
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 4
            <br>
            Feb 5 - Feb 9
        </td>
        <td>
            <b>All Members:</b>
            <br>
            Project requirements presentation
            <br><br>
            <b>Bryan:</b>
            <br>
            Setup project with Next.js, React, TypeORM, and other libraries
            <br><br>
            <b>Tyler & John:</b>
            <br>
            Begin familiarizing self with language and libraries we will be using
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 5
            <br>
            Feb 12 - Feb 16
        </td>
        <td>
            <b>Bryan:</b>
            <br>
            Setup DigitalOcean and Supabase
            <br><br>
            <b>Tyler:</b>
            <br>
            Login component
            <br><br>
            <b>John:</b>
            <br>
            Navigation component
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 6
            <br>
            Feb 19 - Feb 23
        </td>
        <td>
            <b>Bryan:</b>
            <br>
            Design ERD
            <br><br>
            <b>Tyler:</b>
            <br>
            Register component
            <br><br>
            <b>John:</b>
            <br>
            Recipe component
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 7
            <br>
            Feb 26 - Mar 1
        </td>
        <td>
            <b>Bryan:</b>
            <br>
            Create TypeORM entities using ERD
            <br><br>
            <b>Tyler:</b>
            <br>
            Rating component
            <br><br>
            <b>John:</b>
            <br>
            Recipe list component
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 8
            <br>
            Mar 4 - Mar 8
        </td>
        <td>
            <i>No Class - Spring Break (5th, 7th)</i>
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 9
            <br>
            Mar 11 - Mar 15
        </td>
        <td>
            <b>Bryan:</b>
            <br>
            Server-side connections
            <br><br>
            <b>Tyler:</b>
            <br>
            Recipe search component
            <br><br>
            <b>John:</b>
            <br>
            Recipe creation component
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 10
            <br>
            Mar 18 - Mar 22
        </td>
        <td>
            <b>Bryan:</b>
            <br>
            User authentication backend
            <br>
            Server-side connections
            <br><br>
            <b>Tyler:</b>
            <br>
            Recipe saving component
            <br><br>
            <b>John:</b>
            <br>
            Recipe modification component
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 11
            <br>
            Mar 25 - Mar 29
        </td>
        <td>
            <b>Bryan:</b>
            <br>
            Server-side connections
            <br><br>
            <b>Tyler:</b>
            <br>
            Meal planning page
            <br><br>
            <b>John:</b>
            <br>
            Recipe comments component
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 12
            <br>
            Apr 1 - Apr 5
        </td>
        <td>
            <b>Bryan:</b>
            <br>
            Server-side connections
            <br><br>
            <b>Tyler:</b>
            <br>
            Export meal list to shopping list
            <br><br>
            <b>John:</b>
            <br>
            Asd
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 13
            <br>
            Apr 8 - Apr 12
        </td>
        <td>
            <b>All Members:</b>
            <br>
            Extra time to continue tasks requiring more time
            <br>
            Begin testing
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 14
            <br>
            Apr 15 - Apr 19
        </td>
        <td>
            <b>All Members:</b>
            <br>
            Test all features of the site
            <br>
            Correct any issues
        </td>
    </tr>
    <tr>
        <td align="center">
            Week 15
            <br>
            Apr 22 - Apr 24
        </td>
        <td>
            <b>All Members:</b>
            <br>
            Final touches and fixes
            <br>
            Prepare for presentation
        </td>
    </tr>
</table>
