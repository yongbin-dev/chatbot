git filter-branch -f --env-filter "
    GIT_AUTHOR_NAME='ybkim'
    GIT_AUTHOR_EMAIL='dydqls5757@gmail.com'
    GIT_COMMITTER_NAME='ybkim'
    GIT_COMMITTER_EMAIL='dydqls5757@gmail.com'
  " HEAD

git push --force