/**
 * Gowtham Kumar - Data Analyst Portfolio
 * Interactive Functionality & Modern UI Logic
 */

const PORTFOLIO_CONFIG = {
  name: 'M. Gowtham Kumar',
  phone: '6374475747',
  email: 'gowthamhari888@gmail.com',
  linkedin: 'https://linkedin.com/in/gowthamhari07',
  github: 'https://github.com/Gowthamkumar598',
  resumeFilename: 'Gowtham_Kumar_Resume.pdf'
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initTypewriter();
  initNavbarScroll();
  initMobileMenu();
  initScrollSpy();
  initProjectFilters();
  initProjectModals();
  initResumeModal();
  initResumeDownloads();
  initCopyEmail();
  initContactForm();
  initScrollTop();
  setCurrentYear();
});

/* ==========================================================================
   1. DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'Data Analyst',
    'B.Tech AI & Data Science Student',
    'Power BI & SQL Specialist',
    'Python & EDA Enthusiast',
    'Business Intelligence Builder'
  ];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typingElement.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of text
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   2. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu') || document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  const toggle = () => {
    const isActive = navMenu.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  };

  const close = () => {
    navMenu.classList.remove('active');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', toggle);

  navLinks.forEach(link => {
    link.addEventListener('click', close);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !toggleBtn.contains(e.target)) {
      close();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      close();
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   4. SCROLLSPY (ACTIVE NAV LINK HIGHLIGHTING)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  let ticking = false;

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 140;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
    let activeId = sections[0].getAttribute('id');

    if (atBottom) {
      activeId = sections[sections.length - 1].getAttribute('id');
    } else {
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          activeId = section.getAttribute('id');
        }
      });
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveLink);
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   5. PROJECT FILTERING
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (card._filterTimer) {
          clearTimeout(card._filterTimer);
          card._filterTimer = null;
        }

        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card._filterTimer = setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          card._filterTimer = setTimeout(() => {
            card.style.display = 'none';
          }, 220);
        }
      });
    });
  });
}

/* ==========================================================================
   6. PROJECT CASE STUDY MODALS
   ========================================================================== */
