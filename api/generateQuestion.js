export const generateRandomQuestion = () => {
  const question = {
    personas: [],
    type: '',
    showScores: true,
    colors: [
      'text-teal-300',
      'text-orange-300',
      'text-yellow-300',
      'text-purple-300'
    ],
    groupNames: []
  }
  const noOfPersonas = Math.floor(Math.random() * 12) + 3
  const noOfGroups = Math.floor(Math.random() * 3) + 1
  const noSelected = Math.floor(Math.random() * noOfPersonas * 0.3) + 1
  for (let i = 0; i < noOfPersonas; i++) {
    let group = i
    if (i > noOfGroups) group = Math.floor(Math.random() * noOfGroups)
    const value = Math.floor(Math.random() * 100)
    question.personas.push({ group, selected: false, value })
  }
  for (let i = 0; i < noSelected; i++) {
    if (Math.floor(Math.random() * noOfPersonas))
      question.personas[i].selected = true
  }
  const type = Math.random() > 0.5 ? 'selection' : 'ranking'
  question.type = type
  const scoreVisibility = Math.random() > 0.5
  question.showScores = scoreVisibility
  return question
}