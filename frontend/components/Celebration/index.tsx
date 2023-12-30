import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import Animated, { BounceIn, FadeOut } from "react-native-reanimated";
import Confetti from "../Confetti";

const Celebration = () => {
  const [showText, setShowText] = useState<boolean>(true);

  useEffect(() => {
    setShowText(true);
    const timer = setTimeout(() => {
      setShowText(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // if (!showText) return null;

  return (
    <Modal
      isVisible={showText}
      backdropOpacity={0.3}
      animationOut="fadeOut"
      // animationOutTiming={500}
      // transparent={true}
      // className="z-50 absolute w-screen h-screen bg-black top-16"
    >
      <View className="z-50 absolute w-screen h-screen top-16 flex align-center">
        {/* {showText ? ( */}
        <Animated.View entering={BounceIn} exiting={FadeOut}>
          <Text className="text-5xl font-bold dark:text-off-white text-center">
            Congratulations!
          </Text>
        </Animated.View>
        {/* ) : ( */}
        {/* <View>
            <Text className="text-5xl font-bold dark:text-off-white">
              Congratulations!
            </Text>
          </View>
        )} */}
      </View>
      <Confetti />
    </Modal>
  );
};

export default Celebration;
