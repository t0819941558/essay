function bar(amount, count) {
  const res = new Array(count).fill(0.01);

  const reamin = amount - count * 0.01;

  const quan = [];
  let all = 0;

  for (let i = 0; i < count; ++i) {
    const random = Math.floor(Math.random() * 100);
    quan.push(random);
    all += random;
  }
  let last = reamin;

  for (let j = 0; j < count - 1; ++j) {
    res[j] = Number(parseFloat(quan[j] / all * reamin).toFixed(2));
    last -= res[j]
  }
  res[count - 1] = Number(last.toFixed(2));

  return res
}

const res = bar(10, 4)
console.log(res)