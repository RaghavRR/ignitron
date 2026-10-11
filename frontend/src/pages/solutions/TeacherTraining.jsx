import React from 'react';
import SolutionDetail from './SolutionDetail';
import { solutionData } from './solutionData';

export default function TeacherTraining() {
  return <SolutionDetail solution={solutionData.training} />;
}
