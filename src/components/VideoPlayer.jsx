import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const VideoScreen = ({ url, containerStyle = {}, playerStyle = {} }) => {
  const player = useVideoPlayer(url, (player) => {
    player.loop = true;
    // player.play();
  });

  const { isPlaying, oldIsPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={[styles.contentContainer, containerStyle]}>
      <VideoView
        allowsFullscreen
        allowsPictureInPicture
        player={player}
        resizeMode="contain"
        style={[styles.video, playerStyle]}
      />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    height: height * 0.4,
    width: width,
  },
});
