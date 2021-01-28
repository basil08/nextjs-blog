export default function sayHello(req, res) {
  // parse the req
  // await for some external API, DB query etc
  // put result in expected format
  // load the data on the res and send the res
  res.status(200).json({text: 'Hello'})
}