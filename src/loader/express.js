import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

export function setExpress(app){
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use(cors());
  app.use(morgan('dev'));
}