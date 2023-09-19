import React, { useEffect, useMemo, useState } from 'react';
import { Page } from '../../components/Components';
import {
  Title,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Scroll,
  AuthButton,
} from './style';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import Modal from './Modal';
import { FaSort } from 'react-icons/fa';
import Loading from '../../components/Loading';

const EmployeeChart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://192.168.0.127:8000/admin/search/?positionID=all')
      .then((res) => {
        setData(res.data.rows);
        setLoading(false);
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 에러가 발생했습니다.', error);
        setLoading(false);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: '사번',
        accessor: 'employeeID',
        sortType: 'basic',
        defaultCanSort: true,
      },
      {
        Header: '이름',
        accessor: 'name',
      },
      {
        Header: '직급',
        accessor: (row) => {
          const part = row.Position.positionName.split('_');
          const jobTitle = part[0];
          return `${jobTitle}`;
        },
      },
      {
        Header: '권한',
        accessor: (row) => {
          const part = row.Position.positionName.split('_');
          const jobTitle = part[0];
          const department = part.slice(1).join('_');
          if (jobTitle === 'manager') {
            return 'all';
          } else {
            return ` ${department}`;
          }
        },
      },
      {
        Header: '연락처',
        accessor: 'phone',
      },
      {
        Header: '이메일',
        accessor: 'email',
      },
    ],
    []
  );
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [{ id: 'employeeID', desc: false }],
      },
    },
    useSortBy
  );
  const TableHead = () => {
    return (
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : ''
                }
              >
                {column.render('Header')}
                &nbsp;&nbsp;
                <FaSort style={{ fontSize: '13px' }} />
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
    );
  };
  const Tablebody = () => {
    return (
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    );
  };
  return (
    <Page className="admin">
      {loading ? <Loading /> : null}
      <Title>직원 관리</Title>
      <AuthButton onClick={openModal}>권한 관리</AuthButton>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={data}
        reloadData={fetchData} // fetchData 함수를 전달
      />
      <Scroll>
        <Table>
          <TableHead />
          <Tablebody />
        </Table>
      </Scroll>
    </Page>
  );
};

export default EmployeeChart;
