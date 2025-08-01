const { execSync } = require('child_process')
const path = require('path')

const version = process.argv[2]
const packagePath = path.resolve(__dirname, '../')

function main() {
  console.log(`Publishing version: ${version} to npm...`)

  let tag = ''

  if (version.includes('-alpha')) {
    tag = 'alpha'
    console.log('Publishing as alpha tag...')
  } else if (version.includes('-beta')) {
    tag = 'beta'
    console.log('Publishing as beta tag...')
  } else {
    console.log('Publishing as latest stable version...')
  }

  try {
    const publishCommand = tag ? `npm publish --tag ${tag} --no-git-checks` : 'npm publish --no-git-checks'

    execSync(publishCommand, { cwd: packagePath, stdio: 'inherit' })
  } catch (error) {
    console.error(`Error while publishing: ${error.message}`)
    process.exit(1)
  }
}

main()
