import { useQuery } from "@tanstack/react-query";
import api from "../redux/api/api";

const useCourse = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await api.get("/api/v1/course")
      return response.data;
    },
  });
  return { data, isLoading, error, refetch };
};

export default useCourse;
