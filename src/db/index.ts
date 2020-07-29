import PounchDB from 'pouchdb';
// import { v4 } from 'uuid';

const db = new PounchDB('workout');
// const w1 = {
//   _id: v4(),
//   name: 'Workout 1',
//   creationDate: new Date(),
//   workRep: 8,
//   workTime: 60000,
//   restTime: 30000,
//   restEnd: true,
// };
// db.put(w1);

export default db;
