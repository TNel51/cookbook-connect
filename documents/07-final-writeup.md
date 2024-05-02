# Final Writeup

## Introduction

Cookbook Connect is a website that allows users to create and share recipes. Our tools allow for a wide range of creativity for the user to fine tune each recipe to their liking. This website serves as a solution to other cooking sites that feel overbearing to its users, as well as creates an environment that is welcoming for people who want to try new things as well as share recipes that they wish to offer. Users may also keep a personal copy of each recipe as a PDF file for their own personal use.

## Technology

### Supabase
Supabase is an open-source Firebase alternative that provides developers with a set of tools and services for building and scaling modern web applications. It offers a combination of database, authentication, and storage services, built on top of open-source technologies like PostgreSQL and PostgREST. 

### PostgreSQL
PostgreSQL is a powerful open-source relational database management system (RDBMS) known for its robustness, scalability, and extensibility. It is often referred to as Postgres and is one of the most advanced and feature-rich database systems available.

### Vercel
Vercel is a cloud platform for static sites and serverless functions, designed to simplify the deployment and hosting of web applications. It enables developers to build, deploy, and scale websites and web services with ease, offering a range of features and services tailored for modern web development workflows.

### Node.js
Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to run JavaScript code outside of a web browser. It uses the Chrome V8 JavaScript engine, which provides high performance and scalability.

This technology was chosen for its familiarity, ease of use, ecosystem, and performance and scalability. While varying, all of us were familiar with JavaScript in some way, so this technology was an easy choice while also being easy to learn. In addition, there is a huge ecosystem with millions of users and packages to be used. 

### TypeScript
TypeScript is an open-source programming language developed and maintained by Microsoft. It is a superset of JavaScript, meaning that any valid JavaScript code is also valid TypeScript code. TypeScript adds optional static typing and other features to JavaScript to help developers build large-scale applications more efficiently. Some key features of TypeScript include static typing, type inference, interfaces and classes, enums, generics, ESNext features, and tooling support.

TypeScript was chosen for its type safety, improved developer experience, code readability and maintainability, ecosystem compatibility, community and support, and future compatibility. It is essentially JavaScript with types, making it a great addition for the project. While allowing for plain JavaScript to work, this enhances the ability for others to write code by making it easier to understand different portions of the codebase. This technology also extremely limits the possibility of bugs; since JavaScript has no type checking, it is possible to write code that does not work without it complaining until runtime. TypeScript refuses to compile if things do not check out, making it much easier to spot bugs before they can be released into production code.

### Next.js
Next.js is an open-source React framework for building server-side rendered (SSR) and statically generated web applications. Developed by Vercel, it aims to make building React applications more efficient by providing built-in solutions for common tasks such as routing, code splitting, and server-side rendering.

We chose Next.js for this project due to its developer productivity, performance optimizations, integration with the React ecosystem, serverless architecture, community and support, and integration with Vercel. This technology is a popular choice for Node.js web applications and allows for a seamless setup and deployment experience for simple applications. 

### React
React is an open-source JavaScript library developed and maintained by Facebook. It is widely used for building user interfaces (UIs) for web applications. React allows developers to create interactive, reusable UI components that efficiently update when data changes. Some key features of React include component-based architecture, a virtual DOM, declarative syntax, JSX, unidirectional data flow, lifecycle methods, state management, and component reusability.

React is a popular library developed by a trustworthy organization. There are many options when developing a web application in JavaScript, but React stood out for familiarity with part of the group as well as ease of use and ability to quickly learn. With all of the features described above, this library makes it extremely easy to develop a web application with a bunch of features that could otherwise be a lot of work with another library.

### Tailwind CSS
Tailwind CSS is a utility-first CSS framework that provides a set of pre-designed, utility classes to quickly style HTML elements. Unlike traditional CSS frameworks like Bootstrap or Foundation, which offer pre-designed components and layouts, Tailwind CSS focuses on providing low-level utility classes that can be combined to create custom designs without writing custom CSS.

One of the huge reasons for using this framework is for its ease in developing components with as little custom CSS as possible. Tailwind allows for complete control over your elements without having to create a single CSS file. The framework offers extensive flexibility and customization. Additionally, Tailwind has built-in support for responsive designs.

### Flowbite
Flowbite is a UI framework for building responsive and modern web interfaces. It is built with Tailwind CSS and focuses on providing a set of pre-designed components and layouts that can be easily customized and extended to create visually appealing and functional web applications.

Flowbite was chosen for its rapid development, built-in response design, modern design aesthetics, customization flexibility, accessibility considerations, comprehensive documentation and support, and implementation using Tailwind CSS. This library makes it easy to build web applications with pre-designed components that require small tweaks to make an appealing modern, responsive web application.

### Zod
Zod is a TypeScript-first schema declaration and validation library developed by Vercel. It provides a simple and intuitive way to define data schemas and perform runtime validation of JavaScript objects against these schemas. Zod's key features include type safety, schema definition, validation, error handling, extensibility, and performance.

### NextAuth
NextAuth.js is an open-source authentication library for Next.js applications, providing a streamlined way to implement authentication and authorization features. Developed by the same team behind Next.js, NextAuth.js simplifies the integration of various authentication providers and identity protocols into Next.js applications, such as OAuth, JWT, and more.

### Bcrypt
Bcrypt is a cryptographic hash function specifically designed for password hashing. It is widely used in software development for securely storing passwords and protecting user credentials from unauthorized access. Bcrypt employs a computationally intensive hashing algorithm based on the Blowfish cipher, making it resistant to brute-force attacks and rainbow table attacks.

