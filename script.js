// ==========================================
// Against the Current - JavaScript
// ==========================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Initialize page-specific functionality
    initQuiz();
    initResourceTabs();
    initStoryForm();
    initContactForm();
    initBreathingExercise();
});

// ==========================================
// Mood Quiz Functionality
// ==========================================
let quizAnswers = [];
let currentQuestion = 1;
const totalQuestions = 5;

function initQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            quizAnswers.push(value);
            
            if (currentQuestion < totalQuestions) {
                // Move to next question
                const currentQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
                const nextQ = document.querySelector(`.quiz-question[data-question="${currentQuestion + 1}"]`);
                
                currentQ.classList.remove('active');
                nextQ.classList.add('active');
                currentQuestion++;
            } else {
                // Show results
                showQuizResults();
            }
        });
    });
}

function showQuizResults() {
    const total = quizAnswers.reduce((a, b) => a + b, 0);
    const average = total / quizAnswers.length;
    
    const resultsDiv = document.getElementById('quizResults');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsMessage = document.getElementById('resultsMessage');
    const resultsTips = document.getElementById('resultsTips');
    
    // Hide all questions
    document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
    
    // Generate results based on score
    let title, message, tips;
    
    if (average >= 4) {
        title = "You're Swimming Strong!";
        message = "Your responses suggest you're in a good place mentally. Keep up the great work with your self-care practices!";
        tips = `
            <h4>Keep the Momentum:</h4>
            <ul>
                <li>Continue your current self-care routine</li>
                <li>Share your positive practices with others</li>
                <li>Remember: it's okay to have difficult days too</li>
                <li>Consider journaling to track your progress</li>
            </ul>
        `;
    } else if (average >= 3) {
        title = "Navigating the Current";
        message = "You're managing, but there might be some challenges. Remember, it's okay to ask for support when you need it.";
        tips = `
            <h4>Strengthen Your Swim:</h4>
            <ul>
                <li>Try adding one small self-care activity daily</li>
                <li>Connect with a friend or loved one</li>
                <li>Practice mindfulness for 5-10 minutes</li>
                <li>Consider talking to a counselor or therapist</li>
            </ul>
        `;
    } else {
        title = "The Waters Are Rough";
        message = "It sounds like things are challenging right now. Please know that support is available, and reaching out is a sign of strength, not weakness.";
        tips = `
            <h4>Finding Support:</h4>
            <ul>
                <li>Call 988 if you need immediate support</li>
                <li>Reach out to a trusted friend or family member</li>
                <li>Consider professional counseling (we have resources!)</li>
                <li>Be gentle with yourself - you're doing your best</li>
                <li>Take things one day, or even one hour, at a time</li>
            </ul>
        `;
    }
    
    resultsTitle.textContent = title;
    resultsMessage.textContent = message;
    resultsTips.innerHTML = tips;
    
    resultsDiv.style.display = 'block';
}

function resetQuiz() {
    quizAnswers = [];
    currentQuestion = 1;
    
    document.getElementById('quizResults').style.display = 'none';
    document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
    document.querySelector('.quiz-question[data-question="1"]').classList.add('active');
}

// ==========================================
// Resource Tabs
// ==========================================
function initResourceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.resource-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.querySelector(`.resource-content[data-category="${category}"]`).classList.add('active');
        });
    });
}

// ==========================================
// Breathing Exercise
// ==========================================
function startBreathingExercise() {
    const modal = document.getElementById('breathingModal');
    modal.style.display = 'block';
}

function initBreathingExercise() {
    const modal = document.getElementById('breathingModal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.close-modal');
    const startBtn = document.getElementById('startBreathing');
    const breathingCircle = modal.querySelector('.breathing-circle');
    const breathingText = document.getElementById('breathingText');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            startBtn.disabled = true;
            runBreathingCycle();
        });
    }
    
    function runBreathingCycle() {
        // Breathe In (4 seconds)
        breathingText.textContent = 'Breathe In';
        breathingCircle.className = 'breathing-circle breathe-in';
        
        setTimeout(() => {
            // Hold (7 seconds)
            breathingText.textContent = 'Hold';
            breathingCircle.className = 'breathing-circle hold';
            
            setTimeout(() => {
                // Breathe Out (8 seconds)
                breathingText.textContent = 'Breathe Out';
                breathingCircle.className = 'breathing-circle breathe-out';
                
                setTimeout(() => {
                    breathingText.textContent = 'Complete! 🐟';
                    breathingCircle.className = 'breathing-circle';
                    startBtn.disabled = false;
                    startBtn.textContent = 'Start Again';
                }, 8000);
            }, 7000);
        }, 4000);
    }
}

