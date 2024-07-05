export function isIOS() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return 'android';
  }
  if (isiOS) {
    return 'ios';
  }
}

//  生成随机字符串
export function randomChars(len: number) {
  const result: string[] = [];

  for (let i = 0; i < len; i++) {
    // 生成0~25的随机数字
    const ram = Math.ceil(Math.random() * 25); // 获取大写字母（A~Z的ASCII码65-90）
    const char = String.fromCharCode(65 + ram); // 随机转为大小
    result.push(Math.random() > 0.5 ? char.toLowerCase() : char);
  }
  return result.join('');
}

//  生成带数字的随机字符串
//  生成随机字符串
export function randomCharsNum(len: number) {
  const result: string[] = [];

  for (let i = 0; i < len; i++) {
    // 生成0~25的随机数字
    const ram = Math.ceil(Math.random() * 25); // 获取大写字母（A~Z的ASCII码65-90）
    const char = String.fromCharCode(65 + ram); // 随机转为大小
    const ramNum = Math.ceil(Math.random() * 9).toString();
    const curRam = Math.random();
    if (curRam < 0.3) {
      result.push(ramNum);
    } else if (curRam < 0.6) {
      result.push(char.toLowerCase());
    } else {
      result.push(char);
    }
  }
  return result.join('');
}
