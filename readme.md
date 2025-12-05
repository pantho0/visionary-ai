# 🤖 Visionary AI: Text-to-Image Generation Platform

A state-of-the-art **text-to-image generation** platform built to transform text prompts into stunning visual art using two specialized third-party AI model. The system is designed for high performance and reliability, utilizing **Node.js, Express.js, TypeScript**, **MongoDB**, **Mongoose** and **Next.js**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge)](https://visionary-ai-client.vercel.app/)

---

## 🏗️ System Architecture & Workflow

The platform employs a robust microservice-like workflow to handle image generation requests efficiently.

1.  **Client Request (Next.js):** The user submits a text prompt.
2.  **API Gateway (Express/TS):** The backend receives the prompt.
3.  **API Call:** The backend sends the prompt to one of the **DeAI third-party API** and **Cloudflare Worker**.
4.  **AI Processing:** The AI model generates the image.
5.  **Image Return & Storage:** The image is sent back to the backend, which then uploads and saves it to **ImageBB** for permanent hosting.
6.  **Response:** The backend returns the hosted image URL and relevant metadata to the Next.js frontend.

---

## 💻 Tech Stack ✨

This project leverages a full-stack JavaScript ecosystem, focusing on type safety, asynchronous processing, and performance.

### Core Technologies

| Component         | Technologies Used                                    |
| :---------------- | :--------------------------------------------------- |
| **Frontend**      | **Next.js** (Server-Side Rendering/Full-stack)       |
| **Backend**       | **Node.js** with **Express.js**                      |
| **Language**      | **TypeScript** (For both frontend and backend)       |
| **Database**      | **MongoDB** with **Mongoose** (ODM)                  |
| **AI MODEL API**  | **Cloudflare Workers** (API calls)                   |
| **AI MODEL API**  | **DEAPI** (API calls)                                |
| **Image Hosting** | **ImageBB** (External image storage)                 |

### Tools & Libraries

|                                                                                                                                     |                                                                                                                                                      |                                                                                                                                      |
| :---------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
|  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)  | [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) |
| [![Mongoose](https://img.shields.io/badge/Mongoose-800?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/) |              [![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)               |     [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)     |

---

## 🚀 Key Features

### ✅ **High-Quality Generation**

- **Intuitive Prompt Input:** Simple interface for users to enter their creative text prompts.
- **AI Model Integration:** Seamless connection to a specialized **DeAI third-party API** for state-of-the-art image synthesis.

### 💾 **Data & Asset Management**

- **Persistent Storage:** Generated images are securely uploaded and stored on **ImageBB** for reliable long-term access.
- **Image History:** Saves user prompts and the resulting image URLs in **MongoDB**, allowing users to revisit their creations.

### 🌐 **Performance & Scalability**

- **Cloudflare Workers:** We utilize this serverless compute environment as a dedicated, low-latency API endpoint.
- **DeAPI (Third-Party AI Model):** This is the high-performance engine responsible for the actual text-to-image synthesis.
- **Type Safety:** **TypeScript** throughout the stack minimizes runtime errors and improves code maintainability.

---

\<p align="center"\>
  \<img src="[https://img.shields.io/badge/ACTION%20REQUIRED-Create%20a%20.env%20file%20and%20follow%20.env.example-red?style=for-the-badge\&labelColor=black](https://www.google.com/search?q=https://img.shields.io/badge/ACTION%2520REQUIRED-Create%2520a%2520.env%2520file%2520and%2520follow%2520.env.example-red%3Fstyle%3Dfor-the-badge%26labelColor%3Dblack)"/\>
\</p\>

### 🔑 Required Environment Variables

<p align="center">
  <img src="https://img.shields.io/badge/ACTION%20REQUIRED-Create%20a%20.env.local%20file%20and%20follow%20.env.example.local-red?style=for-the-badge&labelColor=black"/>
</p>

To run the project, you must set up your environment file (`.env`) with the necessary API keys and database connection string.

| Variable Name                    | Description                                                      |
| :------------------------------- | :--------------------------------------------------------------- |
| `MONGO_URI`                      | Connection string for your **MongoDB** database.                 |
| `DEAPI_KEY`                      | API key for the **third-party text-to-image service**.           |
| `IMAGEBB_API_KEY`                | API key for uploading images to **ImageBB**.                     |
| `CLOUDFLARE_WORKER_ENDPOINT`     | Endpoint URL for the deployed **Cloudflare Worker** instance.    |
| `JWT_SECRET` (Optional)          | Secret key for generating JSON Web Tokens.                       |

---

## 📥 Clone and Run

To get the project running locally, you'll need to set up both the backend (Node/Express/Mongo) and the frontend (Next.js).

### 1\. **Clone the Front-End Repository**

```bash
git clone [https://github.com/pantho0/visionary-ai-client.git](https://github.com/pantho0/visionary-ai-client.git)
cd visionary-ai-client
```

### 2\. **Backend Setup (Assuming a separate directory)**

1. ```bash
   git clone [https://github.com/pantho0/visionary-ai.git](https://github.com/pantho0/visionary-ai.git)
   cd visionary-ai-client
   ```

2. Navigate to your backend directory:
   ```bash
   cd visionary-ai
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server (usually a development or compiled script):
   ```bash
   npm run dev  # Or 'npm run start' depending on your setup
   ```

### 3\. **Frontend Setup (Visionary AI)**

1.  Navigate back to the frontend directory:
    ```bash
    cd ../visionary-ai-client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

The **frontend** application will be accessible at `http://localhost:3000` (or the port specified by Next.js).

---
