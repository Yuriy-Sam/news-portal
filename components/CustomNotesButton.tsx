import {
  createNotes,
  postActions,
  removeNotes,
  useAppDispatch,
  useStateSelector,
} from "@/store";
import React, { useEffect, useState } from "react";
import { BookmarkIcon, BookmarksIcon } from "./SVGIcons";
import CustomButton from "./CustomButton";
interface CustomNotesButton {
  isNotes: boolean;
  id: any;
  containerStyles?: string;
  activeContainerStyles?: string;
  activeStyles?: string;
  iconStyles?: string;
}
const CustomNotesButton = ({
  isNotes,
  id,
  containerStyles,
  activeContainerStyles,
  activeStyles,
  iconStyles,
}: CustomNotesButton) => {
  const [isInNotes, setIsInNotes] = useState<boolean>(isNotes || false);
  const dispatch = useAppDispatch();
  const notesStatus = useStateSelector((state) => state.notes.status);
  const isAuthUser = useStateSelector((state) => state.user.isAuthUser);
  useEffect(() => {
    if (notesStatus === "success") {
      setIsInNotes(isNotes!);
    }
  }, [isNotes]);

  const handleNotes = async () => {
    let res = null;
    if (isInNotes) {
      res = await dispatch(removeNotes(id.toString()));
    } else {
      res = await dispatch(createNotes(id.toString()));
    }
    if (res.meta.requestStatus === "fulfilled") {
      setIsInNotes((state) => !state);
      await dispatch(postActions.updateNotes({ id }));
    }
  };
  return (
    <>
      {isAuthUser && (
        <CustomButton
          containerStyles={`${containerStyles} ${
            isInNotes && activeContainerStyles
              ? `${activeContainerStyles}`
              : null
          }`}
          fillColor={isInNotes ? "yellow" : "none"}
          activeStyles={activeStyles}
          isDisabled={notesStatus === "loading"}
          Icon={isInNotes ? BookmarksIcon : BookmarkIcon}
          iconStyles={iconStyles}
          handleClick={() => handleNotes()}
        />
      )}
    </>
  );
};

export default CustomNotesButton;
