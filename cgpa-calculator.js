function calculateGPA(subjects) {
  if (!Array.isArray(subjects)) {
    throw new Error("Subjects should be an array.");
  }

  const gradePoints = {
    'A': 4.00,
    'A-': 3.75,
    'B+': 3.5,
    'B': 3.00,
    'B-': 2.75,
    'C+': 2.5,
    'C': 2.00,
    'C-': 1.67,
    'D+': 1.33,
    'D': 1.00,
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

// Example usage:
const semesters = [
  {
    subjects: [
      { name: "Subject 1", grade: "A", creditHour: "3" },
      { name: "Subject 2", grade: "A", creditHour: "4" },
      { name: "Subject 3", grade: "A-", creditHour: "4" },
      { name: "Subject 4", grade: "C", creditHour: "3" },
      { name: "Subject 5", grade: "C+", creditHour: "3" }
    ]
  },
  {
    subjects: [
      { name: "Subject 1", grade: "A", creditHour: "4" },
      { name: "Subject 2", grade: "A-", creditHour: "3" },
      { name: "Subject 3", grade: "A", creditHour: "3" },
      { name: "Subject 4", grade: "B", creditHour: "3" },
      { name: "Subject 5", grade: "B-", creditHour: "3" },
      { name: "Subject 6", grade: "B", creditHour: "3" }
    ]
  },
  {
    subjects: [
      { name: "Subject 1", grade: "A", creditHour: "3" },
      { name: "Subject 2", grade: "A", creditHour: "3" },
      { name: "Subject 3", grade: "C", creditHour: "3" }
    ]
  }
];

calculateCGPA(semesters);
