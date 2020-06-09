/* eslint-disable */

var jwt = require('jsonwebtoken');
const PRIVATE_KEY = '5906d67a67fbd6c94de29792c3b95666cc35dbd4430612ca7ac0043d56c6a0b44feb55fe4c55855d5aed28f8aff90f059226a47939046261bfc19e6b9eec8857'

function createJWT(data)
{      
  var token = jwt.sign(JSON.stringify(data), PRIVATE_KEY);
 return token
}


function verifyJWT(jWTString)
{
  let decryptedJWT = jwt.verify(jWTString, PRIVATE_KEY, { algorithms: ['HS512'] });
  return JSON.parse(decryptedJWT.data)
}

module.exports =  {
  createJWT: createJWT,
  verifyJWT: verifyJWT
}