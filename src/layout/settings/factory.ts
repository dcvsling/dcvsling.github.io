import { Injectable, ViewContainerRef } from "@angular/core";
import { SettingRegisters } from "./register";


@Injectable()
export class SettingsFactory {
  constructor(private registers: SettingRegisters) {
  }
  renderComponent(vcf: ViewContainerRef): void {
    this.registers.forEach(register => {
      const c = vcf.createComponent(register.component);
      c.instance.options = register.options;
      c.instance.valueChanges.subscribe(val => register.setter(val));
      c.instance.value = register.getter();
    });
  }
}
