export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "Certifications" | "Seminars" | "Competitions" | "Competitions/Certifications";
  image: string;
  alt: string;
  recipient: string;
  description: string;
  tags: string[];
}

export const certificationsData: CertificationItem[] = [
  {
    id: "computer-hardware-basics",
    title: "Computer Hardware Basics",
    issuer: "Cisco Networking Academy",
    date: "November 20, 2026",
    category: "Certifications",
    image: "/certificates/computer-hardware-basics.png",
    alt: "Computer Hardware Basics completion certificate awarded to Militante Juan Enrico Domanico by Cisco Networking Academy",
    recipient: "Militante Juan Enrico Domanico",
    description:
      "Certificate for successfully completing Computer Hardware Basics, offered by Networking Academy through the Cisco Networking Academy program. Completed on November 20, 2026.",
    tags: ["Computer Hardware", "IT Fundamentals", "Cisco Networking Academy"],
  },
  {
    id: "python-essentials-1",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "November 03, 2026",
    category: "Certifications",
    image: "/certificates/python-essentials-1.png",
    alt: "Python Essentials 1 completion certificate awarded to Militante Juan Enrico Domanico by Cisco Networking Academy",
    recipient: "Militante Juan Enrico Domanico",
    description:
      "Certificate for successfully completing Python Essentials 1, offered by Networking Academy through the Cisco Networking Academy program. Completed on November 3, 2026.",
    tags: ["Python", "Programming", "Cisco Networking Academy"],
  },
  {
    id: "javascript-essentials-1",
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "November 03, 2026",
    category: "Certifications",
    image: "/certificates/javascript-essentials-1.png",
    alt: "JavaScript Essentials 1 completion certificate awarded to Militante Juan Enrico Domanico by Cisco Networking Academy",
    recipient: "Militante Juan Enrico Domanico",
    description:
      "Certificate for successfully completing JavaScript Essentials 1, offered by Networking Academy through the Cisco Networking Academy program. Completed on November 3, 2026.",
    tags: ["JavaScript", "Programming", "Cisco Networking Academy"],
  },
  {
    id: "data-analytics-essentials",
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "October 27, 2026",
    category: "Certifications",
    image: "/certificates/data-analytics-essentials-borderless.png",
    alt: "Data Analytics Essentials completion certificate awarded to Militante Juan Enrico Domanico by Cisco Networking Academy",
    recipient: "Militante Juan Enrico Domanico",
    description:
      "Certificate for successfully completing Data Analytics Essentials, offered by Networking Academy through the Cisco Networking Academy program. Completed on October 27, 2026.",
    tags: ["Data Analytics", "Data Analysis", "Cisco Networking Academy"],
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS) Training & Certification",
    date: "November 04, 2025",
    category: "Certifications",
    image: "/certificates/aws-cloud-practitioner-certificate.png?v=signature-blurred",
    alt: "AWS Cloud Practitioner Essentials Completion Certificate for Juan Enrico D. Militante",
    recipient: "Juan Enrico D. Militante",
    description:
      "Completion certificate from AWS Training & Certification for AWS Cloud Practitioner Essentials, awarded on November 4, 2025.",
    tags: ["Cloud Computing", "AWS", "Cloud Architecture"],
  },
  {
    id: "arduino-competition",
    title: "Arduino Competition — \"La Niña\"",
    issuer: "Pambayang Dalubhasaan ng Marilao · College of Computer Studies",
    date: "May 20, 2024",
    category: "Competitions/Certifications",
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
    category: "Certifications",
    image: "/certificates/git-happens-participation-certificate.png?v=signatures-blurred",
    alt: "Certificate of Participation for Git Happens seminar presented to Juan Enrico D. Militante",
    recipient: "Juan Enrico D. Militante",
    description:
      "Certificate of Participation for the Git Happens: The Essential Guide for New Devs seminar, held on March 2, 2026 at the Multi-Purpose Hall, Pambayang Dalubhasaan ng Marilao.",
    tags: ["Git", "Version Control", "Dev Workflows"],
  },
  {
    id: "cert-it-capstone-forum",
    title: "IT Capstone Project Public Forum",
    issuer: "Pambayang Dalubhasaan ng Marilao · Information Technology Department",
    date: "January 21, 2026",
    category: "Certifications",
    image: "/certificates/it-forum-attendance-certificate.png",
    alt: "Certificate of Attendance for IT Capstone Project Public Forum",
    recipient: "Juan Enrico D. Militante",
    description:
      "Certificate of Attendance for the IT Capstone Project Public Forum, held on January 21, 2026 at the Multipurpose Hall, Pambayang Dalubhasaan ng Marilao.",
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
    id: "cyber-security-seminar-2024",
    title: "Cyber Security Seminar",
    issuer: "Pambayang Dalubhasaan ng Marilao · Computer Science Society",
    date: "April 05, 2024",
    category: "Seminars",
    image: "/certificates/cyber-security-seminar-2024.png",
    alt: "Cyber Security Seminar event poster for April 5, 2024 at PDM Multipurpose Hall, featuring guest speaker Edwin S. Gracia, MSIT",
    recipient: "Computer Science Society",
    description:
      "Event poster for the Cyber Security Seminar held on April 5, 2024, from 1:00 PM to 3:00 PM at PDM Multipurpose Hall, featuring guest speaker Edwin S. Gracia, MSIT.",
    tags: ["Cybersecurity", "Technical Seminar", "Computer Science Society"],
  },
];

