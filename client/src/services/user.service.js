import api from "./api";

async function getOperations(
  page = 1,
  limit = 10,
  type = "",
  category = "",
  sort = ""
) {
  try {
    const response = await api.get(
      `/operations?page=${page}&limit=${limit}&type=${type}&category=${category}&sort=${sort}`
    );

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

async function getBalance() {
  try {
    const response = await api.get("/balance");

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

const user = {
  getOperations,
  getBalance,
};

export default user;
