import { useQuery } from "@tanstack/react-query";
import api from "../redux/api/api";

const useExam = (id:string) => {
  const { data, isLoading, isError,  refetch } = useQuery({
    queryKey: ["invoice"],
    queryFn: async () => {
      const res = await api.get(`/api/v1/exams/${id}`);
      return res.data.data;
    },
  });

  return { data, isLoading, isError, refetch };
};

export default useExam;