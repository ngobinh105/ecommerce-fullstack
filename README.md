# Binh Ecommerce Website - Full Stack Project

The project is aiming to create an Ecommerce website which are user-friendly, minimalist web design. Support all the functions that are required in the normal e-commerce website.

## Installation

Clone the project:

```bash
  git clone https://github.com/ngobinh105/fs11-fullstack.git
```

Install node module for api and client folder:

```bash
  cd api
  npm install

  cd client
  npm install
```

Run development on api backend:

```bash
  npm run start:dev
```

Run development on client frontend:

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```
## Project Structure
- API: 
<pre> 
├── Procfile
├── debug.log
├── jest.config.js
├── package-lock.json
├── package.json
├── src
|  ├── app.ts
|  ├── config
|  |  └── passport.ts
|  ├── controllers
|  |  ├── cart.controller.ts
|  |  ├── category.controller.ts
|  |  ├── product.controller.ts
|  |  ├── review.controller.ts
|  |  └── user.controller.ts
|  ├── database.ts
|  ├── entity
|  |  ├── Address.ts
|  |  ├── BaseEntityCustom.ts
|  |  ├── CartItem.ts
|  |  ├── Category.ts
|  |  ├── Image.ts
|  |  ├── Product.ts
|  |  ├── Review.ts
|  |  └── User.ts
|  ├── helpers
|  |  └── apiError.ts
|  ├── middlewares
|  |  ├── apiErrorHandler.ts
|  |  ├── multerService.ts
|  |  └── userMiddleware.ts
|  ├── routers
|  |  ├── auth.route.ts
|  |  ├── category.route.ts
|  |  ├── image.route.ts
|  |  ├── product.route.ts
|  |  └── user.route.ts
|  ├── server.ts
|  ├── services
|  |  ├── cart.service.ts
|  |  ├── category.service.ts
|  |  ├── product.service.ts
|  |  ├── review.service.ts
|  |  └── user.service.ts
|  ├── subscribers
|  |  └── User.ts
|  ├── test
|  |  ├── cart.test.ts
|  |  ├── category.test.ts
|  |  ├── fixtures
|  |  ├── images
|  |  ├── product.test.ts
|  |  ├── review.test.ts
|  |  ├── user.test.ts
|  |  └── utils
|  ├── types
|  |  └── token.ts
|  └── util
|     ├── logger.ts
|     ├── secrets.ts
|     └── squareNumber.ts
└── tsconfig.json</pre>
- Client:
<pre>
├── README.md
├── netlify.toml
├── package-lock.json
├── package.json
├── public
|  ├── _redirects
|  ├── index.html
|  ├── manifest.json
|  └── robots.txt
├── src
|  ├── App.tsx
|  ├── axios
|  |  └── axios.ts
|  ├── components
|  |  ├── CartModal.tsx
|  |  ├── LoginButton.tsx
|  |  ├── NavBar.tsx
|  |  ├── SignInModal.tsx
|  |  └── UserMenu.tsx
|  ├── hooks
|  |  ├── appHooks.ts
|  |  └── customHooks.ts
|  ├── index.tsx
|  ├── pages
|  |  ├── Home.tsx
|  |  ├── Products.tsx
|  |  ├── Profile.tsx
|  |  └── SingleProduct.tsx
|  ├── react-app-env.d.ts
|  ├── redux
|  |  ├── reducers
|  |  |  ├── cartReducer.ts
|  |  |  ├── categoryReducer.ts
|  |  |  ├── productReducer.ts
|  |  |  └── userReducer.ts
|  |  └── store.ts
|  ├── reportWebVitals.ts
|  ├── setupTests.ts
|  ├── styles
|  |  ├── components
|  |  |  ├── _CartModal.scss
|  |  |  ├── _NavBar.scss
|  |  |  └── _SignInModal.scss
|  |  ├── pages
|  |  |  ├── _Home.scss
|  |  |  ├── _Products.scss
|  |  |  ├── _Profile.scss
|  |  |  └── _SingleProduct.scss
|  |  ├── styles.scss
|  |  └── variables
|  |     └── _fonts.scss
|  ├── tests
|  |  ├── reducers
|  |  |  ├── cartReducer.test.ts
|  |  |  ├── categoryReducer.test.ts
|  |  |  ├── productReducer.test.ts
|  |  |  └── userReducer.test.ts
|  |  └── utils
|  |     ├── mockServer.ts
|  |     ├── products.ts
|  |     └── testStore.ts
|  ├── theme
|  |  └── ThemeContext.tsx
|  ├── types
|  |  ├── cart.ts
|  |  ├── product.ts
|  |  └── user.ts
|  └── validation
|     ├── productSchema.ts
|     └── userSchema.ts
└── tsconfig.json
</pre>
## Demo

- Backend: [here](https://safe-oasis-02926.herokuapp.com)
- Frontend: [here](https://fs11-ecommerce-web.netlify.app/)

## Tech Stack

**Client:** React, Redux, Material UI, SCSS

**Server:** Node, Express, TypeORM, PostgreSQL

## Features

- Light/dark mode toggle
- User login / Google Authentication / Signup
- Add Items To Cart
- Basic Routing

## Authors

- [@ngobinh105](https://github.com/ngobinh105)

## License

Copyright @2022: [@ngobinh105](https://github.com/ngobinh105)