const projectDetailsData = {
  'modal-sales': {
    tag: 'Power BI &bull; Excel &bull; DAX Modeling',
    title: 'Retail Sales & Revenue Performance Dashboard',
    overview: 'This project simulates an enterprise retail environment analyzing two years of granular transaction records. The primary goal was to uncover hidden revenue bottlenecks, regional performance gaps, and product-line profitability margins.',
    approach: [
      '<strong>Data Cleaning & Transformation:</strong> Cleaned raw sales records using Microsoft Excel (resolving duplicate transactions, validating date hierarchies, and standardizing product categories).',
      '<strong>Star-Schema Data Modeling:</strong> Built dimensional relationship models in Power BI linking fact sales tables with dimension tables (Customers, Products, Geography, Calendar).',
      '<strong>Custom DAX Measures:</strong> Authored calculated metrics including Year-over-Year (YoY) Sales Growth, Cumulative YTD Sales, Profit Margin %, and Average Order Value (AOV).',
      '<strong>Interactive Visual Slicers:</strong> Designed dynamic date sliders, regional drill-downs, and category filters for executive review.'
    ],
    codeTitle: 'Sample DAX Measure (YoY Sales Variance & Margin):',
    codeSnippet: `// DAX Measure: Year-Over-Year Sales Variance
YoY_Sales_Variance = 
VAR CurrentYearSales = [Total_Revenue]
VAR PriorYearSales = CALCULATE([Total_Revenue], SAMEPERIODLASTYEAR('Calendar'[Date]))
RETURN
    DIVIDE(CurrentYearSales - PriorYearSales, PriorYearSales, 0)

// DAX Measure: Gross Profit Margin Percentage
Profit_Margin_% = 
DIVIDE([Total_Revenue] - [Total_COGS], [Total_Revenue], 0)`,
    findings: [
      'Highlighted that the Top 20% of product SKUs contributed to 68% of gross profitability.',
      'Identified an unexpected 18% decline in Q3 regional sales due to supply chain delivery delays.',
      'Recommended promotional realignment that boosted estimated category basket size by 12%.'
    ]
  },

  'modal-churn': {
    tag: 'Python &bull; Pandas &bull; Seaborn &bull; EDA',
    title: 'Customer Churn & Behavioral Pattern Analysis',
    overview: 'An exploratory data analysis investigation into customer attrition factors within a subscription services model. The analysis isolates behavioral patterns, service contract dependencies, and monthly spend correlations.',
    approach: [
      '<strong>Data Ingestion & Integrity Check:</strong> Loaded 7,000+ records via Python Pandas, handled empty numerical fields in total charges, and encoded categorical variables.',
      '<strong>Exploratory Data Distribution:</strong> Plotted statistical distributions (histograms, box plots) to analyze customer tenure vs. monthly recurring charges.',
      '<strong>Correlation & Heatmap Analysis:</strong> Utilized Seaborn to construct correlation matrices highlighting features with strong correlation to churn events.',
      '<strong>Cohort Segmentation:</strong> Evaluated retention rates across contract tiers (Month-to-Month vs. One-Year vs. Two-Year).'
    ],
    codeTitle: 'Python Analysis Snippet (Pandas & Seaborn):',
    codeSnippet: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load dataset and clean empty values
df = pd.read_csv('telecom_churn_data.csv')
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df.dropna(inplace=True)

# Calculate churn distribution by contract duration
churn_by_contract = df.groupby('Contract')['Churn'].value_counts(normalize=True).unstack()
print("Churn Rate by Contract:\\n", churn_by_contract['Yes'])

# Plot correlation heatmap
plt.figure(figsize=(10, 6))
sns.heatmap(df.corr(numeric_only=True), annot=True, cmap='Reds', fmt='.2f')
plt.title("Correlation Matrix of Behavioral Attributes")
plt.tight_layout()`,
    findings: [
      'Month-to-month contract holders exhibited a 42.7% churn rate, compared to under 11% for annual contract holders.',
      'First 6 months of customer tenure represent the highest vulnerability window for customer attrition.',
      'Customers with paperless billing and electronic check payments exhibited higher sensitivity to price adjustments.'
    ]
  },

  'modal-sql': {
    tag: 'SQL &bull; Relational Schema &bull; Analytics Queries',
    title: 'E-Commerce Relational Database & SQL Analytics',
    overview: 'Designed a comprehensive relational schema for an online retail platform and formulated complex analytical queries to extract critical business KPIs, order velocity, and customer loyalty cohorts.',
    approach: [
      '<strong>Schema Architecture:</strong> Constructed normalized relational tables (Customers, Orders, Order_Items, Products, Categories) with appropriate primary and foreign key constraints.',
      '<strong>Data Wrangling & Joins:</strong> Executed multi-table INNER and LEFT JOINs to aggregate transaction frequency and order basket values.',
      '<strong>Advanced Window Functions:</strong> Implemented DENSE_RANK(), ROW_NUMBER(), and LAG()/LEAD() to compute days elapsed between repeat orders.',
      '<strong>Common Table Expressions (CTEs):</strong> Structured multi-step queries for customer cohort analysis and revenue contribution deciles.'
    ],
    codeTitle: 'Advanced SQL Query (Customer Order Velocity & Ranking):',
    codeSnippet: `-- Calculate Days Elapsed Between Consecutive Orders per Customer
WITH CustomerOrders AS (
    SELECT 
        customer_id,
        order_id,
        order_date,
        total_amount,
        LAG(order_date, 1) OVER (
            PARTITION BY customer_id 
            ORDER BY order_date
        ) AS previous_order_date
    FROM orders
)
SELECT 
    customer_id,
    order_id,
    order_date,
    previous_order_date,
    (order_date - previous_order_date) AS days_between_orders,
    DENSE_RANK() OVER (ORDER BY total_amount DESC) AS revenue_rank
FROM CustomerOrders
WHERE previous_order_date IS NOT NULL
ORDER BY days_between_orders ASC
LIMIT 10;`,
    findings: [
      'Repeat customers represented 28% of user base but generated 59% of overall platform revenue.',
      'Average repurchase cycle was 26 days for fast-moving consumer goods vs. 78 days for electronics.',
      'Query execution speed was improved by adding targeted B-Tree indexes on customer_id and order_date columns.'
    ]
  },

  'modal-web': {
    tag: 'HTML5 &bull; CSS3 &bull; JavaScript &bull; UI/UX',
    title: 'Interactive Data Metrics & Portfolio Portal',
    overview: 'A lightweight, performance-focused web analytics portal engineered to present data analysis findings, interactive data tables, and dynamic visual summaries in a responsive browser experience.',
    approach: [
      '<strong>Semantic Structure:</strong> Developed cleanly structured HTML5 layouts adhering to W3C accessibility guidelines and semantic landmark standards.',
      '<strong>CSS Glassmorphism & Electric Blue/Mint Palette:</strong> Applied modern dark-mode styling utilizing CSS custom properties, grid layouts, and smooth micro-animations.',
      '<strong>Lightweight Interactivity:</strong> Built responsive filtering, dynamic modal overlays, and print-ready resume rendering with vanilla JavaScript without bulky frameworks.',
      '<strong>Cross-Device Compatibility:</strong> Rigorously optimized for seamless navigation across mobile phones, tablets, and high-resolution desktop monitors.'
    ],
    codeTitle: 'Vanilla JavaScript Dynamic Filtering Snippet:',
    codeSnippet: `// Dynamic Filter Handler without external dependencies
function filterProjects(selectedCategory) {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    const isVisible = (selectedCategory === 'all' || cardCategory === selectedCategory);
    
    card.style.opacity = isVisible ? '1' : '0';
    card.style.display = isVisible ? 'flex' : 'none';
  });
}`,
    findings: [
      'Zero dependency footprint ensures lightning-fast load times and instant rendering.',
      'Built-in browser print styling enables recruiters to save or print clean PDF resumes directly from the portal.',
      'Fully responsive UI tested across mobile, tablet, and widescreen viewports.'
    ]
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeProjectModal');
  const modalContent = document.getElementById('modalDynamicContent');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modal || !closeBtn || !modalContent) return;

  let lastFocusedEl = null;

  const openModal = (modalKey, triggerEl) => {
    const data = projectDetailsData[modalKey];
    if (!data) return;

    lastFocusedEl = triggerEl || document.activeElement;

    modalContent.innerHTML = `
      <div class="modal-project-header">
        <span class="modal-project-tag">${data.tag}</span>
        <h2 class="modal-project-title" id="projectModalTitle">${data.title}</h2>
      </div>

      <h3 class="modal-section-title">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        Project Overview & Context
      </h3>
      <p class="modal-body-text">${data.overview}</p>

      <h3 class="modal-section-title">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        Methodology & Analytical Steps
      </h3>
      <ul class="modal-bullet-list">
        ${data.approach.map(step => `<li>${step}</li>`).join('')}
      </ul>

      <h3 class="modal-section-title">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        ${data.codeTitle}
      </h3>
      <pre class="modal-code-block"><code>${escapeHtml(data.codeSnippet)}</code></pre>

      <h3 class="modal-section-title">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Key Insights & Impact
      </h3>
      <ul class="modal-bullet-list">
        ${data.findings.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
      lastFocusedEl = null;
    }
  };

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey, btn);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ==========================================================================
   7. RESUME MODAL & PRINT / DOWNLOAD
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeBtn = document.getElementById('closeResumeModal');
  const openResumeBtn = document.getElementById('openResumeModalBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  if (!resumeModal) return;

  let lastFocusedEl = null;

  const openResume = () => {
    lastFocusedEl = document.activeElement;
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeResumeBtn) closeResumeBtn.focus();
  };

  const closeResume = () => {
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
      lastFocusedEl = null;
    }
  };

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeResume();
    }
  });

  // Print button
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function initResumeDownloads() {
  const downloadLinks = document.querySelectorAll('.js-resume-download');
  if (downloadLinks.length === 0) return;

  downloadLinks.forEach(link => {
    link.setAttribute('href', PORTFOLIO_CONFIG.resumeFilename);
    link.setAttribute('download', PORTFOLIO_CONFIG.resumeFilename);
  });
}

