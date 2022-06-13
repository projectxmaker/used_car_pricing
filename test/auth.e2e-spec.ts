import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication Testing', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Signup new user 1', () => {
    const email = "ccc2@ccc.com";
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email, password: "cccc"})
      .expect(201)
      .then((res) => {
          const {id, email} = res.body;
          expect(id).toBeDefined();
          expect(email).toEqual(email);
      });
  });

  it('Signup new user 2 then sign in', async () => {
    const email = "aaaa@aaaa.com";
    const res = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({email, password: "aaaa"})
    .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
    
});
});
