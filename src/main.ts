import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create< NestExpressApplication >(
        AppModule,
        { cors: true} 
    );

    const config = new DocumentBuilder()
        .setTitle( 'Docs' )
        .setDescription( 'Endpoints for frontend' )
        .setVersion( '1.0' )
        .build();

    const document = SwaggerModule.createDocument( app, config );
    SwaggerModule.setup( 'docs/frontend', app, document );
    app.use( json( { limit: '30mb' } ) );
    app.enableCors();
    app.useGlobalPipes( new ValidationPipe() );

    await app.listen( 3000 );
}

bootstrap();