import { useState } from "react";

const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async (endPointUrl) => {
    setIsLoading(true);

    try {
      const response = await fetch(endPointUrl);

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      applyData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    fetchData,
    isLoading,
  };
};

export default useHttp;
