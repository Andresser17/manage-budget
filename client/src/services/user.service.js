import axios from "axios";
import * as SecureStore from "expo-secure-store";
// Envs
import Constants from "expo-constants";
const { API_URL } = Constants.manifest.extra;

async function getOrders() {
  try {
    // get token from SecureStore
    const userToken = await SecureStore.getItemAsync("userToken");
    // set token in request header
    axios.defaults.headers.common["Authorization"] = `token ${userToken}`;
    const response = await axios.get(`${API_URL}/os/`);

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

async function getOrderDetails(orderId) {
  try {
    // get token from SecureStore
    const userToken = await SecureStore.getItemAsync("userToken");
    // set token in request header
    axios.defaults.headers.common["Authorization"] = `token ${userToken}`;
    const response = await axios.get(`${API_URL}/os/${orderId}/`);

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

async function registerTech(
  name,
  last_name,
  birthday,
  status,
  id_type,
  id_number
) {
  try {
    // get token from SecureStore
    const userToken = await SecureStore.getItemAsync("userToken");
    // set token in request header
    axios.defaults.headers.common["Authorization"] = `token ${userToken}`;
    const response = await axios.post(`${API_URL}/technician/`, {
      name,
      last_name,
      birthday,
      status,
      id_type,
      id_number,
      operator: 1,
    });

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

async function techAbsence(schedule_day, status, start_time, end_time) {
  try {
    // get token from SecureStore
    const userToken = await SecureStore.getItemAsync("userToken");
    // set token in request header
    axios.defaults.headers.common["Authorization"] = `token ${userToken}`;
    const response = await axios.post(`${API_URL}/absence/`, {
      schedule_day: Number(schedule_day),
      status: Number(status),
      start_time,
      end_time,
      operator: 1,
    });

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

const user = {
  getOrders,
  getOrderDetails,
  registerTech,
  techAbsence,
};

export default user;
