import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../db/connect';
import { Movie } from '../../models/Movie';

export async function GET() {
  await connectToDatabase();

  const movies = await Movie.find({});
  return NextResponse.json(movies);
}