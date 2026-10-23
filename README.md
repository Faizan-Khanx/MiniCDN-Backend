# ⚡ MediaOptix — High-Performance Media Processing & Optimization Engine

> **A production-ready, high-throughput media transformation microservice built with Node.js, Express, Multer, Sharp, and WebSockets.**
> Designed to compress, optimize, and transform images and videos up to 50MB on-the-fly, cutting payload by up to 85% with zero visual quality loss.

---

## 🏗️ 1. Project Folder Structure

```text
Proj17/
├── config/
│   └── db.js                   # MongoDB Connection
├── controllers/
│   ├── authController.js       # Register, Login (Cookie + JWT)
│   └── mediaController.js      # Upload, Transform, Stream, Delete, MyMedia
├── middleware/
│   ├── authMiddleware.js       # Input Validation & JWT Guard (Cookie extractor)
│   ├── errorMiddleware.js      # Centralized Global Error Handler (AppError)
│   ├── rateLimiter.js          # Brute-force & DDoS protection
│   └── uploadMiddleware.js     # Multer 50MB config + MimeType & Magic Bytes Filter
├── models/
│   ├── userModels.js           # User Schema (email, password, roles)
│   └── mediaModels.js          # Media Metadata (sizes, savings %, URLs, owner)
├── routes/
│   ├── authRoutes.js           # /api/auth/register, /api/auth/login
│   └── mediaRoutes.js          # /api/media/upload, /api/media/:id, /my-media
├── services/
│   ├── authService.js          # Business logic: Passwords, JWT Tokens
│   └── mediaService.js         # Sharp pipeline: Compress, Resize, Thumbnails, WebP
├── utils/
│   ├── authHelper.js           # Bcrypt & Validator helpers
│   ├── errorHandler.js         # Custom AppError Class
│   └── fileHelper.js           # Byte formatter (MB/KB), Savings % calculator
├── uploads/
│   ├── originals/              # Raw incoming files (Temporary or Permanent)
│   ├── optimized/              # Sharp compressed files (.webp)
│   └── thumbnails/             # 150px quick-preview thumbnails
├── .env                        # Port, Mongo URI, JWT Secret
├── .gitignore                  # node_modules, .env, uploads/
├── app.js                      # Express App, Static folder serving, 404 Route
└── package.json                # Dependencies & scripts
```

---

## 🧠 2. Core Concepts You Will Learn & Master

### A. Multer (Binary & Multipart File Handling)
* **Multipart/form-data:** HTTP body plain JSON nahi hota, files binary chunks mein aati hain.
* **`memoryStorage()` vs `diskStorage()`:**
  * *DiskStorage:* File seedha hard drive par write hoti hai (Safe for 50MB videos).
  * *MemoryStorage (`req.file.buffer`):* File RAM mein aati hai (Fastest for Sharp processing!).
* **File Limits:** 50MB hard limit (`limits: { fileSize: 50 * 1024 * 1024 }`).
* **File Filtering:** Sirf `image/jpeg`, `image/png`, `image/webp`, `video/mp4`, `video/quicktime` accept karna.

### B. Sharp (High-Performance Image Engine)
* **Vips C-Library Under the Hood:** Node.js native se 4-5x faster image processing.
* **Format Conversion:** Heavy 15MB PNG ko modern `.webp` ya `.avif` mein convert karna (saving ~80% size).
* **Smart Resizing:** Custom width/height or dynamic auto-scale (`fit: 'cover'`, `withoutEnlargement: true`).
* **Thumbnail Generation:** 150x150 lightweight preview banana.
* **EXIF Stripping:** GPS location, camera model data strip karna (Privacy & Size reduction).
* **Quality Tuning:** Quality 80% set karna (Human eye cannot see the difference, but size drops massively).

### C. Node.js Streams & Buffers (Deep Backend Internals)
* Memory leak se bachna: 50MB file ko RAM mein bina crash kiye stream karna.
* Video streaming with HTTP `206 Partial Content` (Range headers: Seek bar smoothly chal sake).

### D. Security & Magic Bytes Validation (Beyond Extension Checking)
* Hacker `.exe` ya `.sh` ko `.png` rename karke upload kar sakta hai.
* Real MIME detection: File ke pehle 4 bytes (Magic numbers) check karna to confirm it is a genuine image/video.

### E. Socket.io (Real-Time WebSocket Events)
* Live Upload & Compression Progress Bar:
  `client.on('upload-progress', { percent: 45 })`
* Real-time dashboard update jab file optimize ho jaye.

---

## 📊 3. Database Schema Blueprint (`mediaModels.js`)

```javascript
{
  originalName: "nature-4k.png",
  storedFileName: "media-173829102.webp",
  fileType: "image", // "image" | "video"
  mimeType: "image/webp",
  originalSize: 15420100, // ~14.7 MB in bytes
  compressedSize: 2104000, // ~2.0 MB in bytes
  savingsPercentage: 86.35, // 86.35% size saved!
  dimensions: {
    width: 1920,
    height: 1080
  },
  thumbnailUrl: "/uploads/thumbnails/thumb-173829102.webp",
  mediaUrl: "/uploads/optimized/media-173829102.webp",
  uploadedBy: ObjectId("User_ID_Reference"),
  createdAt: ISODate,
  updatedAt: ISODate
}
```

---

## 🗺️ 4. Step-by-Step Implementation Roadmap

- [x] **Phase 1: Foundation (Done!)**
  - Setup Express, MongoDB connection
  - User Authentication (Register & Login with JWT Cookies)
  - Custom `AppError` and Global `errorMiddleware`
  - Rate Limiter & Security Headers
- [ ] **Phase 2: Media Schema & Multer Setup**
  - Create `models/mediaModels.js`
  - Configure Multer in `middleware/uploadMiddleware.js` (50MB limit, disk/memory storage)
  - Create `uploads/` directory with `.gitignore`
- [ ] **Phase 3: Sharp Optimization Pipeline**
  - Install `sharp`
  - Build `services/mediaService.js` to compress images, auto-convert to WebP, and generate thumbnails
  - Calculate `savingsPercentage` formula: `((orig - comp) / orig) * 100`
- [ ] **Phase 4: Media API Endpoints**
  - `POST /api/media/upload` (Upload single/multiple files, process via Sharp, save to DB)
  - `GET /api/media/my-media` (List logged-in user's optimized assets & savings stats)
  - `GET /api/media/:id` (View / stream file)
  - `GET /api/media/:id/download` (Download with original or compressed name)
  - `DELETE /api/media/:id` (Delete file from disk and DB)
- [ ] **Phase 5: Real-Time Polish & Socket.io**
  - Live progress feedback
  - Total bandwidth saved counter

---

## 💼 5. LinkedIn Showcase Pitch (Your Future Post)

> *"Excited to share **MediaOptix** — a high-performance media optimization engine I engineered in Node.js.*
> 
> *Key Highlights:*
> * 🚀 **85%+ Payload Reduction:** Processed and converted heavy images (up to 50MB) to WebP on-the-fly using Sharp pipelines.
> * 🛡️ **Zero-Trust File Uploads:** Configured Multer with strict byte-size boundaries, MIME filtering, and rate limits.
> * 📈 **Instant Analytics:** Built-in computation tracking exact storage/bandwidth savings per asset.
> * 🔐 **Secure RBAC & Session Management:** JWT stored in httpOnly, sameSite cookies with centralized error handling.*
> 
> *Tech Stack: Node.js, Express, Sharp, Multer, MongoDB, WebSockets.*"
