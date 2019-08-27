workflow "test, build and publish" {
  on       = "push"
  resolves = "publish"
}

action "install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "bootstrap" {
  uses  = "actions/npm@master"
  args  = "run bootstrap -- --ci"
  needs = "install"
}

action "lint" {
  uses  = "actions/npm@master"
  args  = "run lint"
  needs = "bootstrap"
}

action "test" {
  needs = "bootstrap"
  uses  = "actions/npm@master"
  args  = "t"
}

action "build" {
  uses  = "actions/npm@master"
  args  = "run build"

  needs = [
    "lint",
    "test"
  ]
}

action "publish filter" {
  needs = "build"
  uses  = "actions/bin/filter@b2bea07"
  args  = "branch master"
}

action "publish" {
  needs   = "publish filter"
  uses    = "./.github/actions/publish"

  secrets = [
    "NPM_AUTH_TOKEN"
  ]

  args    = [
    "run publish -- --yes"
  ]
}
