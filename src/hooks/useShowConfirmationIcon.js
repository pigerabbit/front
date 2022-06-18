import React from "react";
import { show, unshow } from "redux/confirmationIconSlice";
import { useDispatch } from "react-redux";

const useShowComfirmationIcon = ({ backgroundColor, color, icon, text }) => {
  const dispatch = useDispatch();

  const showConfirmationIcon = () => {
    dispatch(
      show({
        backgroundColor,
        color,
        icon,
        text,
      })
    );

    setTimeout(() => {
      dispatch(unshow());
    }, 1600);
  };

  return showConfirmationIcon;
};

export default useShowComfirmationIcon;
