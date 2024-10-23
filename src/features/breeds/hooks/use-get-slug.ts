import { useParams } from "next/navigation";

export const useGetSlug = () => {
  const params = useParams();
  return params.slug as string;
};