function downloadResumeSummary() {
  const resumeText = `================================================================================
GOWTHAM KUMAR
Aspiring Data Analyst | B.Tech Artificial Intelligence & Data Science
Location: Tamil Nadu, India
Email: ${PORTFOLIO_CONFIG.email}
LinkedIn: ${PORTFOLIO_CONFIG.linkedin}
GitHub: ${PORTFOLIO_CONFIG.github}
================================================================================

EDUCATION
--------------------------------------------------------------------------------
Bachelor of Technology (B.Tech) - Artificial Intelligence & Data Science
Annaimira College of Engineering and Technology, Tamil Nadu, India
Expected Graduation: 2027

Relevant Coursework:
- Database Management Systems (DBMS)
- Data Structures & Algorithms
- Applied Probability & Statistics
- Python for Data Analysis
- Data Mining & Warehousing
- Foundations of Artificial Intelligence

SKILLS & COMPETENCIES
--------------------------------------------------------------------------------
Technical Skills:
* SQL: Relational queries, Joins, Aggregations, GROUP BY, Window Functions, Subqueries, CTEs
* Python: Data Wrangling, Exploratory Data Analysis (EDA), Pandas, NumPy, Matplotlib, Seaborn
* Microsoft Excel: XLOOKUP/VLOOKUP, Pivot Tables, Conditional Formatting, Data Validation, Tabular Modeling
* Machine Learning Basics: Supervised & Unsupervised Learning, Feature Preprocessing, Model Evaluation

Soft Skills:
* Leadership (Key Core Strength): Initiative, strategic vision, peer mentorship & project direction
* Team Management: Workflow coordination, milestone tracking & team alignment
* Communication: Quantitative storytelling, executive presentations & active listening
* Teamwork: Cross-functional collaboration, knowledge sharing & mutual support
* Problem Solving: Hypothesis testing, root cause analysis & structured problem decomposition
* Adaptability: Rapid technical mastery, agile pivoting & continuous learning

FEATURED PROJECTS
--------------------------------------------------------------------------------
1. Retail Sales & Revenue Performance Dashboard (Power BI & Excel)
   - Multi-page interactive dashboard tracking monthly sales revenue, profit margins, and regional performance.
   - Built custom DAX measures for YoY revenue growth, profit margins, and cumulative volume.

2. Customer Churn & Behavioral Pattern Analysis (Python & EDA)
   - Conducted exploratory data analysis on 7,000+ subscription records to identify key churn drivers.
   - Evaluated correlation matrices and contract tiers (Month-to-Month vs Annual) with Seaborn.

3. E-Commerce Relational Database & SQL Analytics (SQL - PostgreSQL/MySQL)
   - Designed a normalized relational schema for customers, orders, and products.
   - Formulated CTEs and Window Functions (DENSE_RANK, LAG) to measure customer repurchase velocity.

4. Interactive Data Metrics & Portfolio Portal (HTML, CSS & JavaScript)
   - Developed a responsive, deep charcoal (#101820) portfolio interface with Electric Blue & Mint styling for showcasing data deliverables.
================================================================================`;

  const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = PORTFOLIO_CONFIG.resumeFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ==========================================================================
   8. COPY EMAIL HELPER & CONTACT FORM HANDLING (MAILTO INTEGRATION)
   ========================================================================== */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.js-copy-btn');
  if (copyBtns.length === 0) return;

  copyBtns.forEach(copyBtn => {
    copyBtn.addEventListener('click', async () => {
      const value = copyBtn.getAttribute('data-copy') || copyBtn.getAttribute('data-email') || PORTFOLIO_CONFIG.email;
      let copied = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(value);
          copied = true;
        } catch (_) {
          copied = false;
        }
      }

      if (!copied) {
        const tempInput = document.createElement('input');
        tempInput.value = value;
        tempInput.setAttribute('readonly', '');
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          copied = document.execCommand('copy');
        } catch (_) {
          copied = false;
        }
        document.body.removeChild(tempInput);
      }

      copyBtn.textContent = copied ? 'Copied!' : value;
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const subjectInput = document.getElementById('messageSubject');
  const messageInput = document.getElementById('userMessage');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitFormBtn');

  if (!form || !feedback || !submitBtn) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset previous errors
    document.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));
    feedback.className = 'form-feedback';
    feedback.style.display = 'none';

    // Validate Name
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Email
    const emailVal = emailInput ? emailInput.value.trim() : '';
    if (!emailRegex.test(emailVal)) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Message
    const messageVal = messageInput ? messageInput.value.trim() : '';
    if (!messageVal || messageVal.length < 10) {
      messageInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) return;

    // Dynamic subject line
    const subjectVal = (subjectInput && subjectInput.value.trim())
      ? subjectInput.value.trim()
      : `Data Analyst Inquiry from ${nameVal}`;

    // Construct formatted mailto body
    const emailBody = `Hello Gowtham,\n\nName: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}\n\n---\nSent from Gowtham Kumar's Data Analyst Portfolio Website`;
    const mailtoUrl = `mailto:${PORTFOLIO_CONFIG.email}?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(emailBody)}`;

    // Trigger mailto synchronously inside the submit gesture so browsers do not block it
    const mailAnchor = document.createElement('a');
    mailAnchor.href = mailtoUrl;
    mailAnchor.style.display = 'none';
    document.body.appendChild(mailAnchor);
    mailAnchor.click();
    document.body.removeChild(mailAnchor);

    feedback.className = 'form-feedback success';
    feedback.innerHTML = `Opening your email client... If it didn't launch automatically, <a href="${escapeHtml(mailtoUrl)}" style="color: var(--accent-mint); font-weight: 600; text-decoration: underline;">click here to compose your email</a> or write directly to <strong>${escapeHtml(PORTFOLIO_CONFIG.email)}</strong>.`;
    feedback.style.display = 'block';

    form.reset();
  });
}

/* ==========================================================================
   9. SCROLL TO TOP BUTTON
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. FOOTER CURRENT YEAR
   ========================================================================== */
function setCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
