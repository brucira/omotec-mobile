import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { StyleSheet, View } from "react-native";

import { JUSTIFY, RESIZE_MODE } from "../../styles/constStyle";
import { Dimensions } from "../../utils/constant";

const SIZE_16 = Dimensions.margin;
const SIZE_20 = SIZE_16 * 1.25;

const VideoPlayer = ({ url, containerStyle = {}, playerStyle = {} }) => {
  const player = useVideoPlayer(url, (player) => {
    player.loop = true;
    player.play();
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
        resizeMode={RESIZE_MODE.COVER}
        style={[styles.video, playerStyle]}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: JUSTIFY.CENTER,
    justifyContent: JUSTIFY.CENTER,
    marginBottom: SIZE_20,
  },
  video: {
    height: SIZE_16 * 13.875,
    width: Dimensions?.screenWidth,
  },
});
