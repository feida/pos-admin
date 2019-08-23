/**
 * @author wxh on 2017/11/14
 * @copyright
 * @desc
 */


const NODE_ENV = process.env.NODE_ENV;

const config  = require('./' + NODE_ENV);

module.exports = config;