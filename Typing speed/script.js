class TypingSpeedTest {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.textDisplay = document.getElementById('textDisplay');
        this.customCursor = document.getElementById('customCursor');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.results = document.getElementById('results');
        
        // Stats elements
        this.wpmElement = document.getElementById('wpm');
        this.accuracyElement = document.getElementById('accuracy');
        this.timeElement = document.getElementById('time');
        
        // Final results elements
        this.finalWpmElement = document.getElementById('finalWpm');
        this.finalAccuracyElement = document.getElementById('finalAccuracy');
        this.charactersTypedElement = document.getElementById('charactersTyped');
        this.errorsElement = document.getElementById('errors');
        
        // Test state
        this.isTestActive = false;
        this.startTime = null;
        this.timer = null;
        this.timeLeft = 60;
        this.currentText = '';
        this.typedText = '';
        this.errors = 0;
        this.totalCharacters = 0;
        
        // Sample texts for the typing test
        this.sampleTexts = [
            "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once. Pangrams are often used to display font samples and test keyboards.",
            "Programming is the art of telling another human being what one wants the computer to do. It requires logical thinking and creative problem-solving skills that can be developed through practice.",
            "Success is not final, failure is not fatal: it is the courage to continue that counts. Every expert was once a beginner who never gave up on their dreams and aspirations.",
            "Technology is best when it brings people together. The internet has revolutionized how we communicate, learn, and share information across the globe.",
            "Learning to code is like learning a new language. It opens up new ways of thinking and provides tools to solve complex problems in innovative ways.",
            "Coding is an exciting challenge. It combines logic with creativity to solve problems in innovative ways. With every project, you learn something new and valuable.",
            "The internet connects people across the globe. It allows us to share ideas, collaborate, and learn from each other. But it also presents challenges, such as misinformation and privacy concerns.",
            "Reading is one of the best ways to expand your knowledge. It opens doors to new worlds and ideas. Whether fiction or nonfiction, books can inspire and inform.",
            "Success is the result of hard work and perseverance. It's about setting goals, overcoming obstacles, and learning from mistakes. Every step forward counts, no matter how small.",
            "Innovation is about thinking differently. It requires challenging the status quo and embracing new ideas. Sometimes, the best solutions come from unexpected places."
        ];
        
        this.hintMessage = document.getElementById('hintMessage');
        
        this.initializeEventListeners();
        this.loadNewText();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.startTest());
        this.resetBtn.addEventListener('click', () => this.resetTest());
        this.textInput.addEventListener('input', (e) => this.handleInput(e));
        this.textInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.textInput.addEventListener('focus', () => this.showCursor());
        this.textInput.addEventListener('blur', () => this.hideCursor());
        
        // Prevent default behavior for arrow keys and other navigation keys
        this.textInput.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    loadNewText() {
        const randomText = this.sampleTexts[Math.floor(Math.random() * this.sampleTexts.length)];
        this.currentText = randomText;
        this.displayText();
    }
    
    displayText() {
        this.textDisplay.innerHTML = '';
        this.currentText.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.dataset.index = index;
            this.textDisplay.appendChild(span);
        });
    }
    
    startTest() {
        if (this.isTestActive) return;
        
        this.isTestActive = true;
        this.startTime = Date.now();
        this.timeLeft = 60;
        this.errors = 0;
        this.totalCharacters = 0;
        this.typedText = '';
        
        this.textInput.value = '';
        this.textInput.focus();
        
        this.startBtn.disabled = true;
        this.startBtn.textContent = 'Test Running...';
        
        this.updateDisplay();
        this.startTimer();
        this.showCursor();
        if (this.hintMessage) this.hintMessage.style.display = 'none';
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.endTest();
            }
        }, 1000);
    }
    
    handleInput(e) {
        if (!this.isTestActive) return;
        
        const inputValue = e.target.value;
        const currentIndex = inputValue.length - 1;
        
        // Update typed text
        this.typedText = inputValue;
        this.totalCharacters = inputValue.length;
        
        // Check accuracy and update display
        this.checkAccuracy();
        this.updateDisplay();
        this.updateCursorPosition();
        
        // Add pulse effect to cursor on keypress
        this.pulseCursor();
        
        // Check if test is complete
        if (inputValue.length >= this.currentText.length) {
            this.endTest();
        }
    }
    
    handleKeydown(e) {
        if (!this.isTestActive) return;
        
        // Prevent backspace beyond the current typing position
        if (e.key === 'Backspace') {
            const currentLength = this.textInput.value.length;
            if (currentLength === 0) {
                e.preventDefault();
            }
        }
    }
    
    checkAccuracy() {
        // Clear previous styling
        const spans = this.textDisplay.querySelectorAll('span');
        spans.forEach(span => {
            span.classList.remove('correct', 'incorrect', 'current');
        });
        
        let errorCount = 0;
        
        // Check each character
        for (let i = 0; i < this.typedText.length; i++) {
            const span = this.textDisplay.querySelector(`[data-index="${i}"]`);
            if (span) {
                if (this.typedText[i] === this.currentText[i]) {
                    span.classList.add('correct');
                } else {
                    span.classList.add('incorrect');
                    errorCount++;
                }
            }
        }
        
        // Highlight current character
        const currentIndex = this.typedText.length;
        if (currentIndex < this.currentText.length) {
            const currentSpan = this.textDisplay.querySelector(`[data-index="${currentIndex}"]`);
            if (currentSpan) {
                currentSpan.classList.add('current');
            }
        }
        
        this.errors = errorCount;
    }
    
    updateCursorPosition() {
        if (!this.isTestActive) return;
        
        // Create a temporary span to measure text width
        const tempSpan = document.createElement('span');
        tempSpan.style.position = 'absolute';
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'pre';
        tempSpan.style.font = window.getComputedStyle(this.textInput).font;
        tempSpan.textContent = this.typedText;
        
        document.body.appendChild(tempSpan);
        
        // Get the width of typed text
        const textWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);
        
        // Calculate cursor position
        const inputRect = this.textInput.getBoundingClientRect();
        const displayRect = this.textDisplay.getBoundingClientRect();
        
        // Position cursor relative to the text display
        const cursorLeft = displayRect.left + 24 + textWidth; // 24px for padding
        const cursorTop = displayRect.top + 24; // 24px for padding
        
        this.customCursor.style.left = `${cursorLeft}px`;
        this.customCursor.style.top = `${cursorTop}px`;
        
        // Update cursor color based on accuracy
        this.updateCursorColor();
    }
    
    updateCursorColor() {
        const currentIndex = this.typedText.length - 1;
        if (currentIndex >= 0 && currentIndex < this.currentText.length) {
            const isCorrect = this.typedText[currentIndex] === this.currentText[currentIndex];
            
            this.customCursor.classList.remove('correct', 'incorrect');
            if (isCorrect) {
                this.customCursor.classList.add('correct');
            } else {
                this.customCursor.classList.add('incorrect');
            }
        } else {
            this.customCursor.classList.remove('correct', 'incorrect');
        }
    }
    
    pulseCursor() {
        this.customCursor.classList.add('pulse');
        setTimeout(() => {
            this.customCursor.classList.remove('pulse');
        }, 300);
    }
    
    showCursor() {
        if (this.isTestActive) {
            this.customCursor.style.display = 'block';
            this.updateCursorPosition();
        }
    }
    
    hideCursor() {
        this.customCursor.style.display = 'none';
    }
    
    updateDisplay() {
        // Update WPM
        const wpm = this.calculateWPM();
        this.wpmElement.textContent = Math.round(wpm);
        
        // Update accuracy
        const accuracy = this.calculateAccuracy();
        this.accuracyElement.textContent = `${Math.round(accuracy)}%`;
        
        // Update time
        this.timeElement.textContent = `${this.timeLeft}s`;
    }
    
    calculateWPM() {
        if (!this.startTime || this.totalCharacters === 0) return 0;
        
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        const wordsTyped = this.typedText.trim().split(/\s+/).length;
        
        return wordsTyped / timeElapsed;
    }
    
    calculateAccuracy() {
        if (this.totalCharacters === 0) return 100;
        
        const correctCharacters = this.totalCharacters - this.errors;
        return (correctCharacters / this.totalCharacters) * 100;
    }
    
    endTest() {
        this.isTestActive = false;
        clearInterval(this.timer);
        
        this.startBtn.disabled = false;
        this.startBtn.textContent = 'Start Test';
        
        this.hideCursor();
        this.showResults();
        if (this.hintMessage) this.hintMessage.style.display = 'block';
    }
    
    showResults() {
        const finalWpm = this.calculateWPM();
        const finalAccuracy = this.calculateAccuracy();
        
        this.finalWpmElement.textContent = Math.round(finalWpm);
        this.finalAccuracyElement.textContent = `${Math.round(finalAccuracy)}%`;
        this.charactersTypedElement.textContent = this.totalCharacters;
        this.errorsElement.textContent = this.errors;
        
        this.results.style.display = 'block';
        
        // Scroll to results
        this.results.scrollIntoView({ behavior: 'smooth' });
    }
    
    resetTest() {
        this.isTestActive = false;
        clearInterval(this.timer);
        
        this.textInput.value = '';
        this.startBtn.disabled = false;
        this.startBtn.textContent = 'Start Test';
        
        this.hideCursor();
        this.results.style.display = 'none';
        
        // Load new text
        this.loadNewText();
        
        // Reset display
        this.wpmElement.textContent = '0';
        this.accuracyElement.textContent = '100%';
        this.timeElement.textContent = '60s';
        
        // Clear text styling
        const spans = this.textDisplay.querySelectorAll('span');
        spans.forEach(span => {
            span.classList.remove('correct', 'incorrect', 'current');
        });
        if (this.hintMessage) this.hintMessage.style.display = 'block';
    }
}

// Initialize the typing speed test when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TypingSpeedTest();
});

// Add some fun keyboard sound effects (optional)
document.addEventListener('keydown', (e) => {
    // Only for typing keys (not modifier keys)
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // You could add sound effects here if desired
        // For now, we'll just add a subtle visual feedback
        const activeElement = document.activeElement;
        if (activeElement && activeElement.id === 'textInput') {
            activeElement.style.transform = 'scale(1.001)';
            setTimeout(() => {
                activeElement.style.transform = 'scale(1)';
            }, 50);
        }
    }
}); 