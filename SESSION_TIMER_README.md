# Session Timer UI for Students

## Overview
This feature provides a clear, student-friendly session timer that helps students understand their session time remaining. The timer appears in the top-right corner of the application and provides visual feedback as the session progresses.

## Features

### 🎯 Visual Timer Display
- **Color-coded timer**: Changes from green → yellow → red as time runs out
- **Progress bar**: Shows exactly how much session time has been used
- **Large, readable numbers**: Easy to see at a glance
- **Animated warnings**: Pulsing effects when time is critical

### 📱 Student-Friendly Design
- **Clear language**: "Session Time" and "remaining" labels
- **Helpful tips**: Guidance on what to do as time runs out
- **Responsive design**: Works on all devices (desktop, tablet, mobile)
- **Accessible**: Designed with accessibility in mind

### ⚠️ Smart Warnings
- **10-second warning**: Automatic alert when session is about to expire
- **Visual indicators**: Color changes and animations
- **Helpful suggestions**: Tips for completing activities and saving progress

## How It Works

### Timer States
1. **🟢 Green (Normal)**: Plenty of time remaining (30+ seconds)
2. **🟡 Yellow (Warning)**: Time is running out (10-30 seconds)
3. **🔴 Red (Critical)**: Critical time remaining (0-10 seconds)

### Progress Tracking
- Progress bar fills from 0% to 100% as session time is used
- Percentage display shows exact usage
- Visual feedback helps students understand their time management

## Components

### SessionTimerComponent
- **Location**: `src/app/components/session-timer/`
- **Purpose**: Main timer display component
- **Features**: 
  - Real-time countdown
  - Color-coded states
  - Progress bar
  - Helpful tips

### SessionTimerDemoComponent
- **Location**: `src/app/components/session-timer-demo/`
- **Purpose**: Demo page to showcase timer functionality
- **Route**: `/session-timer-demo`
- **Features**:
  - Interactive demo controls
  - Student guidelines
  - Feature explanations

## Usage

### For Students
1. **Login** to start a session
2. **Look at the top-right corner** for the session timer
3. **Monitor the color changes** to understand time remaining
4. **Follow the tips** when time is running low
5. **Complete activities** before session expires

### For Developers
1. **Import** the SessionTimerComponent where needed
2. **Add** `<app-session-timer></app-session-timer>` to templates
3. **Ensure** SessionService is properly configured
4. **Test** on different devices and screen sizes

## Technical Details

### Session Service Integration
- Uses existing `SessionService` for timer logic
- Subscribes to `getSessionTimer()` and `getShowWarning()` observables
- Automatically handles session state management

### Styling
- **CSS Grid** and **Flexbox** for responsive layouts
- **CSS Animations** for smooth transitions
- **Gradient backgrounds** for modern appearance
- **Media queries** for mobile responsiveness

### Accessibility
- **High contrast** colors for visibility
- **Reduced motion** support for users with motion sensitivity
- **Semantic HTML** structure
- **Screen reader** friendly labels

## Demo
Visit `/session-timer-demo` to see the timer in action and learn about its features.

## Configuration
The timer behavior can be configured in `SessionService`:
- `SESSION_TIMEOUT`: Total session duration (default: 2 minutes)
- `WARNING_TIME`: Warning threshold (default: 10 seconds)

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements
- [ ] Sound notifications for warnings
- [ ] Customizable session durations
- [ ] Session extension requests
- [ ] Offline session tracking
- [ ] Multi-language support for timer labels 