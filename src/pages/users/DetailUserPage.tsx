import UserDetail from "@/components/users/UserDetail";
import { useParams } from "react-router-dom";

export default function DetailUserPage() {
  const userId = useParams<{ id: string }>().id;

  if (!userId) {
    throw new Error("User ID is required");
  }

  return (
    <>
      <h1 className="text-xl font-bold mt-4">Detail of user {userId}</h1>
      <UserDetail userId={userId} />
    </>
  );
}
