// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Comprehensive Wellness Quiz
const quizData = [
    {
        question: "How would you rate your overall mood today?",
        options: [
            { text: "Excellent - Feeling great!", value: 4 },
            { text: "Good - Pretty good overall", value: 3 },
            { text: "Okay - Some ups and downs", value: 2 },
            { text: "Struggling - Having a tough time", value: 1 },
            { text: "Really difficult - Very challenging", value: 0 }
        ]
    },
    {
        question: "How connected do you feel to friends or peers today?",
        options: [
            { text: "Very connected - I have strong relationships", value: 4 },
            { text: "Somewhat connected - I have a few people I can talk to", value: 3 },
            { text: "Neutral - I have some connections but could use more", value: 2 },
            { text: "Somewhat isolated - I feel disconnected", value: 1 },
            { text: "Very isolated - I feel alone", value: 0 }
        ]
    },
    {
        question: "How would you describe your energy level today?",
        options: [
            { text: "High energy - Ready to take on the day", value: 4 },
            { text: "Moderate energy - Feeling steady", value: 3 },
            { text: "Low energy - Feeling tired or drained", value: 2 },
            { text: "Very low energy - Difficult to get going", value: 1 },
            { text: "Exhausted - Barely functioning", value: 0 }
        ]
    },
    {
        question: "How well have you been able to manage stress recently?",
        options: [
            { text: "Very well - I have good coping strategies", value: 4 },
            { text: "Pretty well - Managing most things okay", value: 3 },
            { text: "It's a struggle - Some things are overwhelming", value: 2 },
            { text: "Not well - Feeling overwhelmed", value: 1 },
            { text: "Very poorly - Stress feels unmanageable", value: 0 }
        ]
    },
    {
        question: "How comfortable are you discussing your feelings or asking for help?",
        options: [
            { text: "Very comfortable - I can open up easily", value: 4 },
            { text: "Somewhat comfortable - I can talk to some people", value: 3 },
            { text: "Neutral - Sometimes it's hard, sometimes it's okay", value: 2 },
            { text: "Uncomfortable - I find it difficult to share", value: 1 },
            { text: "Very uncomfortable - I avoid talking about feelings", value: 0 }
        ]
    }
];

let currentQuestion = 0;
let answers = [];
let totalScore = 0;

function initQuiz() {
    const quizQuestions = document.getElementById('quizQuestions');
    if (!quizQuestions) return;
    
    showQuestion();
    updateProgress();
    
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', prevQuestion);
}

