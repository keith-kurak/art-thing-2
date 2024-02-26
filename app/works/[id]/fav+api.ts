import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { Database } from '@/data/api/database';

export async function GET(request: ExpoRequest) {
  const params = request.expoUrl.searchParams;
  const id = params.get("id")!;
  const database = new Database();
  const favStatus = await database.getFavoriteStatus(id);
  return ExpoResponse.json(favStatus);
}

export async function POST(request: ExpoRequest) {
  const params = request.expoUrl.searchParams;
  const id = params.get("id")!;
  const body = await request.json();
  const status = body.status;
  const database = new Database();
  await database.setFavoriteStatus(id, status);
  return ExpoResponse.json(status);
}