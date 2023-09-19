import React, { useEffect, useMemo, useState } from 'react';
import EmployeeChart from './EmployeeChart';
import EmployeeLog from './EmployeeLog';
import FactoryLog from './FactoryLog';
import Buttons from './Buttons';

const Admin = () => {
  const [selected, setSelected] = useState('employeeList');
  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div>
      {selected === 'employeeList' && <EmployeeChart />}
      {selected === 'employeeLog' && <EmployeeLog />}
      {selected === 'factoryLog' && <FactoryLog />}
      <Buttons onPageChange={handleSelect} />
    </div>
  );
};

export default Admin;
