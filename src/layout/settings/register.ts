import { Type, InjectionToken, Provider, EventEmitter } from "@angular/core";


export interface SettingUI<T> {
  options: T[];
  value: T[];
  valueChanges: EventEmitter<T[]>;
}


export interface SettingRegister<T = any> {
  key: string;
  component: Type<SettingUI<T>>;
  options: T[];
  getter: () => T[];
  setter: (val: T[]) => void;
}

type SettingRegisters = SettingRegister[];
const SettingRegisters = new InjectionToken<SettingRegisters>('SettingRegisters');
export { SettingRegisters };

export namespace Settings {
  export const registers: SettingRegister[] = [];
  export function register<T>(register: SettingRegister<T>): void {
    registers.push(register);
  }
}

export const SETTING_REGISTERS_PROVIDER: Provider = {
  provide: SettingRegisters,
  useFactory: () => Settings.registers
}
