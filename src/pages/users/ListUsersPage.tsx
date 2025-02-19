import UserList from "@/components/users/UserList";
import { CreateUserModal } from "@/components/users/CreateUserModal";

export default function ListUsersPage() {
  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-xl font-bold">Users List</h1>
        <CreateUserModal />
      </div>
      <UserList />
    </>
  );
}
