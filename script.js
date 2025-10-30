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

// Mood Quiz Functionality
const koiOptions = document.querySelectorAll('.koi-option');
const quizResult = document.getElementById('quizResult');

if (koiOptions.length > 0) {
    koiOptions.forEach(option => {
        option.addEventListener('click', () => {
            const mood = option.getAttribute('data-mood');
            showQuizResult(mood);
        });
    });
}

function showQuizResult(mood) {
    const resultContent = document.querySelector('.result-content');
    
    let resultText = '';
    let resultTitle = '';
    
    switch(mood) {
        case 'strong':
            resultTitle = 'You Feel Strong & Connected';
            resultText = 'That\'s wonderful! You\'re in a good place with connection and support. Remember, even when you\'re feeling strong, checking in on others who might be struggling can make a huge difference. Your strength can be a source of support for someone else who needs it.';
            break;
        case 'okay':
            resultTitle = 'You\'re Doing Okay, But Could Use Support';
            resultText = 'It\'s okay to need support—everyone does sometimes. Consider reaching out to a friend, family member, or trusted adult. Remember, asking for help is a sign of strength, not weakness. You might also want to check out our <a href="resources.html">Resources page</a> for tools and techniques that might help.';
            break;
        case 'struggling':
            resultTitle = 'You\'re Struggling & Feeling Isolated';
            resultText = 'If you\'re feeling isolated and struggling, please know that you\'re not alone. It\'s important to reach out for support:<ul style="text-align: left; margin-top: 1rem;"><li><strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 (available 24/7)</li><li><strong>Crisis Text Line:</strong> Text HOME to 741741</li><li>Talk to a school counselor or trusted adult</li><li>Check out our <a href="resources.html">Resources page</a> for support options</li></ul>Remember, reaching out is the first step toward feeling better.';
            break;
    }
    
    resultContent.innerHTML = `
        <h3 style="color: #ffb486; margin-bottom: 1rem;">${resultTitle}</h3>
        <p>${resultText}</p>
    `;
    
    quizResult.style.display = 'block';
    quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

