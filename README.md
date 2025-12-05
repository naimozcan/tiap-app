TIAP App - Warehouse Exception Management System (Frontend)
Show Image
Show Image
Show Image
Show Image
Frontend application for TIAP (Tracking, Inspection, and Analysis Platform) - A modern, responsive React application for warehouse exception management, root cause analysis, and operational analytics.
📋 Table of Contents

Overview
Features
Tech Stack
Prerequisites
Installation
Environment Variables
Project Structure
Key Components
Routing
State Management
Styling
API Integration
Authentication Flow
User Roles & Permissions
Screenshots
Deployment
Author
License

🎯 Overview
TIAP App is a comprehensive frontend solution built with React and Vite, designed to streamline warehouse exception management. The application provides an intuitive interface for logging exceptions, tracking root causes, and analyzing operational metrics through interactive dashboards.
Core Functionalities:

Real-time exception logging with image upload
Interactive dashboard with monthly statistics
Root cause management and analysis
WMS flow visualization (Orders, Tasks, Locations)
Role-based access control UI
Responsive design for desktop and tablet devices

✨ Features
Exception Management

Create Exceptions: Multi-step form with conditional fields based on status
View Details: Comprehensive exception details with all related information
Edit & Delete: Full CRUD operations with confirmation dialogs
Image Upload: Direct integration with Cloudinary for exception photos
Advanced Filtering: Filter by date, type, status, and task type

Dashboard & Analytics

Monthly Overview: Exception count by type (Missing/Damaged)
Cost Analysis: Total cost breakdown per exception type
Visual Charts: Interactive charts using Recharts library
Root Cause Statistics: Distribution of exceptions by root cause
Department Metrics: Performance tracking by department

Root Cause Management

Create Root Causes: Define root causes by task type and exception type
Color-Coded Categories: Visual distinction between different root cause types

Picking + Damaged: Yellow
Picking + Missing: Orange
Packing + Damaged: Blue
Packing + Missing: Green


Exception Tracking: View all exceptions linked to each root cause

User Experience

Responsive Design: Optimized for desktop and tablet screens
Toast Notifications: Real-time feedback for all operations
Loading States: Spinner indicators for async operations
Confirmation Dialogs: Prevent accidental deletions
Form Validation: Client-side and server-side validation

🛠 Tech Stack

Framework: React 18+ with Hooks
Build Tool: Vite 5+
Routing: React Router DOM v6
Styling: Tailwind CSS 3+
HTTP Client: Axios
Charts: Recharts
Icons: React Spinners
State Management: React Context API
Form Handling: Controlled Components

📦 Prerequisites
Before you begin, ensure you have:

Node.js (v18 or higher)
npm or yarn
TIAP Server running (backend API)

🚀 Installation

Clone the repository

bashgit clone https://github.com/naimyasirozcan/tiap-app.git
cd tiap-app

Install dependencies

bashnpm install

Set up environment variables

bashcp .env.example .env
# Edit .env with your backend API URL

Start the development server

bashnpm run dev
The application will start on http://localhost:5173 by default.
🔐 Environment Variables
Create a .env file in the root directory:
env# Backend API Configuration
VITE_API_URL=http://localhost:5005/api
📁 Project Structure
tiap-app/
├── public/
│   └── assets/           # Static assets
├── src/
│   ├── components/
│   │   ├── ExceptionListRow.jsx
│   │   ├── ui/           # Reusable UI components
│   │   └── ...
│   ├── contexts/
│   │   ├── auth.context.jsx
│   │   └── toast.context.jsx
│   ├── pages/
│   │   ├── CreateExceptionLog.jsx
│   │   ├── ExceptionDetails.jsx
│   │   ├── CreateRootCause.jsx
│   │   ├── RootCauseDetails.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ...
│   ├── services/
│   │   └── config.services.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
🧩 Key Components
CreateExceptionLog
Multi-step exception creation form with dynamic field rendering based on user input.
Features:

Order and SKU lookup with real-time validation
Task and Task Collection automatic fetching
Conditional fields for "replaced" status
Location selection based on SKU availability
Image upload with preview
Quantity validation based on task processed quantity

Key State Management:
javascriptconst [order, setOrder] = useState(null)
const [sku, setSku] = useState(null)
const [taskCollection, setTaskCollection] = useState(null)
const [task, setTask] = useState(null)
const [rootcause, setRootcause] = useState(null)
const [isReplaced, setIsReplaced] = useState(false)
const [maxQty, setMaxQty] = useState(null)
ExceptionDetails
Comprehensive view of exception information with edit/delete capabilities.
Displays:

