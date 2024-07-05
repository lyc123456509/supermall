const useCountDown = (time = 15, speed = 1000) => {
  const countTime = ref(time * 60);
  const returnData = ref({
    hour: `${time}`,
    minute: time.toString(),
    second: '00',
  });
  const timer = ref();

  onMounted(() => {
    timer.value = setInterval(() => {
      countTime.value--;
      if (countTime.value >= 0) {
        const minute = Math.floor(countTime.value / 60);
        const second = countTime.value % 60;
        returnData.value = {
          hour: '00',
          minute: minute < 10 ? `0${minute}` : `${minute}`,
          second: second < 10 ? `0${second}` : `${second}`,
        };
      } else {
        clearInterval(timer.value);
      }
    }, speed);
  });

  return returnData;
};

export default useCountDown;
