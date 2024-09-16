import { useQuery } from "@tanstack/react-query";

const useInvoice = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["invoice"],
    queryFn: async () => {
      const res = await fetch(`https://test.royaleducation.online/api/v1/enrollments`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  if (isError) {
    console.error("Error fetching invoice:", error);
  }

  return { data, isLoading, isError, refetch };
};

export default useInvoice;
