import React, { useEffect, useMemo, useState } from 'react';
import { Page } from '../../components/Components';
import { Table, Tbody, Td, Th, Thead, Tr, Scroll, Title } from './style';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import { FaSort } from 'react-icons/fa';
import Loading from '../../components/Loading';

const EmployeeLog = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://192.168.0.127:8000/admin/logs?list=all&category=employee')
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

  function getPositionName(positionID) {
    switch (positionID) {
      case 1:
        return 'manager';
      case 2:
        return 'supervisor';
      case 3:
        return 'worker';
      case 4:
        return 'supervisor_fac1';
      case 5:
        return 'supervisor_fac2';
      case 6:
        return 'worker_fac1_line1';
      case 7:
        return 'worker_fac1_line2';
      case 8:
        return 'worker_fac1_line3';
      case 9:
        return 'worker_fac2_line1';
      case 10:
        return 'worker_fac2_line2';
      case 11:
        return 'worker_fac2_line3';
      default:
        return 'Unknown';
    }
  }

  function getControlDescription(value) {
    try {
      // 문자열을 JSON 객체로 파싱
      const controlData = JSON.parse(value);

      if (
        typeof controlData.tagId === 'string' &&
        typeof controlData.value === 'string'
      ) {
        switch (controlData.tagId) {
          case '1':
            return controlData.value === '0'
              ? '전체공정 정지'
              : '전체공정 시작';
          case '8':
            return '전체공정 리셋';
          case '9':
            return controlData.value === '0'
              ? '공정1 전원 OFF'
              : '공정1 전원 ON';
          case '10':
            return controlData.value === '0'
              ? '공정2 전원 OFF'
              : '공정2 전원 ON';
          case '11':
            return controlData.value === '0'
              ? '공정3 전원 OFF'
              : '공정3 전원 ON';
          case '12':
            return controlData.value === '0'
              ? '컬러센서 전원 OFF'
              : '컬러센서 전원 ON';
          case '13':
            return controlData.value === '0'
              ? '비전센서 전원 OFF'
              : '비전센서 전원 ON';
          case '14':
            return `반출 속도 ${parseInt(controlData.value, 10) * 10}초로 변경`;
          case '31':
            return controlData.value === '0'
              ? '컬러 센서 선별 가공'
              : '컬러 센서 모두 가공';
          case '36':
            return `생산량 리미트 ${controlData.value}개`;
          case '38':
            return `양품 ${controlData.value}보다 큰 수`;
          case '3':
            return '공정1 시운전';
          case '40':
            return controlData.value === '0'
              ? '공정3 시운전 OFF'
              : '공정3 시운전 ON';
          default:
            return '-';
        }
      } else {
        return '-';
      }
    } catch (error) {
      return '-';
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: '시간',
        accessor: 'createdAt',
        sortType: 'basic',
        defaultCanSort: true,
      },
      {
        Header: '사번',
        accessor: 'employeeID',
      },
      {
        Header: '이름',
        accessor: 'name',
      },
      {
        Header: '직급과 소속',
        accessor: 'positionID',
        Cell: ({ value }) => getPositionName(value),
      },
      {
        Header: '타입',
        accessor: 'type',
        Cell: ({ value }) => {
          if (value === 'edukit1/control') {
            return '1공장 제어';
          } else if (value === 'edukit2/control') {
            return '2공장 제어';
          } else {
            return value; // 나머지 타입은 그대로 출력
          }
        },
      },
      {
        Header: '비고',
        accessor: 'control',
        Cell: ({ value }) => getControlDescription(value),
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
    <Page className="employeelog">
      {loading ? <Loading /> : null}
      <Title>직원 로그</Title>
      <Scroll>
        <Table {...getTableProps()}>
          <TableHead />
          <Tablebody />
        </Table>
      </Scroll>
    </Page>
  );
};

export default EmployeeLog;
