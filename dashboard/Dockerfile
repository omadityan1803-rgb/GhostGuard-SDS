FROM node:20-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

---

## Final Dashboard Directory — Complete
```
dashboard/
├── src/
│   ├── App.tsx               ✓
│   ├── main.tsx              ✓
│   ├── index.css             ✓
│   ├── pages/
│   │   ├── Overview.tsx      ✓
│   │   └── Logs.tsx          ✓
│   ├── components/
│   │   ├── Navbar.tsx        ✓
│   │   ├── StatCard.tsx      ✓
│   │   ├── VerdictBadge.tsx  ✓
│   │   ├── ScoreGauge.tsx    ✓
│   │   └── RecentEvents.tsx  ✓
│   ├── hooks/
│   │   └── useStats.ts       ✓
│   ├── api/
│   │   └── client.ts         ✓
│   └── types/
│       └── index.ts          ✓
├── public/
│   └── index.html            ✓
├── package.json              ✓
├── tsconfig.json             ✓
├── tsconfig.node.json        ✓
├── vite.config.ts            ✓
└── Dockerfile                ✓
