# 🧑‍💻 Code Editor Web Application

A real-world **code editor web application** built using **React, TypeScript, and MERN stack concepts**.  
The project focuses on **performance optimization, clean UI, and production-ready patterns**.

---

## 🚀 Features

- ✨ Code editor powered by Monaco Editor  
- 💾 Auto-save functionality with debounce  
- ⏱️ Saves code only after user stops typing  
- 🟡🟢🔴 Real-time save status indicators (Saving / Saved / Error)  
- 🎨 Clean, modern, and fully responsive UI  
- 📂 Project list and project creation flow  
- 🔐 Authentication (Login / Register)

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Monaco Editor
- Axios

### Backend (API)
- Node.js
- Express
- MongoDB
- REST APIs

---

## 🧠 Auto-Save Feature (Core Highlight)

The editor implements **auto-save using a debounce mechanism** to improve performance.

### How it works:
1. Project data is fetched when the editor loads.
2. User edits code in the editor.
3. A custom debounce hook waits until typing stops.
4. After the delay, a `PATCH` request saves only the updated fields.
5. UI shows save status in real time.

### Why debounce?
- Prevents API calls on every keystroke
- Reduces server load
- Improves user experience

---

## 🟡 Save Status Indicator

The editor provides visual feedback to users:

| Status | Meaning |
|------|--------|
| 🟡 Saving… | Code is being saved |
| 🟢 Saved | Code saved successfully |
| 🔴 Error | Failed to save code |

---

## 🔗 API Design

Uses **PATCH** instead of PUT for partial updates.

**Endpoint**



**Payload Example**
```json
{
  "code": "...",
  "language": "javascript",
  "name": "My Project"
}

