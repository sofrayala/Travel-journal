# TravelJournal

<!-- <p>
  <img src="public/travelJournal.png" alt="Captura de pantalla del proyecto" />
</p> -->

## 📄 Description

**Travel Journal** is a web app built with **Angular 19** that makes it easy to create journal-style entries for your trips. It features a structured highlights format, a built-in rating system, and personalized insights that help you reflect on your travel preferences — from food and people to scenery and overall vibe.

Your profile includes a dynamic world map, showcasing markers for each country you’ve visited, giving you a visual snapshot of your travel history.

## ✨ Features

- **Data storage:** Database hosted on Supabase, connected to individual user accounts.
- **Authentication with Supabase:** User registration and login using Supabase Authentication.
- **Modern UI with Vanilla CSS, Angular Material, and Tailwind:** Responsive design with custom styles.
- **Responsive Design:** Optimized for both mobile and desktop use.
- **Deployment on Vercel:** The app is hosted on **Vercel**. You can try it out directly from your browser!
- If you prefer not to create an account, you can use the following demo credentials:
  - **Email:** `sven@mail.com`
  - **Contraseña:** `111111`

## 💻 Technologies

- **Angular CLI** version 20.0.5
- **Supabase Authentication** for user authentication
- **Supabase Database** for the database
- **Custom CSS**
- **Tailwind**
- **HTML5**
- **TypeScript**

## 📋 Requirements

