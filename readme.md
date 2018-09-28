# Development Workflow Conventions

Development Workflow Conventions for modern Javascript & Typescript, including nodejs & front end development.

Background:

* https://prettier.io

* https://github.com/typicode/husky

* https://github.com/conventional-changelog/standard-version

* https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md

* And a SuperAwesome presentation https://docs.google.com/presentation/d/1l6jKvmIEOky13PUBGs7g8bLO8GrJs6vsLwjg914qfJI/edit?usp=sharing  

# Known Issues

## Commit through IntelliJ (FIXED)

Committing through IntelliJ (ctrl+K) doesn't clean the IntelliJ-staged files.

* See

- https://github.com/okonet/lint-staged/issues/151
- https://youtrack.jetbrains.com/issue/IDEA-135454 (still open in IntelliJ)

Workarounds

* Easy : use `"postcommit": "git update-index -g"`
* More complicated (better?) fix: https://igoradamenko.com/blog/all/lint-staged-and-jetbrains-ide/
