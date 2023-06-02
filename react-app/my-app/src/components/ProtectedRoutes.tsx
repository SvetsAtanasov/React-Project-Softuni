import PrivateProtected from "./PrivateProtected";
import PublicProtected from "./PublicProtected";

export type ProtectedType = "public" | "private";

export type CustomProtectedRoutesProps = React.PropsWithChildren<{
  protectedType: ProtectedType;
}>;

const ProtectedRoutes = ({ protectedType }: CustomProtectedRoutesProps) => {
  return (
    <>
      {protectedType === "private" ? <PrivateProtected /> : <PublicProtected />}
    </>
  );
};

export default ProtectedRoutes;
