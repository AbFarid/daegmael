# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist


git init
git add -A
git commit -m 'deploy'


git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main


git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -