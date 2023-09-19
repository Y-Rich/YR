import React, { useEffect, useMemo, useState } from 'react';
import EmployeeChart from './EmployeeChart';
import EmployeeLog from './EmployeeLog';
import FactoryLog from './FactoryLog';

const Admin = () => {
  const [selected, setSelected] = useState('pannel');
  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div>
      {selected === 'employeeList' && <EmployeeChart />}
      {selected === 'employeeLog' && <EmployeeLog />}
      {selected === 'factoryLog' && <FactoryLog />}
      <Selector onPageChange={handleSelect} />
    </div>
  );
};

export default Admin;
