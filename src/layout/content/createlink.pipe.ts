
import { Pipe, PipeTransform } from '@angular/core';
import { Directory, File } from '../../features';

@Pipe({
  name: 'createLink',
  standalone: true,
  pure: true
})
export class CreateLinkPipe implements PipeTransform {
  transform(value: File | Directory): string[] {
      return `/${value.type === 'file' ? 'content' : 'toc'}${value.fullname}`.split('/');
  }
}
