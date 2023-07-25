import { connectPool } from '../config/database.configuration.js';

export default {
  getUser: async () => {
    try {
      const connect = await connectPool.getConnection();
      const query = `select * from user`;
      const [result] = await connect.query(query);
      connect.release();
      return result;
    } catch (error) { throw error; }
  },

  getUserById: async () => {
    try {
      const connect = await connectPool.getConnection();
      const query = `
        select * 
        from user
        where id = ?  
      `;
      const [result] = await connect.query(query, [userId]);
      connect.release();
      return result;
    } catch (error) { throw error; }
  }
}