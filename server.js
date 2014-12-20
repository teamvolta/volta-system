var config = require('./config')[process.argv[2]];
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var market = new (require('./market'))(config);
var consumerManager = new (require('./consumerManager'))(config.consumer, market);
var producerManager = new (require('./producerManager'))(config.producer, market);

// Setup server.
server.listen(config.port);

// Server admin portal
app.get('/admin', function(req, res){
  res.sendfile(__dirname + '/admin.html');
});


// Setup listeners for connections on namespaces
var consumerNsp = io.of('/consumers');
consumerNsp.on('connection', function(socket){
  setupConsumerSocket(socket);
});

var producerNsp = io.of('/producers');
producerNsp.on('connection', function(socket){
  setupProducerSocket(socket);
});

/*
Setup market listeners
timeBlock is of the form
{
  blockStart: 123123124,
  biddingDuration: 10
  blockDuration: 120,
  minPrice: .2,
  maxPrice: 20
}
*/

market.on('startBidding', function(timeBlock){
});

market.on('marketClose', function(receipts){
});

market.on('changeProduction', function(controls){
});

// Functions for setting up listeners on sockets
function setupProducerSocket(socket){
  producerManager.addProducer(socket.id);
  socket.on('reportSupply', producerManager.reportSupply)
};

function setupConsumerSocket(socket){
  consumerManager.addConsumer(socket.id);
  socket.on('bid', consumerManager.bid);
  socket.on('consume', function(consumption){
    console.log(consumption);
  })
};
