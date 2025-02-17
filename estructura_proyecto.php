PRUEBATLSFRONTEND/
│
├── .next/
├── node_modules/
├── public/
│   └── images/
│       └── auth/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └──  layout.tsx 
│   │   │           
│   │   ├── (main)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   ├── movie/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── route.ts
│   │   │   ├── movies/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── search/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── reviews/
│   │   │   │    ├── movie/
│   │   │   │    │   └── [movieId]/
│   │   │   │    │       └── route.ts
│   │   │   │    └── route.ts
│   │   │   └── users/
│   │   │        └── [userId]/
│   │   │            └── reviews/
│   │   │                └── route.ts
│   │   ├── components/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MovieCard.tsx
│   │   │   ├── ReviewForm.tsx
│   │   │   └── ReviewList.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useMovies.ts
│   │   ├── models/
│   │   │   ├── Movies.ts
│   │   │   ├── Review.ts
│   │   │   └── User.ts
│   │   ├── styles/
│   │   │   ├── css/
│   │   │   └── globals.css
│   │   └── layout.tsx
│   ├── db/
│   │   └── connect.ts
│   └── utils/
│       ├── alerts.ts
│       ├── api.ts
│       ├── validateObjects.ts
│       └── auth.ts
├── env.local
├── .gitignore
├── eslint.config.mjs
├── LICENSE
├── next-env.d.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
