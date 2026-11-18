export interface Project {
  title: string;
  category: 'Full-Stack' | 'AI / ML' | 'Product' | 'Systems & Hardware' | 'Graphics';
  tagline: string;
  description: string;
  businessImpact?: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  markLevel: string; // e.g. "BUILD v8.5", "RESEARCH v5.0"
}

export interface SkillCategory {
  id: string;
  title: string;
  code: string; // e.g. "SYS-MOD-01"
  icon: string;
  description?: string;
  skills: { name: string; level: number; tag: string }[];
}

export const portfolioData = {
  personal: {
    name: "SINDID ARAFAT",
    codename: "SA-ARCHITECT // 001",
    tagline: "Product & Business Analyst | AI/ML & Full-Stack Engineer",
    location: "Dhaka, Bangladesh",
    coordinates: "23.8103° N, 90.4125° E",
    status: "DATA & STRATEGY INTERN @ CAP",
    cgpa: "3.69 / 4.00",
    email: "sindidarafat275@gmail.com",
    phone: "+880 1735807816",
    linkedin: "https://linkedin.com/in/sindid-arafat-1a593233b",
    github: "https://github.com/sindidarafat",
    cvUrl: "/Sindid_Arafat_CV.pdf",
    summary:
      "Computer Science and Engineering graduate and UIHP Innovation Hub Inter-University winner combining analytical thinking, technical depth, and proven leadership. Hands-on experience in data analysis, campaign strategy, AI/ML, and full-stack development, paired with a Business Analyst's strength in requirements gathering, PRD documentation, stakeholder coordination, and turning user needs into measurable, practical solutions."
  },

  hudStats: [
    { label: "ACADEMIC MERIT", value: "3.69 CGPA", detail: "BRAC University CSE", color: "arc" },
    { label: "GITHUB PROJECTS", value: "29 Repos", detail: "AI/ML, Web & Systems", color: "gold" },
    { label: "UIHP INNOVATION HUB", value: "Inter-Uni Winner", detail: "Ranked for National Round", color: "crimson" },
    { label: "SCHOLARSHIPS", value: "4x Dean's/VC", detail: "Merit-Based Honors", color: "arc" },
  ],

  skillCategories: [
    {
      id: "product-ba",
      title: "Data, Product & Business Analysis",
      code: "PROTOCOL-BA-77",
      icon: "Briefcase",
      description: "Turning audience data, business requirements, and user pain points into actionable insights, dashboards, and PRDs.",
      skills: [
        { name: "SQL, Microsoft Excel & Power BI", level: 95, tag: "Data & BI" },
        { name: "Audience & Campaign Performance Analytics", level: 94, tag: "Analytics" },
        { name: "Requirements Gathering & Discovery", level: 96, tag: "Core BA" },
        { name: "PRD & Functional Specifications", level: 94, tag: "Documentation" },
        { name: "Agile Workflow / Jira & Google Workspace", level: 93, tag: "Management" },
        { name: "PowerPoint, Word & Executive Presentation", level: 95, tag: "Reporting" },
        { name: "Stakeholder Coordination & Team Leadership", level: 97, tag: "Leadership" },
        { name: "UAT Support & Wireframing (Figma)", level: 91, tag: "Product" },
      ]
    },
    {
      id: "ai-ml",
      title: "AI, Machine Learning & Research",
      code: "NEURAL-SYS-09",
      icon: "Cpu",
      description: "Data intelligence, predictive modeling, and cutting-edge neural architectures (KAN, Transformers).",
      skills: [
        { name: "Python", level: 95, tag: "Language" },
        { name: "PyTorch & Deep Learning", level: 88, tag: "Framework" },
        { name: "TensorFlow & Keras", level: 85, tag: "Framework" },
        { name: "Scikit-Learn (Supervised/Unsupervised)", level: 92, tag: "ML" },
        { name: "Pandas & NumPy", level: 96, tag: "Data Analysis" },
        { name: "Matplotlib & Seaborn", level: 92, tag: "Data Viz" },
        { name: "Kolmogorov-Arnold Networks (KAN)", level: 86, tag: "Research" },
        { name: "Transformer Architectures", level: 84, tag: "Research" },
      ]
    },
    {
      id: "web-fullstack",
      title: "Web & Full-Stack Development",
      code: "WEB-ENGINE-03",
      icon: "Globe",
      description: "Architecting responsive, performant user interfaces and secure backend API services.",
      skills: [
        { name: "React & Next.js Ecosystem", level: 92, tag: "Frontend" },
        { name: "TypeScript & JavaScript", level: 94, tag: "Language" },
        { name: "Node.js & Express.js", level: 90, tag: "Backend" },
        { name: "PHP & Laravel Fundamentals", level: 85, tag: "Backend" },
        { name: "MongoDB & NoSQL", level: 88, tag: "Database" },
        { name: "MySQL & Relational SQL", level: 90, tag: "Database" },
        { name: "Tailwind CSS & Modern UI", level: 96, tag: "Styling" },
        { name: ".NET Framework & REST APIs", level: 82, tag: "Enterprise" },
      ]
    },
    {
      id: "languages-systems",
      title: "Programming Languages & Systems",
      code: "CORE-COMPUTE-HEX",
      icon: "Terminal",
      description: "Low-level system comprehension from x86 Assembly and C/C++ to modern high-level OOP.",
      skills: [
        { name: "C & C++", level: 90, tag: "Systems" },
        { name: "C# (.NET)", level: 84, tag: "Language" },
        { name: "Java (OOP & DSA)", level: 88, tag: "Language" },
        { name: "x86 Assembly", level: 78, tag: "Low-Level" },
        { name: "SQL (Complex Queries & Schema)", level: 92, tag: "Data" },
        { name: "Git, Git LFS & GitHub Actions", level: 94, tag: "CI/CD" },
        { name: "Docker Containerization", level: 80, tag: "DevOps" },
        { name: "Postman API Automation", level: 90, tag: "Testing" },
      ]
    },
    {
      id: "creative-design",
      title: "Creative Direction & Design Suite",
      code: "VISUAL-LAB-05",
      icon: "Palette",
      description: "Visual branding, event marketing art direction, UI wireframes, and motion graphics production.",
      skills: [
        { name: "Figma (Design Systems & Prototyping)", level: 95, tag: "Product Design" },
        { name: "Adobe Photoshop", level: 92, tag: "Branding" },
        { name: "Adobe Illustrator", level: 90, tag: "Vector Art" },
        { name: "Adobe Premiere Pro", level: 88, tag: "Video Editing" },
        { name: "Adobe After Effects (Motion Graphics)", level: 86, tag: "Motion" },
        { name: "Event Creative Direction", level: 94, tag: "Leadership" },
      ]
    }
  ] as SkillCategory[],

  featuredProjects: [
    {
      title: "SkillSwap",
      category: "Full-Stack" as const,
      markLevel: "BUILD v8.5",
      tagline: "Collaborative Skill Bartering & Real-time Community Exchange Platform",
      description: "An end-to-end web platform where users can swap skills, communicate via real-time messaging, and connect with peers without currency transactions. Modeled after modern social peer-to-peer barter economies.",
      businessImpact: "Addresses skill inflation and access barriers by enabling direct barter of developer, design, and business talents with built-in rating mechanics.",
      tech: ["MongoDB", "Express.js", "React", "Node.js (MERN)", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/sindidarafat/SkillSwap",
      highlights: [
        "Interactive profile portfolios with offered & requested competencies",
        "Direct peer messaging and proposal confirmation workflows",
        "Secure JWT authentication and dynamic search filtering"
      ]
    },
    {
      title: "Electrician Finder (Hyperlocal Services)",
      category: "Product" as const,
      markLevel: "BUILD v4.2",
      tagline: "Ride-Hailing & On-Demand Utility Booking System for Certified Electricians",
      description: "A tailored web application modeled on Uber and Foodpanda operational workflows to solve urban maintenance problems in Bangladesh by instantly finding, rating, and hiring nearby certified electricians.",
      businessImpact: "Developed under CSE-370 as a full business-technical project: PRD, user journey maps, dispatch logic, and pricing transparency.",
      tech: ["PHP", "MySQL", "JavaScript", "REST APIs", "Bootstrap / CSS3"],
      githubUrl: "https://github.com/sindidarafat/CSE-370-Project",
      highlights: [
        "Proximity-based electrician discovery and availability toggles",
        "Job estimation, emergency request routing, and feedback ratings",
        "Admin control panel with verification workflows for service providers"
      ]
    },
    {
      title: "Bank Loan Approval Prediction Engine",
      category: "AI / ML" as const,
      markLevel: "MODEL v3.7",
      tagline: "Predictive Risk Analytics & Automated Credit Underwriting Classifier (~85% Accuracy)",
      description: "An AI/ML classification pipeline on applicant data that evaluates income, credit score histories, asset ratios, and demographic variables to predict bank loan approvals—reaching ~85% accuracy while identifying key decision factors.",
      businessImpact: "Reduces manual credit assessment cycle time and mitigates loan default exposure through automated decision trees and ensemble modeling.",
      tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      githubUrl: "https://github.com/sindidarafat/AI-ML-project-Bank-Loan-Approval-Prediction-",
      highlights: [
        "Comprehensive EDA and feature importance analysis using correlation matrices",
        "Trained and evaluated Logistic Regression, Random Forests, and XGBoost",
        "Data preprocessing pipeline handling missing data and imbalanced target distributions"
      ]
    },
    {
      title: "Kolmogorov-Arnold Transformer (KAT)",
      category: "AI / ML" as const,
      markLevel: "RESEARCH v5.0",
      tagline: "Cutting-Edge Neural Splines Meets Multi-Head Attention Architectures",
      description: "Advanced deep learning experimentation exploring Kolmogorov-Arnold Networks (KAN) replacing standard MLPs inside Transformer encoder/decoder blocks for enhanced interpretability and parameter efficiency.",
      businessImpact: "Pioneering mathematical research into next-generation neural architectures that learn activation functions on edges rather than fixed node activations.",
      tech: ["PyTorch", "Python", "B-Splines", "Transformer Attention", "Deep Learning"],
      githubUrl: "https://github.com/sindidarafat/KAT--Kolmogorov-Arnold-Transformer--v1-sin1",
      highlights: [
        "Novel integration of learnable univariate B-spline basis functions into attention layers",
        "Performance and parameter efficiency benchmarking against standard transformer blocks",
        "Published source code and experimental evaluation notebooks"
      ]
    },
    {
      title: "Heart Disease & Weather AI Predictors",
      category: "AI / ML" as const,
      markLevel: "MODEL v2.6",
      tagline: "Dual Diagnostic AI Pipelines for Clinical Biometrics & Meteorological Forecasts",
      description: "Two clinical and environmental machine learning systems. Heart Disease Predictor detects early cardiovascular vulnerability from patient vital signs; Weather Predictor AI models microclimatic precipitation factors.",
      businessImpact: "Translates complex sensor and diagnostic telemetry into immediate early-warning probabilities for medical clinicians and weather tracking.",
      tech: ["Python", "Scikit-learn", "Pandas", "Statistical Modeling", "Jupyter"],
      githubUrl: "https://github.com/sindidarafat/Heart_Disease_Predictor",
      highlights: [
        "Clinical symptom vector analysis (blood pressure, cholesterol, resting ECG)",
        "Atmospheric trend modeling with time-series feature engineering",
        "High accuracy validation metrics and cross-validation verification"
      ]
    },
    {
      title: "MADMAX Fury Road (3D OpenGL Game)",
      category: "Graphics" as const,
      markLevel: "ENGINE v3.0",
      tagline: "High-Octane 3D Vehicular Combat & Interactive Graphics Engine",
      description: "An arcade combat and obstacle-dodging game built from scratch using C++ and the OpenGL graphics rendering pipeline, complete with dynamic lighting, camera coordinates, and collision physics.",
      businessImpact: "Demonstrates core mastery of the hardware rendering pipeline, vector transformation mathematics, and real-time game loop performance optimization.",
      tech: ["C++", "OpenGL", "GLSL Shaders", "Matrix Mathematics", "Collision Engine"],
      githubUrl: "https://github.com/sindidarafat/openGL-Game---MADMAX-FURY-ROAD",
      highlights: [
        "Custom 3D vehicle meshes, terrain rendering, and particle dust trails",
        "Real-time Phong illumination model with ambient, diffuse, and specular lighting",
        "60 FPS physics collision bounding box management"
      ]
    },
    {
      title: "Simon Says 3x3 Matrix & MiniVSFS Systems",
      category: "Systems & Hardware" as const,
      markLevel: "SYSTEM v1.0",
      tagline: "Embedded Microprocessor Engineering & Low-Level File System Simulator",
      description: "A hardware 3x3 LED matrix physical game running on Arduino Uno (C++) combined with MiniVSFS, a low-level C file system image generator that simulates inode tables and block allocation.",
      businessImpact: "Proves root-level computer science competence: understanding memory registers, micro-controllers, disk sectors, and bare-metal hardware execution.",
      tech: ["C", "C++", "Arduino Uno", "Hardware Prototyping", "File System Internals"],
      githubUrl: "https://github.com/sindidarafat/simon-says-game--an-arduino-uno-project-with-3-3-matrix-9-leds",
      highlights: [
        "9-LED multiplexed grid with tactile interrupt button debounce routines",
        "Disk sector image creation, super-block, and inode indexing in pure C",
        "Low memory footprint designed for strict microcontroller constraints"
      ]
    },
    {
      title: "SmartOffice & CapSite Product Suite",
      category: "Product" as const,
      markLevel: "SUITE v2.9",
      tagline: "Agile Task Management & Workplace Resource Intelligence Suite",
      description: "Modern web tools including Cap Task Board and SmartOffice for sprint velocity tracking, task status boards, and self-assessment evaluations.",
      businessImpact: "Engineered specifically to solve team productivity visibility, sprint backlogs, and workflow accountability.",
      tech: ["TypeScript", "React", "State Management", "Tailwind CSS"],
      githubUrl: "https://github.com/sindidarafat/cap-task-board",
      highlights: [
        "Kanban-style drag-and-drop task progression and priority tagging",
        "Team velocity and completion metrics dashboard",
        "Clean, responsive interface optimized for agile sprint teams"
      ]
    }
  ] as Project[],

  // All 29 real repositories fetched from sindidarafat's GitHub
  allGithubRepos: [
    {
      name: "SkillSwap",
      description: "Platform where users showcase skills, connect, discuss, and barter skills without cash barriers.",
      language: "TypeScript",
      stars: 0,
      url: "https://github.com/sindidarafat/SkillSwap",
      category: "Full-Stack"
    },
    {
      name: "CSE-370-Project (Electrician Finder)",
      description: "Uber/Pathao-style on-demand marketplace connecting users with nearby certified electricians.",
      language: "PHP",
      stars: 1,
      url: "https://github.com/sindidarafat/CSE-370-Project",
      category: "Full-Stack"
    },
    {
      name: "KAT--Kolmogorov-Arnold-Transformer",
      description: "Cutting-edge deep learning research combining KAN splines with Transformer attention blocks.",
      language: "Python",
      stars: 0,
      url: "https://github.com/sindidarafat/KAT--Kolmogorov-Arnold-Transformer--v1-sin1",
      category: "AI / ML"
    },
    {
      name: "HybridCLKAN",
      description: "Hybrid Convolutional & Kolmogorov-Arnold Network deep neural network architecture.",
      language: "Python",
      stars: 1,
      url: "https://github.com/sindidarafat/HybridCLKAN",
      category: "AI / ML"
    },
    {
      name: "AI-ML-project-Bank-Loan-Approval-Prediction",
      description: "Machine learning model predicting bank loan authorization risk from applicant profiles.",
      language: "Jupyter Notebook",
      stars: 0,
      url: "https://github.com/sindidarafat/AI-ML-project-Bank-Loan-Approval-Prediction-",
      category: "AI / ML"
    },
    {
      name: "Heart_Disease_Predictor",
      description: "Diagnostic machine learning model predicting cardiovascular disease from patient symptoms.",
      language: "Jupyter Notebook",
      stars: 0,
      url: "https://github.com/sindidarafat/Heart_Disease_Predictor",
      category: "AI / ML"
    },
    {
      name: "Weather-Predictor-AI",
      description: "AI-based weather prediction model trained on meteorological atmospheric patterns.",
      language: "Jupyter Notebook",
      stars: 0,
      url: "https://github.com/sindidarafat/Weather-Predictor-AI",
      category: "AI / ML"
    },
    {
      name: "openGL-Game---MADMAX-FURY-ROAD",
      description: "3D real-time graphics and vehicular combat arcade game built in C++ and OpenGL.",
      language: "C++",
      stars: 0,
      url: "https://github.com/sindidarafat/openGL-Game---MADMAX-FURY-ROAD",
      category: "Graphics"
    },
    {
      name: "simon-says-game-arduino-uno",
      description: "Embedded C++ hardware game utilizing Arduino Uno and a 3x3 matrix of 9 LEDs.",
      language: "C++",
      stars: 0,
      url: "https://github.com/sindidarafat/simon-says-game--an-arduino-uno-project-with-3-3-matrix-9-leds",
      category: "Systems"
    },
    {
      name: "Microprocessor-Project-MiniVSFS",
      description: "A C-based VSFS (Very Simple File System) disk image generator and filesystem simulator.",
      language: "C",
      stars: 0,
      url: "https://github.com/sindidarafat/Microprocessor-Project--MiniVSFS-A-C-based-VSFS-Image-Generator",
      category: "Systems"
    },
    {
      name: "Assembly-Language-Project---FunGame-Store",
      description: "Low-level x86 Assembly game platform showcasing register manipulation and interrupts.",
      language: "Assembly",
      stars: 0,
      url: "https://github.com/sindidarafat/Assembly-Language-Project---FunGame-Store",
      category: "Systems"
    },
    {
      name: "cap-task-board",
      description: "Agile task management and sprint coordination board built with modern TypeScript.",
      language: "TypeScript",
      stars: 0,
      url: "https://github.com/sindidarafat/cap-task-board",
      category: "Product"
    },
    {
      name: "capsite",
      description: "Official CAP project web application with responsive UI and state architecture.",
      language: "TypeScript",
      stars: 0,
      url: "https://github.com/sindidarafat/capsite",
      category: "Product"
    },
    {
      name: "SmartOffice",
      description: "Intelligent workplace management system for space allocation and team scheduling.",
      language: "TypeScript",
      stars: 0,
      url: "https://github.com/sindidarafat/SmartOffice",
      category: "Full-Stack"
    },
    {
      name: "Electrician-Finder",
      description: "Core utility service platform backend for booking certified local electricians.",
      language: "PHP",
      stars: 0,
      url: "https://github.com/sindidarafat/Electrician-Finder",
      category: "Full-Stack"
    },
    {
      name: "KAN-sin",
      description: "Kolmogorov-Arnold Network experiments for complex non-linear curve fitting.",
      language: "Python",
      stars: 0,
      url: "https://github.com/sindidarafat/KAN-sin",
      category: "AI / ML"
    },
    {
      name: "Bank_Loan_Approval_AI",
      description: "End-to-end classification system for banking risk assessment.",
      language: "Jupyter Notebook",
      stars: 0,
      url: "https://github.com/sindidarafat/Bank_Loan_Approval_AI",
      category: "AI / ML"
    },
    {
      name: "skillswapfull",
      description: "Complete full-stack repository for the SkillSwap collaborative barter platform.",
      language: "JavaScript",
      stars: 0,
      url: "https://github.com/sindidarafat/skillswapfull",
      category: "Full-Stack"
    },
    {
      name: "capwork",
      description: "Interactive task components and client-side logic for the CAP ecosystem.",
      language: "JavaScript",
      stars: 0,
      url: "https://github.com/sindidarafat/capwork",
      category: "Product"
    },
    {
      name: "self_assesment_for_CAP",
      description: "Self-assessment evaluation interface with dynamic scoring metrics.",
      language: "HTML / JS",
      stars: 0,
      url: "https://github.com/sindidarafat/self_assesment_for_CAP",
      category: "Product"
    },
    {
      name: "Recursion-Basic-codes-to-understand",
      description: "Algorithmic reference repository detailing foundational recursion and tree traversals.",
      language: "Jupyter Notebook",
      stars: 0,
      url: "https://github.com/sindidarafat/Recursion-Basic-codes-to-understand",
      category: "Algorithms"
    },
    {
      name: "428project",
      description: "Advanced university research project on algorithmic system optimization.",
      language: "Python",
      stars: 0,
      url: "https://github.com/sindidarafat/428project",
      category: "Research"
    },
    {
      name: "428_lab3_temp",
      description: "Experimental data science laboratory algorithms and benchmark trials.",
      language: "Jupyter Notebook",
      stars: 0,
      url: "https://github.com/sindidarafat/428_lab3_temp",
      category: "Research"
    },
    {
      name: "similarrr",
      description: "Vector similarity and embedding distance analysis module.",
      language: "Python",
      stars: 0,
      url: "https://github.com/sindidarafat/similarrr",
      category: "AI / ML"
    },
    {
      name: "assesment_for_dola_apu",
      description: "Targeted product UI evaluation and form validation engine.",
      language: "HTML / CSS",
      stars: 0,
      url: "https://github.com/sindidarafat/assesment_for_dola_apu",
      category: "Product"
    },
    {
      name: "dola_apu_assesment",
      description: "Interactive assessment module testing response consistency and feedback loops.",
      language: "HTML / CSS",
      stars: 0,
      url: "https://github.com/sindidarafat/dola_apu_assesment",
      category: "Product"
    },
    {
      name: "cap_sindid_selfasses",
      description: "Custom self-assessment scorecard interface for performance metrics.",
      language: "HTML",
      stars: 0,
      url: "https://github.com/sindidarafat/cap_sindid_selfasses",
      category: "Product"
    },
    {
      name: "428matha",
      description: "Algorithmic computation and mathematical problem sets.",
      language: "Python",
      stars: 0,
      url: "https://github.com/sindidarafat/428matha",
      category: "Algorithms"
    },
    {
      name: "Website",
      description: "Web development repository for early web architecture experiments.",
      language: "HTML / JS",
      stars: 0,
      url: "https://github.com/sindidarafat/Website",
      category: "Full-Stack"
    }
  ],

  experience: [
    {
      role: "Data and Strategy Intern",
      organization: "CAP (Content, Analytics & Production Ltd.)",
      period: "Nov 2026 – Present",
      location: "Dhaka, Bangladesh",
      badge: "CURRENT ROLE • ANALYTICS",
      achievements: [
        "Analyze audience and campaign performance data to support media planning and campaign optimization.",
        "Work with the data and strategy teams to turn insights into campaign recommendations and clear reporting for client projects."
      ]
    },
    {
      role: "Assistant Director (Volunteer)",
      organization: "BRAC University Computer Club",
      period: "Dec 2022 – Dec 2025",
      location: "Dhaka, Bangladesh",
      badge: "CREATIVE & STRATEGY LEAD",
      achievements: [
        "Led a team of 10+ members to plan and deliver the creative and promotional strategy for IntraHacktive 1.0, which drew 250+ participants.",
        "Directed posters, motion graphics, and the promo video, coordinating deadlines across design, events, and sponsorship teams.",
        "Designed and ran 3 graphic design and motion graphics workshops, training 60+ members."
      ]
    },
    {
      role: "Content Head and Strategy Officer (Part-Time)",
      organization: "One Academy",
      period: "Sep 2024 – Mar 2025",
      location: "Dhaka, Bangladesh",
      badge: "STRATEGY & GROWTH",
      achievements: [
        "Built the content strategy and monthly content calendar for the organization, managing a team of 5 contributors.",
        "Used audience data and tactical campaign planning to raise social media engagement by about 30% over 6 months."
      ]
    },
    {
      role: "ICT Coordinator & Debater",
      organization: "Faridpur Debate Forum",
      period: "Mar 2021 – Apr 2024",
      location: "Faridpur, Bangladesh",
      badge: "DIGITAL COMMS & DEBATE",
      achievements: [
        "Managed club digital communication, brand consistency, and event marketing through creative poster design.",
        "Organized ICT-related workshops and digital educational resources for school and college debaters.",
        "Competed actively as a debater in regional and inter-institutional parliamentary debating championships."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Science in Computer Science and Engineering",
      institution: "BRAC University",
      period: "Sep 2022 – Sep 2026",
      location: "Dhaka, Bangladesh",
      score: "CGPA: 3.69 / 4.00",
      honors: "Earned Merit-Based Scholarship for 4 consecutive semesters (Dean's List & VC's List)",
      courses: "Data Structures, Algorithms, AI/ML, Operating Systems, Database Systems, Software Engineering, Computer Networks"
    },
    {
      degree: "Higher Secondary Certificate (HSC) — Science",
      institution: "Govt. Rajendra College",
      period: "2021",
      location: "Faridpur, Bangladesh",
      score: "GPA: 5.00 / 5.00",
      honors: "Top Tier Distinction"
    },
    {
      degree: "Secondary School Certificate (SSC) — Science",
      institution: "Faridpur Zilla School",
      period: "2019",
      location: "Faridpur, Bangladesh",
      score: "GPA: 5.00 / 5.00",
      honors: "Top Tier Distinction"
    }
  ],

  awards: [
    {
      title: "UIHP Innovation Hub Inter-University Winner",
      organization: "ICT Division, Government of Bangladesh & The World Bank",
      date: "Jul 2025",
      description: "Won the Inter-University round of the University Innovation Hub Program (UIHP) powered by The World Bank & ICT Division (BRAC IC6), ranking to advance to the National Round with a tech solution for Bangladesh's service market.",
      type: "Inter-University Winner • National Qualifier"
    },
    {
      title: "Dean's List & Vice Chancellor's List",
      organization: "BRAC University",
      date: "2022 – 2026",
      description: "Recognized on the Dean's List and VC's List for exceptional academic excellence; awarded competitive merit-based tuition scholarships for 4 academic semesters.",
      type: "Academic Merit"
    },
    {
      title: "Bronze Awardee",
      organization: "The Duke of Edinburgh's International Award",
      date: "May 2024",
      description: "Completed rigorous international standards across community volunteering, personal physical recreation, and exploratory expedition programs.",
      type: "International Honor"
    },
    {
      title: "Official Volunteer Distinction",
      organization: "BRAC University",
      date: "2022 – 2025 (3 Years)",
      description: "Honored for 3 years of dedication coordinating international academic conferences, orientations, and student welfare initiatives.",
      type: "Leadership Service"
    }
  ]
};
