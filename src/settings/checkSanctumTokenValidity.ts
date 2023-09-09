import axios from "axios";
import { axiosInstance } from "./axiosSetting";

const checkSanctumTokenValidity = async (token: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      // Token is valid
      return true;
    } else {
      // Token is invalid
      return false;
    }
  } catch (error) {
    // Error occurred while checking token validity
    console.error("Error checking Sanctum token validity:", error);
    return false;
  }
};

export default checkSanctumTokenValidity;
