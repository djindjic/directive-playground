import di from 'aurelia-dependency-injection';

export class Person {
  static annotations() { return [new di.Transient()]; }
  constructor() {}
}

console.log(Person);