- **Node.js** and **npm** must be installed on your system. Download them from [nodejs.org](https://nodejs.org/).

```bash
npm install
```

<!-- ## 🛠️ Installation

### ✔️ Prerequisites

Make sure Node.js is installed on your system. You can download it from nodejs.org.
**ℹ️ You don’t need to install Angular CLI globally**, as it will be included with the project dependencies.

### ✔️ Step-by-step Installation

**1️⃣ Clone this repository to your local machine:**

```bash
git clone https://github.com/sofrayala/Travel-journal.git
```

**2️⃣ Navigate to the project directory:**

```bash
cd Travel-journal
```

**3️⃣ Install the required dependencies:**

```bash
npm install
```

## ▶️ Execution

Before starting the application, you need to configure your Supabase credentials ([supabase.com](https://supabase.com/)) and create an account on the official Mapbox API website: [mapbox.com/mapbox-studio](https://www.mapbox.com/mapbox-studio).

Inside the `environments/` folder, you will find a file named `environment.example.ts`. Follow these steps:

1. Open the `environment.example.ts` file, which has the following structure:

```typescript
export const environment = {
  production: false,
  SUPABASE_URL: "your_supabase_project_link",
  SUPABASE_KEY: "your_supabase_key",
  MAPBOX_TOKEN: "your_mapbox_key",
};
```

2. Fill in your Supabase and Mapbox credentials in the file.
3. Rename the file `environment.example.ts` to `environment.ts`, then copy it and create another file in the same folder named `environment.development.ts`, where you should modify the first line to: `"production: false"`.

To start the application in development mode, run:

```bash
ng serve
```

Then, open your browser and go to [http://localhost:4200/](http://localhost:4200/) to see the app in action.

This README provides a basic guide to set up, use, and contribute to the **Travel Journal** project. Be sure to check the official documentation for Angular, Supabase, and Tailwind for more detailed information and updates.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## ⬆️ Deploying to Vercel

To deploy this Angular project on [Vercel](https://vercel.com), follow these steps:

1. **Update package.json script:**

   ```bash
   "build": "node mynode.js && ng build"
   ```

2. **Create a .js file that generates an envFile:**
   Use the `mynode.js` file as an example, update the environment variables to match yours.

3. **Install dotenv:**

```bash
npm i dotenv
```

4. **Create a .env file:**
   Fill it with your environment variables.

5. **Push the project to GitHub (or any Git provider supported by Vercel).**

6. **Connect the Git repository to Vercel via the Vercel dashboard.**

7. **Set environment variables in the Vercel project settings:**

   Go to **Settings > Environment Variables**
   Add the same variables you use locally (e.g., Supabase keys, Mapbox token).

8. **Deploy:**
   Vercel will automatically build and deploy the app.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
**Travel Journal** is a web app built with **Angular 19** that makes it easy to create journal-style entries for your trips. It features a structured highlights format, a built-in rating system, and personalized insights that help you reflect on your travel preferences — from food and people to scenery and overall vibe.

Your profile includes a dynamic world map, showcasing markers for each country you’ve visited, giving you a visual snapshot of your travel history.

## ✨ Features

- **Data storage:** Database hosted on Supabase, connected to individual user accounts..
- **Authentication with Supabase:** ser registration and login using Supabase Authentication.
- **Modern UI with Vanilla CSS, Angular Material, and Tailwind:** Responsive design with custom styles.
- **Responsive Design**: Optimized for both mobile and desktop use.
  **Deployment on Vercel:** The app is hosted on **Vercel**. You can try it out directly from your browser!
  If you prefer not to create an account, you can use the following demo credentials: - **Email**: `sven@mail.com` - **Contraseña**: `111111`

## 💻 Technologies

- **Angular CLI** version 20.0.5.
- **Supabase Authentication** for user authentication.
- **Supabase Database** for the database.
- **Custom CSS**
- **Tailwind**
- **HTML5**
- **TypeScript**

## 📋 Requirements

- **Node.js** and **npm** must be installed on your system. Download them from [nodejs.org](https://nodejs.org/).
  ```bash
  npm install
  ```

## 🛠️ Installation

### **✔️ Prerequisites**

Make sure Node.js is installed on your system. You can download it from nodejs.org.
ℹ️ **You don’t need to install Angular CLI globally**, as it will be included with the project dependencies.

### **✔️ Step-by-step Installation**

**1️⃣ Clone this repository to your local machine:**

```bash
git clone https://github.com/sofrayala/Travel-journal.git
```

**2️⃣ Navigate to the project directory:**

```bash
cd Travel-journal
```

**3️⃣ Install the required dependencies:**

```bash
npm install
```

## ▶️ Execution

Before starting the application, you need to configure your Supabase credentials (https://supabase.com/) and create an account on the official Mapbox API website: https://www.mapbox.com/mapbox-studio.

Inside the `environments/` folder, you will find a file named `environment.example.ts`. Follow these steps:

1. Open the environment.example.ts file, which has the following structure:

```typescript
export const environment = {
  production: false,
  SUPABASE_URL: "your supase_project_link",
  SUPABASE_KEY: "your supabase_key",
  MAPBOX_TOKEN: "your mapBox_key",
};
```

2. Fill in your Supabase and Mapbox credentials in the file.
3. Rename the file `environment.example.ts` to `environment.ts`, then copy it and create another file in the same folder named `environment.development.ts`, where you should modify the first line to: `"production: false"`.

To start the application in development mode, run:

```bash
ng serve
```

Then, open your browser and go to http://localhost:4200/ to see the app in action.

This README provides a basic guide to set up, use, and contribute to the **Travel Journal** project. Be sure to check the official documentation for Angular, Supabase, and Tailwind for more detailed information and updates.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## ⬆️ Deploying to Vercel

To deploy this Angular project on [Vercel](https://vercel.com), follow these steps:

1. **Update package.json script**:

   ```bash
   "build": "node mynode.js && ng build"
   ```

2. **Create a .js file that generates an envFile** mynode.js file as example, update the environments variables to match yours.
3. **Download .env**

```bash
npm i dotenv
```

4. **Create a .env file:** Fill it with your environment variables.
5. **Push the project to GitHub (or any Git provider supported by Vercel).**
6. **Connect the Git repository to Vercel via the Vercel dashboard.**
7. **Set environment variables in the Vercel project settings:**

Go to **Settings** > **Environment Variables**
Add the same variables you use locally (e.g., Supabase keys, Mapbox token). 8. **Deploy:**Vercel will automatically build and deploy the app.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
#   T r a v e l - j o u r n a l 
 
  -->
