var ProducerManager = function(config, market){
  this.config = config;
  this._producers = {};
  this._market = market;
};

ProducerManager.prototype.addProducer = function(producer) {
  producer.on('reportSupply', producerManager.reportSupply);

  this._producers[producer.id] = {
    socket: producer
  };
};
/*
supply of form
{
  producerId: 10,
  data: {
    pricePerMW: 1,
    maxCapacity: 1,
    minCapacity: 0.5
  }
}
*/
ProducerManager.prototype.reportSupply = function(supply) {
  var result = this._market.reportSupply(supply);
  if(result){
    this._producers[supply.producerId].latestSupply = supply;
  };
  return result;
};

module.exports = ProducerManager;
