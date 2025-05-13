/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableColumnsType } from 'antd';
import { Table } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Papa from 'papaparse';
const useStyle = createStyles(({ css,prefixCls }) => {

    // const {antCls} = token
  return {
    customTable: css`
      ${prefixCls}-table {
        ${prefixCls}-table-container {
          ${prefixCls}-table-body,
          ${prefixCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

interface DataType {
  key: React.Key;
  name: string;
  
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  { title: 'Column 9', dataIndex: 'address', key: '9' },
  { title: 'Column 10', dataIndex: 'address', key: '10' },
  { title: 'Column 11', dataIndex: 'address', key: '11' },
  { title: 'Column 12', dataIndex: 'address', key: '12' },
  { title: 'Column 13', dataIndex: 'address', key: '13' },
  { title: 'Column 14', dataIndex: 'address', key: '14' },
  { title: 'Column 15', dataIndex: 'address', key: '15' },
  { title: 'Column 16', dataIndex: 'address', key: '16' },
  { title: 'Column 17', dataIndex: 'address', key: '17' },
  { title: 'Column 18', dataIndex: 'address', key: '18' },
  { title: 'Column 19', dataIndex: 'address', key: '19' },
  { title: 'Column 20', dataIndex: 'address', key: '20' }
 
];

const dataSource: DataType[] = [
  { key: '1', name: 'Olivia' },
  { key: '2', name: 'Ethan' },
];

const AdminPanel: React.FC = () => {
  const { styles } = useStyle();
 const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }
console.log(jsonData)
    // Parse CSV to JSON using PapaParse
    Papa.parse(file, {
      complete: (result : any) => {
        setJsonData(result.data); // result.data contains the parsed JSON
        console.log('Parsed CSV to JSON:', result.data);
      },
      header: true, // If CSV contains headers
    });
  };
  return (
    <>
    <Table<DataType>
      className={styles.customTable}
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 'max-content' }}
    />
      <form onSubmit={handleFileUpload}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload CSV</button>
      </form>
    </>
  );
};

export default AdminPanel;