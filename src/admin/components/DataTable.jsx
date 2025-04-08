import styles from "../styles/Admin.module.css";

const DataTable = ({ data, columns }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col}>{item[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;