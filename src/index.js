import { start } from './server';
import { connectDB } from './config/db';

connectDB();
start();