var artist = new Backbone.Model({
  firstName: "立华",
  lastName: "咸"
});

artist.set({birthday: "December 13, 1979"});

var obj = artist.toJSON();
console.log(obj);
console.log(obj.firstName);

alert(artist.toJSON());