const { execSync } = require('child_process')

const version = process.argv[2]
const tags = ['alpha', 'beta', 'rc', 'next']

function main() {
  console.log(`Creating GitHub release for version: ${version}`)

  try {
    if (tags.some((tag) => version.includes(`-${tag}`))) {
      console.log('Creating prerelease GitHub release...')
      execSync(
        `gh release create ${version} --title "${version}" --notes "For complete changelog, see [CHANGELOG.md](https://github.com/VfanLee/hello-npm/blob/main/CHANGELOG.md)." --prerelease`,
        { stdio: 'inherit' }
      )
    } else {
      console.log('Creating stable GitHub release...')
      execSync(
        `gh release create ${version} --title "${version}" --notes "For complete changelog, see [CHANGELOG.md](https://github.com/VfanLee/hello-npm/blob/main/CHANGELOG.md)."`,
        { stdio: 'inherit' }
      )
    }
  } catch (error) {
    console.error(`Error while creating GitHub release: ${error.message}`)
    process.exit(1)
  }
}

main()
