import api from "./api";

async function getOperations({
  page = 0,
  limit = 10,
  type = "",
  category = "",
  sort = "",
}) {
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

async function registerOperation(amount, date, type, category, concept) {
  try {
    const response = await api.post(`/operations`, {
      amount,
      date,
      type,
      category,
      concept,
    });

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

async function updateOperation(id, amount, date, type, category, concept) {
  try {
    const response = await api.put(`/operations/${id}`, {
      amount,
      date,
      type,
      category,
      concept,
    });

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

async function deleteOperation(id) {
  try {
    const response = await api.delete(`/operations/${id}`);

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

async function getUserData() {
  try {
    const response = await api.get("/userdata");

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

async function getCategories() {
  try {
    const response = await api.get("/categories");

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

const user = {
  getOperations,
  registerOperation,
  updateOperation,
  deleteOperation,
  getUserData,
  getCategories,
};

export default user;