// ==========================================
// Story Submission Form
// ==========================================
function initStoryForm() {
    const storyForm = document.getElementById('storyForm');
    
    if (storyForm) {
        storyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('storyName').value.trim() || 'Anonymous';
            const content = document.getElementById('storyContent').value.trim();
            const topicCheckboxes = document.querySelectorAll('input[name="topics"]:checked');
            const topics = Array.from(topicCheckboxes).map(cb => cb.value);
            
            // Create new story card
            const storiesGrid = document.getElementById('storiesGrid');
            const storyCard = document.createElement('div');
            storyCard.className = 'story-card';
            
            const date = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            
            let tagsHTML = '';
            topics.forEach(topic => {
                tagsHTML += `<span class="tag">${topic}</span>`;
            });
            
            storyCard.innerHTML = `
                <div class="story-header">
                    <div class="logo-koi koi-fish koi-pink">
                        <div class="koi-body">
                            <div class="koi-head">
                                <div class="koi-eye"></div>
                            </div>
                            <div class="koi-tail"></div>
                            <div class="koi-top-fin"></div>
                            <div class="koi-side-fin"></div>
                            <div class="koi-spots"></div>
                        </div>
                    </div>
                    <div class="story-meta">
                        <h3>${escapeHtml(name)}</h3>
                        <span class="story-date">${date}</span>
                    </div>
                </div>
                <p class="story-content">${escapeHtml(content)}</p>
                <div class="story-tags">
                    ${tagsHTML}
                </div>
            `;
            
            storiesGrid.insertBefore(storyCard, storiesGrid.firstChild);
            
            // Show success message
            document.getElementById('storySuccess').style.display = 'block';
            storyForm.style.display = 'none';
            
            // Scroll to success message
            document.getElementById('storySuccess').scrollIntoView({ behavior: 'smooth' });
            
            // Reset form
            storyForm.reset();
        });
    }
}

// ==========================================
// Contact Form
// ==========================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            document.getElementById('contactSuccess').style.display = 'block';
            contactForm.style.display = 'none';
            
            // Scroll to success message
            document.getElementById('contactSuccess').scrollIntoView({ behavior: 'smooth' });
            
            // Reset form
            contactForm.reset();
        });
    }
}

