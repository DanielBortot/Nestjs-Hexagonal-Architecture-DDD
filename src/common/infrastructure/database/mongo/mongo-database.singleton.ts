// import { Mongoose, connect } from "mongoose";
// import { envs } from "../../framework-config/envs-config/envs";

// // USE DEPENDENCY mongoose

// export class MongoDatabaseSingleton {
//     static instance: Mongoose;

//     static async getInstance(): Promise<Mongoose> {
//         if (!MongoDatabaseSingleton.instance) {
//             MongoDatabaseSingleton.instance = await connect("mongodb://localhost:27017/mydb");
//         }
//         return MongoDatabaseSingleton.instance;
//     }
// }
