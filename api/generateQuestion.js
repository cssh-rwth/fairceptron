export const generateRandomQuestion = () => {
  const question = {
    personas: [],
    questionType: '',
    showScores: true,
    colors: [
      'text-teal-300',
      'text-orange-300',
      'text-yellow-300',
      'text-purple-300',
    ],
    groupNames: ['Frauen', 'Männer'],
  }
  const noOfPersonas = 10 // Math.floor(Math.random() * 12) + 3
  const noOfGroups = 2 // Math.floor(Math.random() * 3) + 1
  const noSelected = Math.floor(Math.random() * noOfPersonas * 0.3) + 1
  for (let i = 0; i < noOfPersonas; i++) {
    let group = i
    if (i >= noOfGroups) group = Math.floor(Math.random() * noOfGroups)
    const qualification = Math.floor(Math.random() * 100)
    question.personas.push({ group, selected: false, qualification })
  }
  for (let i = 0; i < noSelected; i++) {
    if (Math.floor(Math.random() * noOfPersonas))
      question.personas[i].selected = true
  }
  const type = Math.random() > 0.5 ? 'selection' : 'ranking'
  question.questionType = type
  const scoreVisibility = Math.random() > 0.5
  question.showScores = scoreVisibility
  return question
}

export const getPreSurveyQuestion = (number) => {
  const qualMajRegular = [
    [],
    [],
    [],
    [],
    [],
    [96, 83, 76, 69, 62],
    [98, 86, 79, 73, 68, 61],
    [100, 87, 81, 76, 71, 67, 60],
  ]
  const qualMinOver = [
    [],
    [89],
    [99, 80],
    [100, 89, 78],
    [100, 93, 85, 76],
    [100, 96, 89, 82, 75],
  ]
  const ratios = [
    { maj: 7, min: 3, maj_sel: 3, min_sel: 0, maj_label: 'male' },
    { maj: 7, min: 3, maj_sel: 2, min_sel: 1, maj_label: 'male' },
    { maj: 7, min: 3, maj_sel: 1, min_sel: 2, maj_label: 'male' },
    { maj: 7, min: 3, maj_sel: 0, min_sel: 3, maj_label: 'male' },
    { maj: 6, min: 4, maj_sel: 3, min_sel: 0, maj_label: 'male' },
    { maj: 6, min: 4, maj_sel: 2, min_sel: 1, maj_label: 'male' },
    { maj: 6, min: 4, maj_sel: 1, min_sel: 2, maj_label: 'male' },
    { maj: 6, min: 4, maj_sel: 0, min_sel: 3, maj_label: 'male' },
    { maj: 5, min: 5, maj_sel: 3, min_sel: 0, maj_label: 'male' },
    { maj: 5, min: 5, maj_sel: 2, min_sel: 1, maj_label: 'male' },
    { maj: 7, min: 3, maj_sel: 3, min_sel: 0, maj_label: 'female' },
    { maj: 7, min: 3, maj_sel: 2, min_sel: 1, maj_label: 'female' },
    { maj: 7, min: 3, maj_sel: 1, min_sel: 2, maj_label: 'female' },
    { maj: 7, min: 3, maj_sel: 0, min_sel: 3, maj_label: 'female' },
    { maj: 6, min: 4, maj_sel: 3, min_sel: 0, maj_label: 'female' },
    { maj: 6, min: 4, maj_sel: 2, min_sel: 1, maj_label: 'female' },
    { maj: 6, min: 4, maj_sel: 1, min_sel: 2, maj_label: 'female' },
    { maj: 6, min: 4, maj_sel: 0, min_sel: 3, maj_label: 'female' },
  ]
  const shuffledNo = [
    12,
    8,
    9,
    10,
    0,
    5,
    16,
    2,
    3,
    17,
    15,
    11,
    14,
    7,
    13,
    6,
    1,
    4,
  ]
  const questionNo = shuffledNo[number - 1]

  // fixed settings
  const question = {
    personas: [],
    questionType: 'selection',
    showScores: true,
    colors: [],
    groupNames: [],
  }
  // add groupNames
  question.groupNames =
    ratios[questionNo].maj_label === 'male'
      ? ['Frauen', 'Männer']
      : ['Männer', 'Frauen']
  // add colors
  question.colors =
    ratios[questionNo].maj_label === 'male'
      ? ['text-teal-300', 'text-orange-300']
      : ['text-orange-300', 'text-teal-300']
  // add minority personas
  for (let i = 0; i < ratios[questionNo].min; i++) {
    const selected = i < ratios[questionNo].min_sel
    const qualification = qualMinOver[ratios[questionNo].min][i]
    question.personas.push({ group: 0, selected, qualification })
  }
  // add majority personas
  for (let i = 0; i < ratios[questionNo].maj; i++) {
    const selected = i < ratios[questionNo].maj_sel
    const qualification = qualMajRegular[ratios[questionNo].maj][i]
    question.personas.push({ group: 1, selected, qualification })
  }

  return question
}
