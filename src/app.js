import $ from 'jquery';
import Rx from 'rxjs/Rx';

// 01 button
const button01 = document.getElementById('btn01');
const input01 = document.getElementById('input');
const input02 = document.getElementById('input2');
const output = document.getElementById('output');
const postsdata = document.getElementById('posts');

console.log('START START START');
console.log('****** BUTTON *******');
const button01Str$ = Rx.Observable.fromEvent(button01, 'click');
button01Str$.subscribe(
  (e) => {
    console.log(e);
    console.log(e.target);
  },
  (err) => {
    console.log('err');
  },
  (gotovo) => {
    console.log('gotovo button01Str$');
  }
);

console.log('****** INPUT *******');
const input01Str$ = Rx.Observable.fromEvent(input01, 'keyup');
input01Str$.subscribe(
  (e) => {
    console.log(e);
    console.log(e.target.value);
    console.log(e.currentTarget.value);
    output.innerHTML = e.target.value;
  },
  (err) => {
    console.log('err');
  },
  (gotovo) => {
    console.log('gotovo input01Str');
  }
);

//  MosuseMove stream
// const moveStr$ = Rx.Observable.fromEvent(document, 'mousemove');
// moveStr$.subscribe(
//   (e) => {
//     console.log(e);
//     output.innerHTML =   'X=' + e.clientX + '--Y=' + e.clientY;
//   },
//   (err) => {
//     console.log('err');
//   },
//   (gotovo) => {
//     console.log('gotovo moveStr$');
//   }
// );

console.log('****** ARRAY *******');
const numbers = [33, 44, 55, 66, 77];
const numbers$ = Rx.Observable.from(numbers);

numbers$.subscribe(
  (e) => {
    console.log(e);
  },
  (err) => {
    console.log('err');
  },
  (gotovo) => {
    console.log('gotovo numbers$');
  }
);

console.log('****** ARRAY *******');
const posts = [
  { title: 'Post 01', body: 'Body 01' },
  { title: 'Post 02', body: 'Body 02' },
  { title: 'Post 03', body: 'Body 03' },
  { title: 'Post 04', body: 'Body 04' },
];

const posts$ = Rx.Observable.from(posts);
let text = '';
posts$.subscribe(
  (post) => {
    text += `<ui>${post.title}</ui>`;
    postsdata.innerHTML = text;
  },
  (err) => {
    console.log('err');
  },
  (gotovo) => {
    console.log('gotovo posts$');
  }
);

console.log('****** SET *******');
const set = new Set(['Hello', 44, { title: 'title 01' }]);
const sets$ = Rx.Observable.from(set);
sets$.subscribe(
  (set) => {
    console.log('SET=', set);
    // postsdata.innerHTML = text
  },
  (err) => {
    console.log('err');
  },
  (gotovo) => {
    console.log('gotovo SET');
  }
);

// *******************************
console.log('****** MAP *******');
const map = new Map([
  [1, 2],
  [2, 3],
  [4, 5],
]);
const maps$ = Rx.Observable.from(map);
maps$.subscribe(
  (set) => {
    console.log('MAP =', set);
    // postsdata.innerHTML = text
  },
  (err) => {
    console.log('err');
  },
  (gotovo) => {
    console.log('gotovo MAP');
  }
);

// *******************************
console.log('*** Create Obrerver *******');
const source$ = new Rx.Observable((observer) => {
  observer.next('Prva poruka 01');
  observer.next('Jos jedna emitirana vrijednost 02');

  observer.error(new Error('Error: nesto je krivo!'));

  setTimeout(() => {
    observer.next('Nova vrijednost he he');
    observer.complete();
  }, 1000);
});

source$
  .catch((err) => {
    return Rx.Observable.of(err);
  })
  .subscribe(
    (x) => {
      console.log(x);
    },
    (err) => {
      console.log(err);
    },
    (completed) => {
      console.log('completed Create Obrerver');
    }
  );

// *******************************
console.log('*** Promise ******');
const myPromise = new Promise((res, rej) => {
  console.log('Creating promise');
  setTimeout(() => {
    res('Pozdrav nakon 3 sekunde');
  }, 3000);
});

myPromise.then((x) => {
  console.log(x);
});

// Kreiranje kao Observer
const sourcePromise$ = Rx.Observable.fromPromise(myPromise);
sourcePromise$.subscribe((x) => {
  console.log('Kreiranje kao Observer');
  console.log(x);
});

