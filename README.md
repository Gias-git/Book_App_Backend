# 🚀 A Library Management System  ( Express, TypeScript, and MongoDB & Mongoose)

This is a book App backend where use - Express, TypeScript, and MongoDB (via Mongoose). Here All api routes of book add book borrow

###  Objectives:

- Express js use as backend and mongodb use as database
- Here CRUD Operations all API integrated
- Main goal of this backend add book, find book and borrowed booked data in db



---

## 🛠️ Setup Instructions

Follow the steps below to set up your development environment:

---

### 📁 1. Initialize the Project

```bash
npm init -y
npm install express
npm install -D typescript
npm install --save-dev @types/express
tsc --init
```

### Then update your tsconfig.json with:

"rootDir": "./src"
"outDir": "./dist"


##  Enable Auto Reload with ts-node-dev
```bash

npm install -D ts-node-dev

```

### Then update the scripts section in your package.json:

"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "test": "echo \"Error: no test specified\" && exit 1"
}


### Project Structure

```bash

project-root/
├── src/
│   └── server.ts
├── dist/
├── node_modules/
├── package.json
├── tsconfig.json
└── README.md

```

###  Add MongoDB integration using Mongoose or native driver Server & Run the server:

```bash
npm install mongoose
npm run dev

```

