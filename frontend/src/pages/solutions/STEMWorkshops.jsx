import React from 'react';
import SolutionDetail from './SolutionDetail';
import { solutionData } from './solutionData';

export default function STEMWorkshops() {
  return <SolutionDetail solution={solutionData.workshops} />;
}
