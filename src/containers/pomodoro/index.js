import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {DEFAULT_MINUTE} from '../../constants/values';
import colors from '../../themes/colors';

const Pomodoro = () => {
  const [maxMinute, setMaxMinute] = useState(DEFAULT_MINUTE);
  const [second, setSecond] = useState(0);
  const [isRun, setIsRun] = useState(false);

  const stopwatch = useRef(null);

  const start = () => {
    if (!stopwatch.current && second < maxMinute * 60) {
      setIsRun(true);
      stopwatch.current = setInterval(() => {
        setSecond((s) => s + 1);
      }, 1);
    }
  };

  const stop = () => {
    setIsRun(false);
    clearInterval(stopwatch.current);
    stopwatch.current = null;
  };

  const reset = () => {
    stop();
    setSecond(0);
  };

  useEffect(() => {
    if (second >= maxMinute * 60) {
      stop();
    }
  }, [stopwatch, maxMinute, second]);
  const minuteFormated = parseInt(second / 60, 10).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  });
  const secondFormated = (second % 60).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  });
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {minuteFormated}:{secondFormated}
      </Text>
      <TouchableOpacity onPress={isRun ? stop : start}>
        <Text>{!stopwatch.current ? '>' : '||'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset}>
        <Text>reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Pomodoro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.redPrimary,
  },
});
