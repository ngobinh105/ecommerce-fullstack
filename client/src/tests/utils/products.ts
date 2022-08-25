export const products = [
  {
    title: 'new title',
    price: 10000,
    description: 'new description ',
    categoryId: 1,
    images: [
      'https://api.lorem.space/image/fashion?w=640&h=480&r=7028',
      'https://api.lorem.space/image/fashion?w=640&h=480&r=5413',
      'https://api.lorem.space/image/fashion?w=640&h=480&r=5331',
    ],
  },
  {
    title: 'Practical Cotton Gloves',
    price: 846,
    description:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    categoryId: 4,
    images: [
      'https://api.lorem.space/image/shoes?w=640&h=480&r=2423',
      'https://api.lorem.space/image/shoes?w=640&h=480&r=8495',
      'https://api.lorem.space/image/shoes?w=640&h=480&r=2506',
    ],
  },
  {
    title: 'Ergonomic Cotton Bacon',
    price: 515,
    description:
      'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
    categoryId: 4,
    images: [
      'https://api.lorem.space/image/shoes?w=640&h=480&r=2997',
      'https://api.lorem.space/image/shoes?w=640&h=480&r=9528',
      'https://api.lorem.space/image/shoes?w=640&h=480&r=3345',
    ],
  },
]

export const returnedResponse = {
  id: 2,
  title: 'Practical Cotton Gloves',
  price: 846,
  description:
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
  category: {
    id: 4,
    name: 'Shoes',
    image: 'https://api.lorem.space/image/shoes?w=640&h=480&r=192',
  },
  images: [
    'https://api.lorem.space/image/shoes?w=640&h=480&r=2423',
    'https://api.lorem.space/image/shoes?w=640&h=480&r=8495',
    'https://api.lorem.space/image/shoes?w=640&h=480&r=2506',
  ],
}
