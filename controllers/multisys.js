const {API_SMS, API_BAYAD, MULTIPAY_TOKEN, MULTIPAY_CODE} = require('../config');
const mysql = require('anytv-node-mysql');
const cudl = require('cuddle');

async function sendMsg(number, message) {
  return await cudl.post
    .to(API_SMS + '/sms/push')
    .set_header('X-MultiPay-Token', MULTIPAY_TOKEN)
    .set_header('X-MultiPay-Code', MULTIPAY_CODE)
    .send({
      message,
      number,
    })
    .promise();
}

exports.register = async (req, res, next) => {
  const data = req.body;

  if (!data.number || !/09[0-9]{9}/.test(data.number)) {
    return res.send(400, {message: 'Correct number pls ' + data.number});
  }

  const ret = await sendMsg(data.number, 'You have successfully registered!');

  res.send(ret);
};


exports.generate = async (req, res, next) => {
  const data = req.body;

  // const ret = await cudl.post
  //   .to(API_BAYAD + '/api/v1/transactions/generate')
  //   .send({
  //     amount: ,
  //     txnid: ,
  //     callback_url: ,
  //     name: ,
  //   })
}