Exception metadata (No, Received As, Occurred On)
Order and SKU information
Location and zone details
Root cause and cost analysis
Employee information (Found by, Handled by, Error by)
Exception image
Notes and additional details

RootCauseDetails
Root cause information with linked exceptions list.
Features:

Color-coded header based on task type and exception type
List of all exceptions with the selected root cause
Edit and delete functionality (delete only if no linked exceptions)
Visual feedback with ExceptionListRow components

Dashboard
Analytics dashboard with monthly exception statistics.
Components:

Exception count cards (Total, Missing, Damaged)
Cost analysis cards
Bar charts for exception distribution
Root cause breakdown
Date range filtering

🛣 Routing
javascript<Routes>
  {/* Public Routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* Protected Routes */}
  <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
  <Route path="/logs" element={<PrivateRoute><ExceptionLogs /></PrivateRoute>} />
  <Route path="/logs/new" element={<AdminRoute><CreateExceptionLog /></AdminRoute>} />
  <Route path="/logs/:_id" element={<PrivateRoute><ExceptionDetails /></PrivateRoute>} />
  <Route path="/logs/:_id/edit" element={<AdminRoute><EditException /></AdminRoute>} />
  
  <Route path="/root-causes" element={<PrivateRoute><RootCauses /></PrivateRoute>} />
  <Route path="/root-causes/new" element={<AdminRoute><CreateRootCause /></AdminRoute>} />
  <Route path="/root-causes/:_id" element={<PrivateRoute><RootCauseDetails /></PrivateRoute>} />
  <Route path="/root-causes/:_id/edit" element={<AdminRoute><EditRootCause /></AdminRoute>} />

  {/* Error Routes */}
  <Route path="/unauthorized" element={<Unauthorized />} />
  <Route path="*" element={<NotFound />} />
</Routes>
🗂 State Management
AuthContext
Manages user authentication state across the application.
javascriptconst AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Authentication methods
  const authenticateUser = () => { /* ... */ }
  const storeToken = (token) => { /* ... */ }
  const removeToken = () => { /* ... */ }

  return (
    <AuthContext.Provider value={{
      user, isLoggedIn, isLoading,
      authenticateUser, storeToken, removeToken
    }}>
      {children}
    </AuthContext.Provider>
  )
}
ToastContext
Provides global toast notification system.
javascriptconst ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const createToast = (type, message) => {
    const newToast = { id: Date.now(), type, message }
    setToasts(prev => [...prev, newToast])
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toasts, setToasts, createToast }}>
      {children}
    </ToastContext.Provider>
  )
}
🎨 Styling
Tailwind CSS Configuration
Custom color scheme and responsive breakpoints:
javascript// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Custom colors for exception types
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      }
    }
  }
}
Responsive Design Patterns
jsx// Mobile-first approach
<div className="xs:col-span-12 lg:col-span-6">
  {/* Content */}
</div>

// Grid layout
<div className="grid grid-cols-12 gap-4">
  <div className="xs:col-span-12 md:col-span-6 lg:col-span-4">
    {/* Card */}
  </div>
</div>
🔌 API Integration
Axios Configuration
Centralized API service with interceptors:
javascript// services/config.services.js
import axios from "axios"

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005/api"
})

