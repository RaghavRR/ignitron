import React from 'react';
import SolutionDetail from './SolutionDetail';
import { solutionData } from './solutionData';

export default function SchoolDigitalSolutions() {
  return <SolutionDetail solution={solutionData.digital} />;
}
