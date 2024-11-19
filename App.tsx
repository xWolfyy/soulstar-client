import React from "react";
import { ViroARScene, ViroARSceneNavigator } from "@reactvision/react-viro";

const TestScene = () => {
  return <ViroARScene />;
};

export default () => (
  <ViroARSceneNavigator
    initialScene={{
      scene: TestScene,
    }}
    style={{ flex: 1 }}
  />
);
