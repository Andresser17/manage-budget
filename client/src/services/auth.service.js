import axios from "axios";
// Envs
const { REACT_APP_API_URL: API_URL } = process.env;

async function signIn(email, password) {
  try {
    const response = await axios.post(`${API_URL}/signin/`, {
      email,
      password,
    });

    // save token in SecureStore
    await localStorage.setItem("accessToken", response.data.accessToken);

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

async function signUp(email, password) {
  try {
    const response = await axios.post(`${API_URL}/signup/`, {
      email,
      password,
    });

    return response;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

async function signOut() {
  // remove token store SecureStore
  await localStorage.removeItem("accessToken");
}

const auth = {
  signIn,
  signUp,
  signOut,
};

export default auth;