// ==========================================
// Utility Functions
// ==========================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// Event Modal Functionality
// ==========================================
const eventDetails = {
    event1: {
        title: "Mindfulness & Meditation Workshop",
        date: "November 15, 2025",
        time: "2:00 PM - 4:00 PM EST",
        location: "Virtual (Zoom)",
        description: "Join us for a transformative afternoon focused on mindfulness techniques and guided meditation practices. This workshop is designed for both beginners and experienced practitioners who want to deepen their practice and learn new ways to manage stress and anxiety.",
        whatToExpect: [
            "Introduction to mindfulness principles and their mental health benefits",
            "Guided meditation sessions (body scan, breath awareness, loving-kindness)",
            "Practical techniques you can use in daily life",
            "Q&A session with certified meditation instructor",
            "Downloadable resources and guided meditation recordings"
        ],
        whoShouldAttend: "Anyone interested in learning mindfulness and meditation techniques. No prior experience necessary. This workshop is particularly beneficial for those dealing with stress, anxiety, or simply looking to enhance their mental wellness routine.",
        host: {
            name: "Emma Thompson, Certified Mindfulness Instructor",
            bio: "Emma has been practicing and teaching mindfulness for over 10 years. She specializes in using meditation as a tool for mental health and has helped hundreds of people find peace and balance."
        },
        registration: "Free for all participants. Link will be sent upon registration."
    },
    event2: {
        title: "Community Support Circle",
        date: "November 22, 2025",
        time: "6:30 PM - 8:00 PM EST",
        location: "Community Center, Portland",
        description: "A welcoming and confidential space where community members can share their experiences, challenges, and victories in their mental health journey. This peer-led support group provides a judgment-free environment to connect with others who understand.",
        whatToExpect: [
            "Opening circle and introductions (first names only)",
            "Structured sharing time with optional participation",
            "Peer support and validation from others with similar experiences",
            "Light refreshments and networking time",
            "Resource sharing and coping strategy discussions"
        ],
        whoShouldAttend: "Anyone seeking peer support in their mental health journey. Whether you're dealing with depression, anxiety, grief, or simply need a supportive community, you're welcome here. This is a safe space for all identities and experiences.",
        host: {
            name: "Maya Rodriguez, Community Outreach Manager",
            bio: "Maya facilitates our community circles with warmth and compassion. She believes in the power of shared experiences and creates safe spaces for authentic connection."
        },
        registration: "Free event. Please RSVP to reserve your spot as space is limited to 20 participants."
    },
    event3: {
        title: "Understanding Anxiety: Expert Q&A",
        date: "November 28, 2025",
        time: "7:00 PM - 8:30 PM EST",
        location: "Virtual (Zoom)",
        description: "Join Dr. Sarah Chen, a licensed clinical psychologist with expertise in anxiety disorders, for an informative evening about understanding, managing, and treating anxiety. This session combines educational content with a live Q&A where you can ask your questions anonymously.",
        whatToExpect: [
            "Overview of different types of anxiety disorders",
            "Evidence-based treatment approaches (therapy, medication, lifestyle)",
            "Practical coping strategies and grounding techniques",
            "Discussion of when to seek professional help",
            "Anonymous Q&A session - submit questions in advance or during the event",
            "Resource handout with additional reading and support services"
        ],
        whoShouldAttend: "Anyone experiencing anxiety, supporting someone with anxiety, or simply wanting to learn more. This session is educational and not a substitute for individual therapy or medical advice.",
        host: {
            name: "Dr. Sarah Chen, Licensed Clinical Psychologist",
            bio: "Dr. Chen specializes in anxiety and trauma with 12 years of clinical experience. She's passionate about mental health education and making psychological knowledge accessible to everyone."
        },
        registration: "Free event. Registration required to receive Zoom link and question submission form."
    },
    event4: {
        title: "Art Therapy Workshop",
        date: "December 5, 2025",
        time: "1:00 PM - 3:30 PM EST",
        location: "Creative Arts Studio, Seattle",
        description: "Express yourself through art in this hands-on therapeutic workshop. No artistic experience necessary! Art therapy uses creative expression as a way to explore emotions, reduce stress, and promote healing. All materials provided.",
        whatToExpect: [
            "Introduction to art therapy and its mental health benefits",
            "Guided creative exercises exploring emotions through color, shape, and texture",
            "Various mediums available: painting, drawing, collage, clay",
            "Optional sharing and reflection time",
            "All materials provided - just bring yourself!",
            "Take home your creations and a resource guide"
        ],
        whoShouldAttend: "Everyone is welcome, regardless of artistic ability! This workshop is perfect for those who find verbal expression challenging, want to try a new coping tool, or simply enjoy creative activities.",
        host: {
            name: "Jordan Lee, Licensed Art Therapist",
            bio: "Jordan combines their passion for art and psychology to help people heal through creative expression. They create inclusive, non-judgmental spaces where everyone can explore their creativity."
        },
        registration: "$15 suggested donation (no one turned away for lack of funds). Limited to 15 participants."
    },
    event5: {
        title: "Yoga for Mental Wellness",
        date: "December 10, 2025",
        time: "10:00 AM - 11:30 AM EST",
        location: "Virtual (Zoom)",
        description: "Experience the mental health benefits of yoga in this gentle, beginner-friendly session. This class focuses on poses, breathwork, and meditation specifically chosen for stress relief, emotional balance, and mental clarity.",
        whatToExpect: [
            "Gentle warm-up and breath awareness",
            "Yoga poses designed for stress relief and grounding",
            "Breathing exercises (pranayama) for anxiety management",
            "Guided relaxation and meditation",
            "Modifications offered for all fitness and flexibility levels",
            "Post-class discussion and resources for home practice"
        ],
        whoShouldAttend: "All levels welcome! Perfect for beginners or anyone looking to use yoga as a mental health tool. You'll need a yoga mat (or towel) and comfortable clothing. Props are optional but helpful (pillows, blankets, blocks).",
        host: {
            name: "Priya Sharma, Certified Yoga Instructor & Wellness Coach",
            bio: "Priya specializes in yoga for mental health and has trained in trauma-informed yoga practices. She believes yoga is for every body and creates accessible, welcoming classes."
        },
        registration: "Free event. Donations appreciated to support our programs. Camera-on optional."
    },
    event6: {
        title: "Holiday Coping Strategies",
        date: "December 15, 2025",
        time: "5:00 PM - 6:30 PM EST",
        location: "Virtual (Zoom)",
        description: "The holidays can be challenging for mental health. Learn practical strategies to navigate family dynamics, manage expectations, set boundaries, and maintain your wellbeing during this often stressful season.",
        whatToExpect: [
            "Understanding why holidays can be mentally challenging",
            "Boundary-setting strategies for family gatherings",
            "Managing grief during the holiday season",
            "Self-care practices that actually work during busy times",
            "How to handle triggering conversations and situations",
            "Creating new traditions that support your mental health",
            "Group discussion and shared strategy brainstorming"
        ],
        whoShouldAttend: "Anyone who finds the holiday season stressful, triggering, or overwhelming. Whether you're dealing with family conflict, grief, seasonal depression, financial stress, or simply the pressure of the season, this workshop offers support.",
        host: {
            name: "Dr. David Kim, Clinical Director & Therapist",
            bio: "Dr. Kim is a licensed clinical psychologist specializing in family dynamics and stress management. He provides compassionate, practical guidance for navigating difficult situations."
        },
        registration: "Free event. Registration required for Zoom link and pre-workshop resource guide."
    }
};

