import React, { Component } from "react";
import { View, Text } from "react-native";
import user from "../User.js";
import { Svg, Circle } from "react-native-svg";

class Profile extends Component {
  constructor(props) {
    super(props);
    const now = new Date();
    const shiftEnds = new Date(
      user.clockedIn.getTime() + user.shiftLength * 60 * 60 * 1000
    );
    const shiftDuration = user.shiftLength * 60 * 60 * 1000;
    const timeLeft = shiftEnds - now;
    const timeElapsed = shiftDuration - timeLeft;
    const timeToNextBreak = Math.floor((timeElapsed % 3600000) / 60000); // in minutes
    const timeToShiftEnd = Math.floor(timeLeft / 60000); // in minutes
    const shiftProgress = (timeElapsed / shiftDuration) * 100;
    const borderDashOffset = ((100 - shiftProgress) / 100) * Math.PI * 160;
    this.state = {
      timeToNextBreak,
      timeToShiftEnd,
      shiftProgress,
      borderDashOffset,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const now = new Date();
      const shiftEnds = new Date(
        user.clockedIn.getTime() + user.shiftLength * 60 * 60 * 1000
      );
      const shiftDuration = user.shiftLength * 60 * 60 * 1000;
      const timeLeft = shiftEnds - now;
      const totalBreakTime = user.numBreaks * user.breakLength * 60 * 1000;
      const timeToNextBreak = Math.floor(
        ((shiftDuration - timeLeft) % totalBreakTime) / 60000
      );
      const timeToShiftEnd = Math.floor(timeLeft / 60000);
      const shiftProgress = ((shiftDuration - timeLeft) / shiftDuration) * 100;
      const borderDashOffset = ((100 - shiftProgress) / 100) * Math.PI * 80;
      const breakProgress =
        ((totalBreakTime - timeToNextBreak * 60 * 1000) / totalBreakTime) * 100;

      this.setState({
        timeToNextBreak,
        timeToShiftEnd,
        shiftProgress,
        borderDashOffset,
        breakProgress,
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
    } = this.state;
    const remainingTimeHoursShift = Math.floor(timeToShiftEnd / 60);
    const remainingTimeMinutesShift = timeToShiftEnd % 60;
    const remainingTimeHoursToBreak = Math.floor(timeToNextBreak / 60);
    const remainingTimeMinutesToBreak = timeToNextBreak % 60;

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
      <View style={{ alignItems: "center" }}>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>
            Hello, {user.name}
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {remainingTimeHoursShift === 1
                ? "1 hour"
                : `${remainingTimeHoursShift} hours`}{" "}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {" "}
              {remainingTimeMinutesShift === 1
                ? "1 minute"
                : `${remainingTimeHoursShift} minutes`}{" "}
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
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Shift Progress: {shiftProgress.toFixed(1)}%
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {remainingTimeHoursToBreak === 1
                ? "1 hour"
                : `${remainingTimeHoursToBreak} hours`}{" "}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
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
              stroke={breakProgress === 100 ? "#5cd65c" : "#faac02"}
              fill="transparent"
            />
          </Svg>
        </View>
      </View>
    );
  }
}

export default Profile;
