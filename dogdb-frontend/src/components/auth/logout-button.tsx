import Link from "next/link";
export const LogoutButton = () => {
  return (
    <Link className="button__logout" href="/auth/logout">
      Log Out
    </Link>
  );
};
