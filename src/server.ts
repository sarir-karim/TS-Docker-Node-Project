import chalk from 'chalk'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { checkPrivateToken } from './middleware/privateToken'
import { router } from './routes/router'

dotenv.config({ path: '.env.local' })

function main() {
  try {
    const app = express() as any

// Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet)
app.use(helmet())
app.use(helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives()
  }
}))

    // We are making this path publically available
    // We can now for example go here to see an image inside uploads/images:
    // http://localhost:4400/uploads/images/2021-05-02T17:13:00.379Z_Screenshot_20210413_155657_se.bankgirot.swish.jpg
    app.use('/uploads/images', express.static('uploads/images'))

    if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'))
    }

    // Check if the private token is there
    app.use(checkPrivateToken)

    // Register routes.
    app.use('/', router)

    // Starts the HTTP server listening for connections.
    app.listen(process.env.PORT, () => {
      console.log(
        chalk.hex('#897DDC')(
          `Server running in ${process.env.NODE_ENV} mode at http://localhost:${process.env.PORT}`
        )
      )
      console.log('Press Ctrl-C to terminate...')
    })
  } catch (error) {
    console.error(error)
  }
}

main()
