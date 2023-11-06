import { Component, Directive, EventEmitter, Input, Output } from "@angular/core";
import { SettingUI } from "./register";

@Directive()
export abstract class SettingUIBase<T> implements SettingUI<T> {
  options: T[] = [];
  @Input() value: T[] = [];
  @Output() valueChanges: EventEmitter<T[]> = new EventEmitter<T[]>();

}
