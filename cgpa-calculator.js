function calculateGPA(subjects) {
  if (!Array.isArray(subjects)) {
    throw new Error("Subjects should be an array.");
  }

  // for TARUMT
  const gradePoints = {
    'A': 4.00,
    'A-': 3.75,
    'B+': 3.5,
    'B': 3.00,
    'B-': 2.75,
    'C+': 2.5,
    'C': 2.00,
    'F': 0.00,
  };

  const totalGradePoints = subjects.reduce((total, subject) => {
    if (!subject.hasOwnProperty('grade') || !subject.hasOwnProperty('creditHour')) {
      throw new Error("Each subject should have 'grade' and 'creditHour' properties.");
    }

    const { grade, creditHour } = subject;
    const numericCreditHour = parseFloat(creditHour);

    if (!gradePoints.hasOwnProperty(grade)) {
      throw new Error(`Invalid grade: ${grade}`);
    }

    if (isNaN(numericCreditHour) || numericCreditHour <= 0) {
      throw new Error(`Invalid credit hours for subject: ${subject.name}`);
    }

    return total + gradePoints[grade] * numericCreditHour;
  }, 0);

  const totalCreditHours = subjects.reduce((total, subject) => {
    const numericCreditHour = parseFloat(subject.creditHour);
    return total + (isNaN(numericCreditHour) ? 0 : numericCreditHour);
  }, 0);

  return (totalGradePoints / totalCreditHours).toFixed(5);
}

function calculateCGPA(semesters) {
  if (!Array.isArray(semesters)) {
    throw new Error("Semesters should be an array.");
  }

  let totalCGPAPoints = 0;
  let totalCreditHours = 0;

  var cgpa = 0;

  for (const semester of semesters) {
    const semesterGPA = calculateGPA(semester.subjects);
    const semesterCreditHours = semester.subjects.reduce((total, subject) => {
      const numericCreditHour = parseFloat(subject.creditHour);
      return total + (isNaN(numericCreditHour) ? 0 : numericCreditHour);
    }, 0);

    totalCGPAPoints += semesterGPA * semesterCreditHours;
    totalCreditHours += semesterCreditHours;

    console.log(`GPA for Semester: ${parseFloat(semesterGPA).toFixed(5)}`);

    cgpa = (totalCGPAPoints / totalCreditHours).toFixed(5);
    console.log(`CGPA: ${cgpa}`);
  }

  
  return cgpa;
}

// usage
const semesters = [
  {
    subjects: [
      { name: "PROGRAMMING CONCEPTS AND DESIGN I", grade: "A", creditHour: "3" },
      { name: "INTRODUCTION TO INFORMATION TECHNOLOGY", grade: "A", creditHour: "4" },
      { name: "PRE-CALCULUS", grade: "A", creditHour: "4" },
      { name: "ACCOUNTING METHODS I", grade: "A-", creditHour: "3" },
      { name: "ENGLISH LANGUAGE", grade: "C+", creditHour: "3" }
    ]
  },
  {
    subjects: [
      { name: "PROGRAMMING CONCEPTS AND DESIGN II", grade: "A", creditHour: "4" },
      { name: "PRINCIPLES OF INFORMATION SYSTEMS", grade: "A", creditHour: "3" },
      { name: "INTRODUCTORY CALCULUS", grade: "A", creditHour: "3" },
      { name: "ACCOUNTING METHODS II", grade: "A-", creditHour: "3" },
      { name: "ENGLISH FOR COMMUNICATION", grade: "B-", creditHour: "3" },
      { name: "PENGAJIAN MALAYSIA 2", grade: "B", creditHour: "3" }
    ]
  },
  {
    subjects: [
      { name: "WEB DESIGN AND DEVELOPMENT", grade: "A", creditHour: "3" },
      { name: "STATISTICS I", grade: "A", creditHour: "3" },
      { name: "ENGLISH FOR IELTS", grade: "C", creditHour: "3" }
    ]
  },
  {
    subjects: [
      { name: "SYSTEMS ANALYSIS AND DESIGN", grade: "A-", creditHour: "4" },
      { name: "OBJECT-ORIENTED PROGRAMMING TECHNIQUES", grade: "A", creditHour: "4" },
      { name: "DATABASE DEVELOPMENT AND APPLICATIONS", grade: "A", creditHour: "3" },
      { name: "COMPUTER SYSTEMS ARCHITECTURE", grade: "A", creditHour: "4" },
      { name: "STATISTICS II", grade: "A", creditHour: "4" }
    ]
  },
  {
    subjects: [
      { name: "FUNDAMENTALS OF COMPUTER NETWORKS", grade: "A", creditHour: "4" },
      { name: "OPERATING SYSTEMS", grade: "A-", creditHour: "4" },
      { name: "ALGEBRA", grade: "A", creditHour: "3" },
      { name: "DISCRETE MATHEMATICS", grade: "A", creditHour: "4" },
      { name: "PUBLIC SPEAKING", grade: "A-", creditHour: "2" },
      { name: "CIVIC CONSCIOUSNESS AND VOLUNTEERISM", grade: "A", creditHour: "2" }
    ]
  },
];

calculateCGPA(semesters);
