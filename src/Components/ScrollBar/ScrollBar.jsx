import React from "react";
import Scrollbars from "react-custom-scrollbars";

export default function Scroller({
  children,
  autoHeightMin = "4vh",
  autoHeightMax,
  verticalStyle,
  horizontalStyle,
  onScrollFrame,
}) {
  return (
    <Scrollbars
      autoHeight
      autoHeightMin={autoHeightMin}
      autoHeightMax={autoHeightMax}
      hideTracksWhenNotNeeded
      renderThumbVertical={({ style, ...props }) => (
        <div {...props} style={{ ...verticalStyle, borderRadius: "4px" }} />
      )}
      renderThumbHorizontal={({ style, ...props }) => (
        <div
          {...props}
          style={{
            opacity: "0",
            display: "none",
            ...horizontalStyle,
          }}
        />
      )}
      onScrollFrame={onScrollFrame}
    >
      {children}{" "}
    </Scrollbars>
  );
}
