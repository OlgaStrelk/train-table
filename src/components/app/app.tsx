import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import styles from "./app.module.css";
import {
  selectTrains,
  selectSelectedTrain,
  fetchTrains,
  selectTrain,
  updateTrainCharacteristic,
} from "../../services/reducers/trainSlice";
import { TrainCharacteristic } from "../../services/types";
import { useAppDispatch, useAppSelector } from "../../hooks";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const trains = useAppSelector(selectTrains);
  const selectedTrain = useAppSelector(selectSelectedTrain);

  const [isFormValid, setIsFormValid] = useState(true);
  useEffect(() => {
    dispatch(fetchTrains());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTrain) {
      setIsFormValid(
        selectedTrain.characteristics.every(
          (characteristic) =>
            characteristic.speed >= 0 &&
            characteristic.force > 0 &&
            characteristic.engineAmperage > 0
        )
      );
    }
  }, [selectedTrain]);

  const handleTrainClick = (id: string) => {
    dispatch(selectTrain({ id: id }));
  };

  const handleChange = (
    index: number,
    field: keyof TrainCharacteristic,
    value: string
  ) => {
    let newCharacteristics = JSON.parse(
      JSON.stringify(selectedTrain!.characteristics)
    );
    newCharacteristics[index][field] =
      field === "speed" || field === "engineAmperage"
        ? parseInt(value, 10)
        : parseFloat(value);

    dispatch(
      updateTrainCharacteristic({
        id: selectedTrain?.id!,
        characteristics: newCharacteristics,
      })
    );
  };

  const handleSubmit = () => {
    const sortedSpeedLimits = selectedTrain!.characteristics
      .map((characteristic) => characteristic.speed)
      .sort((a, b) => a - b);
    console.log("Отсортированные ограничения скорости:", sortedSpeedLimits);
  };
  return (
    <main className={styles.main}>
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
      {selectedTrain && (
        <section className={styles.train_details}>
          <h2>
            Характеристики <br /> {selectedTrain.name}
          </h2>
          <Table bordered>
            <thead>
              <tr>
                <th>Ток двигателя (А)</th>
                <th>Сила тяги (кН)</th>
                <th>Скорость (км/ч)</th>
              </tr>
            </thead>
            <tbody>
              {selectedTrain?.characteristics &&
                selectedTrain.characteristics.map((characteristic, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        required
                        type="number"
                        value={characteristic.speed || ""}
                        onChange={(e) =>
                          handleChange(index, "speed", e.target.value)
                        }
                        min={1}
                        className={styles.input}
                      />
                    </td>
                    <td>
                      <input
                        required
                        type="number"
                        value={characteristic.force || ""}
                        onChange={(e) =>
                          handleChange(index, "force", e.target.value)
                        }
                        min="0.01"
                        step="0.01"
                        className={styles.input}
                      />
                    </td>
                    <td>
                      <input
                        required
                        type="number"
                        value={characteristic.engineAmperage || ""}
                        onChange={(e) =>
                          handleChange(index, "engineAmperage", e.target.value)
                        }
                        min={1}
                        className={styles.input}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button disabled={!isFormValid} onClick={handleSubmit}>
            Отправить данные
          </Button>
        </section>
      )}
    </main>
  );
};

export default App;
