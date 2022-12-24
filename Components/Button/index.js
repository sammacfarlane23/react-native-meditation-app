import { TouchableOpacity, Text } from "react-native";
import React from "react";
import classnames from "classnames";

const Button = ({ children, onPress, className, ...rest }) => {
  return (
    <TouchableOpacity
      className={classnames(
        "py-2 px-4 min-w-full bg-blue-200 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75",
        className
      )}
      {...{ onPress }}
      {...rest}
    >
      <Text className="text-lg text-center">{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
