



let asynct = function (num = 0) {
  this.ct = 0;
  this.hedef = num;
  this.arttir = num == 0;
  this.resume;
  this.wait = new Promise((res) => {this.resume = res});
  this.add = (fun) => {
    if(this.arttir) this.hedef++;
    return async (...args) => {
      await fun(...args);
      this.ct++;
      if(this.ct >= this.hedef) {
        this.resume();
        this.reset();
      }
    }
  }
  this.reset = (num2) => {
    this.wait = new Promise((res) => {this.resume = res});
    this.hedef = num2;
    this.ct = 0;
    this.arttir = num2 == 0;
  }
}



module.exports = {
  asynct
}
















