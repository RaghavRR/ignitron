import React from 'react';
import SolutionDetail from './SolutionDetail';
import { solutionData } from './solutionData';

export default function CompetitionsEvents() {
  return <SolutionDetail solution={solutionData.events} />;
}
