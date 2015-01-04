System.config({
  "paths": {
    "*": "*.js",
    "app/*": "lib/*.js",
    "github:*": "jspm_packages/github/*.js"
  },
  "bundles": {
    "bundle-3": [
      "github:aurelia/dependency-injection@0.1.1/amd/annotations",
      "github:aurelia/metadata@0.1.1/amd/origin",
      "github:aurelia/metadata@0.1.1/amd/resource-type",
      "github:aurelia/metadata@0.1.1/amd/annotations",
      "github:aurelia/dependency-injection@0.1.1/amd/util",
      "github:aurelia/metadata@0.1.1/amd/index",
      "github:aurelia/metadata@0.1.1",
      "github:aurelia/dependency-injection@0.1.1/amd/container",
      "github:aurelia/dependency-injection@0.1.1/amd/index",
      "github:aurelia/dependency-injection@0.1.1",
      "app/app"
    ]
  }
});

System.config({
  "map": {
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.1.1",
    "github:aurelia/dependency-injection@0.1.1": {
      "aurelia-metadata": "github:aurelia/metadata@0.1.1",
      "es6-shim": "github:paulmillr/es6-shim@0.21.1"
    }
  }
});

