export default function GenerateOrderId() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const timeStamp = [year, month, day].join("");
  //const timestamp = Date.now().toString();
  console.log("time", timeStamp);

  const randomNum = Math.floor(Math.random() * 1000).toString();
  return `ORDER-${timeStamp}-${randomNum}`;
}
