import Toast from "../helper/Toast";

const ApiCall = async (callback) => {
  try {
    const response = await callback();
    if (response) {
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        throw new Error("Unexpected status code received");
      }
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
    throw error;
  }
};

export default ApiCall;