function showQuestion() {
    const quizQuestions = document.getElementById('quizQuestions');
    const question = quizData[currentQuestion];
    
    quizQuestions.innerHTML = `
        <div class="quiz-question-active">
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option-btn" data-value="${option.value}" data-index="${index}">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add click handlers
    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove previous selection
            document.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
            // Add selection to clicked button
            this.classList.add('selected');
            // Store answer
            answers[currentQuestion] = parseInt(this.getAttribute('data-value'));
        });
    });
    
    // Restore previous answer if exists
    if (answers[currentQuestion] !== undefined) {
        const selectedBtn = document.querySelector(`.quiz-option-btn[data-value="${answers[currentQuestion]}"]`);
        if (selectedBtn) selectedBtn.classList.add('selected');
    }
    
    // Update buttons
    document.getElementById('prevBtn').style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').textContent = currentQuestion === quizData.length - 1 ? 'See Results' : 'Next';
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
}

function nextQuestion() {
    if (answers[currentQuestion] === undefined) {
        alert('Please select an answer before continuing.');
        return;
    }
    
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgress();
    } else {
        calculateResults();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateProgress();
    }
}

function calculateResults() {
    totalScore = answers.reduce((sum, value) => sum + value, 0);
    const maxScore = quizData.length * 4;
    const percentage = (totalScore / maxScore) * 100;
    
    // Hide quiz questions
    document.getElementById('quizQuestions').style.display = 'none';
    document.querySelector('.quiz-navigation').style.display = 'none';
    document.querySelector('.quiz-progress').style.display = 'none';
    
    // Show results
    showResults(percentage);
}

function showResults(percentage) {
    const resultContent = document.querySelector('.result-content');
    let resultTitle, resultText, tips;
    
    if (percentage >= 80) {
        resultTitle = 'You're Doing Great!';
        resultText = 'Your responses show that you\'re in a good place with your mental wellness and connections. Keep maintaining those healthy habits and supportive relationships!';
        tips = [
            'Continue checking in with yourself regularly',
            'Share your positive energy by checking on friends who might need support',
            'Maintain your self-care routines',
            'Consider being a peer mentor or support person for others',
            'Keep practicing the habits that help you feel this way'
        ];
    } else if (percentage >= 60) {
        resultTitle = 'You\'re Doing Well';
        resultText = 'Overall, you seem to be in a decent place, but there might be some areas where you could use a bit more support or self-care. That\'s completely normal!';
        tips = [
            'Try reaching out to a friend or trusted person today',
            'Practice some self-care activities you enjoy',
            'Get some fresh air or light exercise',
            'Do something creative or that brings you joy',
            'Consider exploring our <a href="resources.html">Resources page</a> for wellness tools'
        ];
    } else if (percentage >= 40) {
        resultTitle = 'You Could Use Some Support';
        resultText = 'It sounds like you\'re going through a challenging time. Remember, it\'s okay to not be okay, and reaching out for support is a sign of strength, not weakness.';
        tips = [
            'Reach out to a friend, family member, or trusted adult today',
            'Try some deep breathing or mindfulness exercises (check our Resources page)',
            'Get outside for a short walk, even just 10 minutes',
            'Do one small thing that brings you comfort',
            'Consider talking to a school counselor or mental health professional',
            'Remember: You don\'t have to go through this alone'
        ];
    } else {
        resultTitle = 'Please Reach Out for Support';
        resultText = 'Your responses suggest you\'re going through a really difficult time. Please know that you\'re not alone, and there are people who want to help.';
        tips = [
            '<strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 (available 24/7)',
            '<strong>Crisis Text Line:</strong> Text HOME to 741741',
            'Talk to a school counselor, teacher, or trusted adult immediately',
            'Reach out to a friend or family member you trust',
            'Visit our <a href="resources.html">Resources page</a> for more support options',
            'Remember: This feeling is temporary, and help is available'
        ];
    }
    
    const tipsHTML = tips.map(tip => `<li>${tip}</li>`).join('');
    
    resultContent.innerHTML = `
        <h3 style="color: #ffb486; margin-bottom: 1rem; font-size: 2rem;">${resultTitle}</h3>
        <p style="font-size: 1.1rem; margin-bottom: 1.5rem; line-height: 1.8;">${resultText}</p>
        <div class="result-tips">
            <h4 style="color: #2c3e50; margin-bottom: 1rem; font-size: 1.3rem;">Tips for a Better Day:</h4>
            <ul style="text-align: left; margin-left: 2rem; line-height: 2;">
                ${tipsHTML}
            </ul>
        </div>
        <div style="margin-top: 2rem;">
            <button class="btn btn-primary" onclick="location.reload()">Take Quiz Again</button>
            <a href="resources.html" class="btn btn-secondary">View Resources</a>
        </div>
    `;
    
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('quizResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize quiz when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
} else {
    initQuiz();
}

// Story Form Submission
const storyForm = document.getElementById('storyForm');
if (storyForm) {
    const anonymousRadio = storyForm.querySelectorAll('input[name="anonymous"]');
    const nameGroup = document.getElementById('nameGroup');
    
    anonymousRadio.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'no') {
                nameGroup.style.display = 'block';
            } else {
                nameGroup.style.display = 'none';
            }
        });
    });
    
    storyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(storyForm);
        const anonymous = formData.get('anonymous');
        const firstName = formData.get('firstName') || '';
        const title = formData.get('storyTitle');
        const content = formData.get('storyContent');
        
        // In a real implementation, this would send data to a server
        // For now, we'll just show a success message
        console.log('Story submitted:', {
            anonymous,
            firstName: anonymous === 'no' ? firstName : 'Anonymous',
            title,
            content
        });
        
        // Show success message
        storyForm.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
        
        // Reset form after showing success
        storyForm.reset();
    });
}

// Pledge Form Submission
const pledgeForm = document.getElementById('pledgeForm');
if (pledgeForm) {
    pledgeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(pledgeForm);
        const name = formData.get('pledgeName');
        const email = formData.get('pledgeEmail');
        const commitments = formData.getAll('commitment');
        const message = formData.get('pledgeMessage');
        
        // In a real implementation, this would send data to a server
        console.log('Pledge submitted:', {
            name,
            email,
            commitments,
            message
        });
        
        // Show success message
        pledgeForm.style.display = 'none';
        document.getElementById('pledgeSuccess').style.display = 'block';
        document.getElementById('pledgeSuccess').scrollIntoView({ behavior: 'smooth' });
        
        // Reset form
        pledgeForm.reset();
    });
}

// Volunteer Form Submission
const volunteerForm = document.getElementById('volunteerForm');
if (volunteerForm) {
    const roleSelect = document.getElementById('volunteerRole');
    const otherRoleGroup = document.getElementById('otherRoleGroup');
    
    if (roleSelect && otherRoleGroup) {
        roleSelect.addEventListener('change', () => {
            if (roleSelect.value === 'other') {
                otherRoleGroup.style.display = 'block';
            } else {
                otherRoleGroup.style.display = 'none';
            }
        });
    }
    
    volunteerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(volunteerForm);
        const name = formData.get('volunteerName');
        const email = formData.get('volunteerEmail');
        const school = formData.get('volunteerSchool');
        const role = formData.get('volunteerRole');
        const otherRole = formData.get('otherRole');
        const message = formData.get('volunteerMessage');
        
        // In a real implementation, this would send data to a server
        console.log('Volunteer form submitted:', {
            name,
            email,
            school,
            role,
            otherRole,
            message
        });
            
            // Show success message
        volunteerForm.style.display = 'none';
        document.getElementById('volunteerSuccess').style.display = 'block';
        document.getElementById('volunteerSuccess').scrollIntoView({ behavior: 'smooth' });
            
            // Reset form
        volunteerForm.reset();
        if (otherRoleGroup) {
            otherRoleGroup.style.display = 'none';
        }
    });
}

// Animate Stats on Scroll
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
};

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Initialize stats animation when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStats);
} else {
    animateStats();
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
            e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
    });
});

// Form Validation Enhancement
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Add email validation to email fields
document.querySelectorAll('input[type="email"]').forEach(emailInput => {
    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !validateEmail(emailInput.value)) {
            emailInput.style.borderColor = '#ff6b6b';
            emailInput.setCustomValidity('Please enter a valid email address');
        } else {
            emailInput.style.borderColor = '';
            emailInput.setCustomValidity('');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && hamburger && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    }
});

// Add loading states to buttons
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitButton = this.querySelector('button[type="submit"]');
        if (submitButton && !this.hasAttribute('data-no-loading')) {
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
        }
    });
});

