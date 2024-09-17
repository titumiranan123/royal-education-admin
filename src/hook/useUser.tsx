import { useQuery } from "@tanstack/react-query";
import api from "../redux/api/api";

const useUser = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/api/v1/users", {
        method: "GET",
      })
      return response.data;
    },
  });

  return { data, isLoading, error, refetch };
};

export default useUser;
