// создаем пустой массив
// создаю массив с url
// создаю массив likes
// создаю массив comments
var names = ['Ivan', 'Marya', 'Mika'];

var text = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];

var userAvatars = [
  'img/avatar-1.jpg',
  'img/avatar-2.jpg',
  'img/avatar-3.jpg'
];

var messages = [
  {
    avatar: userAvatars[0],
    text: text[0],
    name: names[0]
  },
  {
    avatar: userAvatars[1],
    text: text[1],
    name: names[1]
  },
  {
    avatar: userAvatars[2],
    text: text[2],
    name: names[2]
  }
];

var photos = [
  'photo/1.jpg',
  'photo/2.jpg',
  'photo/3.jpg'
]

var photosDescription = [
  {
    url: photos[0],
    likes: 200 - Math.floor(Math.random() * 15),
    comments: messages[0]
  },
  {
    url: photos[1],
    likes: 200 - Math.ceil(Math.random() * 15),
    comments: messages[1]
  },
  {
    url: photos[2],
    likes: 200 - Math.ceil(Math.random() * 15),
    comments: messages[2]
  }
];

console.log(photosDescription)
