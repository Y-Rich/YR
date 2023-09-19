import React, { useEffect, useMemo, useState } from 'react';
import { Page } from '../../components/Components';
import { Table, Tbody, Td, Th, Thead, Tr, Title, Scroll } from './style';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import { FaSort } from 'react-icons/fa';
import Loading from '../../components/Loading';

const FactoryLog = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://192.168.0.127:8000/admin/logs?list=all&category=factory')
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
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
        Header: '시간',
        accessor: 'createdAt',
        sortType: 'basic',
        defaultCanSort: true,
      },
      {
        Header: '공장명',
        accessor: 'Manufacturer',
        Cell: ({ value }) => {
          if (value === 'edukit1') {
            return 'fac1';
          } else if (value === 'edukit2') {
            return 'fac2';
          } else {
            return value; // 나머지 타입은 그대로 출력
          }
        },
      },

      {
        Header: '라인',
        accessor: 'type',
      },
      {
        Header: '공정',
        accessor: 'ProductName',
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: [{ id: 'createdAt', desc: true }],
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
              {row.cells.map((cell, index) => {
                console.log('here', index, cell.value);
                if (cell.column.Header === '시간') {
                  const date = new Date(cell.value);
                  const formattedDate = `${date.getFullYear()}-${(
                    date.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, '0')}-${date
                    .getDate()
                    .toString()
                    .padStart(2, '0')} ${date
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${date
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}:${date
                    .getSeconds()
                    .toString()
                    .padStart(2, '0')}`;

                  return <Td {...cell.getCellProps()}>{formattedDate}</Td>;
                }
                return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    );
  };
  return (
    <Page className="factorylog">
      {loading ? <Loading /> : null}
      <Title>생산 이력</Title>
      <Scroll>
        <Table {...getTableProps()}>
          <TableHead />
          <Tablebody />
        </Table>
      </Scroll>
    </Page>
  );
};

export default FactoryLog;
