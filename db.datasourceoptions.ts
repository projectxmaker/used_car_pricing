import {TypeOrmModuleOptions} from '@nestjs/typeorm';

const _DBOptions:TypeOrmModuleOptions = {
    entities: [__dirname + '**/*.entity{.js,.ts}'],
    synchronize: false,
    //migrations: ['migrations/*.js'],
    // cli: {
    //   migrationsDir: 'migrations',
    // },
};
  
switch (process.env.NODE_ENV) {
case 'development':
    Object.assign(_DBOptions, {
    type: 'sqlite',
    database: 'db.sqlite',
    });
    break;
case 'test':
    Object.assign(_DBOptions, {
    type: 'sqlite',
    database: 'test.sqlite',
    migrationsRun: true,
    });
    break;
case 'production':
    break;
default:
    throw new Error('unknown environment');
}

export const DBOptions = _DBOptions;