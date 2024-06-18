import { useEffect, FC } from "react";
import { Table } from "react-bootstrap";
import styles from "./trains-table.module.css";
import { selectTrains, selectTrain } from "../../services/slices/trainSlice";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchTrains } from "../../services/utils";

const TrainsTable: FC = () => {
  const dispatch = useAppDispatch();
  const trains = useAppSelector(selectTrains);

  useEffect(() => {
    dispatch(fetchTrains());
  }, [dispatch]);

  const handleTrainClick = (id: string) => {
    dispatch(selectTrain({ id: id }));
  };

  const headPadding = "py-3 px-5";
  const cellPadding = "py-2 px-5";

  return (
    <section className={styles.trains}>
      <h1 className={styles.title}>Поезда</h1>
      <Table bordered hover>
        <thead>
          <tr>
            <th className={headPadding}>Название</th>
            <th className={headPadding}>Описание</th>
          </tr>
        </thead>
        <tbody>
          {trains &&
            trains.map((train) => (
              <tr key={train.id} onClick={() => handleTrainClick(train.id)}>
                <td className={cellPadding}>{train.name}</td>
                <td className={cellPadding}>{train.description}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </section>
  );
};

export default TrainsTable;
