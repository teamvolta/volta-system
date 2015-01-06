exports.development = {
  port: 8000,
  maxConsumers: 10,
  maxNumBids: 10,
  biddingDuration: 10000,
  blockDuration: 10000,
  maxPrice: 100,
  minPrice: 1,
  margin: 1,
  discoveryIp: 'http://104.40.181.157:8001',
  ip: 'http://localhost:8000',
  id: 10,
  role: 'system',
  subRole: 'system',
  defaultPriceAndControl: 'verticalDemandAndStepwiseSupply'
};

exports.production = {
  port: process.env.PORT,
  maxConsumers: 10,
  maxNumBids: 10,
  biddingDuration: 10000,
  blockDuration: 10000,
  maxPrice: 100,
  minPrice: 1,
  margin: 1,
  defaultPriceAndControl: 'verticalDemandAndStepwiseSupply'

};


