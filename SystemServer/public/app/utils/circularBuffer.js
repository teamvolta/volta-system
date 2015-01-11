var CircularBuffer = function(size){
  this._storage = [];
  this.head = 0;
  this.tail = 0;
  this.size = size;
  this.array = [];
};

CircularBuffer.prototype.eq = function(item){
  if(this.tail === this.head && this._lastOperation === 'write'){
    this.head ++;
  };
  this._storage[this.tail] = item;
  this.tail = (this.tail + 1) % this.size;
  this._lastOperation = 'write';
  this.getArray();
};

CircularBuffer.prototype.dq = function(){
  if(this.head === this.tail && this._lastOperation === 'read'){
    console.log('queue empty');
    throw new Error('queue empty');
  }else{
    var result = this._storage[this.head];
    this.head = (this.head + 1) % this.size;
  };
  this._lastOperation = 'read';
  return result;
};

CircularBuffer.prototype.getArray = function(){
  var tempHead = this.head;
  var results = [];
  if(tempHead === this.tail){
    results.push(this._storage[tempHead]);
    tempHead = (tempHead + 1) % this.size;
  };

  while(tempHead !== this.tail){
    results.push(this._storage[tempHead]);
    tempHead = (tempHead + 1) % this.size;
  };
  this.array = results;
  return results;
};