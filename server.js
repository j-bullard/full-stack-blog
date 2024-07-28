import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createDevServer() {
  const app = express()

  const vite = await (
    await import('vite')
  ).createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    try {
      const templateHtml = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      )
      const template = await vite.transformIndexHtml(
        req.originalUrl,
        templateHtml,
      )

      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
      const appHtml = await render(req)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (err) {
      vite.ssrFixStacktrace(err)
      next(err)
    }
  })

  return app
}

const app = await createDevServer()
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})
