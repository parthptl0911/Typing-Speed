# 🚀 Typing Speed Test with Custom Cursor Effect

A modern, interactive typing speed test game built with HTML, CSS, and JavaScript featuring a **custom animated cursor** that enhances the typing experience.

## ✨ Features

### 🎯 Custom Cursor Effect
- **Animated blinking cursor** that follows your typing in real-time
- **Color-coded feedback**: 
  - 🔵 Blue: Default cursor color
  - 🟢 Green: Correct character typed
  - 🔴 Red: Incorrect character typed
- **Smooth movement** with CSS transitions
- **Pulse animation** on each keypress for visual feedback
- **Terminal-style appearance** with glow effects

### 📊 Real-time Statistics
- **Words Per Minute (WPM)** calculation
- **Accuracy percentage** tracking
- **Countdown timer** (60 seconds)
- **Character and error counting**

### 🎨 Modern UI/UX
- **Gradient backgrounds** and glassmorphism effects
- **Responsive design** for all devices
- **Smooth animations** and transitions
- **Visual feedback** for correct/incorrect characters
- **Beautiful results display** with hover effects

### 🎮 Interactive Features
- **Start/Reset functionality**
- **Real-time accuracy checking**
- **Character-by-character validation**
- **Multiple sample texts** for variety
- **Prevented navigation** during typing (no arrow keys, etc.)

## 🛠️ How It Works

### Custom Cursor Implementation
1. **Positioning**: The cursor position is calculated by measuring the width of typed text
2. **Color Changes**: Cursor color updates based on typing accuracy
3. **Animations**: Blinking, pulsing, and smooth movement effects
4. **Visibility**: Shows only during active typing sessions

### Accuracy Tracking
- Each character is compared individually
- Real-time visual feedback with color coding
- Error counting and accuracy calculation
- WPM calculation based on actual words typed

## 🚀 Getting Started

1. **Download** all files to a folder
2. **Open** `index.html` in your web browser
3. **Click** "Start Test" to begin
4. **Type** the displayed text as accurately as possible
5. **View** your results when the test completes

## 📁 File Structure

```
typing-speed-test/
├── index.html          # Main HTML structure
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎯 Customization Options

### Cursor Effects
You can modify the cursor appearance in `styles.css`:

```css
.custom-cursor {
    width: 2px;                    /* Cursor width */
    height: 1.5em;                 /* Cursor height */
    background: #667eea;           /* Default color */
    animation: blink 1s infinite;  /* Blink speed */
}
```

### Sample Texts
Add more sample texts in `script.js`:

```javascript
this.sampleTexts = [
    "Your custom text here...",
    "Another sample text...",
    // Add more texts
];
```

### Test Duration
Change the test duration in `script.js`:

```javascript
this.timeLeft = 60; // Change to desired seconds
```

## 🎨 CSS Animations Used

- **Blink**: `@keyframes blink` - Cursor visibility toggle
- **Pulse**: `@keyframes pulse` - Scale animation on keypress
- **Spin**: `@keyframes spin` - Loading animation
- **Transitions**: Smooth movement and color changes

## 🔧 Technical Details

### Browser Compatibility
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### Performance Features
- **Efficient DOM manipulation**
- **Optimized event handling**
- **Smooth 60fps animations**
- **Memory leak prevention**

## 🎉 Bonus Features Implemented

✅ **Color-coded cursor** based on typing accuracy  
✅ **Pulse effect** on each keypress  
✅ **Smooth cursor movement** with CSS transitions  
✅ **Terminal-style appearance** with glow effects  
✅ **Real-time accuracy tracking**  
✅ **Modern, responsive design**  

## 🤝 Contributing

Feel free to enhance this project by:
- Adding more sample texts
- Implementing different cursor styles
- Adding sound effects
- Creating different difficulty levels
- Adding user statistics tracking

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Typing! 🎯⚡** 