import { ImageFile, ImageThumbnailFile } from 'fluentsearch-types';
import { Document, Schema } from 'mongoose';
export type AllFile = ImageFile | ImageThumbnailFile;

export type AllFileDoc = Document<AllFile>;

export const metaSchema = new Schema(
  {
    size: Number,
    filename: String,
    extension: String,
    contentType: String,
    sha1: { type: String, default: undefined },
  },
  { _id: false },
);

export const fileSchema = new Schema<Document<AllFile>>({
  owner: { type: String, required: true },
  meta: { type: Object, default: {} },
  zone: String,
  label: String,
  type: { type: String },

  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
