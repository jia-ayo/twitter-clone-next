import axios from "axios";
import useCurrentUser from "hooks/useCurrentUser";
import useLoginModal from "hooks/useLoginModal";
import usePosts from "hooks/usePosts";
import useRegisterModal from "hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Avater from "./Avater";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : `/api/posts`;

      await axios.post(url, { body });

      toast.success("Tweet Created");

      setBody("");

      mutatePosts();
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-3 py-1">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avater userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="
                disabled:opacity-80 peer resize-none mt-3 
                w-full bg-black ring-0 outline-none text-[20px]
                placeholder-neutral-500 text-white
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0 peer-focus:opacity-100 h-[1px] 
                w-full border-neutral-800 transition
              "
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-5">
          <h1 className="text-white text-xl text-center mb-3 font-bold">
            Welcome to twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
