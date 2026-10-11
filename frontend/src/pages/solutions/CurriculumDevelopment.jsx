import React from 'react';
import SolutionDetail from './SolutionDetail';
import { solutionData } from './solutionData';

export default function CurriculumDevelopment() {
  return <SolutionDetail solution={solutionData.curriculum} />;
}
