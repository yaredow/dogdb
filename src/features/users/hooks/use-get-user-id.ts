import { useParams } from "next/navigation";

export const GetUserId = () => {
  const params = useParams();
  return params.userId as string;
};
