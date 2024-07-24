import { app } from './app'

app.listen({ port: 3333 }, () => {
  console.log('HTTP Server running on http://localhost:3333')
})
