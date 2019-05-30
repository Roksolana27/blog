//temporary file to create a new blog post
// request directly from browser

// () => {
//   fetch('/api/blogs', {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({title: 'My Title', content: 'My Content'})
//   });
// }

// how Proxy works

// console.clear();
//
// class Greetings {
//   english() {return 'Hello';}
//   spanish() {return 'Hola';}
// }
//
// class MoreGreetings {
//   german() {return 'Hallo';}
//   french() {return 'Bonjour';}
// }
//
// const greetings = new Greetings();
// const moreGreetings = new MoreGreetings();
//
// const allGreetings = new Proxy(moreGreetings, {
//   get: function(target, property){
//     return target[property] || greetings[property];
//   }
// });
//
// allGreetings.french(); // return bonjour