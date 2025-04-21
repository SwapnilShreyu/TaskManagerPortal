/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { loginservice } from './loginservice.service';

describe('Service: loginservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [loginservice]
    });
  });

  it('should ...', inject([loginservice], (service: loginservice) => {
    expect(service).toBeTruthy();
  }));
});
