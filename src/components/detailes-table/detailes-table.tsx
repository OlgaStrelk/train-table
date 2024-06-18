import { useState, useEffect, FC } from "react";
import { Button, Table } from "react-bootstrap";
import styles from "./detailes-table.module.css";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectSelectedTrain,
  updateTrainCharacteristic,
} from "../../services/slices/trainSlice";
import { TrainCharacteristic } from "../../services/types";

const DetailsTable: FC = () => {
  const dispatch = useAppDispatch();

  const selectedTrain = useAppSelector(selectSelectedTrain);
  const [isFormValid, setIsFormValid] = useState(true);

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
  const handleChange = (
    index: number,
    field: keyof TrainCharacteristic,
    value: string
  ) => {
    const newCharacteristics = JSON.parse(
      JSON.stringify(selectedTrain!.characteristics)
    );
    newCharacteristics[index][field] =
      field === "speed" || field === "engineAmperage"
        ? parseInt(value, 10)
        : parseFloat(value);
    if (selectedTrain?.id) {
      dispatch(
        updateTrainCharacteristic({
          id: selectedTrain.id,
          characteristics: newCharacteristics,
        })
      );
    }
  };

  const handleSubmit = () => {
    const sortedSpeedLimits = selectedTrain!.characteristics
      .map((characteristic) => characteristic.speed)
      .sort((a, b) => a - b);
    console.log("Отсортированные ограничения скорости:", sortedSpeedLimits);
  };

  return (
    <>
      {selectedTrain && (
        <section>
          <h2 className={styles.title}>
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
    </>
  );
};

export default DetailsTable;
