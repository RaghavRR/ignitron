import React from 'react';
import SolutionDetail from './SolutionDetail';
import { solutionData } from './solutionData';

export default function STEMLabSetup() {
  return <SolutionDetail solution={solutionData.lab} />;
}