### Axios
Axios is a popular JavaScript library used for making HTTP requests from web browsers and Node.js environments. It provides an easy-to-use API for sending asynchronous HTTP requests to web servers and handling responses. Axios simplifies the process of working with APIs and fetching data from remote servers by providing a clean and intuitive interface.

### SWR
SWR, which stands for "Stale-While-Revalidate," is a React Hooks library for remote data fetching developed by Vercel. It provides a simple and efficient way to fetch data from APIs or other remote sources in React applications while automatically managing caching, revalidation, and state synchronization. SWR is designed to improve the user experience by providing fast and responsive data fetching with minimal effort.

### ESLint
ESLint is a widely used open-source static code analysis tool for identifying and reporting on patterns found in JavaScript code. It's commonly used for enforcing coding styles, identifying potential errors, and adhering to best practices.

### date-fns
date-fns is a popular JavaScript library for working with dates and times in modern web applications. It provides a comprehensive set of utility functions for parsing, formatting, manipulating, and comparing dates and times in a user-friendly and consistent manner.

### TipTap
Tiptap is a JavaScript framework for building rich text editors in web applications. It provides a modular and customizable architecture for creating WYSIWYG (What You See Is What You Get) editors with support for formatting, styling, and structuring text content. Tiptap is built on top of the ProseMirror library, which handles the underlying document model and editing behavior.

### DOMPurify
DOMPurify is a JavaScript library that provides a security layer for sanitizing and purifying HTML content to prevent cross-site scripting (XSS) attacks in web applications. It helps developers protect against malicious injection of scripts, HTML, or other potentially harmful content into web pages, which could compromise the security and integrity of the application.

Since the application uses the TipTap and saves the recipe instructions as raw HTML, DOMPurify purifies the HTML so it can be safely displayed on the website.

## Design

### Classes

#### Pages

- Recipes
    - Public page displaying public recipes with a search bar.
- Recipe
    - Page displaying information for a specific recipe.
- UpdateRecipe
    - Page to update a recipe. Fills in all recipe data.
- CreateRecipe
    - Page to create a recipe.
- MealPlan
    - Page to plan meals. Displays days of the week with breakfast, lunch, and dinner with recipes assigned to those meals.
- Settings
    - Page to update avatar and display name.
- SignIn
- SignUp

#### Components

- Layout
    - Basic layout of the application used on all pages.
- NavBar
    - Navigation bar used on all pages.
- Loading
    - Spinning loading animation.
- MealPlanColumn
    - Day of the week in the meal planning page containing breakfast, lunch, and dinner for a specific day.
- MealPlanSlot
    - Specific meal for a specific day. I.e., breakfast. Contains recipes assigned to this day and meal.
- MealSchedulerModal
    - Modal to assign a recipe to a meal.
- Rating
    - Ratings for recipes. Contain user info, star rating, and comment.
- Recipe
    - Recipe item in a list of recipes.
- RecipeSearch
    - Recipe search bar.
- AddIngredientModal
    - Modal to add ingredient to recipe. Live search from the API to pull ingredients by search key.
- AddTagModal
    - Modal to add tag to recipe. Live search from the API to pull tags by search key.
- AddToolModal
    - Modal to add tool to recipe. Live search from the API to pull tools by search key.

#### API Routes

- /auth/[...nextauth].ts
    - Sign In and Session Management
- /auth/register
    - User Registration
- /auth/user
    - Update User
- /ingredients
    - Get / Create Ingredients
- /mealplan
    - Get / Clear Meal Plan
- /mealplan/[recipeId]
    - Add Recipe to Meal Plan
- /recipes
    - Get / Create Recipes
- /recipes/[id]
    - Get / Update / Delete Recipe
- /recipes/[id]/ratings
    - Create Rating
- /tags
    - Get / Create Tags
- /tools
    - Get / Create Tools

#### Database Entities

- Ingredient
- MealPlanDay
- RatingReaction
- Rating
- RecipeIngredient
- Recipe
- RecipeTool
- RecipeTag
- Tag
- Tool
- User

### Database Tables

#### Tables
- ingredient
- meal_plan_day
- migrations
- rating
- rating_recipe
- recipe
- recipe_ingredient
- recipe_tags_tag
- recipe_tools_tool
- tag
- tool
- user

#### Entity Relationship Diagram
![Entity Relationship Diagram](/documents/07-design-erd.drawio.png)

### Script Files

- includeAll.ts
    - TypeORM helper function to include all fields in the select option for the find methods of a repository.
- passwordSchema.ts
    - Schema for password validation.
- runTransaction.ts
    - Runs the provided function in a single transaction using the EntityManager.
- swrFetcher.ts
    - Fetch function for SWR.
- titleCase.ts
    - Formats text in title case.
- data-source.ts
    - Data source for TypeORM. Contains a function to get a ready data source to access the database.

## Deploying the Application

Deploying the application is super simple using Vercel. First, head to the Vercel website (vercel.com). Create an account or sign into an existing account. The easiest solution is to sign in with GitHub. After signing in, click <kbd>Add</kbd> then <kbd>Project</kbd>. Import the Git repository for Cookbook Connect. Add all environment variables required. Lastly, click <kbd>Deploy</kbd>. After that, it will provide a link, build the project, and deploy it.

## Known Bugs

There are a few known bugs within the project.

- Recipe page UI has overflow issues when sized in a specific way with specific length text.
- Display name does not update in the navbar after updating it on the settings page.
- Exporting to PDF does not work in Safari.
- Exporting to PDF with dark mode has issues with text color.
- Exporting to PDF has issues with CSS.