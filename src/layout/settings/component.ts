import { OnInit, ViewContainerRef } from '@angular/core';
import { Component } from '@angular/core';
import { SettingsFactory } from './factory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'settings',
  standalone: true,
  imports: [CommonModule],
  template: ``
})
export class Settings implements OnInit {
  constructor(private factory: SettingsFactory, private vcf: ViewContainerRef) { }
  ngOnInit(): void {
    this.factory.renderComponent(this.vcf);

  }
}
