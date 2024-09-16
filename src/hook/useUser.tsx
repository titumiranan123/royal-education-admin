import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("https://test.royaleducation.online/api/v1/users", {
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

export default useUser;
