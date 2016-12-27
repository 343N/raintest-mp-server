function Block(x, y, size, r,g,b) {

  this.x = x;
  this.y = y;
  this.scale = size;
  this.color = color(r,g,b);

  this.show = function() {
    // noStroke();
    fill(this.color);
    stroke(255, 128);
    rect(this.x, this.y, this.scale, this.scale);
  }
}
