// 实现微信红包算法，提供一个方法，入参为 amount，count，返回长度为 count 的数组，要求：
// 1. 所有 amount 必须分完
// 2. 每一个红包中至少有 0.01
// 3. 希望每一个红包分到金额的概率相等

function bar(amount, count) {
  if (count <= 0 || amount < 0.01 * count) {
    throw new Error("请输入正确参数");
  }

  const res = new Array(count).fill(0);
  const weights = [];
  let all = 0;
  // 计算总权重
  for (let i = 0; i < count; ++i) {
    const random = Math.floor(Math.random() * 100);
    weights.push(random);
    all += random;
  }
  // 最后一个值不计入roll,直接用剩余
  let last = amount;

  for (let j = 0; j < count - 1; ++j) {
    res[j] = Number(parseFloat(weights[j] / all * amount).toFixed(2));
    last -= res[j]
  }
  // 无法确保最后一值得fix 凑够10
  res[count - 1] = Number(last.toFixed(2));

  return res
}


function foo(amount, count) {
  if (count <= 0 || amount < 0.01 * count) {
    throw new Error("请输入正确参数");
  }

  const redPackets = [];

  for (let i = 0; i < count - 1; ++i) {
    // 1 是指剩最后一个的时候 不用随机 就是全部的金额
    const basicSplit = (count - i - 1) * 0.01;
    // 剩下的平均每个最大能有多少
    const hasUse = count - i;
    // 计算剩下可用额度
    const max = (amount - basicSplit) / hasUse;
    // 取当前余下平均值得随机
    const packet = Math.random() * max;
    redPackets.push(parseFloat(packet.toFixed(2)));
    amount -= packet;
  }

  // 无法确保最后一值得fix 凑够10
  redPackets.push(parseFloat(amount.toFixed(2))); // 确保最后一个红包金额不会超过剩余金额

  return redPackets;
}

const res = bar(10, 4)
const res2 = foo(10, 4)
console.log(res)
console.log(res2)

