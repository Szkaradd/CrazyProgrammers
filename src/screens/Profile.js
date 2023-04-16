import React, { Component, useState } from "react";
import { View, Text } from "react-native";
import { user, WorkPreference } from "../User.js";
import { Svg, Circle } from "react-native-svg";
import SelectDropdown from "react-native-select-dropdown";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workPreference: user.workPreference,
    };

    const now = new Date();
    const shiftEnds = new Date(
      user.clockedIn.getTime() + user.shiftLength * 60 * 60 * 1000
    );
    const shiftDuration = user.shiftLength * 60 * 60 * 1000;
    const timeLeft = shiftEnds - now;
    const timeElapsed = shiftDuration - timeLeft;
    const timeToShiftEnd = Math.floor(timeLeft / 60000);
    const shiftProgress = (timeElapsed / shiftDuration) * 100;
    const borderDashOffset = ((100 - shiftProgress) / 100) * Math.PI * 160;

    let timeSinceLastBreak = now - user.clockedIn;
    if (user.lastBreakEnd != null) {
      timeSinceLastBreak = now - user.lastBreakEnd;
    }
    const breakInterval = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    const breakLeft = breakInterval - timeSinceLastBreak;
    const timeToNextBreak = Math.floor(breakLeft / 60000);
    const breakProgress = (breakLeft / breakInterval) * 100;
    const borderDashOffsetBreak = (breakProgress / 100) * Math.PI * 160;

    this.state = {
      timeToNextBreak,
      timeToShiftEnd,
      shiftProgress,
      borderDashOffset,
      breakProgress,
      borderDashOffsetBreak,
    };
  }

  handleWorkPreferenceChange = (value) => {
    this.setState({ workPreference: value });
    user.workPreference = value;
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.state = {
        workPreference: user.workPreference,
      };

      const now = new Date();
      const shiftEnds = new Date(
        user.clockedIn.getTime() + user.shiftLength * 60 * 60 * 1000
      );
      const shiftDuration = user.shiftLength * 60 * 60 * 1000;
      const timeLeft = shiftEnds - now;
      const timeElapsed = shiftDuration - timeLeft;
      const timeToShiftEnd = Math.floor(timeLeft / 60000);
      const shiftProgress = (timeElapsed / shiftDuration) * 100;
      const borderDashOffset = ((100 - shiftProgress) / 100) * Math.PI * 160;

      let timeSinceLastBreak = now - user.clockedIn;
      if (user.lastBreakEnd != null) {
        timeSinceLastBreak = now - user.lastBreakEnd;
      }
      const breakInterval = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
      const breakLeft = breakInterval - timeSinceLastBreak;
      const timeToNextBreak = Math.floor(breakLeft / 60000);
      const breakProgress = (breakLeft / breakInterval) * 100;
      const borderDashOffsetBreak = (breakProgress / 100) * Math.PI * 160;

      this.setState({
        timeToNextBreak,
        timeToShiftEnd,
        shiftProgress,
        borderDashOffset,
        breakProgress,
        borderDashOffsetBreak,
      });
    }, 60000); // 1 minute
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      timeToNextBreak,
      timeToShiftEnd,
      shiftProgress,
      borderDashOffset,
      breakProgress,
      borderDashOffsetBreak,
    } = this.state;
    const remainingTimeHoursShift = Math.floor(timeToShiftEnd / 60);
    const remainingTimeMinutesShift = timeToShiftEnd % 60;
    const remainingTimeHoursToBreak = Math.floor(timeToNextBreak / 60);
    const remainingTimeMinutesToBreak = timeToNextBreak % 60;

    const { workPreference } = this.state;
    const options = [
      WorkPreference.SMALL_FAR_PACKAGES,
      WorkPreference.BIG_CLOSE_PACKAGES,
    ];

    if (user.clockedOut != null) {
      return (
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>
              Hello, {user.name}
            </Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>
              Have a good day!
            </Text>
          </View>
        </View>
      );
    }

    return (
      <>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 26, fontWeight: "bold" }}>
              Hello, {user.name}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Time to the end of shift:
            </Text>
          </View>
          <View style={{ marginTop: 10, position: "relative" }}>
            <View
              style={{
                position: "absolute",
                top: 75,
                left: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                {remainingTimeHoursShift === 1
                  ? "1 hour"
                  : `${remainingTimeHoursShift} hours`}{" "}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {" "}
                {remainingTimeMinutesShift === 1
                  ? "1 minute"
                  : `${remainingTimeMinutesShift} minutes`}{" "}
              </Text>
            </View>
            <Svg height="200" width="200">
              <Circle
                cx="100"
                cy="100"
                r="80"
                strokeWidth="8"
                stroke="#d9dcdd"
                fill="transparent"
              />
              <Circle
                cx="100"
                cy="100"
                r="80"
                strokeWidth="8"
                strokeDasharray="502.4"
                strokeDashoffset={borderDashOffset}
                strokeLinecap="round"
                stroke={shiftProgress === 100 ? "#5cd65c" : "#faac02"}
                fill="transparent"
              />
            </Svg>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16 }}>
              Shift Progress: {shiftProgress.toFixed(1)}%
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Time to the next break:
            </Text>
          </View>
          <View style={{ marginTop: 10, position: "relative" }}>
            <View
              style={{
                position: "absolute",
                top: 75,
                left: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                {remainingTimeHoursToBreak === 1
                  ? "1 hour"
                  : `${remainingTimeHoursToBreak} hours`}{" "}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {" "}
                {remainingTimeMinutesToBreak === 1
                  ? "1 minute"
                  : `${remainingTimeMinutesToBreak} minutes`}{" "}
              </Text>
            </View>
            <Svg height="200" width="200">
              <Circle
                cx="100"
                cy="100"
                r="80"
                strokeWidth="8"
                stroke="#d9dcdd"
                fill="transparent"
              />
              <Circle
                cx="100"
                cy="100"
                r="80"
                strokeWidth="8"
                strokeDasharray="502.4"
                strokeDashoffset={borderDashOffsetBreak}
                strokeLinecap="round"
                stroke={breakProgress === 100 ? "#5cd65c" : "#faac02"}
                fill="transparent"
              />
            </Svg>
          </View>
        </View>
        <View style={{ alignItems: "center", marginBottom: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Work preference:
          </Text>
          <SelectDropdown
            data={options}
            defaultValue={user.workPreference}
            onSelect={this.handleWorkPreferenceChange}
            buttonStyle={{ marginTop: 8, marginBottom: 10 }}
            dropdownStyle={{ marginTop: -10 }}
          />
        </View>
      </>
    );
  }
}

export default Profile;
