import Image from "next/image";
import useUser from "hooks/useUser";
import Avater from "components/Avater";

interface UserHeroProps {
  userId: string;
}
const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={fetchedUser.coverImage}
            alt="cover image"
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avater userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
