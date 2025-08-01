const { execSync } = require('child_process')

const version = process.argv[2]

function main() {
  console.log(`Creating GitHub release for version: ${version}`)

  try {
    if (version.includes('-alpha') || version.includes('-beta')) {
      console.log('Creating prerelease GitHub release...')
      execSync(
        `gh release create ${version} --title "${version}" --notes "For stable releases, please refer to [CHANGELOG.md](https://github.com/VfanLee/vue-qrcode/blob/main/CHANGELOG.md) for details." --prerelease`,
        { stdio: 'inherit' }
      )
    } else {
      console.log('Creating stable GitHub release...')
      execSync(
        `gh release create ${version} --title "${version}" --notes "For stable releases, please refer to [CHANGELOG.md](https://github.com/VfanLee/vue-qrcode/blob/main/CHANGELOG.md) for details."`,
        { stdio: 'inherit' }
      )
    }
  } catch (error) {
    console.error(`Error while creating GitHub release: ${error.message}`)
    process.exit(1)
  }
}

main()
