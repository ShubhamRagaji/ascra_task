import React from "react";
import "./dropdown.scss";
import dropdownArrow from "../../Assests/dropdownArrow.png";
import Scrollbars from "react-custom-scrollbars";

export default function Dropdown({
  ScrollColor,
  children,
  tabIndex,
  value,
  selectedOption,
  setIsActive,
  isActive,
  defaultLabel,
  setemptyFields,
  className,
  emptyList,
  emptyListMessage,
  emptySelection,
  name,
  autoHeightMax = "14vh",
  onClick
}) {
  return (
         
          <div className="dropdown" tabIndex={tabIndex}  onClick={onClick} >
      <p className="dropdown_label">{name}</p>
      <img src={dropdownArrow} className={className ? className : "down"} />
      <div
        id="labels"
        onClick={(e) => {
          setIsActive(!isActive);
          setemptyFields && setemptyFields(false);
        }}
        className={
          emptySelection ? "dropdown-btn emptySelection" : "dropdown-btn"
        }
        value={value}
      >
        {selectedOption ? (
          selectedOption
        ) : (
          <p className="defaultLabel">{defaultLabel}</p>
        )}
        <span />
      </div>
      <div
        className="dropdown-content"
        style={{ display: isActive ? "block" : "none" }}
      >
        <Scrollbars
          autoHeight
          autoHeightMin="4vh"
          autoHeightMax={autoHeightMax}
          hideTracksWhenNotNeeded
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                width: "0.18vw",
                borderRadius: "4px",
                backgroundColor: ScrollColor,
              }}
            />
          )}
          renderThumbHorizontal={({ style, ...props }) => (
            <div
              {...props}
              style={{
                display: "none",
              }}
            />
          )}
        >
          <div className="item">{children}</div>
          {emptyList && (
            <p className="empty_list">
              {emptyListMessage}
            </p>
          )}
        </Scrollbars>
      </div>
    </div>
  );
}
