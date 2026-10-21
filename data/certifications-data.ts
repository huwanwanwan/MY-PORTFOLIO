export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "Certifications" | "Seminars" | "Competitions";
  image: string;
  alt: string;
  recipient: string;
  description: string;
  tags: string[];
}

export const certificationsData: CertificationItem[] = [
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS) Training & Certification",
    date: "November 04, 2025",
    category: "Certifications",
    image: "/certificates/AWS.png",
    alt: "AWS Cloud Practitioner Essentials Completion Certificate for Juan Enrico D. Militante",
    recipient: "Juan Enrico D. Militante",
    description:
      "Official certificate of completion from AWS Training & Certification, verifying foundational mastery of AWS Cloud infrastructure, security models, compute services, pricing strategies, and architectural best practices.",
    tags: ["Cloud Computing", "AWS", "Cloud Architecture"],
  },
  {
    id: "arduino-competition",
    title: "Arduino Competition — \"La Niña\"",
    issuer: "Pambayang Dalubhasaan ng Marilao · College of Computer Studies",
    date: "May 20, 2024",
    category: "Competitions",
    image: "/certificates/ARDUINO.jpg",
    alt: "Certificate of Participation in Arduino Competition for project La Niña",
    recipient: "Juan Enrico D. Militante",
    description:
      "Certificate of Participation awarded for demonstrating and competing in the College Arduino Exhibit & Competition with \"La Niña\", an IoT rain-sensing audible alarm system presented directly to the College Dean.",
    tags: ["Arduino IDE", "IoT & Hardware", "Embedded Systems"],
  },
  {
    id: "cert-git-seminar",
    title: "Git Happens: The Essential Guide for New Devs",
    issuer: "Pambayang Dalubhasaan ng Marilao · Computer Science Department",
    date: "March 02, 2026",
    category: "Seminars",
    image: "/certificates/CERT-GIT.jpg",
    alt: "Certificate of Participation for Git Happens seminar presented to Juan Enrico D. Militante",
    recipient: "Juan Enrico D. Militante",
    description:
      "Certificate of Participation for actively participating in the intensive seminar on modern Git version control, branching strategies, collaborative workflows, and repository management for software engineers.",
    tags: ["Git", "Version Control", "Dev Workflows"],
  },
  {
    id: "cert-it-capstone-forum",
    title: "IT Capstone Project Public Forum",
    issuer: "Pambayang Dalubhasaan ng Marilao · Information Technology Department",
    date: "January 21, 2026",
    category: "Seminars",
    image: "/certificates/CERT-ATT.png",
    alt: "Certificate of Attendance for IT Capstone Project Public Forum",
    recipient: "Juan Enrico Militante",
    description:
      "Certificate of Attendance for participating in the IT Capstone Project Public Forum, engaging with technical research presentations, capstone defense evaluations, and cutting-edge software solutions.",
    tags: ["Capstone Research", "IT Forum", "System Architecture"],
  },
  {
    id: "res-speak-git",
    title: "Git Happens: The Essential for New Dev (Seminar Event)",
    issuer: "College of Computer Studies · Computer Science Society",
    date: "March 02, 2026",
    category: "Seminars",
    image: "/certificates/RES-SPEAK.png",
    alt: "Event poster for Git Happens: The Essential for New Dev featuring Ms. MJ Manaog",
    recipient: "Computer Science Society",
    description:
      "Official event credential and seminar showcase for the technical session featuring Resource Speaker Ms. MJ Manaog on developer tools, command-line Git mastery, and collaborative code deployment.",
    tags: ["Technical Seminar", "Resource Speaker", "CSS Society"],
  },
  {
    id: "res-speak-ai-webinar",
    title: "Technology and AI Integrated in Your Life",
    issuer: "College of Computer Studies · Computer Science Society",
    date: "March 06, 2026",
    category: "Seminars",
    image: "/certificates/RES-SPEAK-AI.jpg",
    alt: "Event poster for Technology and AI Integrated in Your Life Webinar with Ms. Julia Torres",
    recipient: "Computer Science Society",
    description:
      "Official webinar credential for the community-interest exploration of artificial intelligence workflows, generative AI tooling, and technological integration into modern life with guest speaker Ms. Julia Torres.",
    tags: ["Artificial Intelligence", "Webinar", "AI Integration"],
  },
  {
    id: "google-cloud-applying-ai-principles",
    title: "Applying AI Principles with Google Cloud",
    issuer: "Google Cloud",
    date: "Nov 7, 2025",
    category: "Certifications",
    image: "/certificates/aws-1.png",
    alt: "Applying AI Principles with Google Cloud Completion Badge - Google Cloud",
    recipient: "Juan Enrico D. Militante",
    description:
      "Official Google Cloud skill badge verifying the operational application of responsible AI principles, identifying bias, evaluating ethical frameworks, and implementing governance best practices in enterprise ML pipelines.",
    tags: ["Google Cloud", "AI Principles", "Responsible AI"],
  },
  {
    id: "google-cloud-prompt-design-vertex-ai",
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud",
    date: "Nov 1, 2025",
    category: "Certifications",
    image: "/certificates/aws-2.png",
    alt: "Prompt Design in Vertex AI Skill Badge - Google Cloud",
    recipient: "Juan Enrico D. Militante",
    description:
      "Official Google Cloud skill badge credential earned for mastering prompt engineering techniques, multimodal prompt crafting, zero-shot and few-shot conditioning, and tuning parameters using Google Vertex AI Studio.",
    tags: ["Google Cloud", "Vertex AI", "Prompt Engineering"],
  },
  {
    id: "google-cloud-intro-responsible-ai",
    title: "Introduction to Responsible AI",
    issuer: "Google Cloud",
    date: "Oct 30, 2025",
    category: "Certifications",
    image: "/certificates/aws-3.png",
    alt: "Introduction to Responsible AI Completion Badge - Google Cloud",
    recipient: "Juan Enrico D. Militante",
    description:
      "Official Google Cloud course credential focusing on the foundational concepts of ethical AI deployment, fairness, interpretability, transparency, and safety protocols across machine learning lifecycles.",
    tags: ["Google Cloud", "Responsible AI", "Ethics in AI"],
  },
  {
    id: "google-cloud-intro-llm",
    title: "Introduction to Large Language Models",
    issuer: "Google Cloud",
    date: "Oct 30, 2025",
    category: "Certifications",
    image: "/certificates/aws-4.png",
    alt: "Introduction to Large Language Models Completion Badge - Google Cloud",
    recipient: "Juan Enrico D. Militante",
    description:
      "Official Google Cloud credential demonstrating deep foundational understanding of Large Language Models (LLMs), transformer architecture fundamentals, fine-tuning methodologies, and modern generative AI applications.",
    tags: ["Google Cloud", "LLM", "Deep Learning"],
  },
  {
    id: "google-cloud-intro-generative-ai",
    title: "Introduction to Generative AI",
    issuer: "Google Cloud",
    date: "Oct 29, 2025",
    category: "Certifications",
    image: "/certificates/aws-5.png",
    alt: "Introduction to Generative AI Completion Badge - Google Cloud",
    recipient: "Juan Enrico D. Militante",
    description:
      "Official Google Cloud course credential verifying foundational concepts of Generative AI, difference from traditional ML, generative modeling foundations, and Google Cloud Gen AI ecosystem capabilities.",
    tags: ["Google Cloud", "Generative AI", "Machine Learning"],
  },
];

