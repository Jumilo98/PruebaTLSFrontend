import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../db/connect';
import { User } from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await connectToDatabase();

  const { email, password } = await request.json();
  
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 400 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 400 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });

  return NextResponse.json({ token , user });
}