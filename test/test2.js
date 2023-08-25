function compare(t1, t2) {
  if (t1 - t2 === 0) {
    return 0;
  }
  return t1 - t2 > 0 ? 1 : -1;
}

function parseTime(t) {
  const day = parseInt(t.slice(0, 2));
  const hour = parseInt(t.slice(-2));
  return day * 24 + hour;
}

function getUnion(t1, t2) {
  const t1StartVal = parseTime(t1[0]);
  const t1EndVal = parseTime(t1[1]);
  const t2StartVal = parseTime(t2[0]);
  const t2EndVal = parseTime(t2[1]);
  if (compare(t1StartVal, t2EndVal) > 0 || compare(t1EndVal, t2StartVal) < 0) {
    return null;
  }
  const unionRange = countUnionRange(t1StartVal, t1EndVal, t2StartVal, t2EndVal, t1, t2);
  return unionRange;
}

function parseTimeToStr(t) {
  const day = Math.floor(t / 24);
  const hour = t - day * 24;
  return `${day.toString().padStart(2, 0)}${hour.toString().padStart(2, 0)}`;
}

function countUnionRange(t1Start, t1End, t2Start, t2End) {
  const list = [t1Start, t1End, t2Start, t2End];
  list.sort((x, y) => x - y);
  const range = list.slice(1, -1);
  if (range[1] - range[0] > 4) {
    range[1] = range[0] + 3;
  }
  return range.map(item => parseTimeToStr(item));
}

function getUnionTimes(ts1, ts2) {
  const unionTimes = [];
  for (let i = 0; i < ts1.length; i++) {
    for (let j = 0; j < ts2.length; j++) {
      const res = getUnion(ts1[i], ts2[j]);
      if (res) {
        unionTimes.push(res);
      }
    }
  }
  return unionTimes;
}

const res = getUnionTimes(p1slot, p2slot);
console.log(res);