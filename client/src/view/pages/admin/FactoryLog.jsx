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
        // 데이터 필터링: 'type'이 'edukit1/control'인 행 제외
        const filteredData = res.data.filter(
          (item) => item.type !== 'edukit1/control'
        );
        setData(filteredData);
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
        Header: '공장 분류',
        accessor: 'Manufacturer',
        Cell: ({ value }) => {
          if (value === 'edukit1') {
            return '세종 공장';
          } else if (value === 'edukit2') {
            return '화성 공장';
          } else {
            return value; // 나머지 타입은 그대로 출력
          }
        },
      },

      {
        Header: '내용',
        accessor: 'type',
        Cell: ({ value }) => {
          if (value === 'process-stop') {
            return '공장 가동 종료';
          } else if (value === 'process-start') {
            return '공장 가동 시작';
          } else if (value === 'line1') {
            return '1공정 반출';
          } else if (value === 'line2') {
            return '2공정 가공';
          } else if (value === 'line3') {
            return '3공정 출하';
          } else if (value === 'product-line1') {
            return '1공정 반출';
          } else {
            return value; // 나머지 타입은 그대로 출력
          }
        },
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
