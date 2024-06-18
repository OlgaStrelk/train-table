import { useEffect, FC } from "react";
import { Table } from "react-bootstrap";
import styles from "./trains-table.module.css";
import {
  selectTrains,
  fetchTrains,
  selectTrain,
} from "../../services/reducers/trainSlice";

import { useAppDispatch, useAppSelector } from "../../hooks";

const TrainsTable: FC = () => {
  const dispatch = useAppDispatch();
  const trains = useAppSelector(selectTrains);

  useEffect(() => {
    dispatch(fetchTrains());
  }, [dispatch]);

  const handleTrainClick = (id: string) => {
    dispatch(selectTrain({ id: id }));
  };
  return (
    <section className={styles.trains}>
      <h1>Поезда</h1>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {trains &&
            trains.map((train) => (
              <tr key={train.id} onClick={() => handleTrainClick(train.id)}>
                <td>{train.name}</td>
                <td>{train.description}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </section>
  );
};

export default TrainsTable;

