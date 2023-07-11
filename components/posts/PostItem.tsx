import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import useCurrentUser from "hooks/useCurrentUser";
import useLoginModal from "hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import Avater from "components/Avater";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}
const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      loginModal.onOpen();
    },
    [loginModal]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      onClick={goToPost}
      className=" 
            border-b-[1px] border-neutral-800 p-3 
            cursor-pointer hover:bg-neutral-900  transition
        "
    >
      <div className="flex flex-row items-start gap-3">
        <div>
          <Avater userId={data.user.id} />
        </div>
        <div>
          <div className="flex flex-row items-center gap-2 w-full">
            <p
              onClick={goToUser}
              className="
                text-white font-semibold 
                cursor-pointer hover:underline
              "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className=" 
                text-neutral-500 cursor-pointer 
                hover:underline hidden md:block
              "
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                flex flex-row items-center text-neutral-500
                cursor-pointer transition hover:text-sky-500
                gap-2 
              "
            >
              <AiOutlineMessage fontSize={18} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex flex-row items-center text-neutral-500
                cursor-pointer transition hover:text-red-500
                gap-2 
              "
            >
              <AiOutlineHeart fontSize={18} />
              <p>{data.comments?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
