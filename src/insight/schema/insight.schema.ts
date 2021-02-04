import { InsightSchema } from 'fluentsearch-types';
import { Document, Schema } from 'mongoose';

type InsightDoc = Document<InsightSchema>;

export const insightSchema = new Schema<InsightDoc>({
  result: { type: String, required: true },
  model: { type: String },
  bbox: { type: Object },
  prob: { type: Number },
  lang: { type: String },

  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
