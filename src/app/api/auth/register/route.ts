import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../db/connect';
import { User } from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  await connectToDatabase();

  const { username, email, password } = await request.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'El usuario ya existe' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  return NextResponse.json({ message: 'Usuario registrado exitosamente' }, { status: 201 });
}