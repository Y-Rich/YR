import React, { useEffect, useMemo, useState } from 'react';
import { Page } from '../../components/Components';
import { Table, Tbody, Td, Th, Thead, Tr } from './style';
import axios from 'axios';
import { useTable } from 'react-table';

const Admin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // 데이터 가져오는 함수를 호출합니다.
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:3001/mock/user.json')
      .then((res) => {
        setData(res.data);
        console.log(res.data); // 데이터가 출력됩니다.
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 에러가 발생했습니다.', error);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: '이름',
        accessor: 'name',
      },
      {
        Header: '번호',
        accessor: 'number',
      },
      {
        Header: '이메일',
        accessor: 'email',
      },
      {
        Header: '소속',
        accessor: 'belong',
      },
      {
        Header: '역할',
        accessor: 'role',
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const TableHead = () => {
    return (
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
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
      <Table {...getTableProps()}>
        <TableHead />
        <Tablebody />
      </Table>
    </Page>
  );
};

export default Admin;
