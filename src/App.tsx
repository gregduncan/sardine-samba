import './App.css';
import 'carbon-components/css/carbon-components.css';
import React from 'react';
import { AddBranchButton, BranchDetails, BranchList, Header, RepositorySelect } from '@/components';

function App() {
  return (
    <div className="App">
      <Header />
      <RepositorySelect />
      <BranchList />
      <AddBranchButton />
      <BranchDetails />
    </div>
  );
}

export default App;