// Request interceptor - Add auth token
service.interceptors.request.use(config => {
  const token = localStorage.getItem("authToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor - Handle errors
service.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default service
API Usage Examples
Fetching Exceptions:
javascriptconst fetchExceptions = async () => {
  try {
    const response = await service.get("/exceptions", {
      params: {
        type: "damaged",
        status: "handled",
        createdAt: "2025-01-15"
      }
    })
    setExceptions(response.data)
  } catch (error) {
    console.error(error)
    createToast("danger", error.response.data.errorMessage)
  }
}
Creating Exception:
javascriptconst handleCreateException = async (e) => {
  e.preventDefault()
  setIsBtnDisabled(true)
  setIsUploading(true)

  try {
    const newException = {
      receivedAs: formInput.receivedAs,
      order: order?._id,
      sku: sku?._id,
      quantity: formInput.skuQty,
      // ... other fields
    }

    const response = await service.post('/exceptions', newException)
    createToast("success", response.data.message)
    navigate("/logs")
  } catch (error) {
    createToast("danger", error.response.data.errorMessage)
  } finally {
    setIsBtnDisabled(false)
    setIsUploading(false)
  }
}
Image Upload:
javascriptconst handleImageChange = async (e) => {
  const imageToUpload = e.target.files[0]

  try {
    if (imageToUpload) {
      setImgFile(imageToUpload)
      
      const formData = new FormData()
      formData.append("image", imageToUpload)
      
      const response = await service.post("/uploads", formData)
      setImgURL(response.data.url)
      
      console.log("Image uploaded:", response.data.url)
    }
  } catch (error) {
    createToast("danger", error.response.data.errorMessage)
  }
}
🔐 Authentication Flow
Login Process

User submits credentials
Frontend sends POST request to /auth/login
Backend validates and returns JWT token
Token stored in localStorage
AuthContext updates user state
User redirected to dashboard

Protected Routes
javascriptconst PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  if (isLoading) return <Loading />
  
  return isLoggedIn ? children : <Navigate to="/login" />
}

const AdminRoute = ({ children }) => {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext)

  if (isLoading) return <Loading />
  if (!isLoggedIn) return <Navigate to="/login" />
  if (user.role !== "admin" && user.role !== "superAdmin") {
    return <Navigate to="/unauthorized" />
  }

  return children
}
Token Management
javascript// Store token after login
const storeToken = (token) => {
  localStorage.setItem("authToken", token)
  authenticateUser()
}

// Remove token on logout
const removeToken = () => {
  localStorage.removeItem("authToken")
  setUser(null)
  setIsLoggedIn(false)
}

// Verify token on app load
useEffect(() => {
  authenticateUser()
}, [])
👥 User Roles & Permissions
Role Hierarchy
RolePermissionsUserView dashboard, View exceptions, View root causesAdminAll User permissions + Create/Edit/Delete exceptions, Create/Edit/Delete root causesSuperAdminAll Admin permissions + User management, System configuration
UI Role-Based Rendering
jsx{user.role === "admin" || user.role === "superAdmin" ? (
  <button onClick={handleDelete}>Delete</button>
) : null}

{user.role === "superAdmin" && (
  <Link to="/admin/settings">System Settings</Link>
)}
📸 Screenshots
Dashboard
Monthly statistics, cost analysis, and visual charts
Exception Log Creation
Multi-step form with conditional fields and validation
Root Cause Management
Color-coded categories with linked exceptions
Exception Details
Comprehensive view with all related information
🚢 Deployment
Build for Production
bashnpm run build
This creates an optimized production build in the dist/ directory.
Preview Production Build
bashnpm run preview
Environment Setup
Ensure the following for production:

Set VITE_API_URL to your production backend URL
Configure CORS on backend to accept requests from your frontend domain
Use HTTPS for secure communication

Recommended Hosting Platforms

Vercel: Automatic deployments from GitHub
Netlify: Easy setup with continuous deployment
AWS S3 + CloudFront: Scalable static hosting
Firebase Hosting: Google's hosting solution

Deployment Example (Vercel)
bash# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
🔧 Available Scripts
bash# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
🎨 Customization
Changing Color Scheme
Edit tailwind.config.js:
javascripttheme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
      // Add custom colors
    }
  }
}
Adding New Exception Types
Update the form options in CreateExceptionLog.jsx:
jsx<option value="new-type">New Type</option>
Custom Toast Messages
Modify ToastContext to add custom durations or positions:
javascriptconst createToast = (type, message, duration = 3000) => {
  // Custom implementation
}
🐛 Troubleshooting
Common Issues
Issue: API calls failing

Check if backend server is running
Verify VITE_API_URL in .env
Check browser console for CORS errors

Issue: Images not uploading

Verify Cloudinary configuration in backend
Check file size limits
Ensure proper authentication token

Issue: Authentication not persisting

Check if localStorage is enabled
Verify token expiration time
Check browser console for errors

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

👨‍💻 Author
Naim Yasir Ozcan

LinkedIn: linkedin.com/in/naimyasirozcan
GitHub: @naimyasirozcan
Frontend: tiap-app
Backend: tiap-server

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🔗 Related Projects

Backend API: TIAP Server - Node.js/Express backend with MongoDB

📞 Support
For questions, issues, or feature requests:

Open an issue on GitHub
Contact via LinkedIn

🙏 Acknowledgments

React team for the amazing framework
Tailwind CSS for the utility-first CSS framework
Recharts for beautiful chart components
Cloudinary for image hosting solution


Built with ❤️ using React, Vite, and Tailwind CSS