function openEventModal(eventId) {
    const modal = document.getElementById('eventModal');
    const modalContent = document.getElementById('modalEventContent');
    const event = eventDetails[eventId];
    
    if (!event) return;
    
    let expectationsList = '';
    event.whatToExpect.forEach(item => {
        expectationsList += `<li>${item}</li>`;
    });
    
    modalContent.innerHTML = `
        <div class="event-detail-header">
            <h2>${event.title}</h2>
            <div class="event-detail-date">
                📅 ${event.date}
            </div>
        </div>
        
        <div class="event-detail-meta">
            <div class="event-detail-row">
                <span class="event-detail-icon">🕒</span>
                <span><strong>Time:</strong> ${event.time}</span>
            </div>
            <div class="event-detail-row">
                <span class="event-detail-icon">📍</span>
                <span><strong>Location:</strong> ${event.location}</span>
            </div>
        </div>
        
        <div class="event-detail-section">
            <h3>About This Event</h3>
            <p>${event.description}</p>
        </div>
        
        <div class="event-detail-section">
            <h3>What to Expect</h3>
            <ul>
                ${expectationsList}
            </ul>
        </div>
        
        <div class="event-detail-section">
            <h3>Who Should Attend?</h3>
            <p>${event.whoShouldAttend}</p>
        </div>
        
        <div class="event-host">
            <h4>Hosted by: ${event.host.name}</h4>
            <p>${event.host.bio}</p>
        </div>
        
        <div class="event-register-section">
            <h3>Ready to Join?</h3>
            <p><strong>Registration:</strong> ${event.registration}</p>
            <a href="contact.html" class="btn btn-primary">Register Now</a>
            <a href="#" onclick="closeEventModal(); return false;" class="btn btn-secondary">Close</a>
            <div class="event-note">
                Note: Event links and details will be sent to your registered email 24 hours before the event.
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('eventModal');
    if (event.target === modal) {
        closeEventModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeEventModal();
    }
});

