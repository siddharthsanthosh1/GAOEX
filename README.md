# GAOEX - Global Academy of Excellence Mobile App

<div align="center">
  <img src="assets/images/gaoex-logo.jpeg" alt="GAOEX Logo" width="200"/>
  
  **Empowering minds across the globe through quality education**
  
  [![Expo](https://img.shields.io/badge/Expo-5.1.3-blue.svg)](https://expo.dev/)
  [![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-11.10.0-orange.svg)](https://firebase.google.com/)
</div>

## 📱 About GAOEX

The Global Academy of Excellence (GAOEX) mobile app is a comprehensive educational platform designed to connect students, educators, and organizations worldwide. Our mission is to provide quality education that transcends geographical, financial, and social barriers.

### 🎯 Our Vision
"Education has potential answers to all problems. Transfer of knowledge or imparting of education is the need of the hour to every deserving individual to obtain a deserved education which is uncategorized by money, race or caste or by any other social status." - **PRASHITHA AVINASH**

## ✨ Features

### 🏠 **Home Dashboard**
- Interactive hero section with GAOEX branding
- Center achievements showcase (500+ Organizations, 10,000+ Students, 100+ Trainers)
- Featured programs overview
- Recognition & awards display
- Direct link to official website

### 📅 **Events Management**
- Interactive calendar with event scheduling
- Event registration system with user authentication
- Real-time event updates and notifications
- Past event prevention (users cannot register for past events)
- User-specific event tracking

### 👤 **User Authentication**
- Secure Firebase authentication
- User registration and login
- Profile management
- Personalized event tracking
- Cross-device synchronization

### 🎓 **Programs & Services**
- Global Career Counseling Program (GCCP)
- Educational Research Project (ERT)
- Marginalized Student Empowerment Program (MSEP)
- International course enrollment
- Competition registration

### 📞 **Contact & Support**
- Direct contact information
- Social media integration
- Contact form submission
- Location and accessibility information

## 🏆 Recognition & Awards

- 🏆 **ISO Certified Educational Organization**
- ⭐ **5 Star Google Rated (GMB)**
- 🏅 **Asian Award Winner 2022**
- 🎓 **Students Choice Award 2022-2023**
- 🌟 **Indian Glory Award 2023**

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo
- **Language**: TypeScript
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database
- **Navigation**: Expo Router
- **UI Components**: Custom themed components
- **Calendar**: react-native-calendars
- **Icons**: Expo Vector Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gaoex-app.git
   cd gaoex-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Realtime Database
   - Update `firebaseConfig.ts` with your Firebase credentials

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run on your device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press 'i' for iOS Simulator
   - Press 'a' for Android Emulator

## 📱 App Structure

```
GAOEX/
├── app/                    # Main app directory (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── events.tsx     # Events calendar
│   │   ├── my-events.tsx  # User's registered events
│   │   ├── programs.tsx   # Programs & awards
│   │   ├── services.tsx   # Services offered
│   │   └── contact.tsx    # Contact information
│   ├── index.tsx          # Login screen
│   ├── onboarding.tsx     # App onboarding
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── constants/             # App constants and colors
├── hooks/                 # Custom React hooks
├── assets/                # Images, fonts, and static files
└── firebaseConfig.ts      # Firebase configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### Firebase Setup

1. Enable Authentication methods (Email/Password)
2. Set up Realtime Database rules
3. Configure security rules for user data

## 📊 Features in Detail

### Event Management System
- **Calendar Integration**: Interactive calendar showing event dates
- **Registration System**: User-friendly event registration with validation
- **User-Specific Data**: Events are tied to individual user accounts
- **Real-time Updates**: Changes reflect immediately across devices

### User Experience
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Responsive Design**: Optimized for various screen sizes
- **Haptic Feedback**: Enhanced user interaction on iOS
- **Smooth Navigation**: Tab-based navigation with custom animations

### Security Features
- **Firebase Authentication**: Secure user login and registration
- **Data Validation**: Input validation and error handling
- **User Isolation**: Each user sees only their own data
- **Secure Storage**: Firebase Realtime Database with proper security rules

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Links

- **Website**: [www.gaoex.org](https://www.gaoex.org)
- **Email**: info@gaoex.org
- **Location**: Tamil Nadu, India

## 📞 Support

For support and inquiries:

- **Email**: info@gaoex.org
- **Phone**: +91-XXXXXXXXXX
- **Address**: Tamil Nadu, India

## 🙏 Acknowledgments

- **Founder & CEO**: PRASHITHA AVINASH
- **Development Team**: GAOEX Development Team
- **Design Team**: GAOEX Design Team
- **Community**: All students and educators who inspire us

---

<div align="center">
  <p>Made with ❤️ by the GAOEX Team</p>
  <p>Empowering Education Globally</p>
</div>