function getUser(username) {
  return $.ajax({
    // url: 'https://api.github.com/users/' + username,
    url:
      'https://api.github.com/users/alenskupnjak/repos?per_page=100&sort=create:asc&client_id=ec211c2c8ef247d5b385&client_secret=db29824764c9e96f8273c9f4854f16c8262e7c92',
    dataType: 'json',
  }).promise();
}

Rx.Observable.fromPromise(getUser('alenskupnjak'))
  .map((user) => {
    let polje = Array.from(user);
    console.log(typeof user);
    console.log(user, polje);
    console.log(user[0].url, polje);
    return user[0];
  })
  .subscribe((x) => {
    console.log('JQUERY=', x);
  });

// ************
function getUserFetch(username) {
  return fetch(
    'https://api.github.com/users/alenskupnjak/repos?per_page=100&sort=create:asc&client_id=ec211c2c8ef247d5b385&client_secret=db29824764c9e96f8273c9f4854f16c8262e7c92'
  )
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}

Rx.Observable.fromPromise(getUserFetch('alenskupnjak')).subscribe((x) => {
  console.log('FETCH', x);
  postsdata.insertAdjacentHTML('afterend', '<p class="afterend">afterend</p>');

  // const polje = Array.from(x)
  // console.log(polje);
  // x.forEach((element) => {
  // console.log(element.full_name);
  // postsdata.insertAdjacentHTML(
  //   'afterend',
  //   `<p class="afterend">${element.full_name}</p>`
  // );
  // });
});

console.log('***  Rx.Observable.interval(1000) ***');
const sourceInterval$ = Rx.Observable.interval(1000).take(5);
sourceInterval$.subscribe(
  (x) => {
    console.log(x);
  },
  (err) => {
    console.log(err);
  },
  (completed) => {
    console.log('completed Create Interval');
  }
);

// TIMER krece nakon 5 sekundi, korak 1000ms
const sourceTimer$ = Rx.Observable.timer(5000, 1000);
sourceTimer$.subscribe(
  (x) => {
    console.log('Timer u radu.');
    console.log(x);
    if (x === 5) {
      return;
    }
  },
  (err) => {
    console.log(err);
  },
  (completed) => {
    console.log('completed Create Interval');
  }
);

console.log('*** RANGE ***');
// Krecem od 20 i brojim 5 puta
const sourceRange$ = Rx.Observable.range(20, 5);
sourceRange$.subscribe(
  (x) => {
    console.log('Range u radu', x);
  },
  (err) => {
    console.log(err);
  },
  (completed) => {
    console.log('completed RANGE');
  }
);

const sourceInt$ = Rx.Observable.interval(5000)
  .take(5)
  .map((v) => {
    return v * 3;
  });
sourceInt$.subscribe((v) => {
  console.log('sourceInt$ ++++++++++++ ', v);
});

console.log('*** sourcePolje ***');
let polje = ['John', 'Ante', 'Mate'];
const sourcePolje$ = Rx.Observable.from(polje)
  .map((x) => {
    return x.toUpperCase();
  })
  .map((v) => {
    return 'Ja sam ' + v;
  });

sourcePolje$.subscribe((v) => {
  console.log(v);
});

setTimeout(() => {
  polje.push('Dodatak polju!');
  console.log('polje=', polje);
}, 2000);

const poljedrugo = [
  { name: 'Name 01', age: 'Body 01' },
  { name: 'Name 02', age: 'Body 02' },
  { name: 'Post 03', age: 'Body 03' },
  { name: 'Post 04', age: 'Body 04' },
];

const user$ = Rx.Observable.from(poljedrugo).pluck('name');
console.log(poljedrugo);
user$.subscribe((x) => {
  console.log(x);
});

Rx.Observable.of('Hello')
  .merge(Rx.Observable.of('Svi'))
  .subscribe((x) => console.log(x));

// Merge
const sourceMerge1 = Rx.Observable.interval(2000).map((x) => 'Merge1= ' + x);
const sourceMerge2 = Rx.Observable.interval(500).map((x) => 'Merge2= ' + x);

Rx.Observable.merge(sourceMerge1, sourceMerge2)
  .take(25)
  .subscribe((x) => {
    console.log('Merge', x);
  });

// Merge
const sourceMerge3 = Rx.Observable.range(200, 5).map((x) => 'Source 1 = ' + x);
const sourceMerge4 = Rx.Observable.range(6, 5).map((x) => 'Source 2 = ' + x);

Rx.Observable.concat(sourceMerge3, sourceMerge4)
  .take(25)
  .subscribe((x) => {
    console.log('CONCAT = ', x);
  });
