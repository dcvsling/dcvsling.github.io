import {
  Route,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup,
} from '@angular/router';

export function pairRouteMatcher (
  segments: UrlSegment[],
  group: UrlSegmentGroup,
  route: Route
): UrlMatchResult | null {
  const posParams: { [key: string]: any } = {};
  const consumed: UrlSegment[] = [];
  for (let i = 0; i < segments.length / 2; i++) {
    const index = i * 2;
    if (isNonEmptyString(segments[index].path) || isNonEmptyString(segments[index + 1].path)) break;
    const [key, value] = [segments[index], segments[index + 1]];
    posParams[key.path] = value.path;
    consumed.push(key, value);
  }
  return consumed.length > 0 ? { consumed, posParams } : null;

  function isNonEmptyString(data: any): data is String {
    return typeof data === 'string' && data.length > 0;
  }
}
export function matchAll(name: string) {
  return function(segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult | null {
    let path: string = segments.map(segment => segment.path).join('/');
    if(path.at(0) !== '/')
      path = '/' + path;
    return {
      consumed: segments,
      posParams: {
        [name]: new UrlSegment(path, { })
      }
    }
  }
}

