import { ImageFileSchema } from 'fluentsearch-types';
import { Document, Schema } from 'mongoose';
export type AllFile = ImageFileSchema;

export type AllFileDoc = Document<AllFile>;

export const metaSchema = new Schema(
  {
    size: { type: Number },
    filename: { type: String },
    extension: { type: String },
    contentType: { type: String },
    sha1: { type: String, default: undefined },
  },
  { _id: false },
);

export const fileSchema = new Schema<Document<AllFile>>({
  owner: { type: String, required: true },
  meta: { type: Object, default: {} },
  zone: { type: String },
  label: { type: String },
  type: { type: String },

  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
