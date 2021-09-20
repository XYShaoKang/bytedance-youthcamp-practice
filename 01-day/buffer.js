{
  // 创建一个 Buffer
  const buf = Buffer.alloc(10)
  console.log(buf)
}
{
  // 将字符串转到 Buffer
  const buf = Buffer.from('a')
  console.log(buf)
}
{
  const buf = Buffer.from('中')
  console.log(buf)
}
{
  // 拼接字符串
  const buf1 = Buffer.from('a')
  const buf2 = Buffer.from('中')
  const buf = Buffer.concat([buf1, buf2])
  console.log(buf, buf.toString())
}
