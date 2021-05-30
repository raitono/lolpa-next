import { Schema, model, models } from 'mongoose';

const schema = new Schema<IRiotVersion>({
  versionNumber: { type: String, required: true },
  dateReleased: { type: Date, required: true },
  dateImported: { type: Date, required: false }
});

// This means to check if we've compiled the model before exporting it
// This happens  in the "hot reloading" that Next.js does
export default models.Riot_Version || model<IRiotVersion>('Riot_Version', schema);

export interface IRiotVersion {
  versionNumber: string,
  dateReleased: Date,
  dateImported?: Date
}
