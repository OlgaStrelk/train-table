export interface Train {
    id: string;
    name: string;
    description: string;
    characteristics: {
      speed: number;
      force: number;
      engineAmperage: number;
    }[];
  }
  
  export interface TrainCharacteristic {
    speed: number;
    force: number;
    engineAmperage: number;
  }