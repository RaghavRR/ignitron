import React from 'react';
import SolutionDetail from './SolutionDetail';
import { solutionData } from './solutionData';

export default function ATLLabSetup() {
  return <SolutionDetail solution={solutionData.atl} />;
}
