System.config({
  "paths": {
    "*": "*.js",
    "app/*": "lib/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  },
  "bundles": {
    "bundle-4": [
      "github:aurelia/dependency-injection@0.2.1/system/annotations",
      "github:aurelia/metadata@0.2.3/system/origin",
      "github:aurelia/metadata@0.2.3/system/resource-type",
      "github:aurelia/metadata@0.2.3/system/annotations",
      "github:aurelia/dependency-injection@0.2.1/system/util",
      "github:aurelia/metadata@0.2.3/system/index",
      "github:aurelia/metadata@0.2.3",
      "github:aurelia/dependency-injection@0.2.1/system/container",
      "github:aurelia/dependency-injection@0.2.1/system/index",
      "github:aurelia/dependency-injection@0.2.1",
      "app/app"
    ]
  }
});

System.config({
  "map": {
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.2.1",
    "github:aurelia/dependency-injection@0.2.1": {
      "aurelia-metadata": "github:aurelia/metadata@0.2.3",
      "core-js": "npm:core-js@0.4.1"
    },
    "github:jspm/nodelibs@0.0.8": {
      "Base64": "npm:Base64@0.2.1",
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.4",
      "inherits": "npm:inherits@2.0.1",
      "json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

