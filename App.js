import React, { Component } from 'react';
import { View, StyleSheet, Animated, Button } from 'react-native';

export default class Row extends Component {
  constructor() {
    super();

    this.state = {
      showModal: true,
      circle: new Animated.Value(0),
      tipTop: new Animated.Value(19),
      tipLeft: new Animated.Value(1),
      tipWidth: new Animated.Value(0),
      longTop: new Animated.Value(49),
      longRight: new Animated.Value(42),
      longWidth: new Animated.Value(0),
    };
  }

  startAnimation = () => {
      Animated.sequence([
        Animated.timing(this.state.circle, {
          toValue: 1,
          duration: 300,
        }),
        //Primeira pose Tip
        Animated.parallel([
          Animated.timing(this.state.tipTop, {
            toValue: 34,
            duration: 100
          }),
          Animated.timing(this.state.tipLeft, {
            toValue: -7,
            duration: 100
          }),
          Animated.timing(this.state.tipWidth, {
            toValue: 44,
            duration: 100
          }),
        ]),
        //Segunda pose Tip
        Animated.parallel([
          Animated.timing(this.state.tipTop, {
            toValue: 44,
            duration: 100
          }),
          Animated.timing(this.state.tipLeft, {
            toValue: 17,
            duration: 100
          }),
          Animated.timing(this.state.tipWidth, {
            toValue: 17,
            duration: 100
          }),
        ]),
        //Terceira pose Tip
        Animated.parallel([
          Animated.timing(this.state.tipTop, {
            toValue: 42,
            duration: 100
          }),
          Animated.timing(this.state.tipLeft, {
            toValue: 10,
            duration: 100
          }),
          Animated.timing(this.state.tipWidth, {
            toValue: 25,
            duration: 100
          }),
        ]),
        //Primeira pose Long
        Animated.parallel([
          Animated.timing(this.state.longTop, {
            toValue: 31,
            duration: 100
          }),
          Animated.timing(this.state.longRight, {
            toValue: -4,
            duration: 100
          }),
          Animated.timing(this.state.longWidth, {
            toValue: 55,
            duration: 100
          }),
        ]),
        //Segunda pose Long
        Animated.parallel([
          Animated.timing(this.state.longTop, {
            toValue: 34,
            duration: 50
          }),
          Animated.timing(this.state.longRight, {
            toValue: 4,
            duration: 50
          }),
          Animated.timing(this.state.longWidth, {
            toValue: 47,
            duration: 50
          }),
        ]),
      ]).start();
  };

  resetAnimation() {
    this.setState({
      circle: new Animated.Value(0),
      tipTop: new Animated.Value(19),
      tipLeft: new Animated.Value(1),
      tipWidth: new Animated.Value(0),
      longTop: new Animated.Value(50),
      longRight: new Animated.Value(40),
      longWidth: new Animated.Value(0),
    })
  }

  openModal() {
    this.setState({ showModal: true });
    this.startAnimation();
  }

  closeModal() {
    this.setState({ showModal: false });
    this.resetAnimation();
  }

  render() {
    const { 
      circle, 
      showModal, 
      tipWidth,
      tipLeft,
      tipTop,
      longWidth,
      longRight,
      longTop, 
    } = this.state;
    // Rotate around cirle
    const circleInterpolate = circle.interpolate({
      inputRange: [0, 1],
      outputRange: ['315deg', '-45deg'],
    });

    // Animation styles
    const animatedStyles = {
      afterAnimatedStyle: { transform: [{ rotate: circleInterpolate }] },
      tipAnimatedStyle: {
        width: tipWidth,
        left: tipLeft,
        top: tipTop,
      },
      longAnimatedStyle: {
        width: longWidth,
        right: longRight,
        top: longTop,
      },
    };

    return (
      <View style={styles.container}>
        {
          (showModal)
          ? <View style={styles.successCheckmark}>
          <View style={styles.checkIcon}>
            <Animated.View
              style={[styles.afterRotate, animatedStyles.afterAnimatedStyle]}>
              <View style={styles.after} />
            </Animated.View>
            <Animated.View
              style={[
                styles.iconLine,
                styles.lineTip,
                animatedStyles.tipAnimatedStyle,
              ]}
            />
            <Animated.View
              style={[
                styles.iconLine,
                styles.lineLong,
                animatedStyles.longAnimatedStyle,
              ]}
            />
            <View style={styles.iconCircle} />
            <View style={styles.iconFix} />
            <View style={styles.before} />
          </View>
        </View>
        : null
        }
        <View>
          <Button
            title="Animation"
            onPress={() => this.openModal()}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Button
            title="Reset"
            color='red'
            onPress={() => this.closeModal()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCheckmark: {
    width: 80,
    height: 115,
    marginVertical: 0,
    marginHorizontal: 'auto',
  },
  checkIcon: {
    width: 80,
    height: 80,
    position: 'relative',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
  afterRotate: {
    top: -4,
    right: -15,
    width: 120,
    height: 100,
    position: 'absolute',
  },
  after: {
    position: 'absolute',
    right: 0,
    width: 60,
    height: 100,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: '#fff',
  },
  iconLine: {
    height: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
    position: 'absolute',
    zIndex: 10,
  },
  lineTip: {
    transform: [{ rotate: '45deg' }],
  },
  lineLong: {
    transform: [{ rotate: '-45deg' }],
  },
  iconCircle: {
    top: -4,
    left: -4,
    zIndex: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
    position: 'absolute',
    borderWidth: 4,
    borderColor: 'rgba(76, 175, 80, .5)',
  },
  iconFix: {
    top: 5,
    width: 5,
    left: 23,
    zIndex: 1,
    height: 85,
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    backgroundColor: '#fff',
  },
  before: {
    top: 10,
    left: 0,
    width: 30,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    height: 100,
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    backgroundColor: '#fff',
  },
});
