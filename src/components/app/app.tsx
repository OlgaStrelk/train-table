import { FC } from "react";
import DetailsTable from "../detailes-table/detailes-table";
import TrainsTable from "../trains-table/trains-table";
import styles from "./app.module.css";

const App: FC = () => {
  return (
    <main className={styles.main}>
      <TrainsTable />
      <DetailsTable />
    </main>
  );
};

export default App;
