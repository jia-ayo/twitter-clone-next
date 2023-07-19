import Avater from "components/Avater";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

interface CommentItemProps {
  data: Record<string, any>;
}
const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const gotToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      className="
      boarder-b-[1px] border-neutral-800 p-5 
      cursor-pointer hover:bg-neutral-900  transition"
    >
      <div className="flex flex-row items-start gap-3">
        <div>
          <Avater userId={data.user.id} />
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {data.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="break-all  text-white mt-1">
            {data.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
