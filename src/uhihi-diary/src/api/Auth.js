import axios from 'axios';

export const AuthAPI = {

  /**
   * **POST** /Auth/Login
   * @param {{email: string, password: string}} 
   * @returns Promise<{{
   *    token: string,
   * }}> articles
   * `200` : success
   * `500` : fail
   */
  postAuthLogin: async (email, password) => {
    try {
      let { data } = await axios.post(process.env.REACT_APP_DB_HOST + "/auth/login", {email, password});
      return data;
    } catch (err) {
      throw err;
    }
  },

  /**
   * **POST** /auth/emailcode
   * @param {{email: string}} 
   * @returns Promise<{{
   *    none
   * }}> articles
   * `200` : success
   * `400` : email_repeat
   * `500` : fail
   */
  postAuthEmailcode: async (email) => {
    try{
      let { data } = await axios.post(process.env.REACT_APP_DB_HOST + "/auth/emailcode",{email});
      return data;
    } catch (err) {
      throw err;
    }
  },

  /**
   * **POST** /auth/emailcheck
   * @param {{email: string, code: string}} 
   * @returns Promise<{{
   *    none
   * }}> articles
   * `200` : success
   * `400` : code error
   * `500` : fail
   */
  postAuthEmailcheck: async (email, code) => {
    try{
      let { data } = await axios.post(process.env.REACT_APP_DB_HOST + "/auth/emailcheck",{email, code});
      return data;
    } catch (err) {
      throw err;
    }
  },

  /**
   * **POST** /auth/register
   * @param {{email: string, password: string, nickname: string, code: string}} 
   * @returns Promise<{{
   *    token: string
   * }}> articles
   * `200` : success
   * `400` : fail
   * `500` : fail
   */
  postAuthRegister: async (email, password, nickname, code) => {
    try{
      let { data } = await axios.post(process.env.REACT_APP_DB_HOST + "/auth/register",{email, password, nickname, code});
      return data;
    }catch (err) {
      throw err;
    }
  },

  /**
   * **POST** /auth/tmp/password
   * @param {{email: string}} 
   * @returns Promise<{{
   *    none
   * }}> articles
   * `200` : success
   * `400` : fail
   * `500` : fail
   */
  postAuthTmpPassword: async (email) => {
    try{
      let { data } = await axios.post(process.env.REACT_APP_DB_HOST + "/auth/tmp/password",{email});
      return data;
    }catch(err){
      throw err;
    }
  }
}
