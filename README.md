## Быстрый старт

Нужен только Docker

```bash
docker compose up --build
```

Apollo Sandbox: **http://localhost:3000/graphql**

Остановить и удалить данные

```bash
docker compose down -v
```

## Пример запроса

```graphql
query {
  profile {
    name
    headline
    description
    links {
      label
      url
      type
    }
    skills(category: DATABASE) {
      name
      level
    }
    experiences {
      company
      position
      startDate
      isCurrent
      achievements
    }
    projects(featuredOnly: true) {
      name
      repoUrl
      stack
    }
  }
}
```
