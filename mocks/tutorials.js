const tutorials = [
  {
    creator_id: "98765432-2345-8765-2345-876543219876",
    tutorial_id: "tutorial1",
    title: "Fire Safety Training",
    video_url: "https://www.youtube.com/watch?v=123456789",
    video_thumb: "thumbnail1.jpg",
    questions_id: [
      {
        question: "What should you do first if you discover a fire?",
        options: [
          "A. Call 911",
          "B. Evacuate the building",
          "C. Attempt to extinguish the fire",
        ],
        answer: "B. Evacuate the building",
        question_id: "question1",
      },
      {
        question:
          "What type of fire extinguisher is suitable for use on electrical fires?",
        options: [
          "A. Water fire extinguisher",
          "B. CO2 fire extinguisher",
          "C. Foam fire extinguisher",
        ],
        answer: "B. CO2 fire extinguisher",
        question_id: "question2",
      },
      {
        question:
          "What is the recommended method for testing a closed door for heat before opening it during a fire?",
        options: [
          "A. Touch the door handle",
          "B. Look through the keyhole",
          "C. Use the back of your hand",
        ],
        answer: "C. Use the back of your hand",
        question_id: "question3",
      },
      {
        question: "What are the three elements of the fire triangle?",
        options: [
          "A. Heat, Fuel, Oxygen",
          "B. Smoke, Water, Fire extinguisher",
          "C. Fire alarm, Emergency exit, Fire drill",
        ],
        answer: "A. Heat, Fuel, Oxygen",
        question_id: "question1",
      },
      {
        question: "What should you do if your clothes catch fire?",
        options: [
          "A. Run away from others",
          "B. Stop, Drop, and Roll",
          "C. Pour water on yourself",
        ],
        answer: "B. Stop, Drop, and Roll",
        question_id: "question2",
      },
    ],
    description:
      "Learn essential fire safety protocols, prevention measures, and evacuation procedures to ensure the safety of the company staff.",
    questions_shown: 5,
    tags: ["Fire Safety", "Staff Training"],
    access_date: "Wed, 21 Jun 2023 23:00:00 GMT",
    due_date: "Tue, 31 Jul 2023 23:59:59 GMT",
  },
  {
    creator_id: "98765432-2345-8765-2345-876543219876",
    tutorial_id: "tutorial2",
    title: "Employee Onboarding Process",
    video_url: "https://www.youtube.com/watch?v=987654321",
    video_thumb: "thumbnail2.jpg",
    questions_id: [
      {
        question: "What is the purpose of the employee onboarding process?",
        options: [
          "A. To complete necessary paperwork",
          "B. To introduce new employees to company policies",
          "C. To help new employees integrate into the team",
        ],
        answer: "C. To help new employees integrate into the team",
        question_id: "question3",
      },
      {
        question:
          "What is typically included in an employee orientation session?",
        options: [
          "A. Overview of the company",
          "B. Introduction to team members",
          "C. Review of company policies",
        ],
        answer: "C. Review of company policies",
        question_id: "question4",
      },
      {
        question:
          "What is the purpose of providing a mentor or buddy to new employees during onboarding?",
        options: [
          "A. To provide guidance and support",
          "B. To help with paperwork",
          "C. To assign tasks and responsibilities",
        ],
        answer: "A. To provide guidance and support",
        question_id: "question5",
      },
    ],
    description:
      "Understand the step-by-step onboarding process for new employees, including orientation, paperwork, company policies, and integration into the team.",
    questions_shown: 10,
    tags: ["Employee Onboarding", "Human Resources"],
    access_date: "Sun, 01 Jul 2023 00:00:00 GMT",
    due_date: "Tue, 31 Jul 2023 23:59:59 GMT",
  },
  {
    creator_id: "76543210-0123-4567-0123-456789012345",
    tutorial_id: "tutorial3",
    title: "Workplace Diversity and Inclusion",
    video_url: "https://www.youtube.com/watch?v=567890123",
    video_thumb: "thumbnail3.jpg",
    questions_id: [
      {
        question: "What is workplace diversity?",
        options: [
          "A. Having employees from different backgrounds",
          "B. Hiring a diverse range of candidates",
          "C. Embracing different perspectives and experiences",
        ],
        answer: "C. Embracing different perspectives and experiences",
        question_id: "question5",
      },
      {
        question: "Why is workplace inclusion important?",
        options: [
          "A. It promotes collaboration and innovation",
          "B. It improves employee satisfaction and retention",
          "C. It creates a positive work environment",
        ],
        answer: "A. It promotes collaboration and innovation",
        question_id: "question6",
      },
      {
        question: "What are some benefits of a diverse workforce?",
        options: [
          "A. Increased creativity and problem-solving",
          "B. Improved decision-making",
          "C. Better understanding of customer needs",
        ],
        answer: "B. Improved decision-making",
        question_id: "question7",
      },
      {
        question: "How can inclusivity be promoted in the workplace?",
        options: [
          "A. Providing diversity and inclusion training",
          "B. Encouraging open and respectful communication",
          "C. Creating equal opportunities for all employees",
        ],
        answer: "B. Encouraging open and respectful communication",
        question_id: "question8",
      },
    ],
    description:
      "Explore the importance of diversity and inclusion in the workplace, promoting equal opportunities, fostering a positive work environment, and embracing different perspectives.",
    questions_shown: 7,
    tags: ["Diversity", "Inclusion", "Workplace Culture"],
    access_date: "Wed, 01 Mar 2023 00:00:00 GMT",
    due_date: "Mon, 14 Aug 2023 23:59:59 GMT",
  },
  {
    creator_id: "76543210-0123-4567-0123-456789012345",
    tutorial_id: "tutorial4",
    title: "Cybersecurity Awareness Training",
    video_url: "https://www.youtube.com/watch?v=234567890",
    video_thumb: "thumbnail4.jpg",
    questions_id: [
      {
        question: "What is phishing?",
        options: [
          "A. A cyber attack that steals sensitive information",
          "B. A type of fishing technique",
          "C. A technique to detect malware on a computer",
        ],
        answer: "A. A cyber attack that steals sensitive information",
        question_id: "question7",
      },
      {
        question: "Why is it important to use strong passwords?",
        options: [
          "A. To make it harder for hackers to guess passwords",
          "B. To avoid forgetting passwords",
          "C. To improve internet speed",
        ],
        answer: "A. To make it harder for hackers to guess passwords",
        question_id: "question8",
      },
      {
        question: "What is a firewall?",
        options: [
          "A. A protective barrier that filters network traffic",
          "B. A type of malware",
          "C. A computer security certification",
        ],
        answer: "A. A protective barrier that filters network traffic",
        question_id: "question7",
      },
      {
        question: "What is two-factor authentication?",
        options: [
          "A. A method that requires two forms of identification to access an account",
          "B. A type of hacking technique",
          "C. A method to install antivirus software",
        ],
        answer:
          "A. A method that requires two forms of identification to access an account",
        question_id: "question8",
      },
    ],
    description:
      "Enhance staff's understanding of cybersecurity risks, best practices for protecting sensitive data, identifying phishing attempts, and maintaining a secure digital environment.",
    questions_shown: 6,
    tags: ["Cybersecurity", "Staff Training"],
    access_date: "Fri, 01 Apr 2022 00:00:00 GMT",
    due_date: "Sat, 30 Apr 2022 23:59:59 GMT",
  },
];

module.exports = tutorials;
