import { useQuery } from "@tanstack/react-query";

const useCourse = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/v1/course", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  
  
  return { data, isLoading, error, refetch };
};

export default useCourse;
