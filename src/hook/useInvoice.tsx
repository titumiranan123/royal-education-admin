import { useQuery } from "@tanstack/react-query";
import api from "../redux/api/api";

const useInvoice = () => {
  const { data, isLoading, isError,  refetch } = useQuery({
    queryKey: ["invoice"],
    queryFn: async () => {
      const res = await api.get(`/api/v1/enrollments`);
      return res.data;
    },
  });

  return { data, isLoading, isError, refetch };
};

export default useInvoice;
