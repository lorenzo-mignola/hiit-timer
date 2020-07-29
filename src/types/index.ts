export interface Workout {
  _id?: string;
  name: string;
  creationDate?: Date;
  workRep: number;
  workTime: number;
  restTime: number;
  restEnd: boolean;
}
